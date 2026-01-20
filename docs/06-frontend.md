# Frontend

Hunter modules use React 19 with Inertia.js 2 for the frontend. This guide covers creating pages and components.

## Technology Stack

- **React 19** - UI library
- **Inertia.js 2** - SPA adapter for Laravel
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS
- **Vite** - Build tool with HMR

## Creating Pages

Pages are Inertia components that correspond to routes. Generate a page with:

```bash
php hunter make:page posts/index
```

This creates `resources/js/pages/posts/index.tsx`:

```tsx
export default function Index() {
    return (
        <div>
            <h1>Index</h1>
        </div>
    );
}
```

### Receiving Props

Pages receive data from controllers as props:

```tsx
interface Props {
    posts: {
        id: string;
        title: string;
        content: string;
    }[];
}

export default function Index({ posts }: Props) {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}
```

### Passing Data from Controllers

```php
<?php

namespace Acme\Blog\Http\Controllers;

use Acme\Blog\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

final class PostController
{
    public function index(): Response
    {
        return Inertia::render('blog/posts/index', [
            'posts' => Post::all(),
        ]);
    }
}
```

## Creating Components

Reusable components live in `resources/js/components/`. Generate one with:

```bash
php hunter make:component PostCard
```

This creates `resources/js/components/PostCard.tsx`:

```tsx
export function PostCard() {
    return <div>PostCard Component</div>;
}
```

### Component with Props

```tsx
interface PostCardProps {
    title: string;
    excerpt: string;
    href: string;
}

export function PostCard({ title, excerpt, href }: PostCardProps) {
    return (
        <a href={href} className="block p-4 border rounded-lg hover:bg-gray-50">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-gray-600">{excerpt}</p>
        </a>
    );
}
```

## Navigation

Use Inertia's `Link` component for client-side navigation:

```tsx
import { Link } from "@inertiajs/react";

export function Navigation() {
    return (
        <nav>
            <Link href="/blog/posts">Posts</Link>
            <Link href="/blog/categories">Categories</Link>
        </nav>
    );
}
```

### Programmatic Navigation

```tsx
import { router } from "@inertiajs/react";

function handleClick() {
    router.visit("/blog/posts");
}

// Or with options
router.visit("/blog/posts", {
    method: "get",
    preserveState: true,
    preserveScroll: true,
});
```

## Forms

Use Inertia's `useForm` hook for form handling:

```tsx
import { useForm } from "@inertiajs/react";

export function CreatePostForm() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/blog/posts");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                />
                {errors.content && (
                    <p className="text-red-500">{errors.content}</p>
                )}
            </div>

            <button type="submit" disabled={processing}>
                Create Post
            </button>
        </form>
    );
}
```

## Inertia 2 Features

### Deferred Props

Load data lazily for better performance:

```php
// Controller
return Inertia::render('blog/posts/index', [
    'posts' => Post::all(),
    'stats' => Inertia::defer(fn () => $this->calculateStats()),
]);
```

```tsx
// Page component
interface Props {
    posts: Post[];
    stats?: Stats;
}

export default function Index({ posts, stats }: Props) {
    return (
        <div>
            <PostList posts={posts} />
            {stats ? (
                <StatsPanel stats={stats} />
            ) : (
                <StatsSkeleton /> {/* Show loading state */}
            )}
        </div>
    );
}
```

### Polling

Refresh data automatically:

```tsx
import { usePoll } from "@inertiajs/react";

export default function Dashboard() {
    usePoll(5000); // Refresh every 5 seconds

    return <div>...</div>;
}
```

### Prefetching

Prefetch pages on hover:

```tsx
import { Link } from "@inertiajs/react";

<Link href="/blog/posts/1" prefetch>
    View Post
</Link>;
```

## File Organization

```
resources/js/
├── components/           # Reusable components
│   ├── PostCard.tsx
│   └── Pagination.tsx
├── pages/                # Inertia pages
│   └── posts/
│       ├── index.tsx
│       ├── show.tsx
│       └── create.tsx
├── hooks/                # Custom React hooks
│   └── useDebounce.ts
├── types/                # TypeScript types
│   └── index.d.ts
└── app.tsx               # Application entry
```

---

**Previous:** [Development](05-development.md) | **Next:** [Testing](07-testing.md)
