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
            ->name(':module_name')
            ->description(':package_description')
            ->hasConfig()
            ->hasRoutes()
            ->navigation([
                NavItem::make(':module_name')
                    ->route(':module_slug.index')
                    ->icon('LayoutGrid')
                    ->order(10),

                NavGroup::make(':module_name Group')
                    ->icon('FolderOpen')
                    ->order(20)
                    ->items([
                        NavItem::make('Overview')
                            ->route(':module_slug.index')
                            ->icon('Home')
                            ->order(1),

                        NavItem::make('Settings')
                            ->route(':module_slug.index')
                            ->icon('Settings')
                            ->order(2),
                    ]),
            ]);
    }
}
