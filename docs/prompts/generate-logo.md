# Generate a Logo and Favicon

In this section we will walk through the steps to create
a logo for the book and use this logo as the
[favicon](../glossary.md#favicon) for
the website.

## Prompt

```linenums="0"
Please generate a minimalistic image of a orange book with the
lowercase letter "i" on it.  Use blue for the background.
```

## Response

![](../img/logo-512x512.png)


## Adding Logo to the Mkdocs.yml

```yml
theme:
  name: material
  extra_css:
    - styles/custom.css
  logo: img/logo.png
  favicon: img/favicon.ico
```

## Generating Additional Favicon Files

I use a website called favicon.io which has a free tool called Favicon Converter.

[https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/)

I just drag the logo to that site and click the "download" button.

This will generate a zip file with different sizes
of the icons for the book in both png and icon formats.

- android-chrome-192x192.png
- android-chrome-512x512.png
- apple-touch-icon.png
- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- site.webmanifest

We only need a single file called favicon.ico.  Place this file in the docs/img directory.

The other files can also be copied with the exception of the site.webmanifest file.
I often rename them using the logo-Widthxheight.png format.

So for example, the ```apple-touch-icon.png``` file
is renamed ```logo-180x180.png```.

I typically rename the android-chrome-192x192.png to be site-logo-192x192.png.

## CSS for the Logo in the Upper Left

```css
.md-header__button.md-logo {
    margin: 0;
    padding: 0;
}
.md-header__button.md-logo img, .md-header__button.md-logo svg {
    height: 50px;
    width: 50px;
}
```