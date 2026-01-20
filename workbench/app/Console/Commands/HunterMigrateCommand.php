<?php

declare(strict_types=1);

namespace Workbench\App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;

use function dirname;

final class HunterMigrateCommand extends Command
{
    protected $signature = 'hunter:migrate {--fresh : Drop all tables and re-run all migrations} {--seed : Seed the database after migrating}';

    protected $description = 'Create the SQLite database and run migrations for Hunter workbench';

    public function handle(): int
    {
        $databasePath = base_path('database/database.sqlite');

        if (! File::exists($databasePath)) {
            $this->createDatabase($databasePath);
        } else {
            $this->info('Database already exists at: ' . $databasePath);
        }

        return $this->runMigrations();
    }

    private function createDatabase(string $path): void
    {
        $directory = dirname($path);

        if (! File::isDirectory($directory)) {
            File::makeDirectory($directory, 0o755, true);
            $this->info('Created database directory: ' . $directory);
        }

        File::put($path, '');
        $this->info('Created SQLite database at: ' . $path);
    }

    private function runMigrations(): int
    {
        $command = ['php', 'vendor/bin/testbench', 'migrate'];

        if ($this->option('fresh')) {
            $command = ['php', 'vendor/bin/testbench', 'migrate:fresh'];
        }

        if ($this->option('seed')) {
            $command[] = '--seed';
        }

        $this->newLine();
        $this->info('Running migrations...');
        $this->newLine();

        $process = new Process($command, base_path());
        $process->setTimeout(300);
        $process->setTty(Process::isTtySupported());

        $process->run(function ($type, $buffer): void {
            $this->output->write($buffer);
        });

        if ($process->isSuccessful()) {
            $this->newLine();
            $this->info('Migrations completed successfully.');
        }

        return $process->getExitCode() ?? self::SUCCESS;
    }
}
