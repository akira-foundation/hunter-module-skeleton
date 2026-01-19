<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Welcome'));

// Workbench routes for module pages (no auth required)
Route::prefix(':module_slug')
    ->name(':module_slug.')
    ->group(function (): void {
        Route::get('/', fn () => inertia(':StudlyModuleName:/Index'))->name('index');
    });
