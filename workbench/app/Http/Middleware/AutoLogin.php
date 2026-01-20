<?php

declare(strict_types=1);

namespace Workbench\App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Workbench\App\Models\User;

/**
 * Auto-login middleware for workbench development.
 * Creates and logs in a dev user using proper session authentication.
 */
final class AutoLogin
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $isAuthenticated = Auth::check();
        } catch (Throwable) {
            // Session has stale user_id after database reset
            $isAuthenticated = false;
            Auth::logout();
            $request->session()->invalidate();
        }

        if (! $isAuthenticated) {
            $user = User::firstOrCreate(
                ['email' => 'dev@hunter.local'],
                [
                    'name' => 'Dev User',
                    'password' => bcrypt('password'),
                ]
            );

            Auth::login($user, remember: true);
        }

        return $next($request);
    }
}
