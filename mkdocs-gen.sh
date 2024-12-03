# Generate files for a mkdocs material site
# You snould be in the directory you want to store the mkdocs files
TEMPLATE=~/Documents/ws/mkdocs-template

# the -p option will not throw an error if the directory already exists
mkdir -p docs
mkdir -p docs/img

# Sample files to get started
cp $TEMPLATE/.gitignore .
cp $TEMPLATE/mkdocs.yml .
cp $TEMPLATE/docs/index.md docs
cp $TEMPLATE/docs/contact.md docs