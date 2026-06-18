#!/usr/bin/env python3
"""
ga4-pageviews-report.py

Scans ~/Documents/ws/*/mkdocs.yml for Google Analytics measurement IDs (G-XXXXX),
maps them to numeric GA4 property IDs via the Admin API (cached locally), then
queries the Data API for total page views over the last 90 days per textbook.

Setup (one-time):
    pip install google-analytics-data google-analytics-admin
    # Authenticate via a service account key (see README.md) and either set
    #   export GOOGLE_APPLICATION_CREDENTIALS=~/.config/gcloud/textbook-analytics-key.json
    # or drop the key at that default path and this script will find it.

Usage:
    python ga4-pageviews-report.py              # last 90 days, table to stdout
    python ga4-pageviews-report.py --days 30    # different window
    python ga4-pageviews-report.py --csv        # also write results.csv
    python ga4-pageviews-report.py --refresh    # force re-fetch Admin API mapping
"""

import argparse
import csv
import json
import logging
import os
import re
import sys
from datetime import datetime
from pathlib import Path

# Silence noisy "Regional Access Boundary" / credential-refresh chatter from
# google-auth. These are non-fatal retries; the report completes regardless.
logging.getLogger("google").setLevel(logging.CRITICAL)

# Auto-detect the service account key if the env var isn't already set, so the
# script "just works" without remembering to export GOOGLE_APPLICATION_CREDENTIALS.
DEFAULT_KEY = Path.home() / ".config" / "gcloud" / "textbook-analytics-key.json"
if "GOOGLE_APPLICATION_CREDENTIALS" not in os.environ and DEFAULT_KEY.exists():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(DEFAULT_KEY)

import google.auth

GA_SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]


def get_credentials():
    credentials, _ = google.auth.default(scopes=GA_SCOPES)
    return credentials

WS_DIR = Path.home() / "Documents" / "ws"
CACHE_FILE = Path(__file__).parent / "ga4-property-map.json"
CSV_OUT = Path(__file__).parent / "ga4-pageviews-results.csv"

# Textbook slugs (directory names) to skip. These have a GA property in their
# mkdocs.yml, but we intentionally don't report on them — e.g. the GA property
# belongs to someone else's account that we don't own or track.
EXCLUDED_SLUGS = {
    "Digital-Transformation-with-AI-Spring-2026",  # GA property is on another person's account
}


# ---------------------------------------------------------------------------
# Step 1: Scan mkdocs.yml files
# ---------------------------------------------------------------------------

def scan_mkdocs_yml():
    """Return {measurement_id: slug} for all uncommented GA properties found."""
    result = {}
    for yml_path in sorted(WS_DIR.glob("*/mkdocs.yml")):
        slug = yml_path.parent.name
        if slug in EXCLUDED_SLUGS:
            continue
        try:
            content = yml_path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for line in content.splitlines():
            # Skip commented-out lines
            if line.lstrip().startswith("#"):
                continue
            m = re.search(r"property:\s*(G-[A-Z0-9]+)", line)
            if m:
                result[m.group(1)] = slug
                break
    return result


# ---------------------------------------------------------------------------
# Step 2: Admin API — map measurement ID → numeric property ID (cached)
# ---------------------------------------------------------------------------

def build_property_map(target_measurement_ids: set) -> dict:
    """
    Walk all GA4 properties in the account via the Admin API.
    For each property, list its web data streams to find the measurement ID.
    Returns {measurement_id: numeric_property_id_string}.
    """
    try:
        from google.analytics.admin import AnalyticsAdminServiceClient
    except ImportError:
        sys.exit("Missing package. Run: pip install google-analytics-admin")

    client = AnalyticsAdminServiceClient(credentials=get_credentials())

    # Collect all property resource names across all accounts
    property_names = []
    try:
        for summary in client.list_account_summaries():
            for prop in summary.property_summaries:
                property_names.append(prop.property)
    except Exception as e:
        sys.exit(f"Admin API error listing accounts: {e}")

    print(f"  Found {len(property_names)} total GA4 properties in your account")

    mapping = {}
    found = set()

    for i, prop_name in enumerate(property_names, 1):
        numeric_id = prop_name.split("/")[1]
        print(f"  Checking property {i}/{len(property_names)}: {prop_name}", end="\r")
        try:
            for stream in client.list_data_streams(parent=prop_name):
                if stream.web_stream_data and stream.web_stream_data.measurement_id:
                    mid = stream.web_stream_data.measurement_id
                    if mid in target_measurement_ids:
                        mapping[mid] = numeric_id
                        found.add(mid)
        except Exception:
            pass  # Property may have restricted access; skip silently

        # Early exit if we've matched everything we need
        if found >= target_measurement_ids:
            break

    print()  # newline after progress line
    return mapping


