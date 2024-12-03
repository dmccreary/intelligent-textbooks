# Using the MD-in-HTML Markdown Extension

Here is an elegant solution to the multiple-choice numbering problem.

By default, Markdown parser ignores any content within a raw HTML block-level element. So when you normally wrap a
markdown list in a div for styling, the Markdown parser just
skips over all the markdown within the div block.

However, with the ```md-in-html``` extension enabled, the content of a raw HTML block-level element is always parsed as Markdown.
You can turn this on by including a ```markdown``` attribute on the opening tag. The markdown attribute will be stripped from the output, while all other attributes will be preserved.

After you enable the ```md-in-html``` extension, you can add
Markdown text inside an HTML element like ```div``.
You can then add a class to that div and modify
the CSS to change the formatting just within that
block of Markup.  This is exactly what we want
for numbering our question responses with uppercase letters.

Here are the three simple steps:

## Step 1: Modify your mkdocs.yml

You need to add the ```md_in_html``` markup extension and
also make sure you add an ```extra.css``` file.

```yaml
markdown_extensions:
  - md_in_html
extra_css:
  - css/extra.css
```

## Step 2: Add A CSS Rule to extra.css

Now go create or edit the ```docs/css/extra.css``` file
and add the following rule:

```css
.upper-alpha ol {
  list-style-type: upper-alpha;
}
```

This rule says "If you have a ordered list within
any element that is in the class ```upper-alpha```
the apply the rule ```list-style-type: upper-alpha```.

This will change the lits items to use A. B. C. D. etc. instead
of 1. 2. 3. 4.

## Step 3: Add Div to the Question Responses

```html
<div class="upper-alpha" markdown>
1. First item
2. Second item
3. Third item
4. Fourth item
</div>
```

The result is perfect!

<div class="upper-alpha" markdown>
1. First item
2. Second item
3. Third item
4. Fourth item
</div>

## References

[Python Markdown Extensions md_in_html](https://python-markdown.github.io/extensions/md_in_html/)