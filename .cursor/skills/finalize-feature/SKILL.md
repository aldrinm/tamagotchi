---
name: finalize-feature
description: Marks the current feature phase as complete in specs/roadmap.md, commits all changes, merges the current branch into main, and deletes the feature branch. Use this when a feature is fully implemented and tested.
---

# Finalize Feature Skill

## Purpose
Automates the lifecycle closure of a feature branch. It updates the project roadmap, commits pending work, merges into `main`, and cleans up the feature branch.

## Workflow

1.  **Identify Current Phase**:
    - Read `specs/roadmap.md`.
    - Find the first `## Phase` section that does NOT end with ` - Complete`.
    - Extract the Phase ID and Title (e.g., "Phase 5: Quality Pass").

2.  **Update Roadmap**:
    - Update the header of the identified phase by appending ` - Complete`.
    - Save `specs/roadmap.md`.

3.  **Git Commit**:
    - Stage all changes: `git add .`
    - Commit with a descriptive message: `feat: finalize <Phase Title>`

4.  **Merge and Cleanup**:
    - Identify the current branch name (e.g., `feat/quality-pass`).
    - Checkout the `main` branch: `git checkout main`
    - Merge the feature branch: `git merge <current-branch>`
    - Delete the feature branch: `git branch -d <current-branch>`

5.  **Final Report**:
    - Confirm the roadmap update.
    - Confirm the commit and merge.
    - Inform the user they are now on the `main` branch.

## Safety Checks
- Ensure `git status` is clean before starting (except for the roadmap change itself).
- If merge conflicts occur, stop and ask the user for resolution.
- Verify `main` exists and is the target branch.
