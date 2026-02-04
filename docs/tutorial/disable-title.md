# How to Disable a Title

In the ideal world we could just add a metadata element to hide the title.

The following would be used to disable the title:

```markdown
---
hide:
    title
---
```

However, this does not work.  So we need to add an inline CSS element into our markdown:

```html
<style>
.md-content__inner h1 {display: none !important;}
</style>
```

