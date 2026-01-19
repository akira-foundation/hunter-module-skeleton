<?php

declare(strict_types=1);

namespace :VendorNamespace:\:StudlyModuleName:\Http\Controllers;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;

final class :StudlyModuleName:Controller extends Controller
{
    public function index(): Response
    {
        return Inertia::render(':module_slug/index');
    }
}
