<?php

declare(strict_types=1);

namespace Workbench\App\Providers;

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Workbench\App\Http\Middleware\HandleInertiaRequests;

final class WorkbenchServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        View::addLocation(__DIR__ . '/../../resources/views');

        // Register HandleInertiaRequests middleware
        /** @var Kernel $kernel */
        $kernel = $this->app->make(Kernel::class);
        $kernel->appendMiddlewareToGroup('web', HandleInertiaRequests::class);
    }
}
