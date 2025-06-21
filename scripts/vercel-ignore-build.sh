#!/bin/bash

# This script is used by Vercel's "Ignored Build Step" setting.
# It determines if a build of the frontend application should proceed.
#
# Exit with 0 to "ignore" the build (i.e., cancel it).
# Exit with 1 to "not ignore" the build (i.e., proceed with building).

echo "Checking for changes in frontend-related paths..."

# Use git diff to check for changes in the relevant directories.
# Vercel provides VERCEL_GIT_PREVIOUS_SHA and VERCEL_GIT_COMMIT_SHA.
git diff --quiet HEAD^ HEAD ./apps/frontend ./packages/shared ./packages/ui ./package.json ./package-lock.json*

# Get the exit code of the git diff command.
# Exits with 0 if no changes, 1 if there are changes.
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  # No changes were found in the specified paths.
  echo "No relevant changes detected. Skipping Vercel build."
  exit 0
else
  # Changes were found.
  echo "Relevant changes detected. Proceeding with Vercel build."
  exit 1
fi 