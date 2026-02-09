# Iframe Guidelines for Portable MicroSims

## Design Philosophy

Our primary goal is to make every MicroSim **portable**.
A well-designed MicroSim should be embeddable in any
webpage -- an MkDocs textbook, a WordPress blog, a Google
Sites page, a Canvas or Moodle LMS, or a plain HTML file --
with a single, minimal iframe element.

The ideal embed code that a teacher or author copies
looks like this:

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"></iframe>
```

Two attributes.  One line.  No classes, no inline styles,
no JavaScript.  If the MicroSim requires anything more
than `src`, `width`, and `height` to function correctly,
we consider that a design problem to fix in the MicroSim
itself or in the host site's stylesheet -- not in the
embed code.

## Iframe Attributes Reference

The HTML `<iframe>` element supports many attributes.
Below is a guide to each one and how we use it in the
intelligent textbook project.

### `src` -- Source URL (Required)

The `src` attribute is the URL of the MicroSim's HTML page.
This is the only attribute that is truly required.

**Within the same textbook site**, use a relative path:

```html
<iframe src="./main.html" width="100%" height="480px"></iframe>
```

**For embedding in an external site**, use the full GitHub
Pages URL for the textbook that hosts the MicroSim:

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"></iframe>
```

The `src` always points back to the GitHub Pages site of the
intelligent textbook that owns the MicroSim.  This means:

- The MicroSim is hosted for free on GitHub Pages.
- Updates to the MicroSim are automatically reflected
  everywhere it is embedded.
- There is no need to copy JavaScript files into the
  destination site.
- The MicroSim continues to work even if the destination
  site has no build system or server-side processing.

### `width` -- Frame Width (Recommended)

Sets the horizontal size of the iframe.

We strongly recommend `width="100%"` so the iframe fills the
width of whatever container it is placed in.  This makes the
MicroSim responsive -- it adapts to narrow mobile screens and
wide desktop layouts without any additional CSS.

```html
<iframe src="./main.html" width="100%" height="480px"></iframe>
```

Fixed pixel widths like `width="620px"` should be avoided
in new MicroSims.  They cause horizontal scrollbars on
small screens and leave wasted space on large screens.

!!! note "p5.js Canvas Sizing"
    Our p5.js MicroSims call `updateCanvasSize()` as the first
    step in `setup()` to read the container width and size the
    canvas to fill it.  This is what makes `width="100%"` work
    correctly -- the canvas adapts to whatever width the iframe
    receives from the host page.

### `height` -- Frame Height (Recommended)

Sets the vertical size of the iframe in pixels.

Unlike width, height **must** be set to a fixed pixel value
because iframes cannot auto-size to their content height.
Choose a height that fits the MicroSim's canvas plus its
control area without clipping or leaving excess space.

Common heights in our project:

| MicroSim Type | Typical Height |
|---|---|
| Simple chart or diagram | 450-520px |
| Standard simulation with controls | 550-650px |
| Complex simulation with many controls | 650-750px |

```html
<iframe src="./main.html" width="100%" height="650px"></iframe>
```

### `scrolling` -- Scroll Bars (Optional)

Controls whether scrollbars appear inside the iframe.

```html
<iframe src="./main.html" width="100%" height="650px"
    scrolling="no"></iframe>
```

Setting `scrolling="no"` prevents scrollbars from appearing
when the MicroSim content is slightly larger than the frame.
This keeps the visual appearance clean.

However, this attribute is **deprecated in HTML5**.  The modern
equivalent is the CSS rule `overflow: hidden` applied via the
host site's stylesheet or an inline style.  For maximum
compatibility across older and newer browsers, you may see
both used together in our existing MicroSims.

For the simplest possible embed code, this attribute can be
omitted.  If scrollbars occasionally appear, the host site
can suppress them with CSS.

### `style` -- Inline Styles (Optional, for Advanced Users)

The `style` attribute allows advanced users to add CSS
rules directly to the iframe element.  This is useful when
embedding a MicroSim in a site where you cannot control the
site-wide stylesheet.

Common inline styles:

```html
<!-- Remove the default browser border -->
<iframe src="./main.html" width="100%" height="650px"
    style="border: none;"></iframe>

<!-- Add a custom border -->
<iframe src="./main.html" width="100%" height="650px"
    style="border: 2px solid blue;"></iframe>

<!-- Hide overflow to suppress scrollbars (modern replacement for scrolling="no") -->
<iframe src="./main.html" width="100%" height="650px"
    style="overflow: hidden;"></iframe>

<!-- Combine multiple rules -->
<iframe src="./main.html" width="100%" height="650px"
    style="border: 2px solid blue; overflow: hidden;"></iframe>
```

The key point: inline styles are an escape hatch for sites
where you have no control over CSS.  In our own intelligent
textbooks, we handle all of this in the site-wide `extra.css`
so the iframe tag itself stays clean.

### `title` -- Accessible Name (Optional)

Provides a text description of the iframe content for screen
readers and other assistive technologies.  This is good
practice for accessibility but is not required for the
MicroSim to function.

```html
<iframe src="./main.html" width="100%" height="650px"
    title="Interactive sine wave simulation with frequency and amplitude controls">
</iframe>
```

