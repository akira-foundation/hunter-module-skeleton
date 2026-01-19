<?php

declare(strict_types=1);

namespace :VendorNamespace:\:StudlyModuleName:\Tests;

use :VendorNamespace:\:StudlyModuleName:\:StudlyModuleName:ServiceProvider;
use Akira\Debugger\DebuggerServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Orchestra\Testbench\TestCase as Orchestra;
use Override;

abstract class TestCase extends Orchestra
{
    #[Override]
    protected function setUp(): void
    {
        parent::setUp();

        Factory::guessFactoryNamesUsing(
            static fn (string $modelName): string => ':VendorNamespace:\:StudlyModuleName:\Database\Factories\\' . class_basename($modelName) . 'Factory',
        );
    }

    protected function getEnvironmentSetUp($app): void
    {
        config()->set('database.default', 'testing');
    }

    protected function getPackageProviders($app): array
    {
        return [
            :StudlyModuleName:ServiceProvider::class,
            DebuggerServiceProvider::class,
        ];
    }
}
