<?php

declare(strict_types=1);

namespace App\Providers;

use App\Http\Middleware\EnsureModuleActive;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Override;

final class AppServiceProvider extends ServiceProvider
{
    #[Override]
    public function register(): void {}

    public function boot(): void
    {
        $this->bootModelsDefaults();
        $this->bootPasswordDefaults();
        $this->overrideModuleActiveMiddleware();
    }

    private function bootModelsDefaults(): void
    {
        Model::unguard();
    }

    private function bootPasswordDefaults(): void
    {
        Password::defaults(fn () => app()->isLocal() || app()->runningUnitTests() ? Password::min(12)->max(255) : Password::min(12)->max(255)->uncompromised());
    }

    /**
     * Override the module.active middleware from hunter-module package.
     * In dev environment, we always allow access to the module.
     */
    private function overrideModuleActiveMiddleware(): void
    {
        /** @var Router $router */
        $router = $this->app->make(Router::class);
        $router->aliasMiddleware('module.active', EnsureModuleActive::class);
    }
}
