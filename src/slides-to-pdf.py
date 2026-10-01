#!/usr/bin/env python3
"""
Slide Deck to PDF Converter
Converts a markdown slide deck (docs/slides/<deck>/index.md) into a single
16:9 PDF, one slide per page, using the same slide-splitting rules and
look as docs/slides/slide-viewer.html.

A PDF cannot run a MicroSim, so:
  - every <iframe> is replaced by a snapshot of the running MicroSim that
    links to the live version
  - a notice slide is inserted as slide 2 with a link and QR code
    (<deck>/qr-code.png, if present) pointing at the interactive deck

Usage:
    python3 src/slides-to-pdf.py docs/slides/ibooks-in-35-minutes
    python3 src/slides-to-pdf.py docs/slides/overview -o /tmp/overview.pdf

Requires: pip install playwright pillow && playwright install chromium
"""

import argparse
import html
import io
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urljoin

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

REPO_DIR = Path(__file__).resolve().parent.parent
DOCS_DIR = REPO_DIR / "docs"

# 16:9 page in CSS pixels (96 per inch = 13.33in x 7.5in, PowerPoint widescreen)
SLIDE_W, SLIDE_H = 1280, 720
PAD_X, PAD_TOP, PAD_BOTTOM = 56, 34, 46
CONTENT_W = SLIDE_W - 2 * PAD_X
CONTENT_H = SLIDE_H - PAD_TOP - PAD_BOTTOM

MAX_IMAGE_PX = 1800        # longest side of any embedded picture
SIM_SETTLE_MS = 4000       # let a MicroSim draw/animate before the snapshot
IMAGE_EXTS = {".png", ".jpg", ".jpeg"}

NOTICE_HEADLINE = "A PDF is a Poor Representation of a Set of Interactive MicroSimulations!"

