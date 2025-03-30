# Adding Social Link Previews

## Why Social Headers

**Pros** - allows students and learning participants to see a preview
of the site they will goto when they click on a link.  This dramatically increases click-through rates.

**Cons** - requires an image card be created for each page on your website.  As your sites get larger, these images can take up disk space.  Publishing your site also takes longer.

## Modifying Your mkdocs.yml

```yml
plugins:
  - social
```

## How It Works

For each of your Markdown pages, the mkdocs-material build system
creates an image.  THis image is linked in the HTML header as
a 

The Cache:

![](../img/cache-vscode-screen-image.png)

## 

## Testing Your Social Media Previews

There are many sites that will check for meta information in your
HTML file. 

[Metatags.io](https://metatags.io/)

[Open Graph](https://www.opengraph.xyz/)

[Social Share Preview](https://socialsharepreview.com/)

## Override Test

[Claud Override Trials and Final Plugin](https://claude.ai/share/c7a44a8b-3f78-4e6f-9b79-f43c1056bf17)