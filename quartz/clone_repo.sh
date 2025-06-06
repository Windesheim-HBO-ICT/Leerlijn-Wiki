#!/bin/bash

# Variables
REPO_URL="https://github.com/Windesheim-HBO-ICT/Leerlijn-Content-SE"
BRANCH_NAME="main"
BRANCH_CONTENT_FOLDER="build"
SOURCE_FOLDER="/tmp/content"
DESTINATION_FOLDER="/usr/src/app/content/"
DEFAULT_DOCS_FILES="index.md"

# Function to clean the destination folder
clean_destination_folder() {
    shopt -s extglob
    for item in "$DESTINATION_FOLDER"/*; do
        if [[ -f $item ]]; then
            filename=$(basename "$item")
            if [[ ! " ${DEFAULT_DOCS_FILES[@]} " =~ " ${filename} " ]]; then
                rm "$item"
            fi
        elif [[ -d $item ]]; then
            dirname=$(basename "$item")
            if [[ ! " ${EXCLUDE_DIRS[@]} " =~ " ${dirname} " ]]; then
                rm -rf "$item"
            fi
        fi
    done
    shopt -u extglob
}

# Function to copy files from source to destination
copy_files() {
    find "$SOURCE_FOLDER$BRANCH_CONTENT_FOLDER" -type d -name ".git" -prune -o -type f -print | while read -r file; do
        dest_dir="$DESTINATION_FOLDER${file#$SOURCE_FOLDER$BRANCH_CONTENT_FOLDER}"
        dest_dir=$(dirname "$dest_dir")
        mkdir -p "$dest_dir"
        cp "$file" "$dest_dir"
    done
}

# Function to clone the repository and copy files
clone_repo() {
    # Empty the source folder if it exists
    if [ -d "$SOURCE_FOLDER" ]; then
        rm -rf "$SOURCE_FOLDER"/* || echo "Some files could not be removed, check permissions."
    fi

    # Clone the repository
    git clone --branch "$BRANCH_NAME" "$REPO_URL" "$SOURCE_FOLDER"

    if [ $? -eq 0 ]; then
        clean_destination_folder
        copy_files
        echo "Repository cloned successfully."
    else
        echo "Failed to clone repository."
    fi
}

# Main script execution
clone_repo
