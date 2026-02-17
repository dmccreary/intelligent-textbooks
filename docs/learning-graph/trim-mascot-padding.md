# Trimming Excess Padding From Mascot PNGs

This note captures the exact steps we used to remove the large transparent borders
around the Axiom mascot assets in `docs/img/mascot/*.png`. The goal is to keep them
tight so our custom admonition layout has consistent spacing.

## 1. Install Pillow

```bash
pip install pillow
```

We already have MkDocs’ requirements installed; Pillow is the extra dependency
needed for basic image manipulation.

## 2. Run the Cropping Script

Execute the following command from the repository root:

```bash
python3 - <<'PY'
from pathlib import Path
from PIL import Image

root = Path('docs/img/mascot')
THRESH = 10          # ignore the faint glow outside the owl
PADDING = 4          # keep a small buffer after cropping

for path in sorted(root.glob('*.png')):
    img = Image.open(path).convert('RGBA')
    alpha = img.getchannel('A')
    px = alpha.load()
    w, h = img.size

    min_x, max_x = w, -1
    min_y, max_y = h, -1
    for y in range(h):
        for x in range(w):
            if px[x, y] > THRESH:
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)

    if max_x == -1:
        print(f'skip {path.name}: no pixels above threshold')
        continue

    min_x = max(min_x - PADDING, 0)
    min_y = max(min_y - PADDING, 0)
    max_x = min(max_x + PADDING, w - 1)
    max_y = min(max_y + PADDING, h - 1)

    bbox = (min_x, min_y, max_x + 1, max_y + 1)
    cropped = img.crop(bbox)
    if cropped.size == img.size:
        print(f'no change for {path.name}')
        continue

    cropped.save(path)
    print(f'cropped {path.name}: {img.size} -> {cropped.size}')
PY
```

- `THRESH = 10` treats any pixel whose alpha value is 10 or less as “padding.”
  This cuts off the soft halo without touching the owl.
- `PADDING = 4` restores a thin buffer so the artwork doesn’t feel cramped.

## 3. Rebuild the Site

```bash
PYTHONPATH=. mkdocs build
```

Rebuilding (or restarting `mkdocs serve`) ensures the optimized assets propagate
to `site/**`.

## Notes

- The script overwrites the original PNGs. Commit the updated images to keep the
  tighter version.
- If future assets have heavier halos, adjust `THRESH` or `PADDING` to taste.
