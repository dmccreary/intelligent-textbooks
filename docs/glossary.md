# Glossary of Terms for mkdocs for Intelligent Textbooks

#### Admonition

A section of text that is separate from the main flow of text.

Admonitions are designed to that they can be quickly skipped over
if the user is not concerned with the topic.

In mkdocs-material admonitions are used to store text such as abstracts, 
note, info, tip, success, question, warning, failure, danger, bug, example and quote.

[mkdocs-material admonitions documentation](https://squidfunk.github.io/mkdocs-material/reference/admonitions/)

* Also known as: "call outs"

#### Automatic Build

Using an automatic process that generates HTML from the markdown files.

Automatic builds for mkdocs can be automatically executed whenever any part of the mkdocs.yml or the files
in the ```docs``` directory change.  On GitHub, a GitHub action can be configured to achieve this.

#### Code Highlighting

#### Concept Graph

#### Favicon

#### Formulas

#### GitHub Actions

#### Glossary of Terms

#### Edit from GitHub

#### ISO Definition

A term definition is considered to be consistent with ISO metadata registry guideline ISO/IEC 11179 if it meets the following criteria:

1. Precise
2. Concise
3. Distinct
4. Non-circular
5. Unencumbered with business rules

#### Learning Graph

A directed graph of concepts that reflects the order that concepts should be learned to master a new concept.

#### License

#### Link Checker

#### MicroSim

#### Navigation

In our textbooks we focus on left-side navigation systems since these
are the default navigation system and they are both intuitive and
familiar by our users.  Our users also tend to be using
screens that are wide landscape displays.  We discourage top navigation.

#### p5.js

The JavaScript library most commonly used to render MicroSims.

Although there
are many other JavaScript libraries that can be used, because there
is a huge number of p5.js programs available for indexing by
web crawlers used by generative AI tools, p5.js dominates
the MicroSim ecosystems.

Other specialized libraries such as vis.js are used for tasks such
as simulating graph traversal algorithms.

#### Quiz Management

Allow pages to contain self-assessments where the answers are hidden until the user
clicks on a "Show Answer" control.

Allow multiple-choice questions in a list to use the ordered-list labels A. B. C. D.

#### Search

Create a search function as part of the build process.

The mkdocs material theme generates a reverse index JSON file that is used to
list the pages that match search keywords.

Note that standard mkdocs search does not use embeddings and there is no
way to find similar documents.

#### Social Media Previews

#### Table of Contents

Tools to generate a list of 

#### Vis.js

A JavaScript library for rendering graph networks.

Vis.js is used to view and edit [learning graphs](#learning-graph) used by intelligent textbooks.

#### Website Analytics

The process of analyzing who is coming to your website, when they are visiting and what pages are being accessed.

The mkdocs material system provides a way to integrate free Google Analytics by adding four lines to your mkdocs.yml file.

See: [Tutorial on Google Analytics](./tutorial/google-analytics.md)