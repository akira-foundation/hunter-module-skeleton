# Hunter CLI

The Hunter CLI (`hunter`) is a command-line tool for module development. It provides code generation commands and wraps common development tasks.

## Usage

```bash
php hunter <command> [arguments]
```

## Commands

### install

Initialize a new module from the skeleton:

```bash
php hunter install
```

This command:

- Prompts for vendor name, package name, and module name
- Replaces all placeholder variables in the codebase
- Sets up the module namespace

### serve

Start the development server:

```bash
php hunter serve
```

This launches the workbench Laravel application with your module loaded.

### Code Generation Commands

All `make:*` commands generate files using stubs from the `/stubs` directory. Generated files are automatically namespaced to your module.

#### make:action

Generate an Action class:

```bash
php hunter make:action CreatePost
```

Creates `src/Actions/CreatePost.php` with a `handle()` method.

#### make:model

Generate an Eloquent model:

```bash
php hunter make:model Post
```

Creates `src/Models/Post.php`.

#### make:controller

Generate a controller:

```bash
php hunter make:controller PostController
```

Creates `src/Http/Controllers/PostController.php`.

#### make:resource

Generate an API resource:

```bash
php hunter make:resource PostResource
```

Creates `src/Http/Resources/PostResource.php`.

#### make:request

Generate a form request:

```bash
php hunter make:request StorePostRequest
```

Creates `src/Http/Requests/StorePostRequest.php`.

#### make:middleware

Generate middleware:

```bash
php hunter make:middleware EnsurePostExists
```

Creates `src/Http/Middleware/EnsurePostExists.php`.

#### make:migration

Generate a migration:

```bash
# Create table migration
php hunter make:migration create_posts_table

# Update table migration
php hunter make:migration add_slug_to_posts_table
```

Creates a timestamped migration in `database/migrations/`.

- Migrations starting with `create_` use the create table stub
- Other migrations use the update table stub

#### make:factory

Generate a model factory:

```bash
php hunter make:factory PostFactory
```

Creates `database/factories/PostFactory.php`.

#### make:seeder

Generate a database seeder:

```bash
php hunter make:seeder PostSeeder
```

Creates `database/seeders/PostSeeder.php`.

#### make:test

Generate a test:

```bash
# Feature test (default)
php hunter make:test PostTest

# Unit test
php hunter make:test PostTest --unit
```

Creates tests in `tests/Feature/` or `tests/Unit/`.

#### make:page

Generate an Inertia page component:

```bash
php hunter make:page posts/index
```

Creates `resources/js/pages/posts/index.tsx`.

#### make:component

Generate a React component:

```bash
php hunter make:component PostCard
```

Creates `resources/js/components/PostCard.tsx`.

## Artisan Passthrough

Any command not recognized by Hunter CLI is passed to Laravel Artisan:

```bash
php hunter migrate
php hunter tinker
php hunter route:list
```

This runs the equivalent `php workbench/artisan` command.

## Customizing Stubs

All code generation stubs are located in `/stubs`. You can customize them to match your coding style:

```
stubs/
├── action.stub
├── component.stub
├── controller.stub
├── factory.stub
├── middleware.stub
├── migration.create.stub
├── migration.update.stub
├── model.stub
├── page.stub
├── request.stub
├── resource.stub
├── seeder.stub
├── test.stub
└── test.unit.stub
```

Stubs use placeholders that are replaced during generation:

| Placeholder       | Description                      |
| ----------------- | -------------------------------- |
| `{{ namespace }}` | The class namespace              |
| `{{ class }}`     | The class name                   |
| `{{ table }}`     | Database table name (migrations) |

---

**Previous:** [Configuration](02-configuration.md) | **Next:** [Structure](04-structure.md)
