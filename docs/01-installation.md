# Installation

This guide covers creating a new Hunter module from the skeleton template.

## Requirements

- PHP 8.4+
- Node.js 18+
- Composer 2+

## Create a New Module

The recommended way to create a new module is using the `create-hunter-module` npm package:

```bash
npx create-hunter-module my-module
```

This will:

1. Clone the skeleton repository
2. Replace all placeholder variables with your module name
3. Initialize a fresh git repository
4. Install Composer dependencies
5. Install npm dependencies

## Placeholder Replacements

The following placeholders are replaced throughout the codebase:

| Placeholder         | Example Value | Description               |
| ------------------- | ------------- | ------------------------- |
| `:vendor`           | `acme`        | Vendor/organization name  |
| `:package_slug`     | `hunter-blog` | Package slug for Composer |
| `:module_slug`      | `blog`        | Module identifier         |
| `:StudlyModuleName` | `Blog`        | PascalCase module name    |
| `:module_name`      | `blog`        | Lowercase module name     |

## Manual Installation

If you prefer manual setup:

```bash
# Clone the skeleton
git clone https://github.com/akira/hunter-module-skeleton my-module
cd my-module

# Remove skeleton git history
rm -rf .git

# Run the install command
php hunter install

# Initialize new git repository
git init
git add .
git commit -m "Initial commit"
```

## Post-Installation

After creating your module:

1. **Update `composer.json`** with your package details (name, description, authors)
2. **Configure the service provider** in `src/YourModuleServiceProvider.php`
3. **Start the development server** with `php hunter serve`

See [Development](05-development.md) for the full development workflow.

---

**Previous:** [Roadmap](00-roadmap.md) | **Next:** [Configuration](02-configuration.md)
