# Markdown Tutorial

<!--
Although mature XML-based book standards such as [DocBook](https://docbook.org/) have robust consistency for interoperability between publishing systems, Markdown has no official standards.  Each project has its own way of creating and extending Markdown for their own purposes and different build tools frequently only support whatever standards they like.  As a result, there is very little consistency between Markdown systems.  Markdown standards are also frequently 

## Headers

## Lists

### Unnumbered Lists

### Numbered Lists

## Images

## Links

## Admonitions

## Code

## Equations

-->

# Markdown Tutorial

Although mature XML-based book standards such as [DocBook](https://docbook.org/) have robust consistency for interoperability between publishing systems, Markdown has no official standards. Each project has its own way of creating and extending Markdown for their own purposes and different build tools frequently only support whatever standards they like. As a result, there is very little consistency between Markdown systems. Markdown standards are also frequently extended by different projects to support their specific needs.

## Headers

Headers in Markdown are created using the hash symbol (#). The number of hash symbols indicates the level of the header.

```markdown
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

## Lists

Markdown supports both unnumbered (bullet) lists and numbered (ordered) lists.

### Unnumbered Lists

Unnumbered lists can be created using asterisks (*), plus signs (+), or hyphens (-).

```markdown
* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
* Item 3

- Alternative item 1
- Alternative item 2

+ Another alternative item 1
+ Another alternative item 2
```

### Numbered Lists

Numbered lists are created using numbers followed by periods.

```markdown
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
```

Note: The actual numbers don't matter in Markdown source - they will be automatically numbered in the rendered output.

```markdown
1. First item
1. Second item
1. Third item
```

This will still render as 1, 2, 3.

## Images

Images can be inserted with an exclamation mark, followed by alt text in brackets, and the image URL in parentheses.

```markdown
![Alt text for the image](path/to/image.jpg)

![Logo of our project](img/logo.png "Optional title")
```

For more control, MkDocs Material supports additional attributes:

```markdown
![Image with attributes](image.jpg){: width="300px" align="right" }
```

## Links

Links are created using square brackets for the link text followed by the URL in parentheses.

```markdown
[Link text](https://example.com)

[Link with title](https://example.com "Title text shown on hover")

[Reference-style link][reference id]

[reference id]: https://example.com "Optional title"
```

For internal links in MkDocs:

```markdown
[Link to another page](../folder/page.md)

[Link to a section on the same page](#section-id)
```

## Admonitions

MkDocs Material extends Markdown with admonitions for highlighted content. These require the `admonition` and `pymdownx.details` extensions.

```markdown
!!! note "Optional explicit title"
    This is a note admonition.

!!! tip
    This is a tip.

!!! warning
    This is a warning.

!!! danger
    This highlights dangerous actions.

??? question "Collapsible admonition (closed by default)"
    This admonition is collapsible and closed by default.

???+ example "Collapsible admonition (open by default)"
    This admonition is collapsible and open by default.
```

## Code

Inline code is wrapped with backticks.

```markdown
Use the `print()` function in Python.
```

Code blocks use triple backticks, optionally followed by the language name for syntax highlighting.

```markdown
```python
def hello_world():
    print("Hello, world!")
```
```

MkDocs Material also supports line numbers and highlighting specific lines:

```markdown
```python linenums="1" hl_lines="2 3"
def hello_world():
    # This line is highlighted
    print("Hello, world!")
    return True
```
```

## Equations

MkDocs Material supports math equations using MathJax when the appropriate extensions are enabled.

Inline math equations:

```markdown
The formula for the area of a circle is $A = \pi r^2$.
```

Block equations:

```markdown
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

For more complex equations with multi-line alignment:

```markdown
$$
\begin{align}
x &= y + z \\
  &= a + b
\end{align}
$$
```