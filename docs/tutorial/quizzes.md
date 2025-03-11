# Quizes

Generative AI tools are very good at creating quizzes to help students assess their own knowledge of a concept.
But how should these questions be stored within a mkdocs-material website.  Here are some options.

## Enable Uppercase Alpha Lists

By default, Markdown ordered lists only produce lists with integer numbers.
However, many mulitple choice answers use uppercase alpha formats.
To enable this feature we need to do two things:

1. Enable the markdown within HTML option
2. Add a CSS rule to turn on uppercase alpha lists

## Step 1: Enable the Markdown In HTML

Normally when you place HTML in your Markdown, the parser will just
skip over the entire block of HTML.  However, if you enable the `md_in_html`
extension the parser will look inside all HTML blocks for markdown to process.

You must modify your `mkdocs.yml` file to add the `md_in_html` extension
like in the following example.

```yml
markdown_extensions:
  - md_in_html 
```

## Step 2: Wrap Your Quiz Questions in an HTML div