def load_or_build_cache(measurement_map: dict, force_refresh: bool) -> dict:
    """
    Returns {measurement_id: numeric_id_or_None}. A None value is a negative
    cache entry: the ID was searched for but not found in any visible account
    (e.g. the property lives under a GA account the service account can't see).
    Negative entries are NOT re-scanned on subsequent runs; use --refresh to retry.
    """
    cache = {}
    if CACHE_FILE.exists() and not force_refresh:
        cache = json.loads(CACHE_FILE.read_text())
        positive = sum(1 for v in cache.values() if v)
        print(f"Loaded Admin API cache: {positive} mapped, "
              f"{len(cache) - positive} unmapped ({CACHE_FILE.name})")

    to_lookup = set(measurement_map.keys()) - set(cache.keys()) if not force_refresh \
        else set(measurement_map.keys())
    if to_lookup:
        verb = "all" if force_refresh else len(to_lookup)
        print(f"Looking up {verb} properties via Admin API...")
        new_entries = build_property_map(to_lookup)
        cache.update(new_entries)
        # Negative-cache any IDs we searched for but couldn't map, so we don't
        # re-scan every run for properties under inaccessible accounts.
        for mid in to_lookup:
            cache.setdefault(mid, None)
        CACHE_FILE.write_text(json.dumps(cache, indent=2))
        print(f"Cache updated → {CACHE_FILE}")

    return cache


# ---------------------------------------------------------------------------
# Step 3: Data API — query page views per property
# ---------------------------------------------------------------------------

def get_page_views(numeric_property_id: str, days: int) -> int:
    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import DateRange, Metric, RunReportRequest
    except ImportError:
        sys.exit("Missing package. Run: pip install google-analytics-data")

    client = BetaAnalyticsDataClient(credentials=get_credentials())
    request = RunReportRequest(
        property=f"properties/{numeric_property_id}",
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
        metrics=[Metric(name="screenPageViews")],
    )
    response = client.run_report(request)
    if response.rows:
        return int(response.rows[0].metric_values[0].value)
    return 0


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="GA4 page views report across all textbooks")
    parser.add_argument("--days", type=int, default=90, help="Lookback window in days (default: 90)")
    parser.add_argument("--csv", action="store_true", help="Write results to ga4-pageviews-results.csv")
    parser.add_argument("--refresh", action="store_true", help="Force re-fetch Admin API property mapping")
    args = parser.parse_args()

    # Step 1
    print("Scanning mkdocs.yml files...")
    measurement_map = scan_mkdocs_yml()  # {G-ID: slug}
    print(f"  Found {len(measurement_map)} textbooks with GA properties\n")

    # Step 2
    cache = load_or_build_cache(measurement_map, args.refresh)

    # Step 3
    print(f"\nQuerying GA4 Data API — last {args.days} days...")
    rows = []
    skipped = []

    for measurement_id, slug in sorted(measurement_map.items(), key=lambda x: x[1]):
        numeric_id = cache.get(measurement_id)
        if not numeric_id:
            skipped.append((slug, measurement_id))
            continue
        try:
            views = get_page_views(numeric_id, args.days)
            rows.append({"slug": slug, "measurement_id": measurement_id,
                         "numeric_id": numeric_id, "page_views": views})
            print(f"  {slug:<45} {views:>8,}")
        except Exception as e:
            print(f"  ERROR {slug}: {e}")
            skipped.append((slug, measurement_id))

    # Sort by page views descending
    rows.sort(key=lambda r: r["page_views"], reverse=True)

    # Print report
    total = sum(r["page_views"] for r in rows)
    generated = datetime.now().strftime("%Y-%m-%d %H:%M")

    print(f"\n{'='*65}")
    print(f"  Page Views Report — Last {args.days} Days  |  {generated}")
    print(f"{'='*65}")
    print(f"  {'Rank':<5} {'Textbook':<42} {'Page Views':>10}")
    print(f"  {'-'*5} {'-'*42} {'-'*10}")
    for rank, row in enumerate(rows, 1):
        print(f"  {rank:<5} {row['slug']:<42} {row['page_views']:>10,}")
    print(f"  {'-'*5} {'-'*42} {'-'*10}")
    print(f"  {'TOTAL':<48} {total:>10,}")
    print(f"{'='*65}")
    print(f"  {len(rows)} textbooks reported", end="")
    if skipped:
        print(f"  |  {len(skipped)} skipped (no numeric ID found):", end="")
        for slug, mid in skipped:
            print(f"\n    - {slug} ({mid})", end="")
    print("\n")

    # Optional CSV output
    if args.csv:
        with open(CSV_OUT, "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=["rank", "slug", "measurement_id",
                                                    "numeric_id", "page_views"])
            writer.writeheader()
            for rank, row in enumerate(rows, 1):
                writer.writerow({"rank": rank, **row})
        print(f"CSV written → {CSV_OUT}")


if __name__ == "__main__":
    main()
