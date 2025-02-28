# Feature Mapping

## Sample Prompt

!!! prompt
    I have an new online textbook I would like to create with the mkdocs website build tool.  I am also using the material theme.

    Can you tell me what features I should use to do the following functions?

    If you find a function, please provide a sample of how the mkdocs.yml file would be configured to use this function.

    Here are the functions I would like to have in my online textbook:

    - Powerful and easy to use Search
    - Site Navigation
    - MicroSims - adding interactive simulations to any page using p5.js or iframes
    - Glossary of Terms
    - Table of Contents
    - Link CHecker
    - Social Media Previews
    - Rendering Formulas
    - Code Highlighting
    - License Management with a link to the license in the footer of each page
    - Site Analytics with Google Analytics

## Response

Certainly! Below is a detailed guide on how to implement each of the functions you've listed 
in your MkDocs project using the Material theme. I've included sample `mkdocs.yml` configurations and explanations for each feature.

### **1. Powerful and Easy-to-Use Search**

**Feature:** Enhanced search functionality with search term highlighting and suggestions.

**Configuration:**

```yaml
theme:
  name: material
  features:
    - search.highlight   # Highlights search terms in the results
    - search.suggest     # Provides search suggestions as you type

extra:
  search:
    language: 'en'       # Specify language for better search indexing
```

**Explanation:**

-   The Material theme enhances the default MkDocs search using Lunr.js.
-   Enabling `search.highlight` and `search.suggest` improves the user experience.
-   Setting the search language optimizes indexing and results for your audience.

* * * *

### **2. Site Navigation**

**Feature:** Organized navigation structure for easy content access.

**Configuration:**

```yaml
nav:
  - Home: index.md
  - Introduction: introduction.md
  - Chapters:
      - Chapter 1: chapters/chapter1.md
      - Chapter 2: chapters/chapter2.md
  - Glossary: glossary.md
```

**Explanation:**

-   The `nav` section defines the structure of your site's navigation menu.
-   Organize content hierarchically for intuitive access.
-   Group related pages under nested sections.

* * * *

### **3. MicroSims - Interactive Simulations with p5.js or iframes**

**Feature:** Embed interactive simulations directly into your pages.

**Configuration:**

*No specific `mkdocs.yml` configuration is required for this feature.*

**Markdown Usage:**

```html
<iframe src="path/to/your/sketch.html" width="600" height="400"></iframe>
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
<script>
  // Your p5.js code here
</script>
```

**Explanation:**

-   MkDocs allows raw HTML in Markdown files by default.
-   You can embed simulations using `<iframe>` or include scripts directly.
-   Ensure that security settings allow embedding scripts if including JavaScript directly.

* * * *

### **4. Glossary of Terms**

**Feature:** Define terms and provide tooltips or a dedicated glossary page.

**Configuration:**

```yaml
markdown_extensions:
  - abbr                # Supports abbreviations with tooltips
```

**Markdown Usage:**

```markdown
The HTML specification is maintained by the W3C.

*[HTML]: HyperText Markup Language
*[W3C]: World Wide Web Consortium
```

**Explanation:**

-  The `abbr` extension enables abbreviation definitions with hover-over tooltips.
-  Alternatively, create a `glossary.md` page and link terms to it.

* * * *

### **5. Table of Contents**

**Feature:** Automatically generated table of contents for each page.

**Configuration:**

```yaml
theme:
  name: material
  features:
    - toc.integrate      # Integrates TOC into the page content

markdown_extensions:
  - toc:
      permalink: true    # Adds permalinks to headings
```

**Explanation:**

-   The `toc.integrate` feature embeds the table of contents within the page.
-   The `toc` extension generates the TOC based on headings in your Markdown files.

* * * *

### **6. Link Checker**

**Feature:** Automatically check for broken internal and external links.

**Configuration:**

```yaml
plugins:
  - search
  - link-checker:
      timeout: 5
      retries: 2
      crawl: false       # Set to true to check external links
```

**Explanation:**

