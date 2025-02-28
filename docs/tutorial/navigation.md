# Navigation

Modern displays tend to be very wide.

![](../img/wide-screen.png)

The one in the image above is over 5120 pixels wide and 1440 pixels high.

For this reason, we place our navigation links on the left of the main display.
We discourage our users from using top navigation such as tabs.

The typical structure of our books is the following

- **Chapters** contain content with animations imbedded using Javascript or iframes
- **Prompts** contain sample prompts that you give to large-langauge models to generate customized content
- **Sims** contain [MicroSims](../glossary.md#microsim) and other standalone animation programs
- **Tutorial** contains content for step by step processes for specific tasks

In addition, we suggest some of the following descrete makrdown files:

- **License** - tells the user what rules govern the reuse of this content
- **About** - gives a high-level overview about the book, the learning objectives of the book, the intended audience and the background of the authors
- **Course Description** - contains a set of one or more typical single-page descriptions of this course as it might appear in a course catalog
- **Glossary** - contains a set of level 4 markdown headers each with a term and a definition.  These terms are designed to be easy to link from any page using
the automatic complete of editors such as Visual Studio Code with the markdown plugin.
- **References** - links to other web sites or papers
- **How We Built This Site** - give an overview of the software and tools used
to generate the website from markdown
- **Contact** - how to reach the authors or support community.  Note
that many books use the GitHub pages to track feature requests and to
report bugs.

## Sample Nav Configuration

```yaml
nav:
  - Home: index.md
  - About: about.md
  - Tutorial:
    - Introduction: tutorial/index.md
    - Getting Started: tutorial/getting-started.md
    - Navigation: tutorial/navigation.md
    - Admonitions: tutorial/admonitions.md
    - Quizzes: tutorial/quizzes.md
    - Upper Alpha Lists: tutorial/upper-alpha-lists.md
    - Google Analytics: tutorial/google-analytics.md
  - Prompts:
    - Introduction: prompts/index.md
    - Feature Mapping: prompts/feature-mapping.md
    - Enumerate Concepts: prompts/enumerate-concepts.md
    - Generate Logo: prompts/generate-logo.md
  - Glossary: glossary.md
  - Table of Contents: toc.md
  - License: license.md
  - How We Built This Site: how-we-built-this-site.md
  - References: references.md
  - Contact: contact.md
  ```
