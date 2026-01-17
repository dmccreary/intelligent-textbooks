#!/usr/bin/env python3
"""
Convert PNG images to JPEG and compress to target size.
"""

import os
import sys
from PIL import Image, ImageOps
from pathlib import Path

TARGET_KB = 70
MIN_WIDTH = 400

def get_file_size_kb(filepath):
    return os.path.getsize(filepath) / 1024

def convert_and_compress(png_path, target_kb=TARGET_KB):
    """Convert PNG to JPEG and compress to target size."""
    try:
        jpg_path = png_path.with_suffix('.jpg')

        with Image.open(png_path) as img:
            img = ImageOps.exif_transpose(img)

            # Convert to RGB (JPEG doesn't support transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create white background for transparent images
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1])
                    img = background
                else:
                    img = img.convert('RGB')
            elif img.mode != 'RGB':
                img = img.convert('RGB')

            original_width, original_height = img.size
            original_size = get_file_size_kb(png_path)

            print(f"  PNG: {original_width}x{original_height}, {original_size:.1f}KB")

            min_resize_factor = MIN_WIDTH / original_width if original_width > MIN_WIDTH else 1.0
            resize_factors = [0.5, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.12, 0.1]
            resize_factors = [f for f in resize_factors if f >= min_resize_factor]
            if not resize_factors:
                resize_factors = [min_resize_factor]

            qualities = [85, 80, 75, 70, 65, 60, 55, 50, 45, 40]

            best_size = float('inf')
            best_img = img.copy()
            best_quality = 80
            found = False

            for resize_factor in resize_factors:
                if resize_factor < 1.0:
                    new_width = int(original_width * resize_factor)
                    new_height = int(original_height * resize_factor)
                    resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                else:
                    resized = img
                    new_width, new_height = original_width, original_height

                for quality in qualities:
                    temp_path = str(jpg_path) + ".temp"
                    resized.save(temp_path, "JPEG", quality=quality, optimize=True)
                    temp_size = get_file_size_kb(temp_path)

                    if temp_size <= target_kb:
                        best_size = temp_size
                        best_img = resized.copy()
                        best_quality = quality
                        os.remove(temp_path)
                        print(f"  ✓ Found: {temp_size:.1f}KB at {new_width}x{new_height} (q={quality})")
                        found = True
                        break

                    os.remove(temp_path)

                if found:
                    break

            if not found:
                # Use smallest possible
                factor = max(min_resize_factor, 0.15)
                new_w = int(original_width * factor)
                new_h = int(original_height * factor)
                best_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                best_quality = 40
                print(f"  Warning: Using minimum size {new_w}x{new_h}")

            # Save the JPEG
            best_img.save(jpg_path, "JPEG", quality=best_quality, optimize=True)
            final_size = get_file_size_kb(jpg_path)
            final_w, final_h = best_img.size

            print(f"  Result: {original_size:.1f}KB PNG -> {final_size:.1f}KB JPG")
            print(f"  Dimensions: {original_width}x{original_height} -> {final_w}x{final_h}")

            # Remove the PNG (backup already exists)
            os.remove(png_path)
            print(f"  Removed: {png_path.name}")

            return True, final_size

    except Exception as e:
        print(f"  ERROR: {e}")
        return False, 0


def main():
    img_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("docs/case-studies/img")
    target_kb = int(sys.argv[2]) if len(sys.argv) > 2 else TARGET_KB

    print(f"Converting PNGs to JPEG in: {img_dir}")
    print(f"Target size: {target_kb}KB")
    print()

    # Find PNGs that are over target size
    pngs = []
    for f in img_dir.glob("*.png"):
        if ".backup" not in str(f):
            size = get_file_size_kb(f)
            if size > target_kb:
                pngs.append((f, size))

    pngs.sort(key=lambda x: x[1], reverse=True)

    if not pngs:
        print("No PNGs larger than target found.")
        return

    total_original = sum(s for _, s in pngs)
    print(f"Found {len(pngs)} PNGs to convert")
    print(f"Total PNG size: {total_original:.1f}KB")
    print()

    total_final = 0
    successful = 0

    for i, (filepath, orig_size) in enumerate(pngs, 1):
        print(f"[{i}/{len(pngs)}] {filepath.name}")
        success, final_size = convert_and_compress(filepath, target_kb)
        if success:
            successful += 1
            total_final += final_size
        print()

    print("=" * 50)
    print(f"Converted: {successful}/{len(pngs)}")
    print(f"Original PNG: {total_original:.1f}KB")
    print(f"Final JPG: {total_final:.1f}KB")
    print(f"Saved: {total_original - total_final:.1f}KB ({(1-total_final/total_original)*100:.1f}%)")


if __name__ == "__main__":
    main()
