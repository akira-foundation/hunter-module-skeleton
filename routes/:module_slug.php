<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'module.active::module_slug'])
    ->prefix(':module_slug')
    ->name(':module_slug.')
    ->group(function (): void {
        Route::get('/', fn () => inertia(':StudlyModuleName:/Index'))->name('index');
    });
