<?php

declare(strict_types=1);

namespace Workbench\App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Override;

final class HandleInertiaRequests extends Middleware
{
    /**
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * @see https://inertiajs.com/asset-versioning
     */
    #[Override]
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    #[Override]
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name', 'Hunter Workbench'),
            'quote' => ['message' => 'Build something amazing.', 'author' => 'Hunter'],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'moduleNavigation' => fn () => app()->bound('hunter.modules')
                ? array_map(fn ($item) => $item->toArray(), app('hunter.modules')->navigation())
                : [],
        ];
    }
}
