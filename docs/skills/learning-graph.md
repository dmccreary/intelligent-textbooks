# Learning Graph Skill

## Summary

This skill converts a course description into a concept dependency graph called a learning graph.
Learning graphs provide a roadmap of concept learning order for a course.  
Learning graphs are foundational data structures for recommending concent for a student.


## Details

Output will be placed in the folder /docs/learning-graph unless the prompt contains an override location.

### Skill Input Course Description Analysis

1. The input is a detailed course description with Bloom Taxonomy outcomes.
2. The skill will first look in the file /docs/course-description.md to find the content.
3. A series of quality checks will be performed on the course-description file.  It will look for key elements such as title, audience, prerequisites, course duration, and outcomes.  It will use the 2001 Bloom taxonomy as a way to measure different types of objectives (remember, understand, apply, analyze, evaluate and create).  It will then create a quality score which is a scale of 1 to 100 and generate a report called 01-course-description-quality-checks.md.  This file may also have suggestions on how the course-description can be improved.

### Concept Graph Generation Steps

1. A file called 02-concept-list-v1.md will generated.  It will contain 200 pedagogically-sound concept labels in a numbered markdown list format
1. After the skill generate the concept list file, it will  ask the user to review the list for accuracy.  At this point the user should remove any concepts that should not be covered and add any missing concepts to the list.
1. A directed acyclic graph (DAG) file in csv format will be generated, 
12 element taxonomy for classification.  It will contain the list generated in step 1 above but it will also concent concept dependencies for each concept.  The file will be called 03-concept-dependencies.csv
 1. Maps prerequisite dependencies as a Directed Acyclic Graph (DAG)
 ✅ Validates quality with cycle detection, orphan analysis, and connectivity checks
 ✅ Creates a taxonomy with ~12 balanced categories
 ✅ Produces distribution reports and JSON export for visualization

 The workflow:
 1️⃣ Analyzes your course description for depth and breadth
 2️⃣ Generates concept labels (Title Case, under 32 chars)
 3️⃣ Maps meaningful learning pathways (not just linear chains!)
 4️⃣ Validates graph quality with Python analysis tools
 5️⃣ Categorizes concepts with balanced taxonomy
 6️⃣ Exports everything ready for visualization

 Perfect for educators, instructional designers, and anyone building structured
 learning content. The skill ensures your learning graph has strong foundational
 concepts, clear prerequisites, and multiple pathways through the material.
