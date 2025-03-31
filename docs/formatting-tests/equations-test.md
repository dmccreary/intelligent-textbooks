# Formatting LaTeX Equations Tests

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