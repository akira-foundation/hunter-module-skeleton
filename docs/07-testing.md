# Testing

Hunter modules use Pest PHP 4 for testing with Orchestra Testbench for Laravel package testing.

## Test Structure

```
tests/
├── Feature/            # Integration tests
│   └── PostTest.php
├── Unit/               # Unit tests
│   └── CreatePostTest.php
├── ArchTest.php        # Architecture tests
├── Pest.php            # Pest configuration
└── TestCase.php        # Base test case
```

## Running Tests

```bash
# Run all tests
php hunter test

# Run specific file
php hunter test tests/Feature/PostTest.php

# Filter by test name
php hunter test --filter="can create post"

# With coverage
php hunter test --coverage
```

## Writing Tests

### Feature Tests

Generate a feature test:

```bash
php hunter make:test PostTest
```

Creates `tests/Feature/PostTest.php`:

```php
<?php

declare(strict_types=1);

it('can list posts', function () {
    $response = $this->get('/blog/posts');

    $response->assertOk();
});

it('can create a post', function () {
    $response = $this->post('/blog/posts', [
        'title' => 'My First Post',
        'content' => 'Hello, world!',
    ]);

    $response->assertRedirect('/blog/posts');
    $this->assertDatabaseHas('posts', [
        'title' => 'My First Post',
    ]);
});

it('validates required fields', function () {
    $response = $this->post('/blog/posts', []);

    $response->assertSessionHasErrors(['title', 'content']);
});
```

### Unit Tests

Generate a unit test:

```bash
php hunter make:test CreatePostTest --unit
```

Creates `tests/Unit/CreatePostTest.php`:

```php
<?php

declare(strict_types=1);

use Acme\Blog\Actions\CreatePost;
use Acme\Blog\Models\Post;

it('creates a post', function () {
    $action = new CreatePost();

    $post = $action->handle([
        'title' => 'Test Post',
        'content' => 'Test content',
    ]);

    expect($post)
        ->toBeInstanceOf(Post::class)
        ->and($post->title)->toBe('Test Post');
});
```

## TestCase

The base `TestCase` class extends Orchestra Testbench:

```php
<?php

declare(strict_types=1);

namespace Acme\Blog\Tests;

use Acme\Blog\BlogServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

abstract class TestCase extends Orchestra
{
    protected function getPackageProviders($app): array
    {
        return [
            BlogServiceProvider::class,
        ];
    }

    protected function defineDatabaseMigrations(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
    }
}
```

## Architecture Tests

The skeleton includes architecture tests in `tests/ArchTest.php`:

```php
<?php

declare(strict_types=1);

arch('no debugging functions')
    ->expect(['dd', 'dump', 'ray', 'var_dump', 'print_r'])
    ->not->toBeUsed();

arch('actions have handle method')
    ->expect('Acme\Blog\Actions')
    ->toHaveMethod('handle');

arch('controllers are final')
    ->expect('Acme\Blog\Http\Controllers')
    ->toBeFinal();
```

## Testing with Factories

Use model factories for test data:

```php
<?php

use Acme\Blog\Models\Post;

it('displays post title', function () {
    $post = Post::factory()->create([
        'title' => 'My Awesome Post',
    ]);

    $response = $this->get("/blog/posts/{$post->id}");

    $response
        ->assertOk()
        ->assertSee('My Awesome Post');
});
```

### Factory Definition

```php
<?php

declare(strict_types=1);

namespace Acme\Blog\Database\Factories;

use Acme\Blog\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
final class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'content' => fake()->paragraphs(3, true),
            'published_at' => fake()->optional()->dateTime(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'published_at' => now(),
        ]);
    }
}
```

## Testing Authentication

For routes requiring authentication:

```php
<?php

use Workbench\App\Models\User;

it('requires authentication', function () {
    $response = $this->get('/blog/posts/create');

    $response->assertRedirect('/login');
});

it('allows authenticated users', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/blog/posts/create');

    $response->assertOk();
});
```

## Testing Inertia Responses

Test Inertia page renders:

```php
<?php

use Acme\Blog\Models\Post;
use Inertia\Testing\AssertableInertia;

it('renders posts index page', function () {
    Post::factory()->count(3)->create();

    $response = $this->get('/blog/posts');

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('blog/posts/index')
        ->has('posts', 3)
    );
});
```

## Datasets

Use datasets for parameterized tests:

```php
<?php

dataset('invalid titles', [
    'empty' => [''],
    'too short' => ['ab'],
    'too long' => [str_repeat('a', 256)],
]);

it('rejects invalid titles', function (string $title) {
    $response = $this->post('/blog/posts', [
        'title' => $title,
        'content' => 'Valid content',
    ]);

    $response->assertSessionHasErrors('title');
})->with('invalid titles');
```

## Browser Testing (Pest 4)

Pest 4 includes browser testing capabilities:

```php
<?php

it('can create post via form', function () {
    $page = visit('/blog/posts/create');

    $page
        ->assertSee('Create Post')
        ->fill('title', 'My New Post')
        ->fill('content', 'Post content here')
        ->click('Create')
        ->assertSee('Post created successfully');
});
```

## Coverage

Generate test coverage reports:

```bash
php hunter test --coverage

# With minimum threshold
php hunter test --coverage --min=80
```

---

**Previous:** [Frontend](06-frontend.md) | **Next:** [Publishing](08-publishing.md)
