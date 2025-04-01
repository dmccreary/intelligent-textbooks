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