### `tabindex` -- Keyboard Navigation (Optional)

Controls whether the iframe receives focus during keyboard
Tab navigation.  Setting `tabindex="-1"` prevents the
iframe from being a Tab stop, so keyboard users can skip
past it without getting trapped.

```html
<iframe src="./main.html" width="100%" height="650px"
    tabindex="-1"></iframe>
```

This is an accessibility enhancement.  It is not needed in
the minimal embed code.

### `frameborder` -- Legacy Border (Deprecated)

The `frameborder` attribute is deprecated in HTML5.
Use the CSS `border` property instead (via inline style
or a site-wide stylesheet).

```html
<!-- Avoid this (deprecated) -->
<iframe src="./main.html" frameborder="0"></iframe>

<!-- Use this instead -->
<iframe src="./main.html" style="border: none;"></iframe>
```

### `allow` and `sandbox` -- Security Policies (Rarely Needed)

These attributes restrict what the iframe content can do.
They are useful when embedding untrusted third-party content
but are generally **not needed** for our MicroSims because
the content is hosted on our own GitHub Pages sites.

If a MicroSim needs access to a specific browser API
(for example, the microphone for a sound visualization),
the `allow` attribute can grant it:

```html
<iframe src="./main.html" width="100%" height="650px"
    allow="microphone"></iframe>
```

## Site-Wide CSS for Iframes

Rather than adding attributes to every iframe, our
intelligent textbooks use a site-wide `extra.css` file
to give all iframes consistent behavior.  This means the
iframe tag can stay minimal while the host site controls
the presentation.

### Our Standard CSS Rules

```css
/* Container to control the iframe size and scaling */
.iframe-container {
    width: 100%;
    position: relative;
    overflow: hidden;
}

/* Iframe styles applied to ALL iframes on the site */
iframe {
    width: 100%;
    border: solid 2px blue;
}
```

These two rules establish two important defaults:

1. **`width: 100%`** -- every iframe fills the width of its
   container, making the layout responsive.  Even if an
   author writes `width="620px"` on the iframe element, the
   CSS rule overrides it to fill the container.  This means
   older MicroSims with fixed widths automatically become
   responsive when viewed on the site.

2. **`border: solid 2px blue`** -- every iframe gets a uniform
   2-pixel blue border.  This serves three purposes:
    - It provides a consistent visual identity across all
      MicroSims in the textbook.
    - It signals to the reader that the bordered area is an
      interactive element, distinct from static images.
    - It clearly delineates the iframe boundary so readers
      know where the MicroSim begins and ends.

### Why the Border Matters

A visible border is a deliberate design choice.  Without it,
a MicroSim with a white background blends into the page and
the reader cannot tell where the chapter content ends and the
interactive simulation begins.  The blue border matches the
site's primary color and provides a subtle but clear boundary.

On external sites that do not have this CSS rule, the browser
applies its default iframe border (typically a 2px inset grey
border).  An advanced user embedding the MicroSim can override
this with an inline style if they want a different appearance:

```html
<!-- Use the MicroSim on an external site with a custom border -->
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"
    style="border: 1px solid #ccc;"></iframe>

<!-- Or remove the border entirely -->
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"
    style="border: none;"></iframe>
```

### Scroll Hijacking Prevention

Our site-wide CSS and JavaScript also prevent
[scroll hijacking](./scroll-hijacking.md) by disabling
`pointer-events` on all iframes until the reader clicks
to interact.  See the
[Scroll Hijacking and MicroSim Iframes](./scroll-hijacking.md)
guide for the full implementation.

## The Two-Line Embed Pattern

Putting it all together, the embed code that a teacher
copies from a MicroSim page should look like this:

**Minimal (works everywhere):**

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"></iframe>
```

**With accessibility enhancements:**

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"
    title="Interactive sine wave simulation"></iframe>
```

**With advanced styling for an external site:**

```html
<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/sine-wave/main.html"
    width="100%" height="480px"
    title="Interactive sine wave simulation"
    style="border: 2px solid blue; overflow: hidden;"></iframe>
```

The progression from minimal to advanced is additive.
Each level adds one optional attribute.  The MicroSim
works correctly at every level because all critical
behavior is built into the simulation itself and the
host site's stylesheet.

## Summary

| Attribute | Required | Our Default | Purpose |
|---|---|---|---|
| `src` | Yes | -- | URL of the MicroSim HTML page |
| `width` | Recommended | `100%` (via CSS) | Responsive width |
| `height` | Recommended | -- | Fixed pixel height for the simulation |
| `scrolling` | No | -- | Suppress scrollbars (deprecated in HTML5) |
| `style` | No | -- | Inline CSS for external sites |
| `title` | No | -- | Accessible name for screen readers |
| `tabindex` | No | -- | Keyboard navigation control |
| `frameborder` | No | -- | Deprecated; use CSS `border` instead |
| `allow` | No | -- | Browser API permissions |
| `sandbox` | No | -- | Security restrictions |

The guiding principle: **keep the iframe simple**.  Handle
presentation and behavior in the site's CSS and JavaScript.
The fewer attributes on the iframe, the easier it is for
anyone to embed a MicroSim anywhere.
