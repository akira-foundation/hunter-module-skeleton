# Contributing

Thank you for considering contributing to this Hunter module. This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We welcome contributors of all backgrounds and experience levels.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the Issues
2. If not, create a new issue with:
    - A clear, descriptive title
    - Steps to reproduce the issue
    - Expected behavior vs actual behavior
    - Your environment (PHP version, Laravel version, OS)

### Suggesting Features

1. Check existing issues for similar suggestions
2. Create a new issue with:
    - A clear description of the feature
    - The problem it solves
    - Potential implementation approach

### Submitting Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes following the coding standards below
4. Write or update tests for your changes
5. Ensure all tests pass: `php hunter test`
6. Run code formatting: `vendor/bin/pint`
7. Commit with a descriptive message
8. Push to your fork and create a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/hunter-module-skeleton
cd hunter-module-skeleton

# Install dependencies
composer install
npm install

# Start development server
php hunter serve

# Run tests
php hunter test
```

## Coding Standards

### PHP

- Follow PSR-12 coding style
- Use strict types: `declare(strict_types=1);`
- Use explicit return type declarations
- Classes should be `final` unless designed for extension
- Use constructor property promotion

### TypeScript/React

- Use TypeScript for all frontend code
- Use named exports (not default exports)
- Use functional components with hooks
- Props interfaces should be defined inline or in the same file

### Testing

- Write tests for all new features and bug fixes
- Use descriptive test names: `it('creates a post with valid data')`
- Follow Arrange-Act-Assert pattern
- Use factories for test data

### Commits

- Use clear, descriptive commit messages
- Reference issue numbers when applicable: `Fix #123: Handle edge case`
- Keep commits focused on a single change

## Pull Request Process

1. Ensure your PR description clearly describes the changes
2. Link any related issues
3. Ensure CI checks pass
4. Request review from maintainers
5. Address any feedback
6. Once approved, a maintainer will merge your PR

## Questions?

If you have questions about contributing, feel free to open an issue for discussion.
