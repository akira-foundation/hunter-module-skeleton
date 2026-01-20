# Project Structure

This document explains the directory structure of a Hunter module.

## Overview

```
my-module/
├── config/                 # Module configuration
├── database/
│   ├── factories/          # Model factories
│   ├── migrations/         # Database migrations
│   └── seeders/            # Database seeders
├── docs/                   # Documentation
├── resources/
│   └── js/
│       ├── components/     # React components
│       └── pages/          # Inertia page components
├── routes/                 # Route definitions
├── src/
│   ├── Actions/            # Action classes
│   ├── Http/
│   │   ├── Controllers/    # HTTP controllers
│   │   ├── Middleware/     # HTTP middleware
│   │   ├── Requests/       # Form request validation
│   │   └── Resources/      # API resources
│   ├── Models/             # Eloquent models
│   └── *ServiceProvider.php
├── stubs/                  # Code generation stubs
├── tests/
│   ├── Feature/            # Feature tests
│   └── Unit/               # Unit tests
├── workbench/              # Development Laravel app
├── composer.json
├── hunter                  # Hunter CLI
├── package.json
├── phpunit.xml
└── vite.config.js
```

## Directory Details

### `/config`

Module configuration files. The main config file is named after your module slug:

```
config/
└── blog.php
```

### `/database`

Database-related files following Laravel conventions:

```
database/
├── factories/          # Model factories for testing
│   └── PostFactory.php
├── migrations/         # Database migrations
│   └── 2024_01_01_000000_create_posts_table.php
└── seeders/            # Database seeders
    └── PostSeeder.php
```

### `/resources/js`

Frontend assets using React and Inertia:

```
resources/js/
├── components/         # Reusable React components
│   └── PostCard.tsx
└── pages/              # Inertia page components
    └── posts/
        ├── index.tsx
        └── show.tsx
```

### `/routes`

Route definitions for your module:

```
routes/
└── blog.php
```

Routes are automatically registered by the service provider when `hasRoutes()` is called.

### `/src`

PHP source code for your module:

```
src/
├── Actions/                    # Business logic
│   └── CreatePost.php
├── Http/
│   ├── Controllers/            # HTTP controllers
│   │   └── PostController.php
│   ├── Middleware/             # Custom middleware
│   │   └── EnsurePostExists.php
│   ├── Requests/               # Form request validation
│   │   └── StorePostRequest.php
│   └── Resources/              # API resources
│       └── PostResource.php
├── Models/                     # Eloquent models
│   └── Post.php
└── BlogServiceProvider.php     # Module service provider
```

### `/stubs`

Templates for code generation. Customize these to match your coding style:

```
stubs/
├── action.stub
├── component.stub
├── controller.stub
├── factory.stub
├── middleware.stub
├── migration.create.stub
├── migration.update.stub
├── model.stub
├── page.stub
├── request.stub
├── resource.stub
├── seeder.stub
├── test.stub
└── test.unit.stub
```

### `/tests`

Test files using Pest PHP:

```
tests/
├── Feature/            # Integration/feature tests
│   └── PostTest.php
├── Unit/               # Unit tests
│   └── CreatePostTest.php
├── ArchTest.php        # Architecture tests
├── Pest.php            # Pest configuration
└── TestCase.php        # Base test case
```

### `/workbench`

A minimal Laravel application for development and testing. This is where `php hunter serve` runs:

```
workbench/
├── app/
├── bootstrap/
├── config/
├── database/
├── resources/
├── routes/
└── storage/
```

The workbench app automatically loads your module for development.

## Key Files

| File             | Purpose                          |
| ---------------- | -------------------------------- |
| `hunter`         | CLI tool for development         |
| `composer.json`  | PHP dependencies and autoloading |
| `package.json`   | Node.js dependencies             |
| `phpunit.xml`    | PHPUnit/Pest configuration       |
| `vite.config.js` | Vite build configuration         |

---

**Previous:** [CLI](03-cli.md) | **Next:** [Development](05-development.md)
