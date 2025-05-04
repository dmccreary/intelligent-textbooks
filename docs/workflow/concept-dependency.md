# Concept Dependency

In this step we create a dependency graph of concepts.  The dependency graph tells us what concepts we need to master before we can learn a new concept.

A learning graph creates learning‑order relationships between concepts. These dependencies establish a structured sequence where foundational concepts precede advanced topics.  This is technically
called a directed acyclic graph (DAG) since there can be no loops in a dependency graph.  Loops are concepts that both depend on each other.

Note that a DAG might have multiple learning paths.  There might be multiple
different ways to master a new concept.  For example, based on the student's background
one path might take them through concepts that require a strong math background such
as calculus.  Another path might teach a new concept using metaphors and storytelling which
do not require advanced math training.

## Sample Prompt

!!! prompt
    Your are an expert at understanding learning dependencies in teaching new Concepts in a course.
    You understand how directed acyclic graphs (DAGs) are used to build learning graphs for a course.
    You understand how to generate a new CSV file that holds a learning graph.

    Learning dependencies focus on understanding what order the Concepts should be taught to a student before they are ready to learn a specific concept.

    For input to this step, use the attached enumerated-concepts.md file or look in the project knowledge area for this file.  Note that the file contains a numbered list.  The number is called the Concept ID and the label after the number is called the ConceptLabel.

    Please create a fully connected concept learning dependency graph for the concepts in this course in a new CSV file. Add a new pipe-delimited column that contains the dependant concept IDs.

    Here is the format of the new CSV output file you will create.  The first row in the file contains the header metadata.

    Return the new list as a CSV file using the following format:

    1. The first column in the CSV file is a numeric ConceptID you assigned in the list above.
    2. The second column is the ConceptLabel.
    3. The third column is the Dependencies which is a pipe-delimited list of the ConceptIDs that the concept depends upon.

    The first row of the CSV file you generate will be the following header row:

    ConceptID,ConceptLabel,Dependencies

    Check your results to make sure that all concepts are connected to at least one other concept.

    Foundation Concepts are concepts that have no dependant concepts in this set.  
    They have an empty third column.
    


    




