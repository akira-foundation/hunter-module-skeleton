<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Dev replacement for module.active middleware.
 * Always allows access since we're in development mode.
 */
final class EnsureModuleActive
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next, string $moduleIdentifier): Response
    {
        return $next($request);
    }
}
