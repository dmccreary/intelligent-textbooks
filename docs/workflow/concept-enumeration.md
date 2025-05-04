# Generating Concepts

In this step, we create a precise inventory of all key concepts students must master. This comprehensive list ensures no important topic is overlooked.

Current language models such as ChatGPT o1 and Anthropic Claude 3.7 seem to do well when
we request about 250 concepts per course.  We can request more concepts when their
is plenty of existing knowledge about a course.  For example a [High School Geometry Course](https://dmccreary.github.io/geometry-course/) is well represented in training data for large-language models.
However, a new course on a new topic such as the ISO GQL language standards has few online courses.

## Sample Prompt

!!! prompt
    You are an expert at generating high-quality concept labels used in a knowledge graph for online training courses.

    For the attached course description (or course-description.md in the project knowledge) that has been enhanced with the 2001 Bloom Taxonomy, please generate a numbered list of the 250 key concepts in this course.  Use a single line per concept.

    Each key concept should be formatted as a short concept label using title case format.
    Use acronyms and abbreviations only when the concept label becomes too long.

    Return the concept label list in the approximate order that they should be taught.

