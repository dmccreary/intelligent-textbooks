# Hiding Content

You can add `metadata` to the very top of your index.md file to
hide specific elements of any page.

```
---
hide:
  - title          # Hide the page title
  - navigation     # Hide the navigation sidebar
  - toc           # Hide the table of contents
  - footer        # Hide the footer
  - tags          # Hide tags (if using tags plugin)
---
```

I have found that the hide of title does not work.  To
get around this bug I use the following CSS:

```html
<style>
.md-content__inner h1 {display: none !important;}
</style>
```

Note you want to restrict the h1 `display:none` to only the markdown content inner class.