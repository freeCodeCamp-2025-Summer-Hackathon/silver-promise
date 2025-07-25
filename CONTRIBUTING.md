# Contributing to This Project

Thank you for your interest in contributing! Please follow these guidelines to help us maintain a high-quality project.

## Tech Stack

This project is built using:

- **Frontend & Backend**: Next.js (Full-stack React framework)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js (LTS version recommended)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (for local database development)
- [Git](https://git-scm.com/)

## How to Contribute

- **Fork** the repository and create your feature branch from `dev` with a meaningful, short name (e.g., `user-auth`, `fix-login-bug`, `docs`).
- **Work** on your changes in your feature branch.
- **Merge** your feature branch into the `dev` branch via pull request once your work is complete.
- **Describe** your changes clearly in your pull request.
- **Reference** any related issues in your PR description.

### Branch Structure

We follow a structured branching approach:

- **`main`**: Production-ready code. Only stable, tested features are merged here.
- **`dev`**: Development branch where feature branches are merged. Once multiple features work well together, `dev` is merged into `main`.
- **Feature branches**: Individual branches for specific features or fixes, created from `dev`.

## Git Workflow

### Setting Up Your Development Environment

1. **Clone the repository:**
    ```bash
    git clone https://github.com/freeCodeCamp-2025-Summer-Hackathon/silver-promise.git
    cd silver-promise
    ```

2. **Switch to the dev branch:**
    ```bash
    # Check if the dev branch exists
    git branch -a

    # Switch to dev branch
    git checkout dev
    ```

3. **Install dependencies:**
    ```bash
    # Using npm
    npm install

    # Or using yarn
    yarn install
    ```

4. **Set up environment variables:**
    - Copy `.env.example` to `.env.local` and fill in the required values (such as your PostgreSQL connection string).

5. **Start the development server:**
    ```bash
    # Using npm
    npm run dev

    # Or using yarn
    yarn dev
    ```
    The app will be available at [http://localhost:3000](http://localhost:3000).

6. **Create your feature branch from dev:**
    ```bash
    git checkout -b <my-feature>
    ```

### Working on Your Feature

7. **Work on your branch.** Once you're happy with the changes:

8. **Add, commit, and push your code:**
    ```bash
    git add .
    git commit -m "Your descriptive commit message"
    git push -u origin <my-feature>
    ```

9. **Create a Pull Request (PR) to the dev branch**

10. **At least one reviewer must approve your PR before merging**

11. **Merge your PR into dev**

12. **(Optional) Delete your feature branch if no longer needed**

### Keeping Your Branches Updated

**Keep your dev branch up to date:**
```bash
# Switch to dev
git checkout dev

# Pull latest changes
git pull
```

**To start a new feature, repeat the "Create your feature branch" step.**

**If you're on a feature branch and need the latest from dev:**
```bash
# Temporarily save your changes
git stash save "<message>"

# Update dev and merge into your feature branch
git checkout dev
git pull
git checkout <my-feature>
git merge dev

# Apply your stashed work
git stash pop stash@{0}
```

## Issues and Pull Requests

### Issues

When creating an issue, please ensure that you use a template if available. Else create a blank issue and fill in the details.

- [Bug Report](https://github.com/freeCodeCamp-2025-Summer-Hackathon/silver-promise/issues/new?template=BUG-REPORT.yml)
- [Feature Request](https://github.com/freeCodeCamp-2025-Summer-Hackathon/silver-promise/issues/new?template=FEATURE-REQUEST.yml)
- [Documentation](https://github.com/freeCodeCamp-2025-Summer-Hackathon/silver-promise/issues/new?template=DOCUMENTATION.yml)
- [Technical Task](https://github.com/freeCodeCamp-2025-Summer-Hackathon/silver-promise/issues/new?template=TECHNICAL-TASK.yml)

### Labels

We use labels to organize and prioritize issues and pull requests. Please use the appropriate labels when creating or updating issues/PRs:

- **api**: The issue or pull request is related to the API.
- **backend**: The issue or pull request is related to the backend.
- **bug**: If you find a bug, no matter where, use this label.
- **database**: The issue or pull request is related to the database.
- **documentation**: For issues or pull requests that improve or add to the documentation.
- **duplicate**: If the issue or pull request already exists, mark it with this label.
- **enhancement**: To request a new feature or improve existing functionality use this label.
- **frontend**: The issue or pull request is related to the frontend.
- **github**: The issue or pull request is related to GitHub actions, workflows, templates or other GitHub settings.
- **help wanted**: If you need assistance by others to resolve an issue or complete a task.
- **invalid**: If the issue or pull request does not meet the project's guidelines or is not relevant.
- **question**: If you need further information or clarification.
- **testing**: The issue or pull request is related to testing, such as unit tests, integration tests, etc.
- **wontfix**: If the issue will not be worked on or is not fixable.

---
Happy coding!