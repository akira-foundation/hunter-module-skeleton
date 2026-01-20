<?php

declare(strict_types=1);

namespace App\Http\Middleware;

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
            'name' => config('app.name', 'Hunter Dev'),
            'quote' => ['message' => 'Build something amazing.', 'author' => 'Hunter'],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'moduleNavigation' => fn () => $this->getModuleNavigation(),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function getModuleNavigation(): array
    {
        if (! app()->bound('hunter.modules')) {
            return [];
        }

        return array_map(
            static fn ($item): array => $item->toArray(),
            app('hunter.modules')->navigation(),
        );
    }
}
