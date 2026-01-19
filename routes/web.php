<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use :VendorNamespace:\:StudlyModuleName:\Http\Controllers\:StudlyModuleName:Controller;

Route::middleware(['web', 'auth', 'module.active::module_slug'])
    ->prefix(':module_slug')
    ->name(':module_slug.')
    ->group(function (): void {
        Route::get('/', [:StudlyModuleName:Controller::class, 'index'])->name('index');
    });
