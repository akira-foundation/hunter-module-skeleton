<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Process;

use function Laravel\Prompts\info;
use function Laravel\Prompts\spin;
use function Laravel\Prompts\warning;

final class HunterInstallCommand extends Command
{
    protected $signature = 'hunter:install';

    protected $description = 'Install and configure the Hunter dev environment';

    public function handle(): int
    {
        info('Installing Hunter dev environment...');

        $this->setupEnvironment();
        $this->setupDatabase();
        $this->runMigrations();
        $this->installNpmDependencies();
        $this->buildAssets();

        info('Hunter dev environment installed successfully!');
        $this->newLine();
        $this->line('  <fg=cyan>Next steps:</>');
        $this->line('  <fg=gray>php artisan serve</>');
        $this->newLine();

        return self::SUCCESS;
    }

    private function setupEnvironment(): void
    {
        if (File::exists(base_path('.env'))) {
            warning('.env file already exists, skipping...');

            return;
        }

        spin(
            callback: function (): void {
                File::copy(base_path('.env.example'), base_path('.env'));
                $this->call('key:generate', ['--quiet' => true]);
            },
            message: 'Setting up environment...'
        );

        info('Environment configured');
    }

    private function setupDatabase(): void
    {
        $databasePath = database_path('database.sqlite');

        if (File::exists($databasePath)) {
            warning('Database already exists, skipping...');

            return;
        }

        spin(
            callback: fn () => File::put($databasePath, ''),
            message: 'Creating SQLite database...'
        );

        info('Database created');
    }

    private function runMigrations(): void
    {
        spin(
            callback: fn () => $this->callSilently('migrate', ['--force' => true]),
            message: 'Running migrations...'
        );

        info('Migrations completed');
    }

    private function installNpmDependencies(): void
    {
        if (File::exists(base_path('node_modules'))) {
            warning('Node modules already installed, skipping...');

            return;
        }

        spin(
            callback: fn () => Process::path(base_path())->run('npm install --silent'),
            message: 'Installing npm dependencies...'
        );

        info('npm dependencies installed');
    }

    private function buildAssets(): void
    {
        spin(
            callback: fn () => Process::path(base_path())->run('npm run build'),
            message: 'Building assets...'
        );

        info('Assets built');
    }
}
