# P5 MicroSim Skill

## Summary

This skill generates a MicroSim application that will run within an intelligent textbook

## ORder

MicroSims should be placed in individual chapters.  So they are ideally created
after the content for each chapter has been created.

## Input

A detailed description of the MicroSim including what controls the user will have
and what the output drawing will be.
Include details such as if the MicroSim has a single drawing panel or has dual side-by-side panels in the drawing area.
The assumption is that only the latest p5 version is used.
If the MicroSim uses the microphone or sound, that should be specified in the description.
If there are similar MicroSims, please provide a location to those MicroSims.

## Output

The output for the MicroSim contains the following:

1. A new directory is created in the /docs/sims area of the intelligent textbook.
2. The new directory will contain a short name with only lowercase letters and dashes.  This is called the LC_NAME (lowercase name)
3. A main.html file is placed in the new microsim directory.  Only the title an the name of the JavaScript file can be changed.
4. A JavaScript file with the name of LC_NAME is created with the main p5.js code.  It should work without changes in the p5.js editor
5. The p5.js code follows explicit rules described in the p5-js-microsim-rules.md file
6. An index.md file is crated from the index-template.md file.  This contains an iframe that references the main.html file as the src.
7. A metadata.json files is created that stores Dublin Core and other data for MicroSim search engines


