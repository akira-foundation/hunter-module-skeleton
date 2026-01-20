<?php

declare(strict_types=1);

namespace Workbench\App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Workbench\App\Console\Commands\HunterKeyCommand;
use Workbench\App\Console\Commands\HunterMigrateCommand;
use Workbench\App\Console\Commands\HunterServeCommand;
use Workbench\App\Http\Middleware\EnsureModuleActive;
use Workbench\App\Http\Middleware\HandleInertiaRequests;
use Workbench\App\Http\Middleware\WorkbenchAuth;
use Workbench\App\Models\User;

final class WorkbenchServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app['config']->set('auth.providers.users.model', User::class);
    }

    public function boot(): void
    {
        View::addLocation(__DIR__.'/../../resources/views');

        /** @var Router $router */
        $router = $this->app->make(Router::class);

        // Register middleware aliases
        $router->aliasMiddleware('module.active', EnsureModuleActive::class);
        $router->aliasMiddleware('auth', WorkbenchAuth::class);

        $router->pushMiddlewareToGroup('web', HandleInertiaRequests::class);

        $this->commands([
            HunterKeyCommand::class,
            HunterMigrateCommand::class,
            HunterServeCommand::class,
        ]);
    }
}
