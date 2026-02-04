Take a look at the new @docs/uri-scheme.md plan that you just put together.  I would like you to 
update all the intelligent textbooks that I have checked out.

Match all the files that match the pattern @/Users/dan/Documents/ws/*/mkdocs.yml 

For each directory that has this pattern:

STEP 1: do a git pull to make sure the code is current

STEP 2:
Add following to the end of the mkdocs.yml file.                

```yml
extra:
  schema: https://dmccreary.github.io/intelligent-textbooks/ns/textbook/v1
  textbook_name: My Intelligent Textbook
  textbook_version: "1.0"
```

STEP 3: Validate that the yml file is still valid

STEP 4: Add and Commit the code to github with the message "Added intelligent textbook schema".

STEP 5: Do a Git Push