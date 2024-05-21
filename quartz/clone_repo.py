import os
import shutil
from git import Repo

DEFAULT_DOCS_FILES = ['index2.md', 'index.md', 'tags.md']
EXCLUDE_DIRS = ['assets', 'stylesheets']


# Remove all files and directories from the destination folder except the default docs files
def clean_destination_folder(destination_folder):
    for root, dirs, files in os.walk(destination_folder):
        for file_name in files:
            if file_name not in DEFAULT_DOCS_FILES and 'assets' not in root and 'stylesheets' not in root:
                os.remove(os.path.join(root, file_name))
        for dir_name in dirs:
            if dir_name not in EXCLUDE_DIRS:
                shutil.rmtree(os.path.join(root, dir_name))

# Copy all files from the source folder to the destination folder
def copy_files(source_folder, destination_folder):
    for root, dirs, files in os.walk(source_folder):
        # Remove the .git directory from the list of directories
        if '.git' in dirs:
            dirs.remove('.git')

        # Create the destination directory if it does not exist
        dest_dir = os.path.join(destination_folder, os.path.relpath(root, source_folder))
        os.makedirs(dest_dir, exist_ok=True)

        # Copy all files from the source folder to the destination folder
        for file_name in files:
            source = os.path.join(root, file_name)
            destination = os.path.join(dest_dir, file_name)
            shutil.copy(source, destination)

# Clone the repository and copy the files to the destination folder
def clone_repo(repo_url, branch_name, source_folder, destination_folder):
    # Remove the source folder if it already exists
    if os.path.exists(source_folder):
        shutil.rmtree(source_folder)

    try:
        # Clone the repository
        repo = Repo.clone_from(repo_url, source_folder, branch=branch_name)

        # Copy the files to the destination folder
        if repo:
            clean_destination_folder(destination_folder)
            copy_files(source_folder, destination_folder)
            print("Repository cloned successfully.")
        else:
            print("Failed to clone repository.")
    except Exception as e:
        print(f"Error: {e}")

clone_repo('https://github.com/martijnschuman/Leerlijn-SE.git', 'main', '/docs/', '/usr/src/app/content/')
