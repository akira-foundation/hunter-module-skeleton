# Configuration

Hunter modules are configured through the service provider and an optional config file.

## Service Provider

The service provider is the heart of your module. It extends `ModuleServiceProvider` from the `hunter-module` package and defines how your module integrates with Hunter.

```php
<?php

declare(strict_types=1);

namespace Acme\Blog;

use Akira\HunterModule\Module;
use Akira\HunterModule\ModuleServiceProvider;
use Akira\HunterModule\Navigation\NavGroup;
use Akira\HunterModule\Navigation\NavItem;

final class BlogServiceProvider extends ModuleServiceProvider
{
    public function module(): Module
    {
        return Module::make()
            ->identifier('blog')
            ->name('Blog')
            ->description('A blogging module for Hunter')
            ->hasConfig()
            ->hasRoutes()
            ->navigation(fn () => [
                NavGroup::make('Blog')
                    ->icon('book-open')
                    ->order(10)
                    ->items([
                        NavItem::make('Posts')
                            ->route('blog.posts.index')
                            ->icon('file-text'),
                        NavItem::make('Categories')
                            ->route('blog.categories.index')
                            ->icon('folder'),
                    ]),
            ]);
    }
}
```

## Module Configuration

The `Module` class provides a fluent API for configuring your module:

### Basic Information

```php
Module::make()
    ->identifier('blog')      // Unique module identifier
    ->name('Blog')            // Display name
    ->description('...')      // Module description
```

### Features

```php
Module::make()
    ->hasConfig()             // Enable config file publishing
    ->hasRoutes()             // Enable route registration
```

## Navigation

Hunter modules can register navigation items that appear in the Hunter admin sidebar.

### NavGroup

Groups organize related navigation items:

```php
NavGroup::make('Blog')
    ->icon('book-open')       // Lucide icon name
    ->order(10)               // Sort order (lower = higher)
    ->collapsible()           // Allow collapsing
    ->collapsed()             // Start collapsed
    ->items([...])            // Navigation items
```

### NavItem

Individual navigation links:

```php
NavItem::make('Posts')
    ->route('blog.posts.index')   // Named route
    ->icon('file-text')           // Lucide icon name
    ->badge('New')                // Optional badge text
    ->order(1)                    // Sort order within group

// External links
NavItem::make('Documentation')
    ->href('https://docs.example.com')
    ->external()                  // Opens in new tab
```

## Config File

The module config file is located at `config/{module_slug}.php`:

```php
<?php

return [
    'enabled' => true,
];
```

When installed in a Hunter application, users can publish this config:

```bash
php artisan vendor:publish --tag=blog-config
```

## Routes

Module routes are defined in `routes/{module_slug}.php`:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'module.active:blog'])
    ->prefix('blog')
    ->name('blog.')
    ->group(function () {
        Route::get('/', fn () => inertia('blog/index'))->name('index');
    });
```

The `module.active` middleware ensures routes are only accessible when the module is enabled.

---

**Previous:** [Installation](01-installation.md) | **Next:** [CLI](03-cli.md)
