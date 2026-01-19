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

## Local Development with Workbench

This module includes a workbench environment powered by [Orchestra Testbench](https://packages.tools/testbench.html) that allows you to develop and test the module without installing it in a full Hunter application.

### Setup

```bash
# Install PHP dependencies
composer install

# Install workbench JS dependencies
cd workbench && npm install

# Build workbench assets
npm run build
```

### Running the Workbench

```bash
# Start the development server
php vendor/bin/testbench serve --host=127.0.0.1 --port=8088

# Then open http://127.0.0.1:8088 in your browser
```

### Workbench Features

- Full Inertia + React environment matching Hunter's stack
- Module navigation automatically appears in the sidebar
- Light/dark theme toggle for testing both modes
- Auto-layout injection for module pages (no need to wrap pages in layouts)
- Hot module replacement when running `npm run dev` in the workbench directory

### Adding Routes

Define routes in `workbench/routes/web.php`:

```php
use Inertia\Inertia;

Route::get('/:module_slug', fn () => Inertia::render(':ModuleName/Index'));
```

### Creating Pages

Add React pages in `resources/js/pages/:ModuleName/`:

```tsx
// resources/js/pages/:ModuleName/Index.tsx
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <>
            <Head title=":module_name" />
            <div className="p-6">
                <h1>:module_name</h1>
            </div>
        </>
    );
}
```

Pages are automatically wrapped with the workbench layout.

## Testing

```bash
composer test
```

## Releasing

This package uses [release-it](https://github.com/release-it/release-it) for releases. To create a new release:

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
