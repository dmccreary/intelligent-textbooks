# Site Analytics

Scripts for gathering metrics across all intelligent textbook repositories.

> **Automated monthly refresh:** the page-views report below is regenerated and the
> [Site Analytics MicroSim](https://dmccreary.github.io/intelligent-textbooks/sims/site-analytics/)
> redeployed automatically on the 1st of each month via a **Claude Code Routine**.
> See [this gist](https://gist.github.com/dmccreary/ca9a391bc781a3862fee62debb3f93ab)
> for how that automation is configured.

---

## ga4-pageviews-report.py

Generates a ranked page-views report for all textbooks in the last N days by
scanning every `~/Documents/ws/*/mkdocs.yml` for a Google Analytics property ID
and querying the GA4 API.

### How it works

1. **Scan** — reads every `mkdocs.yml` in `~/Documents/ws/` and extracts the
   `property: G-XXXXXXXXXX` measurement ID (skips commented-out lines).
2. **Map** — calls the GA4 Admin API to find the numeric property ID that
   corresponds to each measurement ID. The mapping is cached locally in
   `ga4-property-map.json` so this step only runs once (or when you pass
   `--refresh`).
3. **Query** — calls the GA4 Data API for `screenPageViews` over the requested
   date window for each property.
4. **Report** — prints a ranked table to stdout sorted by page views, and
   optionally writes a CSV.

### One-time setup

#### 1. Create and activate the conda environment

```bash
conda create -n google-analytics python=3.11 -y
conda activate google-analytics
```

> **Note:** the environment name is `google-analytics`, not `google-cloud`.

#### 2. Install dependencies

```bash
pip install google-analytics-data google-analytics-admin
```

#### 3. Authenticate with a service account

We use a **service account** rather than `gcloud auth application-default login`.
The interactive login is blocked by Google for the sensitive Analytics scope
("This app is blocked"), because it uses Google's shared OAuth client. A
service account avoids that entirely and never expires.

**a. Create a Google Cloud project** at <https://console.cloud.google.com>
(ours is named `textbook-analytics`).

**b. Enable both APIs** in that project:

- [Google Analytics Admin API](https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com)
- [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com)

**c. Create a service account** (IAM & Admin → Service Accounts → Create).
No Cloud IAM roles are needed — GA permissions are granted inside Analytics,
not here. Then create a **JSON key** for it (Keys → Add Key → JSON) and save it to:

```
~/.config/gcloud/textbook-analytics-key.json
```

```bash
chmod 600 ~/.config/gcloud/textbook-analytics-key.json   # lock to owner-only
```

**d. Grant the service account access in Google Analytics.** In
[analytics.google.com](https://analytics.google.com) → **Admin** → **Account
access management** (the *Account* column, not *Property*), add the service
account's email as a **Viewer**:

```
textbook-analytics-reader@textbook-analytics.iam.gserviceaccount.com
```

Granting at the **account** level covers every property under it in one step.
If some textbooks live under a *different* GA account, repeat this for each one.

**e. (Optional) Point the script at the key.** The script auto-detects the key
at the default path above. If you keep it elsewhere, set:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/your-key.json
```

> ⚠️ **Never commit the key.** It is gitignored (`*-key.json`), and the repos
> are public. If a key is ever exposed, rotate it in the Cloud Console
> (Service Account → Keys → delete the old key, create a new one).

---

### Running the report

From the repo root:

```bash
conda activate google-analytics
python src/site-analytics/ga4-pageviews-report.py
```

Or with the full Python path (no activation needed):

```bash
/usr/local/Caskroom/miniforge/base/envs/google-analytics/bin/python \
    src/site-analytics/ga4-pageviews-report.py
```

#### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--days N` | `90` | Lookback window in days |
| `--csv` | off | Write ranked results to `ga4-pageviews-results.csv` |
| `--refresh` | off | Force re-fetch the Admin API property mapping (use after adding new textbooks) |

#### Examples

```bash
# Default: last 90 days, table only
python src/site-analytics/ga4-pageviews-report.py

# Last 30 days, also write CSV
python src/site-analytics/ga4-pageviews-report.py --days 30 --csv

# Refresh the property mapping cache (e.g. after adding a new textbook)
python src/site-analytics/ga4-pageviews-report.py --refresh
```

#### Sample output

```
=================================================================
  Page Views Report — Last 90 Days  |  2026-06-18 08:36
=================================================================
  Rank  Textbook                                   Page Views
  ----- ------------------------------------------ ----------
  1     circuits                                        5,534
  2     learning-micropython                            2,526
  3     intelligent-textbooks                           2,381
  ...
  ----- ------------------------------------------ ----------
  TOTAL                                                26,663
=================================================================
  58 textbooks reported  |  1 skipped (no numeric ID found):
    - Digital-Transformation-with-AI-Spring-2026 (G-H5EG7E1BQG)
```

### Output files

| File | Description |
|------|-------------|
| `ga4-property-map.json` | Cache of `G-XXXXX → numeric property ID` mappings built by the Admin API. A `null` value is a *negative* cache entry — an ID that could not be matched to any visible property (so it is not re-scanned every run). Delete this file to force a full re-scan, or use `--refresh`. |
| `ga4-pageviews-results.csv` | Written only when `--csv` is passed. Columns: `rank, slug, measurement_id, numeric_id, page_views, generated`. `generated` is the report run-date (`YYYY-MM-DD`), repeated on every row; the site-analytics MicroSim reads it to show its "Last Update" date. |

### Troubleshooting

**`DefaultCredentialsError`** — the service account key wasn't found. Confirm
`~/.config/gcloud/textbook-analytics-key.json` exists, or set
`GOOGLE_APPLICATION_CREDENTIALS` to its path.

**`403 SERVICE_DISABLED`** — the Admin or Data API isn't enabled in the Cloud
project. Enable both (see setup step 3b) and wait ~1–2 minutes.

**`PERMISSION_DENIED` / 0 accounts visible** — the service account hasn't been
granted access in Google Analytics. Add its email as a Viewer at the account
level (setup step 3d).

**Property shows 0 views** — the property is mapped but has no data in the
window. Check that the textbook is published and receiving traffic in GA4.

**Property skipped ("no numeric ID found")** — the `G-XXXXX` ID in `mkdocs.yml`
isn't among the properties the service account can see. Most often the property
lives under a **different GA account**; add the service account as a Viewer to
that account too, then run `--refresh`. (Otherwise verify the measurement ID is
correct in the GA4 console.)

**Adding a new textbook** — add `property: G-XXXXX` to its `mkdocs.yml`, then
run with `--refresh` so the new property is added to the cache.

**Excluding a textbook from the report** — add its slug (the `~/Documents/ws/`
directory name) to the `EXCLUDED_SLUGS` set near the top of the script. Use this
for books whose GA property lives on someone else's account that you don't track.
This skips the book entirely without touching its `mkdocs.yml`.

---

## Other scripts

| Script | Description |
|--------|-------------|
| `get-ibook-metrics.py` | Counts markdown files, images, words, MicroSims, and glossary terms for a single repo. |
| `get-metrics-json.py` | Same metrics, output as JSON. |
| `check-sites.py` | HTTP health-check across all published textbook URLs. |
| `list-sites-markdown.py` | Generates a markdown table of all sites from `sites.json`. |
| `report.py` | Renders `sites.json` as an HTML report. |
| `json-to-csv.py` | Converts `sites.json` to `sites.csv`. |
| `sites.json` | Master list of all textbooks with metadata. |
| `sites.csv` | CSV version of `sites.json`. |
