# Development

This guide covers the development workflow for Hunter modules.

## Starting the Development Server

The module includes a workbench Laravel application for development:

```bash
php hunter serve
```

This starts:

- PHP development server (default: `http://localhost:8000`)
- Vite dev server for hot module replacement

## Development Workflow

### 1. Create Your Module

```bash
npx create-hunter-module my-module
cd my-module
```

### 2. Start Development Server

```bash
php hunter serve
```

### 3. Generate Code

Use the Hunter CLI to scaffold code:

```bash
# Create a model with migration and factory
php hunter make:model Post
php hunter make:migration create_posts_table
php hunter make:factory PostFactory

# Create controller and form request
php hunter make:controller PostController
php hunter make:request StorePostRequest

# Create frontend page
php hunter make:page posts/index
```

### 4. Run Migrations

```bash
php hunter migrate
```

### 5. Write Tests

```bash
php hunter make:test PostTest
php hunter test
```

## The Workbench Environment

The `/workbench` directory contains a minimal Laravel application that:

- Loads your module automatically via the service provider
- Provides authentication scaffolding for testing protected routes
- Includes a SQLite database for development
- Runs Vite for frontend asset compilation

### Workbench Structure

```
workbench/
├── app/
│   ├── Console/Commands/       # Development commands
│   ├── Http/Middleware/        # Auth middleware
│   └── Providers/              # Workbench providers
├── bootstrap/
│   └── app.php                 # Application bootstrap
├── config/                     # Laravel config
├── database/
│   └── database.sqlite         # Development database
├── resources/
│   └── views/                  # Blade views (app shell)
├── routes/
│   └── web.php                 # Workbench routes
└── storage/                    # Logs, cache, etc.
```

### Workbench Authentication

The workbench includes automatic authentication for development. When you visit any protected route, a test user is created and logged in automatically.

## Database

### Running Migrations

Module migrations are run against the workbench database:

```bash
php hunter migrate

# Fresh migration (drops all tables)
php hunter migrate:fresh

# With seeders
php hunter migrate:fresh --seed
```

### Seeding Data

```bash
php hunter db:seed
```

## Code Quality

### Linting

Run Laravel Pint for code formatting:

```bash
vendor/bin/pint
```

### Static Analysis

Run PHPStan/Larastan:

```bash
vendor/bin/phpstan analyse
```

### Tests

Run the test suite:

```bash
php hunter test

# With coverage
php hunter test --coverage
```

## Vite Configuration

The module uses Vite for frontend asset bundling. Configuration is in `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.tsx"],
            refresh: true,
        }),
        react(),
    ],
});
```

## Debugging

### Laravel Logs

View logs in `workbench/storage/logs/laravel.log`.

### Tinker

Access the Laravel REPL:

```bash
php hunter tinker
```

### Route List

View registered routes:

```bash
php hunter route:list
```

---

**Previous:** [Structure](04-structure.md) | **Next:** [Frontend](06-frontend.md)
