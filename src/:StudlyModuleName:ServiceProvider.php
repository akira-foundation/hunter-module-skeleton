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
                // Solo NavItem - appears at the top level
                NavItem::make('Dashboard')
                    ->route(':module_slug.index')
                    ->icon('LayoutDashboard')
                    ->order(1),

                // NavGroup with collapsible items
                NavGroup::make(':module_title')
                    ->icon('Package')
                    ->order(10)
                    ->collapsible()
                    ->items([
                        NavItem::make('Overview')
                            ->route(':module_slug.index')
                            ->icon('LayoutGrid')
                            ->order(1),
                        NavItem::make('Items')
                            ->route(':module_slug.items')
                            ->icon('List')
                            ->badge('New')
                            ->order(2),
                        NavItem::make('Archive')
                            ->route(':module_slug.archive')
                            ->icon('Archive')
                            ->order(3),
                    ]),

                // Another NavGroup - starts collapsed
                NavGroup::make('Reports')
                    ->icon('BarChart3')
                    ->order(20)
                    ->collapsible()
                    ->collapsed()
                    ->items([
                        NavItem::make('Analytics')
                            ->route(':module_slug.analytics')
                            ->icon('TrendingUp')
                            ->order(1),
                        NavItem::make('Export')
                            ->route(':module_slug.export')
                            ->icon('Download')
                            ->order(2),
                    ]),

                // External link - Hunter Module documentation
                NavItem::make('Documentation')
                    ->href('https://github.com/akira-foundation/hunter-module-skeleton/blob/1.x/docs/01-installation.md')
                    ->icon('BookOpen')
                    ->external()
                    ->order(80),

                // Solo NavItem at the bottom
                NavItem::make('Settings')
                    ->route(':module_slug.settings')
                    ->icon('Settings')
                    ->order(99),
            ]);
    }
}
