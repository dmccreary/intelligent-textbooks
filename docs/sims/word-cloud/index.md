# Word Cloud MicroSim

[Run the WordCloud MicroSim](./word-cloud.html){ .md-button .md-button--primary }

## Adding Glossary Links

We can add links from each word to the [Glossary of Terms](../../glossary.md#glossary)

First, we need to turn off the link decorations in the CSS:

```css
body {
    font-family: Arial, Helvetica, sans-serif;
}
#wordcloud {
    width: 100%;
    height: 600px;
    border: 1px solid #ddd;
}
#wordcloud a {
    text-decoration: none;
    color: inherit;
}
```

Next, we add a JavaScript function to convert the links into a lower-case
string with dashes used to replace spaces.

```javascript
const wordList = wordData.map(([label, weight]) => {
    return [
        label,
        weight,
        () => window.location.href = `../../glossary#${label.replace(/\s+/g, '-').toLowerCase()}`
    ];
});
```