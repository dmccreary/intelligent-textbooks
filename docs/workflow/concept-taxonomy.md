# Generating a Course Taxonomy

## Overview
This workflow has three parts:

1. The generation of a 10-12 element taxonomy
2. Updating the dependencies csv file to include the primary taxonomy as a new column of data
3. Generating a legend in HTML for the learning graph viewer

## Generating the Taxonomy
!!! prompt
    Now lets focus again on the enumerated-concepts.md file we have generated for a course.
    Your task is to organize these concepts into a small taxonomy
    of approximately a dozen classifiers.  You will generate a list
    of the classifier labels.

    Here are some suggestions.  
    
    The first category is "Foundational Concepts".
    These are concepts that are introduced at the start of the course
    and are considered prerequisites.
    
    A second category is "Concept Definitions" where we introduce new terms.
    A last category is "Miscellaneous".
    Your task is to create the rest of the classifiers and give each classifier a label and definition.
    Each category should include concepts that share similar characteristics, functions, or applications.
    Attempt to evenly divide the 150 concepts into a balanced taxonomy.

    Suggest 10 categories for the taxonomy and assign each concept
    to one or more categories. Add an 11th category called "Miscellaneous".
    Ensure that the categories cover
    a range of concept types, including abstract ideas, practical
    applications, common misunderstandings, and real-world examples.
    Avoid redundancy and ensure that each category is distinct.

## Updating the Dependency Graph CSV File

!!! prompt
    Please update the dependencies.csv file to add a new column.  The new column name is TaxonomyID.  For each concept, find the primary taxonomy that the concept fits into.  Only assign a single taxonomy to each concept.

    Here is the format for the new CSV file I want you to generate:

    1. ConceptID (copied direct from the dependencies.csv file)
    2. ConceptLabel  (copied direct from the dependencies.csv file)
    3. Dependencies (copied direct from the dependencies.csv file)
    4. TaxononyID - this is the new column you will generate.

## Generating the Learning Graph Legend

!!! prompt
    Please summarize the taxonomy into a numbered list with just the taxonomy label as the item in the list in raw markdown format.

In this updated CSV file, each concept is assigned to a single TaxonomyID based on its primary category from our taxonomy:

Here's a simplified numbered list containing just the taxonomy labels:

1.  Foundational Concepts
2.  AI Evolution and History
3.  AI Architectures and Technologies
4.  AI Capabilities and Applications
5.  Content Generation and Creativity
6.  Knowledge Management and Organization
7.  Educational Transformation
8.  Organizational Strategy and Implementation
9.  Performance Evaluation and Benchmarking
10.  Ethical and Regulatory Considerations
11.  Future Trends and Projections
12.  Implementation and Management Practices

!!! prompt
    Please convert the list into an HTML table with the following format.
    Do not put any style elements ih the table other than background color and font color on the second column:

    <table>
            <tr>
                <td>Foundational Concepts</td>
                <td style="background-color: red; color: white;">Red</td>
            </tr>
            <tr>
                <td>AI Evolution and History</td>
                <td style="background-color: orange; color: black;">Orange</td>
            </tr>
                <td>AI Architectures and Technologies</td>
                <td style="background-color: yellow; color: black;">Orange</td>
