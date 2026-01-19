<?php

declare(strict_types=1);

namespace :VendorNamespace:\:StudlyModuleName:;

use Hunter\Module\Contracts\ModuleServiceProvider;
use Hunter\Module\Module\Module;
use Override;

final class :StudlyModuleName:ServiceProvider extends ModuleServiceProvider
{
    #[Override]
    public function configureModule(Module $module): void
    {
        $module
            ->identifier(':module_slug')
            ->name(':module_name')
            ->description(':package_description')
            ->hasConfig()
            ->hasRoutes();
    }
}
