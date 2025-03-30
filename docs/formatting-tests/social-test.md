# Social Tests

## Testing Your Social Media Previews

There are many sites that will check for meta information in your
HTML file.  The prefix `og` is for the [Open Graph] standard.

[Metatags.io](https://metatags.io/)

[Open Graph](https://www.opengraph.xyz/)

[Social Share Preview](https://socialsharepreview.com/)

## Open Graph Metadata

These elements must be in the html/head section of your document.

```html

<meta  property="og:type"  content="website" >
      
<meta  property="og:title"  content="Social Image Preview Override From Markdown Metadata v18 - Mkdocs Material Social Card Testing" >

<meta  property="og:description"  content="A custom description for this page." >

<meta  property="og:image"  content="https://dmccreary.github.io/mkdocs-material-social/assets/images/social/metadata-override-test.png" >

<meta  property="og:image:type"  content="image/png" >

<meta  property="og:image:width"  content="1200" >

<meta  property="og:image:height"  content="630" >

<meta  property="og:url"  content="https://dmccreary.github.io/mkdocs-material-social/metadata-override-test/" >

<meta  name="twitter:card"  content="summary_large_image" >

<meta  name="twitter:title"  content="Social Image Preview Override From Markdown Metadata v18 - Mkdocs Material Social Card Testing" >

<meta  name="twitter:description"  content="A custom description for this page." >

<meta  name="twitter:image"  content="https://dmccreary.github.io/mkdocs-material-social/assets/images/social/metadata-override-test.png" >
```