<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'module.active::module_slug'])
    ->prefix(':module_slug')
    ->name(':module_slug.')
    ->group(function (): void {
        Route::get('/', fn () => inertia(':StudlyModuleName:/Index'))->name('index');
        Route::get('/items', fn () => inertia(':StudlyModuleName:/Items'))->name('items');
        Route::get('/archive', fn () => inertia(':StudlyModuleName:/Archive'))->name('archive');

        Route::get('/analytics', fn () => inertia(':StudlyModuleName:/Analytics'))->name('analytics');
        Route::get('/export', fn () => inertia(':StudlyModuleName:/Export'))->name('export');

        Route::get('/settings', fn () => inertia(':StudlyModuleName:/Settings'))->name('settings');
    });
