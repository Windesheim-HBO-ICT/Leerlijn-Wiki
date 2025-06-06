#!/bin/sh

echo "Started cloning the repository.."

# Call the child script
bash clone_repo.sh

## Run the Quartz build
npx quartz build --serve --port 8080
