<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/:module_slug');
Route::redirect('/login', '/:module_slug')->name('login');
