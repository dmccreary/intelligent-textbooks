# The Open Graph Metadata Standard

I'll help you understand Open Graph metadata standards for your intelligent textbooks built with mkdocs-material. This will enhance how your content appears when shared on social media platforms.

## Open Graph Protocol Standards

Open Graph is a protocol that enables any web page to become a rich object in a social graph. Originally created by Facebook in 2010, it's now widely used across many platforms including Twitter, LinkedIn, and Pinterest.

The Open Graph protocol uses meta tags in the HTML `<head>` section of your website to define how your content should be represented when shared on social media. Here are the core Open Graph tags:

### Basic Open Graph Tags

- `og:title` - The title of your page/article
- `og:type` - The type of content (e.g., website, article, book)
- `og:image` - The URL of an image to represent your content
- `og:url` - The canonical URL of your page
- `og:description` - A brief description of your content
- `og:site_name` - The name of your overall site

## Default Social Usage

You can just add the social plugin

```yml
plugins:
    - social
```

### Implementation in mkdocs-material

To add a custom Open Graph tags to your mkdocs-material site
you'll need to create a custom template. Here's how:

1. Create a directory called `overrides` in your project root
2. Create a file `overrides/main.html` with this content:

```html
{% extends "base.html" %}

{% block extrahead %}
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ page.canonical_url }}">
  <meta property="og:title" content="{{ page.title }} - {{ config.site_name }}">
  <meta property="og:description" content="{{ page.meta.description or config.site_description }}">
  <meta property="og:image" content="{{ config.site_url }}img/social-preview.png">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{{ page.canonical_url }}">
  <meta property="twitter:title" content="{{ page.title }} - {{ config.site_name }}">
  <meta property="twitter:description" content="{{ page.meta.description or config.site_description }}">
  <meta property="twitter:image" content="{{ config.site_url }}img/social-preview.png">
{% endblock %}
```

3. Update your `mkdocs.yml` to use your custom template:

```yaml
theme:
  name: material
  custom_dir: overrides
```

### Page-specific Metadata

For page-specific descriptions, you can add front matter to each markdown file:

```markdown
---
description: A detailed explanation of how to integrate MicroSims in your intelligent textbook.
---

# Your Page Title
```

### Best Practices for Open Graph Tags

1. **Image Dimensions**: Use images that are at least 1200×630 pixels for optimal display
2. **Description Length**: Keep descriptions between 70-200 characters
3. **Unique Images**: Create unique images for important pages
4. **Testing**: Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [Twitter Card Validator](https://cards-dev.twitter.com/validator) to test your tags

### Example for a MicroSim Page

For a MicroSim page, you might use:

```markdown
---
title: Sine Wave Visualization MicroSim
description: Interactive simulation demonstrating sine wave properties with adjustable frequency and amplitude parameters.
image: /img/sims/sine-wave-preview.png
---

# Sine Wave MicroSim
```

!!! note
    The metadata block that begins and ends with three dashes MUST be the first lines in the markdown file.

And in your custom template, you'd add:

```html
<meta property="og:image" content="{{ page.meta.image or config.site_url }}img/social-preview.png">
```

This approach ensures your intelligent textbooks and MicroSims will have rich previews when shared on social platforms, increasing engagement with your educational content.

Would you like more specific guidance on implementing this within your existing intelligent textbook framework?