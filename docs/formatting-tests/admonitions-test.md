# Admonitions Test

MkDocs Material extends Markdown with admonitions for highlighted content. These require the `admonition` and `pymdownx.details` extensions.

```markdown
!!! prompt
    Prompt text can be copied into the paste buffer
    by selecting the "Copy" button in the upper right
    corner of the admonition.

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

!!! prompt
    Prompt text can be copied into the paste buffer
    by selecting the "Copy" button in the upper right
    corner of the admonition.

!!! note "Optional explicit title"
    This is a note admonition.

!!! tip
    This is a tip.

!!! warning
    This is a warning.

!!! danger
    This highlights dangerous actions.

??? question "Question Collapsible admonition (closed by default)"
    This question admonition is collapsible and closed by default.

???+ example "Collapsible admonition (open by default)"
    This admonition is collapsible and open by default.