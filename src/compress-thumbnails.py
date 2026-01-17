#!/usr/bin/env python3
"""
Thumbnail Compression Script for Case Studies
Compresses images to approximately 70KB for thumbnail use.
Based on the compress-images.py script from claude-skills.
"""

import os
import sys
from PIL import Image, ImageOps
import shutil
from pathlib import Path

# Minimum width for thumbnails - smaller than full images
MIN_WIDTH = 400

def get_file_size_kb(filepath):
    """Get file size in KB"""
    return os.path.getsize(filepath) / 1024

def compress_image(input_path, target_size_kb=70, min_width=MIN_WIDTH):
    """
    Compress an image to approximately the target size in KB.
    Keeps JPEGs as JPEGs and PNGs as PNGs for optimal compression.
    """
    try:
        is_jpeg = input_path.suffix.lower() in ['.jpg', '.jpeg']
        is_webp = input_path.suffix.lower() == '.webp'

        # Create backup
        backup_path = str(input_path) + ".backup"
        if not os.path.exists(backup_path):
            shutil.copy2(input_path, backup_path)
            print(f"  Backup created: {backup_path}")

        with Image.open(input_path) as img:
            img = ImageOps.exif_transpose(img)

            # Handle color modes
            if is_jpeg:
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                elif img.mode not in ('RGB',):
                    img = img.convert('RGB')
            elif is_webp:
                if img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGB')
            else:
                # PNG: preserve transparency
                if img.mode in ('RGBA', 'LA'):
                    pass
                elif img.mode == 'P':
                    img = img.convert('RGBA')
                elif img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGB')

            original_size = get_file_size_kb(input_path)

            if original_size <= target_size_kb:
                print(f"  Already optimized: {original_size:.1f}KB")
                return True

            original_width, original_height = img.size
            print(f"  Original: {original_width}x{original_height}, {original_size:.1f}KB")
            print(f"  Format: {'JPEG' if is_jpeg else 'WebP' if is_webp else 'PNG'}")

            min_resize_factor = min_width / original_width if original_width > min_width else 1.0

            # More aggressive resize factors for thumbnails
            resize_factors = [0.5, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.12, 0.1]
            resize_factors = [f for f in resize_factors if f >= min_resize_factor]
            if not resize_factors:
                resize_factors = [min_resize_factor]

            jpeg_qualities = [80, 70, 60, 50, 40] if is_jpeg else [None]

            best_size = float('inf')
            best_img = img.copy()
            found = False

            for resize_factor in resize_factors:
                if resize_factor < 1.0:
                    new_width = int(original_width * resize_factor)
                    new_height = int(original_height * resize_factor)
                    resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                else:
                    resized_img = img
                    new_width, new_height = original_width, original_height

                temp_path = str(input_path) + ".temp"

                if is_jpeg:
                    for quality in jpeg_qualities:
                        resized_img.save(temp_path, "JPEG", quality=quality, optimize=True)
                        temp_size = get_file_size_kb(temp_path)

                        if temp_size <= target_size_kb:
                            best_size = temp_size
                            best_img = resized_img.copy()
                            print(f"  ✓ Found: {temp_size:.1f}KB at {new_width}x{new_height} (q={quality})")
                            os.remove(temp_path)
                            found = True
                            break

                    if found:
                        break
                elif is_webp:
                    resized_img.save(temp_path, "WEBP", quality=60, optimize=True)
                    temp_size = get_file_size_kb(temp_path)

                    if temp_size <= target_size_kb:
                        best_size = temp_size
                        best_img = resized_img.copy()
                        print(f"  ✓ Found: {temp_size:.1f}KB at {new_width}x{new_height}")
                        os.remove(temp_path)
                        found = True
                        break
                else:
                    resized_img.save(temp_path, "PNG", compress_level=9, optimize=True)
                    temp_size = get_file_size_kb(temp_path)

                    if temp_size <= target_size_kb:
                        best_size = temp_size
                        best_img = resized_img.copy()
                        print(f"  ✓ Found: {temp_size:.1f}KB at {new_width}x{new_height}")
                        os.remove(temp_path)
                        found = True
                        break

                if os.path.exists(temp_path):
                    os.remove(temp_path)

            # Use smallest allowed if target not reached
            if not found:
                print(f"  Warning: Could not reach {target_size_kb}KB, using smallest allowed")
                fallback_factor = max(min_resize_factor, 0.1)
                best_img = img.resize(
                    (int(original_width * fallback_factor), int(original_height * fallback_factor)),
                    Image.Resampling.LANCZOS
                )

            # Save with best image found
            if is_jpeg:
                best_img.save(input_path, "JPEG", quality=40, optimize=True)
            elif is_webp:
                best_img.save(input_path, "WEBP", quality=50, optimize=True)
            else:
                best_img.save(input_path, "PNG", compress_level=9, optimize=True)

            final_size = get_file_size_kb(input_path)
            compression_ratio = (1 - final_size / original_size) * 100
            final_width, final_height = best_img.size

            print(f"  Result: {original_size:.1f}KB -> {final_size:.1f}KB ({compression_ratio:.1f}% reduction)")
            print(f"  Dimensions: {original_width}x{original_height} -> {final_width}x{final_height}")

            return True

    except Exception as e:
        print(f"  ERROR: {e}")
        return False


def main():
    if len(sys.argv) < 2:
        print("Usage: python compress-thumbnails.py <directory> [target_kb]")
        print("Example: python compress-thumbnails.py docs/case-studies/img 70")
        sys.exit(1)

    img_dir = Path(sys.argv[1])
    target_kb = int(sys.argv[2]) if len(sys.argv) > 2 else 70

    if not img_dir.exists():
        print(f"ERROR: Directory does not exist: {img_dir}")
        sys.exit(1)

    print(f"Compressing images in: {img_dir}")
    print(f"Target size: {target_kb}KB")
    print(f"Minimum width: {MIN_WIDTH}px")
    print()

    image_extensions = {'.png', '.jpg', '.jpeg', '.webp'}
    images = []

    for f in img_dir.iterdir():
        if f.suffix.lower() in image_extensions:
            size_kb = get_file_size_kb(f)
            if size_kb > target_kb:
                images.append((f, size_kb))

    images.sort(key=lambda x: x[1], reverse=True)

    if not images:
        print(f"No images larger than {target_kb}KB found.")
        return

    total_original = sum(s for _, s in images)
    print(f"Found {len(images)} images larger than {target_kb}KB")
    print(f"Total size: {total_original:.1f}KB ({total_original/1024:.1f}MB)")
    print()

    successful = 0
    total_final = 0

    for i, (filepath, orig_size) in enumerate(images, 1):
        print(f"[{i}/{len(images)}] {filepath.name}")
        if compress_image(filepath, target_size_kb=target_kb):
            successful += 1
            total_final += get_file_size_kb(filepath)
        else:
            total_final += orig_size
        print()

    print("=" * 50)
    print(f"Completed: {successful}/{len(images)} successful")
    print(f"Original: {total_original:.1f}KB ({total_original/1024:.1f}MB)")
    print(f"Final: {total_final:.1f}KB ({total_final/1024:.1f}MB)")
    savings = total_original - total_final
    print(f"Saved: {savings:.1f}KB ({savings/1024:.1f}MB, {savings/total_original*100:.1f}%)")
    print()
    print("Backup files (.backup) created for safety. Delete when satisfied.")


if __name__ == "__main__":
    main()
