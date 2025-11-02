# Course Description Analyzer Skill Creator


!!! prompt
    Please use the skill-creator skill to create a new skill.  
    This skill will look for a course description in the /docs/course-description.md file.
    If the file does not exist it will offer to create it and then follow Path A.
    If the file exists, it will do a quality analysis of the file.
    A high-quality course-description must first contain all the elements you would expect in a course catalog.
    In addition, we would like to have a detailed list of concepts ordered by the 2001 Bloom Taxonomy.
    The goal is to end up with a course-description that has enough high-quality content to generate a list of 200 concepts that will be learned in this course.
    
    ## STEP 1: Course Description Creation
    This step can be skipped if the course description already exists.

    If the file does not exist, it will ask the user a series of questions:
        1. What is the title of the course?
        2. What is the target audience of the course (elementary, junior high, high school, college, graduate students, adult continuing education etc.)?
        3. What are the prerequisites of the course?
        4. What is the main subjects covered by this course?
        5. What are the 2001 Bloom Taxonomy outcomes of this course?  After this course, students will be able to:
            1. **Remember**: - Retrieving, recognizing, and recalling relevant knowledge from long-term memory.
            2.  **Understand**: - Constructing meaning from instructional messages, including oral, written, and graphic communication.
            3.  **Apply**: - Carrying out or using a procedure in a given situation.
            4.  **Analyze**: - Breaking material into constituent parts and determining how the parts relate to one another and to an overall structure or purpose.
            5.  **Evaluate**: - Making judgments based on criteria and standards through checking and critiquing.
            6.  **Create**: - Putting elements together to form a coherent or functional whole; reorganizing elements into a new pattern or structure.  This includes capstone project ideas.
    
    ## STEP 2: Course Description Analysis
    
    The STEP will analyze the course description for quality and completeness. It will search for the typical elements that were described in Path A (Creation) above.
    It will use the following point system:
        1. Title - 5 points
        2. Target Audience - 5 points
        3. Prerequisites - 5 points
        4. Main Topics covered - 10 points
        5. Topics excluded - 5 points
        6. 2001 Bloom Taxonomy Outcomes
            1. Clear listing of "After this course the student will" - 5 points
            2. Remember - 10 points
            3. Understand - 10 points
            4. Analyze - 10 points
            5. Evaluate - 10 points
            6. Create - 10 points
        7. Other descriptive text such as why this course is important - 5 points
    After the analysis is done, it will provide a gap analysis, a list of suggestions for improvement and a final score of 1-100 where 1=poor and 100=excellent. 

