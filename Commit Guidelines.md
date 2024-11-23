
# Commit Message Guidelines

## Why Commit Guidelines?
Consistent and descriptive commit messages improve collaboration and make it easier to understand project history, debug issues, and generate release notes.

---

## Commit Message Format
Each commit message should follow this structure:

```
<emoji> <type>(optional scope): <subject>

<Body>
- Why was this change necessary?
- What does this commit do or fix?
- Provide additional context or details as needed.

<Footer>
BREAKING CHANGE: <description>
Closes #<issue-number>
```

### Example:
```
🐛 fix(api): resolve compatibility issue in API logic

- Ensured that the system code supports legacy API calls.
- Fixed parameter mismatch errors for seamless integration.

Closes #42
```

---

## Writing Commit Messages

### 1. **Use Emojis (Optional)**
Emojis provide visual context for the type of change. Below are some common examples:

| Emoji  | Description                   |
|--------|-------------------------------|
| ✨      | New feature                  |
| 🐛      | Bug fix                      |
| ♻️      | Refactor                     |
| 📝      | Documentation                |
| 🔧      | Configuration changes        |
| 🚀      | Performance improvements     |
| 📦      | Package management updates   |
| 🧹      | Code cleanup or minor chores |

---

### 2. **Type**
The `type` indicates the nature of the change. Common types include:

- **`feat`**: A new feature  
- **`fix`**: A bug fix  
- **`docs`**: Documentation changes  
- **`style`**: Styling or formatting changes  
- **`refactor`**: Non-functional code changes  
- **`perf`**: Performance improvements  
- **`test`**: Adding or updating tests  
- **`build`**: Build system or dependency changes  
- **`chore`**: Miscellaneous tasks like minor maintenance or cleanup  
- **`config`**: Changes related to configurations or package management  

---

### 3. **Scope (Optional)**
The scope specifies the area of the codebase affected. For example:
- `api`
- `frontend`
- `backend`
- `config`
- `package`

---

### 4. **Subject**
The subject is a concise summary of the change. Follow these rules:
- Keep it under 50 characters.
- Use the imperative mood (e.g., "Fix bug," not "Fixed bug").
- Be descriptive and specific.

---

### 5. **Body (Optional)**
The body provides additional details:
- Explain why the change was necessary.
- Describe what the commit does or fixes.
- Add relevant context or technical details.

You can format this section using bullet points or paragraphs for clarity.

---

### 6. **Footer (Optional)**
Use the footer to indicate:
- **Breaking Changes:** Mention if the change breaks backward compatibility.  
  Example:  
  ```
  BREAKING CHANGE: The function `x` was renamed to `y`.
  ```
- **Issue Tracking:** Reference issues or tickets.  
  Example:  
  ```
  Closes #123
  ```

---

## Examples

### Bug Fix:
```
🐛 fix(auth): handle null values in token validation
```

### New Feature:
```
✨ feat(ui): add dark mode toggle

- Implemented dark mode toggle in the navbar.
- Added localStorage support to remember user preferences.
```

### Configuration Change:
```
🔧 config(package): update npm scripts for deployment

- Added a new `build:prod` script for production builds.
- Removed deprecated scripts no longer in use.
```

### Package Management:
```
📦 chore(deps): update project dependencies

- Updated `react` to version 18.0.0.
- Removed unused dependency `lodash`.

Closes #789
```

### Breaking Change:
```
♻️ refactor(database): update schema to v2

- Migrated user and order tables to the new schema.
- Updated all related queries to match the new structure.

BREAKING CHANGE: The old schema is no longer supported.
Closes #456
```

---

## Automating Commit Guidelines
To ensure consistency, you can use tools like:
- **[Commitizen](https://commitizen-tools.github.io/commitizen/)**: For generating formatted commit messages.
- **[Husky](https://typicode.github.io/husky/)**: For enforcing rules before commits.
- **[Lint-staged](https://github.com/okonet/lint-staged)**: For running linters on staged files.

---

## Chores and Configuration for Package Management

### Chores
These are minor, routine tasks that don’t modify functionality but help maintain code quality and organization. Common use cases:
- Code cleanup.
- Removing unused files or variables.
- Updating `.gitignore` or other configuration files.

Commit Example:
```
🧹 chore: remove unused variables and files
```

### Configuration for Package Management
Managing dependencies and configurations is crucial for a stable and maintainable project. Use these guidelines for related commits:
1. **Dependency Updates**: Use `📦 chore(deps)` or `📦 chore(dependencies)` for package updates.
2. **Package Management**:
   - Add or modify package configurations like `package.json`, `.npmrc`, or `.yarnrc`.
   - Update or add npm/yarn scripts.

Commit Example:
```
📦 chore(deps): upgrade dependencies to latest stable versions
🔧 config(package): add npm script for testing
```

---

By adhering to these guidelines, we maintain a clean, structured, and collaborative development process within our organization.
