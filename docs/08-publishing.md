# Publishing

This guide covers publishing your Hunter module to Packagist and releasing new versions.

## Preparing for Publication

### 1. Update composer.json

Ensure your `composer.json` has complete metadata:

```json
{
    "name": "acme/hunter-blog",
    "description": "A blogging module for Hunter",
    "type": "library",
    "license": "MIT",
    "authors": [
        {
            "name": "Your Name",
            "email": "you@example.com"
        }
    ],
    "homepage": "https://github.com/acme/hunter-blog",
    "keywords": ["hunter", "module", "blog", "laravel"],
    "require": {
        "php": "^8.4",
        "akira/hunter-module": "^1.0",
        "illuminate/support": "^12.0"
    },
    "autoload": {
        "psr-4": {
            "Acme\\Blog\\": "src/"
        }
    },
    "extra": {
        "laravel": {
            "providers": ["Acme\\Blog\\BlogServiceProvider"]
        }
    }
}
```

### 2. Create a GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create acme/hunter-blog --public
git push -u origin main
```

### 3. Register on Packagist

1. Go to [packagist.org](https://packagist.org)
2. Sign in with your GitHub account
3. Click "Submit" and enter your repository URL
4. Packagist will automatically sync with your repository

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features, backwards compatible
- **PATCH** (0.0.1) - Bug fixes, backwards compatible

## Creating Releases

### Manual Release

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0
```

### Using release-it

The skeleton supports [release-it](https://github.com/release-it/release-it) for automated releases.

Install release-it:

```bash
npm install --save-dev release-it
```

Add to `package.json`:

```json
{
    "scripts": {
        "release": "release-it"
    }
}
```

Create `.release-it.json`:

```json
{
    "git": {
        "commitMessage": "chore: release v${version}",
        "tagName": "v${version}"
    },
    "github": {
        "release": true
    },
    "npm": {
        "publish": false
    }
}
```

Run a release:

```bash
npm run release

# Or with version bump
npm run release -- minor
npm run release -- major
```

## Installation in Hunter Applications

Once published, users can install your module:

```bash
composer require acme/hunter-blog
```

The service provider is auto-discovered via Laravel's package discovery.

### Publishing Assets

If your module has publishable assets:

```bash
# Publish config
php artisan vendor:publish --tag=blog-config

# Publish migrations
php artisan vendor:publish --tag=blog-migrations

# Publish all
php artisan vendor:publish --provider="Acme\Blog\BlogServiceProvider"
```

## Module Requirements

When listing requirements in your documentation:

```markdown
## Requirements

- PHP 8.4+
- Laravel 12+
- Hunter Core 1.0+
```

## Changelog

Maintain a `CHANGELOG.md` for your module:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-01-15

### Added

- Initial release
- Post management with CRUD operations
- Category support
- REST API endpoints
```

## Continuous Integration

Add GitHub Actions for testing:

```yaml
# .github/workflows/tests.yml
name: Tests

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    test:
        runs-on: ubuntu-latest

        steps:
            - uses: actions/checkout@v4

            - name: Setup PHP
              uses: shivammathur/setup-php@v2
              with:
                  php-version: "8.4"
                  coverage: xdebug

            - name: Install dependencies
              run: composer install --prefer-dist --no-progress

            - name: Run tests
              run: vendor/bin/pest --coverage
```

## License

Include a license file. The skeleton uses MIT by default:

```
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
...
```

---

**Previous:** [Testing](07-testing.md)
