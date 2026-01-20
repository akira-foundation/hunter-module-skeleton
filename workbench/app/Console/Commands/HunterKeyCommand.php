<?php

declare(strict_types=1);

namespace Workbench\App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

final class HunterKeyCommand extends Command
{
    protected $signature = 'hunter:key {--show : Display the key instead of modifying files}';

    protected $description = 'Generate application key for the Hunter workbench';

    public function handle(): int
    {
        $key = $this->generateRandomKey();

        if ($this->option('show')) {
            $this->line('<comment>'.$key.'</comment>');

            return self::SUCCESS;
        }

        $envPath = $this->getEnvPath();

        if (! file_exists($envPath)) {
            $this->createEnvFromExample($envPath);
        }

        if (! $this->setKeyInEnvironmentFile($key, $envPath)) {
            return self::FAILURE;
        }

        $this->laravel['config']['app.key'] = $key;

        $this->components->info('Application key set successfully.');

        return self::SUCCESS;
    }

    private function generateRandomKey(): string
    {
        return 'base64:'.base64_encode(random_bytes(32));
    }

    private function getEnvPath(): string
    {
        return base_path('.env');
    }

    private function createEnvFromExample(string $envPath): void
    {
        $examplePath = base_path('.env.example');

        if (file_exists($examplePath)) {
            copy($examplePath, $envPath);
            $this->components->info('Created .env file from .env.example');
        } else {
            file_put_contents($envPath, "APP_KEY=\n");
        }
    }

    private function setKeyInEnvironmentFile(string $key, string $envPath): bool
    {
        $content = file_get_contents($envPath);

        if ($content === false) {
            $this->components->error('Could not read .env file');

            return false;
        }

        $currentKey = $this->laravel['config']['app.key'] ?? '';

        if (Str::contains($content, 'APP_KEY=')) {
            $content = preg_replace(
                '/^APP_KEY=.*/m',
                'APP_KEY='.$key,
                $content
            );
        } else {
            $content = "APP_KEY={$key}\n".$content;
        }

        if (file_put_contents($envPath, $content) === false) {
            $this->components->error('Could not write to .env file');

            return false;
        }

        return true;
    }
}
