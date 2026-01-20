<?php

declare(strict_types=1);

namespace Workbench\App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

use function Laravel\Prompts\select;

final class HunterServeCommand extends Command
{
    protected $signature = 'hunter:serve {--host=127.0.0.1} {--port=8088}';

    protected $description = 'Start the Hunter workbench development server';

    public function handle(): int
    {
        $host = $this->option('host');
        $port = (int) $this->option('port');

        if ($this->isPortInUse($host, $port)) {
            $choice = select(
                label: "Port {$port} is already in use. What would you like to do?",
                options: [
                    'kill' => 'Kill the existing process and use this port',
                    'next' => 'Use the next available port',
                    'cancel' => 'Cancel and exit',
                ],
                default: 'next',
            );

            match ($choice) {
                'kill' => $this->killProcessOnPort($port),
                'next' => $port = $this->findNextAvailablePort($host, $port),
                'cancel' => $this->exitWithMessage(),
            };

            if ($choice === 'cancel') {
                return self::SUCCESS;
            }
        }

        $this->info("Starting Hunter workbench server on http://{$host}:{$port}");
        $this->newLine();

        return $this->startServer($host, $port);
    }

    private function isPortInUse(string $host, int $port): bool
    {
        $connection = @fsockopen($host, $port, $errno, $errstr, 1);

        if ($connection !== false) {
            fclose($connection);

            return true;
        }

        return false;
    }

    private function killProcessOnPort(int $port): void
    {
        $this->info("Killing process on port {$port}...");

        if (PHP_OS_FAMILY === 'Windows') {
            exec("netstat -ano | findstr :{$port}", $output);
            foreach ($output as $line) {
                if (preg_match('/\s+(\d+)$/', $line, $matches)) {
                    exec("taskkill /PID {$matches[1]} /F 2>nul");
                }
            }
        } else {
            exec("lsof -ti:{$port} | xargs kill -9 2>/dev/null");
        }

        usleep(500000);

        $this->info('Process terminated.');
    }

    private function findNextAvailablePort(string $host, int $startPort): int
    {
        $port = $startPort + 1;
        $maxPort = $startPort + 100;

        while ($port <= $maxPort) {
            if (! $this->isPortInUse($host, $port)) {
                $this->info("Found available port: {$port}");

                return $port;
            }
            $port++;
        }

        $this->error("Could not find an available port between {$startPort} and {$maxPort}");
        exit(1);
    }

    private function exitWithMessage(): void
    {
        $this->info('Server start cancelled.');
    }

    private function startServer(string $host, int $port): int
    {
        $process = new Process([
            PHP_BINARY,
            'vendor/bin/testbench',
            'serve',
            '--host='.$host,
            '--port='.$port,
        ], base_path());

        $process->setTimeout(null);
        $process->setTty(Process::isTtySupported());

        $process->run(function ($type, $buffer): void {
            $this->output->write($buffer);
        });

        return $process->getExitCode() ?? self::SUCCESS;
    }
}
