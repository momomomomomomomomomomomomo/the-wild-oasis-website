# Contributing to The Wild Oasis

Thank you for your interest in contributing to The Wild Oasis! This document provides guidelines and instructions for contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/the-wild-oasis-website.git
   cd the-wild-oasis-website
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-repo/the-wild-oasis-website.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your own credentials

6. **Run the development server**
   ```bash
   npm run dev
   ```

## Development Process

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Test your changes thoroughly

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Keep your branch up to date**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style

### JavaScript/React
- Use functional components with hooks
- Use `async/await` for asynchronous operations
- Follow React best practices
- Use destructuring where appropriate
- Keep components small and focused

### Example:
```javascript
// Good
export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*");
  
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  
  return data;
}

// Component example
export default function CabinCard({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;
  
  return (
    <div className="cabin-card">
      {/* Component JSX */}
    </div>
  );
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Group related utilities together
- Use custom classes sparingly

### File Naming
- Use PascalCase for component files: `CabinCard.js`
- Use camelCase for utility files: `data-service.js`
- Use kebab-case for route folders: `account/reservations`

## Commit Guidelines

### Commit Message Format
```
<type>: <subject>

<body> (optional)

<footer> (optional)
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat: add cabin filtering by capacity

fix: resolve date picker timezone issue

docs: update installation instructions

refactor: optimize cabin data fetching
```

## Pull Request Process

1. **Ensure your code meets the requirements**
   - Code follows the style guidelines
   - All tests pass
   - No console errors or warnings
   - Code is properly formatted

2. **Update documentation**
   - Update README.md if needed
   - Add comments to complex code
   - Update relevant documentation files

3. **Create a Pull Request**
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues
   - Add screenshots for UI changes

### Pull Request Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Changes Made
- List of changes made

## Testing
- Describe how you tested the changes

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Fixes #(issue number)
```

4. **Respond to feedback**
   - Address review comments promptly
   - Make requested changes
   - Ask questions if something is unclear

5. **Wait for approval**
   - At least one maintainer must approve
   - All CI checks must pass
   - No merge conflicts

## Questions?

If you have any questions or need help, feel free to:
- Open an issue for discussion
- Ask in pull request comments
- Contact the maintainers

Thank you for contributing! 🎉
