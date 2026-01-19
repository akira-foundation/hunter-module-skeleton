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
