# Dependency List

!!! prompt
    OK, now let us focus on these 150 concepts. 

    For the next step, please create a fully connected concept learning dependency graph
    for the concepts in this course in a new CSV file.  Learning dependancies focus on
    understanding what order the Concepts should be taught to a student reading a textbook.

    Here are some terms.  In the list above, each item represents a Concept.
    The number on each line is called the ConceptID.
    The label after the period in list is called the ConceptLabel.
    Now, please create a new CSV file that includes new information about the other concepts on which it depends before it can be understood.
    If a concept depends on a specific concept that is not listed,
    then we will need to add it as a new concept.
    This will help us determine the teaching order of the Concepts.

    Return the new list as a CSV file using the following format:

    1. The first column in the CSV file is a numeric ConceptID in the list above.
    2. The second column is the ConceptName.
    3. The third column is a pipe-delimited list of the Concept IDs that the concept depends upon.

    For example, to indicate that to understand Markdown Images you must first understand the build process and Markdown Basics we would add "3|6" in the new 3rd column like this:

    3,Build Process  
    4,Docs Directory  
    5,Mkdocs Setup
    6,Markdown Basics  
    7,Markdown Images,3|6
    8,Image Directory  
    9,Markdown Links  
    Check your results to make sure that all concepts are connected to at least one other concept.

    Foundation Concepts are concepts that have no dependent concepts in this set.  
    They have an empty third column.