---
name: GitHub empty-repo bootstrap
description: Uploading a full Git tree through the GitHub REST API to a newly created empty repository.
---

When a new GitHub repository has no branch or commit, `POST /git/blobs` can return `409 Git Repository is empty.` Seed the repository with an existing tracked project file through the Contents API, then upload the rest of the tree and make the final commit a child of the bootstrap commit. Keep the seed file in the final tree.

**Why:** The Git Data API route used by the Replit GitHub connector can reject blob creation before the repository has an initial commit.

**How to apply:** For a new empty repository, create one legitimate tracked file unchanged with the Contents API first. Then create the remaining blobs, build the complete tree, create a commit with the bootstrap commit as its parent, and advance the branch ref.