-   The `link-checker` plugin scans your site for broken links during the build process.
-   Configure `crawl` to `true` if you want to check external links as well.
-   Adjust `timeout` and `retries` as needed.

* * * *

### **7. Social Media Previews**

**Feature:** Generate rich previews when your site is shared on social media platforms.

**Configuration:**

```yaml
extra:
  social:
    image: images/social_preview.png    # Path to your preview image
    description: "An engaging description of your textbook."

plugins:
  - meta
```

**Markdown Usage (at the top of each page if needed):**

```markdown
---
title: "Page Title"
description: "Page-specific description for social media."
image: "images/page_specific_preview.png"
---
```

**Explanation:**

-   Set global social media preview settings under `extra`.
-   Use the `meta` plugin to allow per-page metadata overrides.
-   Ensure your preview images meet the recommended dimensions for social platforms (e.g., 1200x630 pixels for Facebook).

* * * *

### **8. Rendering Formulas**

**Feature:** Display mathematical formulas using KaTeX.

**Configuration:**

```yaml
markdown_extensions:
  - pymdownx.arithmatex:
      inline_syntax: ['$', '$$']   # Define inline and block delimiters
      generic: true

extra_javascript:
  - https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js
  - https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js

extra_css:
  - https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css
```

**Explanation:**

-   The `pymdownx.arithmatex` extension enables LaTeX-style math rendering.
-   Include KaTeX scripts and stylesheets via `extra_javascript` and `extra_css`.
-   Use `$...$` for inline math and `$$...$$` for display math in your Markdown files.

* * * *

### **9. Code Highlighting**

**Feature:** Syntax highlighting for code blocks.

**Configuration:**

```yaml
markdown_extensions:
  - pymdownx.superfences   # Enhanced code block handling

theme:
  name: material
  codehilite:
    guess_lang: false
    linenums: true         # Adds line numbers to code blocks
```

**Explanation:**

-   The `pymdownx.superfences` extension provides advanced code block features.

-   Set `linenums` to `true` to display line numbers.

-   Specify the language in code blocks for accurate syntax highlighting:

```markdown


```python
def hello_world():
    print("Hello, world!")

```

```

* * * *

### **10. License Management with Footer Link**

**Feature:** Display a license notice with a link in the footer of each page.

**Configuration:**

```yaml
extra:
  legal:
    license:
      name: 'Creative Commons Attribution-NonCommercial 4.0 International License'
      url: 'https://creativecommons.org/licenses/by-nc/4.0/'
```

**Explanation:**

-   Use the `extra` configuration to add custom data.
-   The Material theme can be customized to display this information in the footer.
-   You may need to create or modify a custom footer template to include the license link.

**Custom Footer Template (Optional):**

Create a file named `partials/footer.html` in your `overrides` directory with the following content:

```html
{% if config.extra.legal.license %}
  <div class="md-footer-legal">
    <a href="{{ config.extra.legal.license.url }}">{{ config.extra.legal.license.name }}</a>
  </div>
{% endif %}
```

And update your `mkdocs.yml`:

```yaml
theme:
  name: material
  custom_dir: overrides   # Point to your overrides directory
```

* * * *

### **11. Site Analytics with Google Analytics**

**Feature:** Track site usage with Google Analytics.

**Configuration (for GA4):**

```yaml
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX   # Replace with your GA4 Measurement ID
```

**Explanation:**

-   The Material theme supports Google Analytics 4 (GA4) natively.
-   Set the `provider` to `google` and provide your `property` ID.
-   This injects the necessary tracking code into your site's pages.

* * * *

**Additional Notes:**

-   **Plugins:** Ensure all plugins used are installed via `pip`. For example:

```bash
pip install mkdocs-material pymdown-extensions mkdocs-link-checker
```

-  **Security:** Be cautious when embedding scripts or iframes. Ensure they come from trusted sources to maintain site security.

-  **Documentation:** Refer to the MkDocs Material documentation for more details and advanced configurations.

* * * *

By configuring your `mkdocs.yml` file as shown and utilizing the provided Markdown syntax, you should be able to implement all the desired features in your online textbook. Let me know if you need further assistance with any of these steps!