PAGE_TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>__TITLE__</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
    @page { size: __SLIDE_W__px __SLIDE_H__px; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #16213e; }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        color: #e8e8e8;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    .slide {
        position: relative;
        width: __SLIDE_W__px;
        height: __SLIDE_H__px;
        overflow: hidden;
        padding: __PAD_TOP__px __PAD_X__px __PAD_BOTTOM__px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        font-size: 18px;
        break-after: page;
    }
    .slide:last-child { break-after: auto; }
    .slide-content { display: flow-root; width: __CONTENT_W__px; transform-origin: top left; }
    .slide-content h1 { font-size: 2.5em; margin-bottom: 15px; color: #64b5f6; border-bottom: 2px solid #64b5f6; }
    .slide-content h2 { font-size: 2em; line-height: 1.25; margin-bottom: 12px; color: #81c784; }
    .slide-content h3 { font-size: 1.5em; margin: 16px 0 12px 0; color: #fff; }
    .slide-content a { color: #fdd835; text-decoration: underline; }
    .slide-content p { font-size: 1.2em; line-height: 1.6; margin-bottom: 12px; }
    .slide-content ul, .slide-content ol { font-size: 1.2em; line-height: 1.6; margin: 10px 0 12px 30px; }
    .slide-content li { margin-bottom: 8px; }
    .slide-content li p { font-size: 1em; margin-bottom: 0; }
    .slide-content li ul, .slide-content li ol { font-size: 1em; margin: 6px 0 6px 28px; }
    .slide-content > ul > li, .slide-content > ol > li { break-inside: avoid; }
    .slide-content img { max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 12px auto; }
    .slide-content img[align="left"] { margin: 6px 24px 12px 0; }
    .slide-content img[align="right"] { margin: 6px 0 12px 24px; }
    .slide-content code { background: rgba(0, 0, 0, 0.3); padding: 2px 8px; border-radius: 4px; font-family: 'Fira Code', Menlo, Consolas, monospace; }
    .slide-content pre { background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; margin: 15px 0; }
    .slide-content pre code { padding: 0; background: none; }

    /* MkDocs Material card grids */
    .slide-content .grid > ul { list-style: none; margin: 10px 0 0 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .slide-content .grid.grid-3-col > ul { grid-template-columns: repeat(3, 1fr); }
    .slide-content .grid > ul > li { margin: 0; padding: 10px 16px; line-height: 1.35; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 8px; }

    /* MicroSim snapshots */
    .slide-content a.sim { display: block; text-align: center; text-decoration: none; }
    .slide-content a.sim img { margin: 4px auto 0; border-radius: 6px; }
    .slide-content a.sim .sim-caption { display: block; font-size: 13px; line-height: 1.5; font-style: italic; color: #fdd835; }

    .footer { position: absolute; left: __PAD_X__px; right: __PAD_X__px; bottom: 14px; display: flex; justify-content: space-between; font-size: 12px; color: rgba(255, 255, 255, 0.45); }

    /* The "this is only a PDF" notice slide */
    .notice { display: flex; align-items: center; gap: 48px; height: __CONTENT_H__px; }
    .notice-text { flex: 1; min-width: 0; }
    .notice-kicker { display: inline-block; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #1a1a2e; background: #fdd835; border-radius: 4px; padding: 4px 12px; margin-bottom: 18px; }
    .slide-content .notice h2 { font-size: 2.45em; line-height: 1.18; color: #fdd835; margin-bottom: 22px; }
    .slide-content .notice-link { margin-top: 20px; padding: 14px 18px; border-left: 5px solid #fdd835; background: rgba(253, 216, 53, 0.09); border-radius: 0 8px 8px 0; font-weight: 600; }
    .slide-content .notice-link a { font-family: Menlo, Consolas, monospace; font-size: 0.68em; font-weight: 400; overflow-wrap: anywhere; }
    .slide-content .notice-qr { flex: none; width: 380px; text-align: center; text-decoration: none; }
    .slide-content .notice-qr img { width: 380px; padding: 18px; margin: 0; background: #fff; border-radius: 14px; image-rendering: pixelated; }
    .slide-content .notice-qr span { display: block; margin-top: 12px; font-size: 1.1em; font-weight: 600; color: #e8e8e8; }
</style>
</head>
<body>
<script>
const SLIDES = __SLIDES__;
const SIMS = __SIMS__;
const DECK_TITLE = __DECK_TITLE__;
const CONTENT_W = __CONTENT_W__, CONTENT_H = __CONTENT_H__;
const MIN_IMAGE_W = 160, MIN_SCALE = 0.4;

// MkDocs serves foo/index.md at foo/ and foo.md at foo/
function liveUrl(href) {
    const url = new URL(href);
    if (url.origin === location.origin && url.pathname.endsWith('.md')) {
        url.pathname = url.pathname.replace(/(index)?\.md$/, m => m === 'index.md' ? '' : '/');
    }
    return url.href;
}

function build() {
    SLIDES.forEach((slide, i) => {
        const section = document.createElement('section');
        section.className = 'slide';
        const content = document.createElement('div');
        content.className = 'slide-content';
        content.innerHTML = slide.html !== undefined ? slide.html : marked.parse(slide.md);
        const footer = document.createElement('div');
        footer.className = 'footer';
        footer.innerHTML = `<span></span><span>${i + 1} / ${SLIDES.length}</span>`;
        footer.firstChild.textContent = DECK_TITLE;
        section.append(content, footer);
        document.body.append(section);
    });

    // A PDF cannot run a MicroSim: swap each iframe for its snapshot, linked to the live sim
    document.querySelectorAll('iframe').forEach(iframe => {
        const link = document.createElement('a');
        link.className = 'sim';
        link.href = iframe.src;
        const img = document.createElement('img');
        img.src = SIMS[iframe.getAttribute('src')];
        img.width = CONTENT_W;
        const caption = document.createElement('span');
        caption.className = 'sim-caption';
        caption.textContent = 'Static snapshot — click to run this MicroSim live';
        link.append(img, caption);
        iframe.replaceWith(link);
    });

    document.querySelectorAll('a[href]').forEach(a => { a.href = liveUrl(a.href); });
}

const fits = c => c.getBoundingClientRect().height <= CONTENT_H + 0.5;

function setScale(c, s) {
    c.style.width = (CONTENT_W / s) + 'px';
    c.style.transform = s < 1 ? `scale(${s})` : '';
}

// Largest scale (1 down to MIN_SCALE) at which the content fits the slide
function bestScale(c) {
    for (let s = 1; s >= MIN_SCALE; s -= 0.02) {
        setScale(c, s);
        if (fits(c)) return s;
    }
    return MIN_SCALE;
}

// The viewer scrolls a tall slide; a PDF page cannot. Shrink pictures first,
// then flow long lists into columns, then scale the whole slide as a last resort.
function fitSlide(c) {
    if (fits(c)) return;

    const images = [...c.querySelectorAll('img')].filter(img => !img.closest('.notice'));
    for (let i = 0; i < 500 && !fits(c); i++) {
        const shrinkable = images.filter(img => img.getBoundingClientRect().width > MIN_IMAGE_W);
        if (!shrinkable.length) break;
        // the picture reaching furthest down the page is the one causing the overflow
        const lowest = shrinkable.reduce((a, b) =>
            a.getBoundingClientRect().bottom >= b.getBoundingClientRect().bottom ? a : b);
        lowest.style.width = (lowest.getBoundingClientRect().width * 0.97) + 'px';
        lowest.style.height = 'auto';
    }
    if (fits(c)) return;

    const list = images.length ? null : c.querySelector(':scope > ul, :scope > ol');
    let best = { columns: 1, scale: bestScale(c) };
    if (list) {
        for (const columns of [2, 3]) {
            list.style.columnCount = columns;
            const scale = bestScale(c);
            if (scale > best.scale + 0.001) best = { columns, scale };
        }
        list.style.columnCount = best.columns > 1 ? best.columns : '';
        list.style.columnGap = '56px';
    }
    setScale(c, best.scale);
}

async function render() {
    build();
    await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    document.querySelectorAll('.slide-content').forEach(fitSlide);
    return [...document.images].filter(img => !img.naturalWidth).map(img => img.src);
}
</script>
</body>
</html>
"""


def get_site_url():
    """Read site_url from mkdocs.yml (with a trailing slash)."""
    text = (REPO_DIR / "mkdocs.yml").read_text(encoding="utf-8")
    match = re.search(r"^site_url:\s*['\"]?([^'\"\s]+)", text, flags=re.M)
    if not match:
        sys.exit("Error: no site_url found in mkdocs.yml")
    return match.group(1).rstrip("/") + "/"


def parse_slides(markdown):
    """Split markdown into slides on '## ' headers, exactly as slide-viewer.html does."""
    markdown = re.sub(r"\A---\n.*?\n---\n", "", markdown, flags=re.S)
    parts = re.split(r"^## ", markdown, flags=re.M)
    slides = []
    intro = parts[0].strip()
    title_match = re.match(r"# (.+)", intro)
    deck_title = title_match.group(1).strip() if title_match else ""
    # The viewer only shows a title slide when the intro has text after its '# ' line
    if re.match(r"# .+\n", intro):
        slides.append({"md": intro})
    for part in parts[1:]:
        slides.append({"md": "## " + part})
    return deck_title, slides


def mkdocs_to_html(markdown):
    """Translate the MkDocs-only syntax that marked.js would show as literal text."""
    # attr_list on images: ![alt](src){ align="right" width="400px" }
    markdown = re.sub(
        r"!\[([^\]]*)\]\(([^)\s]+)\)\{\s*([^}]*?)\s*\}",
        lambda m: f'<img src="{m.group(2)}" alt="{html.escape(m.group(1))}" {m.group(3)}>',
        markdown,
    )

    # An iframe is an HTML block until the next blank line, which would swallow a
    # markdown link placed on the line after it
    markdown = re.sub(r"(</iframe>)[ \t]*\n(?=\S)", r"\1\n\n", markdown)

    # md_in_html: <div ... markdown> wraps indented markdown
    def unwrap(match):
        lines = match.group(2).strip("\n").split("\n")
        indent = min(len(line) - len(line.lstrip()) for line in lines if line.strip())
        body = "\n".join(line[indent:] for line in lines)
        return f"<div{match.group(1)}>\n\n{body}\n\n</div>"

    return re.sub(r"<div([^>]*?)\s+markdown>\n(.*?)\n</div>", unwrap, markdown, flags=re.S)


def find_iframes(slides):
    """Return [(src, height_px)] for every iframe in the deck, in order."""
    found = []
    for slide in slides:
        for tag in re.findall(r"<iframe\b[^>]*>", slide["md"], flags=re.S):
            src = re.search(r'src="([^"]+)"', tag)
            height = re.search(r'height="(\d+)', tag)
            if src and src.group(1) not in [s for s, _ in found]:
                found.append((src.group(1), int(height.group(1)) if height else 500))
    return found


def optimized_image(path):
    """Return (bytes, content_type) for a picture, downsized so the PDF stays small."""
    raw = path.read_bytes()
    content_type = "image/jpeg" if path.suffix.lower() in (".jpg", ".jpeg") else "image/png"
    with Image.open(path) as img:
        longest = max(img.size)
        # Tiny bitmaps such as QR codes: enlarge with hard edges so they stay scannable
        if img.mode in ("1", "L", "P") and longest <= 512:
            factor = -(-1200 // longest)
            big = img.convert("L").resize((img.width * factor, img.height * factor), Image.NEAREST)
            out = io.BytesIO()
            big.save(out, "PNG", optimize=True)
            return out.getvalue(), "image/png"
        if longest <= MAX_IMAGE_PX and len(raw) <= 300 * 1024:
            return raw, content_type
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
            transparent = img.getchannel("A").getextrema()[0] < 255
        else:
            transparent = False
        img.thumbnail((MAX_IMAGE_PX, MAX_IMAGE_PX), Image.LANCZOS)
        out = io.BytesIO()
        if transparent:
            img.save(out, "PNG", optimize=True)
            return out.getvalue(), "image/png"
        img.convert("RGB").save(out, "JPEG", quality=85, optimize=True)
        return out.getvalue(), "image/jpeg"


def trim_blank_bottom(img, margin=24):
    """Crop the empty band an iframe usually leaves below a MicroSim."""
    rgb = img.convert("RGB")
    background = rgb.getpixel((rgb.width // 2, rgb.height - 1))
    box = ImageChops.difference(rgb, Image.new("RGB", rgb.size, background)).getbbox()
    if not box:
        return rgb
    return rgb.crop((0, 0, rgb.width, min(rgb.height, box[3] + margin)))


def make_router(site_url, generated):
    """Serve the live site's URLs from the local docs/ folder, so the PDF shows the working tree."""
    cache = {}

    def handle(route):
        url = route.request.url.split("#")[0].split("?")[0]
        if url in generated:
            body, content_type = generated[url]
            route.fulfill(body=body, content_type=content_type)
            return
        path = (DOCS_DIR / unquote(url[len(site_url):])).resolve()
        if path.is_dir():
            path = path / "index.html"
        if DOCS_DIR not in path.parents or not path.is_file():
            route.continue_()  # not in the working tree - fall back to the deployed site
        elif path.suffix.lower() in IMAGE_EXTS:
            if path not in cache:
                cache[path] = optimized_image(path)
            route.fulfill(body=cache[path][0], content_type=cache[path][1])
        else:
            route.fulfill(path=str(path))

    return handle


def snapshot_sims(context, iframes, deck_url, generated):
    """Screenshot each MicroSim at slide width; return {iframe src: snapshot url}."""
    sims = {}
    for number, (src, height) in enumerate(iframes, start=1):
        print(f"  MicroSim snapshot {number}/{len(iframes)}: {src}")
        page = context.new_page()
        page.set_viewport_size({"width": CONTENT_W, "height": height})
        try:
            page.goto(urljoin(deck_url, src), wait_until="networkidle", timeout=30000)
        except Exception as error:  # a slow CDN should not sink the whole deck
            print(f"    Warning: {str(error).splitlines()[0]}")
        page.wait_for_timeout(SIM_SETTLE_MS)
        img = trim_blank_bottom(Image.open(io.BytesIO(page.screenshot(type="png"))))
        page.close()
        out = io.BytesIO()
        img.save(out, "PNG", optimize=True)
        content_type = "image/png"
        if out.tell() > 600 * 1024:  # photo-like sims compress far better as JPEG
            out = io.BytesIO()
            img.save(out, "JPEG", quality=88, optimize=True)
            content_type = "image/jpeg"
        shot = out.getvalue()
        shot_url = f"{deck_url}__pdf__/sim-{number}.{content_type.split('/')[1]}"
        generated[shot_url] = (shot, content_type)
        sims[src] = shot_url
    return sims


def notice_slide(interactive_url, sim_count, has_qr):
    """The slide that tells a PDF reader where the real, interactive deck lives."""
    url = html.escape(interactive_url)
    if sim_count:
        detail = (f"{sim_count} of them embed live MicroSims &mdash; small simulations you explore with "
                  "sliders, buttons and hover. In this PDF each one is frozen into a static snapshot.")
    else:
        detail = "The interactive version lets you navigate, follow links and explore at your own pace."
    qr = (f'<a class="notice-qr" href="{url}"><img src="qr-code.png" alt="QR code for the interactive slide deck">'
          "<span>Scan for the interactive slide deck</span></a>") if has_qr else ""
    tip = ("Scan the QR code, or click" if has_qr else "Click") + \
        " any MicroSim snapshot in this PDF to open the live version."
    return f"""<div class="notice">
<div class="notice-text">
<div class="notice-kicker">Read this first</div>
<h2>{html.escape(NOTICE_HEADLINE)}</h2>
<p>These slides were built to be <em>used</em>, not just read. {detail}</p>
<p class="notice-link">View the full interactive slide deck:<br><a href="{url}">{url.replace("?", "<wbr>?")}</a></p>
<p>{tip}</p>
</div>
{qr}
</div>"""


def build_pdf(deck_dir, output_path):
    site_url = get_site_url()
    deck = deck_dir.relative_to(DOCS_DIR / "slides").as_posix()
    deck_url = f"{site_url}slides/{deck}/"
    interactive_url = f"{site_url}slides/slide-viewer.html?input={deck}/index.md"

    deck_title, slides = parse_slides((deck_dir / "index.md").read_text(encoding="utf-8"))
    if not slides:
        sys.exit(f"Error: no slides found in {deck_dir / 'index.md'}")
    iframes = find_iframes(slides)
    for slide in slides:
        slide["md"] = mkdocs_to_html(slide["md"])
    slides.insert(1, {"html": notice_slide(interactive_url, len(iframes), (deck_dir / "qr-code.png").is_file())})
    print(f"{deck_title}: {len(slides)} slides ({len(iframes)} MicroSims)")

    generated = {}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        context = browser.new_context(device_scale_factor=2)
        context.route(site_url + "**", make_router(site_url, generated))
        sims = snapshot_sims(context, iframes, deck_url, generated)

        replacements = {
            "__TITLE__": html.escape(deck_title),
            "__SLIDES__": json.dumps(slides).replace("</", "<\\/"),
            "__SIMS__": json.dumps(sims),
            "__DECK_TITLE__": json.dumps(deck_title),
            "__SLIDE_W__": str(SLIDE_W), "__SLIDE_H__": str(SLIDE_H),
            "__PAD_X__": str(PAD_X), "__PAD_TOP__": str(PAD_TOP), "__PAD_BOTTOM__": str(PAD_BOTTOM),
            "__CONTENT_W__": str(CONTENT_W), "__CONTENT_H__": str(CONTENT_H),
        }
        page_html = re.sub("|".join(replacements), lambda m: replacements[m.group(0)], PAGE_TEMPLATE)
        page_url = deck_url + "__pdf__.html"  # in the deck folder, so its relative URLs resolve
        generated[page_url] = (page_html.encode("utf-8"), "text/html; charset=utf-8")

        page = context.new_page()
        page.set_viewport_size({"width": SLIDE_W, "height": SLIDE_H})
        page.emulate_media(media="print")
        page.goto(page_url, wait_until="networkidle")
        broken = page.evaluate("render()")
        for src in broken:
            print(f"  Warning: image did not load: {src}")
        page.pdf(path=str(output_path), width=f"{SLIDE_W}px", height=f"{SLIDE_H}px",
                 print_background=True, prefer_css_page_size=True, outline=True, tagged=True)
        browser.close()

    print(f"Wrote {output_path} ({output_path.stat().st_size / 1024 / 1024:.1f} MB)")
    print(f"Interactive deck: {interactive_url}")


def main():
    parser = argparse.ArgumentParser(description="Convert a markdown slide deck into a single PDF.")
    parser.add_argument("deck_dir", help="deck folder containing index.md, e.g. docs/slides/ibooks-in-35-minutes")
    parser.add_argument("-o", "--output", help="output PDF (default: <deck_dir>/<deck name>.pdf)")
    args = parser.parse_args()

    deck_dir = Path(args.deck_dir).resolve()
    if not (deck_dir / "index.md").is_file():
        sys.exit(f"Error: {deck_dir / 'index.md'} not found")
    if DOCS_DIR / "slides" not in deck_dir.parents:
        sys.exit(f"Error: {deck_dir} is not under {DOCS_DIR / 'slides'}")
    output_path = Path(args.output).resolve() if args.output else deck_dir / f"{deck_dir.name}.pdf"
    build_pdf(deck_dir, output_path)


if __name__ == "__main__":
    main()
