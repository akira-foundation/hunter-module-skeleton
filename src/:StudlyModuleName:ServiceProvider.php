<?php

declare(strict_types=1);

namespace :VendorNamespace:\:StudlyModuleName:;

use Hunter\Module\Contracts\ModuleServiceProvider;
use Hunter\Module\Module\Module;
use Hunter\Module\Navigation\NavGroup;
use Hunter\Module\Navigation\NavItem;
use Override;

final class :StudlyModuleName:ServiceProvider extends ModuleServiceProvider
{
    #[Override]
    public function configureModule(Module $module): void
    {
        $module
            ->identifier(':module_slug')
            ->name(':module_title')
            ->description(':package_description')
            ->hasConfig()
            ->hasRoutes()
            ->navigation([
                NavGroup::make(':module_title')
                    ->icon('Package')
                    ->order(10)
                    ->items([
                        NavItem::make('Overview')
                            ->route(':module_slug.index')
                            ->icon('LayoutGrid')
                            ->order(1),
                    ]),
            ]);
    }
}
