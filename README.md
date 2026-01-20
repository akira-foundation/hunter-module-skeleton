# :module_name

[![Latest Version on Packagist](https://img.shields.io/packagist/v/:vendor_slug/hunter-:module_slug.svg?style=flat-square)](https://packagist.org/packages/:vendor_slug/hunter-:module_slug)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/:vendor_slug/hunter-:module_slug/tests.yml?branch=1.x&label=tests&style=flat-square)](https://github.com/:vendor_slug/hunter-:module_slug/actions?query=workflow%3Atests+branch%3A1.x)
[![Total Downloads](https://img.shields.io/packagist/dt/:vendor_slug/hunter-:module_slug.svg?style=flat-square)](https://packagist.org/packages/:vendor_slug/hunter-:module_slug)

:package_description

## Installation

You can install the package via composer:

```bash
composer require :vendor_slug/hunter-:module_slug
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag=":module_slug-config"
```

This is the contents of the published config file:

```php
return [
    'enabled' => env(':MODULE_SLUG_UPPER_ENABLED', true),
];
```

## Usage

Once installed, the module will be automatically registered with Hunter. You can access it at `/:module_slug`.

## Development

This module includes a standalone development environment that allows you to develop and test without installing it in a full Hunter application.

### Quick Start

```bash
# Install the dev environment
php hunter install

# Start the development server
php hunter serve
```

Then open http://127.0.0.1:8000 in your browser.

### Hunter CLI

The `hunter` CLI provides commands for scaffolding and development:

```bash
# Show all available commands
php hunter --help
```

#### Setup Commands

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `php hunter install` | Install and configure the dev environment |
| `php hunter serve`   | Start the development server              |

#### Make Commands

All make commands create files in the module's `src/` directory with the correct namespace.

| Command                                        | Output                                           |
| ---------------------------------------------- | ------------------------------------------------ |
| `php hunter make:action CreatePost`            | `src/Actions/CreatePost.php`                     |
| `php hunter make:model Post`                   | `src/Models/Post.php`                            |
| `php hunter make:model Post -m`                | Model + migration                                |
| `php hunter make:model Post -f`                | Model + factory                                  |
| `php hunter make:model Post -c`                | Model + controller                               |
| `php hunter make:model Post -mfc`              | Model + migration + factory + controller         |
| `php hunter make:controller PostController`    | `src/Http/Controllers/PostController.php`        |
| `php hunter make:resource PostResource`        | `src/Http/Resources/PostResource.php`            |
| `php hunter make:request StorePostRequest`     | `src/Http/Requests/StorePostRequest.php`         |
| `php hunter make:middleware EnsurePostAccess`  | `src/Http/Middleware/EnsurePostAccess.php`       |
| `php hunter make:migration create_posts_table` | `database/migrations/xxx_create_posts_table.php` |
| `php hunter make:factory PostFactory`          | `database/factories/PostFactory.php`             |
| `php hunter make:seeder PostSeeder`            | `database/seeders/PostSeeder.php`                |
| `php hunter make:test PostTest`                | `tests/Feature/PostTest.php`                     |
| `php hunter make:test PostTest --unit`         | `tests/Unit/PostTest.php`                        |

#### Frontend Commands

| Command                               | Output                                           |
| ------------------------------------- | ------------------------------------------------ |
| `php hunter make:page posts/index`    | `resources/js/pages/:ModuleName/posts/index.tsx` |
| `php hunter make:page posts/show`     | `resources/js/pages/:ModuleName/posts/show.tsx`  |
| `php hunter make:component post-card` | `resources/js/components/post-card.tsx`          |

#### Artisan Commands

Any command not recognized by Hunter CLI is passed to `php dev/artisan`:

```bash
php hunter migrate
php hunter migrate:status
php hunter tinker
php hunter route:list
php hunter db:seed
```

### Project Structure

```
hunter-:module_slug/
├── src/
│   ├── Actions/           # Action classes
│   ├── Http/
│   │   ├── Controllers/   # Controllers
│   │   ├── Middleware/    # Middleware
│   │   ├── Requests/      # Form requests
│   │   └── Resources/     # API resources
│   ├── Models/            # Eloquent models
│   └── :ModuleNameServiceProvider.php
├── config/
│   └── :module_slug.php   # Module configuration
├── database/
│   ├── factories/         # Model factories
│   ├── migrations/        # Database migrations
│   └── seeders/           # Database seeders
├── resources/
│   └── js/
│       ├── components/    # React components
│       └── pages/         # Inertia pages
│           └── :ModuleName/
├── routes/
│   └── :module_slug.php   # Module routes
├── tests/
│   ├── Feature/           # Feature tests
│   └── Unit/              # Unit tests
├── dev/                   # Development environment (gitignored)
├── stubs/                 # File generation templates
└── hunter                 # CLI script
```

### Adding Routes

Define routes in `routes/:module_slug.php`:

```php
use Inertia\Inertia;

Route::get('/:module_slug', fn () => Inertia::render(':ModuleName/Index'))->name(':module_slug.index');
Route::get('/:module_slug/posts', fn () => Inertia::render(':ModuleName/posts/index'))->name(':module_slug.posts.index');
```

### Creating Pages

Add React pages in `resources/js/pages/:ModuleName/`:

```tsx
// resources/js/pages/:ModuleName/posts/index.tsx
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AppLayout>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Posts</h1>
            </div>
        </AppLayout>
    );
}
```

### Creating Components

Add React components in `resources/js/components/`:

```tsx
// resources/js/components/post-card.tsx
export function PostCard({ post }: { post: Post }) {
    return (
        <div className="rounded-lg border p-4">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-muted-foreground">{post.excerpt}</p>
        </div>
    );
}
```

## Testing

```bash
# Run all tests
composer test

# Run specific test
php hunter test --filter=PostTest

# Run with coverage
composer test:coverage
```

## Code Quality

```bash
# Format code with Pint
composer format

# Run static analysis with PHPStan
composer analyse
```

## Releasing

This package uses [release-it](https://github.com/release-it/release-it) for releases:

```bash
npm run release
```

This will:

- Run all tests
- Bump the version based on conventional commits
- Generate/update CHANGELOG.md
- Create a git tag
- Push to GitHub
- Create a GitHub release

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [:author_name](https://github.com/:vendor_slug)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
