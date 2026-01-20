<?php

declare(strict_types=1);

namespace Workbench\App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Workbench\App\Models\User;

/**
 * Auto-login middleware for workbench development.
 * Logs in a dev user automatically before the auth check runs.
 */
final class WorkbenchAuth extends Authenticate
{
    public function handle($request, Closure $next, ...$guards): Response
    {
        try {
            if (! Auth::check()) {
                Auth::login($this->getOrCreateDevUser());
            }
        } catch (Throwable) {
            Auth::login($this->getOrCreateDevUser());
        }

        return parent::handle($request, $next, ...$guards);
    }

    private function getOrCreateDevUser(): User
    {
        return User::firstOrCreate(
            ['email' => 'dev@hunter.local'],
            ['name' => 'Dev User', 'password' => bcrypt('password')]
        );
    }
}
