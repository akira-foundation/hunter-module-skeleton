<?php

declare(strict_types=1);

namespace :VendorNamespace:\:StudlyModuleName:;

use Hunter\Module\Module\ModuleServiceProvider;
use Override;
use Spatie\LaravelPackageTools\Package;

final class :StudlyModuleName:ServiceProvider extends ModuleServiceProvider
{
    #[Override]
    public function configurePackage(Package $package): void
    {
        $package
            ->name(':module_slug')
            ->hasConfigFile()
            ->hasRoutes('web');
    }

    #[Override]
    protected function moduleIdentifier(): string
    {
        return ':module_slug';
    }

    #[Override]
    protected function moduleName(): string
    {
        return ':module_name';
    }

    #[Override]
    protected function moduleDescription(): string
    {
        return ':package_description';
    }

    #[Override]
    protected function registerNavigation(): void
    {
        // Register your navigation items here
        // Example:
        // $this->nav(
        //     NavItem::make(':module_name', '/:module_slug')
        //         ->icon('icon-name')
        // );
    }
}
