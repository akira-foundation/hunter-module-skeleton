<?php

declare(strict_types=1);

namespace Workbench\App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as LaravelAuthenticate;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Workbench\App\Models\User;

/**
 * Workbench Authenticate middleware with auto-login for development.
 */
final class Authenticate extends LaravelAuthenticate
{
    public function handle($request, Closure $next, ...$guards): Response
    {
        if (! Auth::check()) {
            $user = new User([
                'id' => 1,
                'name' => 'Dev User',
                'email' => 'dev@hunter.local',
            ]);

            Auth::setUser($user);
        }

        return parent::handle($request, $next, ...$guards);
    }
}
