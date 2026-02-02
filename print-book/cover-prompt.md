# Book Cover Image Generation Prompt

## Technical Specifications

- **Dimensions:** 2560 × 1600 pixels (height × width)
- **Aspect Ratio:** 1.6:1
- **Color Space:** RGB
- **Format:** JPEG or PNG
- **Compliance:** Amazon KDP ePub cover requirements

## Prompt

```
Professional book cover design, portrait orientation 1.6:1 aspect ratio.

CENTER: Title "BUILDING INTELLIGENT TEXTBOOKS WITH AI" in bold, clean sans-serif typography (white or cream text with subtle shadow for legibility). Subtitle below in smaller text: "A Practical Guide to AI-Powered Learning Experiences". Author name "Dan McCreary" at bottom in elegant lighter weight font.

SURROUNDING MONTAGE arranged as a balanced frame around the centered title:

TOP LEFT QUADRANT: A glowing learning graph visualization - interconnected nodes in blues and teals connected by directional arrows, some nodes highlighted in green and gold, representing concept dependencies

TOP RIGHT QUADRANT: An ascending 5-step staircase diagram, each step a different gradient color (blue to purple to gold), with small icons on each step suggesting increasing capability levels

LEFT SIDE: A tablet screen displaying an interactive simulation - a bouncing ball with trajectory arc, sliders and play button visible, representing MicroSims

RIGHT SIDE: A stylized AI chatbot conversation interface with speech bubbles and a friendly robot icon, representing Level 4 AI tutoring

BOTTOM LEFT: Bloom's taxonomy pyramid with six colorful horizontal layers, educational hierarchy visualization

BOTTOM RIGHT: An upward-curving exponential growth line chart glowing in gold, representing AI capability growth over time

BACKGROUND: Rich deep navy blue gradient transitioning to dark purple at edges. Subtle geometric hexagonal pattern suggesting neural networks and digital connectivity. Soft ambient glow radiating from behind the title text.

STYLE: Modern, professional educational technology aesthetic. Clean flat design with subtle gradients and soft drop shadows. Color palette: deep blues, teals, purples, with gold and white accents. High contrast ensuring thumbnail readability. No photorealistic people. Polished, authoritative, contemporary.
```

## Tool-Specific Parameters

| Tool | Additional Parameters |
|------|----------------------|
| Midjourney | `--ar 5:8 --v 6.1 --style raw` |
| DALL-E 3 | Specify "2560x1600 pixels" in prompt |
| Stable Diffusion | Use 1280x800 then upscale 2x |
| Ideogram | Select "Book Cover" template, 5:8 ratio |

## Notes

- Most AI image generators struggle with accurate text rendering. Generate the montage background without text, then add typography in Canva, Photoshop, or similar.
- Test thumbnail legibility at 80x128 pixels (Amazon search results size).
- Ensure title is readable against the background in all lighting conditions.
