<?php

declare(strict_types=1);

namespace Workbench\App\Providers;

use Illuminate\Contracts\Http\Kernel as HttpKernelContract;
use Illuminate\Foundation\Http\Kernel;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Workbench\App\Http\Middleware\Authenticate;
use Workbench\App\Http\Middleware\EnsureModuleActive;
use Workbench\App\Http\Middleware\HandleInertiaRequests;
use Workbench\App\Models\User;

use function Orchestra\Testbench\after_resolving;

final class WorkbenchServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app['config']->set('auth.providers.users.model', User::class);

        // Override 'auth' middleware alias AFTER testbench sets its defaults
        after_resolving($this->app, HttpKernelContract::class, function (Kernel $kernel): void {
            $kernel->setMiddlewareAliases(array_merge(
                $kernel->getMiddlewareAliases(),
                ['auth' => Authenticate::class],
            ));

            // Add HandleInertiaRequests to web middleware group
            $kernel->appendMiddlewareToGroup('web', HandleInertiaRequests::class);
        });
    }

    public function boot(): void
    {
        View::addLocation(__DIR__ . '/../../resources/views');

        // Override module.active AFTER HunterModuleServiceProvider registers it
        $this->app->booted(function (): void {
            /** @var Router $router */
            $router = $this->app->make(Router::class);
            $router->aliasMiddleware('module.active', EnsureModuleActive::class);
        });
    }
}
