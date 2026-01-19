#!/usr/bin/env php
<?php

declare(strict_types=1);

/**
 * Hunter Module Skeleton Configuration Script
 *
 * This script configures the skeleton for a new Hunter module.
 * Run it with: php configure.php
 */

function ask(string $question, string $default = ''): string
{
    $defaultText = $default !== '' ? " [{$default}]" : '';
    echo $question . $defaultText . ': ';

    $answer = trim((string) fgets(STDIN));

    return $answer !== '' ? $answer : $default;
}

function confirm(string $question, bool $default = false): bool
{
    $defaultText = $default ? 'Y/n' : 'y/N';
    echo "{$question} [{$defaultText}]: ";

    $answer = strtolower(trim((string) fgets(STDIN)));

    if ($answer === '') {
        return $default;
    }

    return in_array($answer, ['y', 'yes', '1', 'true'], true);
}

function writeln(string $message = ''): void
{
    echo $message . PHP_EOL;
}

function success(string $message): void
{
    writeln("\033[32m{$message}\033[0m");
}

function error(string $message): void
{
    writeln("\033[31m{$message}\033[0m");
}

function info(string $message): void
{
    writeln("\033[34m{$message}\033[0m");
}

function slugify(string $string): string
{
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-'));
}

function studlyCase(string $string): string
{
    return str_replace(['-', '_', ' '], '', ucwords($string, '-_ '));
}

function replaceInFile(string $file, array $replacements): void
{
    $content = file_get_contents($file);
    $content = str_replace(array_keys($replacements), array_values($replacements), $content);
    file_put_contents($file, $content);
}

function removeDirectory(string $dir): void
{
    if (! is_dir($dir)) {
        return;
    }

    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }

        $path = $dir . DIRECTORY_SEPARATOR . $item;
        if (is_dir($path)) {
            removeDirectory($path);
        } else {
            unlink($path);
        }
    }
    rmdir($dir);
}

function getAllFiles(string $directory): array
{
    $files = [];
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($directory, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );

    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $files[] = $file->getPathname();
        }
    }

    return $files;
}

function run(string $command): string
{
    return trim((string) shell_exec($command));
}

// ============================================================================
// Main Script
// ============================================================================

$rootDir = __DIR__;

writeln();
info('========================================');
info('   Hunter Module Skeleton Configurator  ');
info('========================================');
writeln();

// Gather information
$gitName = run('git config user.name');
$gitEmail = run('git config user.email');

$authorName = ask('Author name', $gitName);
$authorEmail = ask('Author email', $gitEmail);

writeln();

$vendorName = ask('Vendor name (e.g., Acme)', 'Hunter');
$vendorSlug = ask('Vendor slug (e.g., acme)', slugify($vendorName));
$vendorNamespace = ask('Vendor namespace (e.g., Acme)', studlyCase($vendorName));

writeln();

$moduleName = ask('Module name (e.g., Analytics)');
$moduleSlug = ask('Module slug (e.g., analytics)', slugify($moduleName));
$studlyModuleName = ask('Module class name (e.g., Analytics)', studlyCase($moduleName));

writeln();

$description = ask('Package description', "The {$moduleName} module for Hunter");

writeln();
info('Summary:');
writeln("  Author: {$authorName} <{$authorEmail}>");
writeln("  Vendor: {$vendorName} ({$vendorSlug})");
writeln("  Module: {$moduleName} ({$moduleSlug})");
writeln("  Namespace: {$vendorNamespace}\\{$studlyModuleName}");
writeln("  Package: {$vendorSlug}/hunter-{$moduleSlug}");
writeln("  Description: {$description}");
writeln();

if (! confirm('Is this correct?', true)) {
    error('Aborted.');
    exit(1);
}

writeln();
info('Configuring your module...');
writeln();

// Define all replacements
$replacements = [
    ':author_name' => $authorName,
    ':author_email' => $authorEmail,
    ':vendor_name' => $vendorName,
    ':vendor_slug' => $vendorSlug,
    ':VendorNamespace:' => $vendorNamespace,
    ':module_name' => $moduleName,
    ':module_slug' => $moduleSlug,
    ':StudlyModuleName:' => $studlyModuleName,
    ':package_description' => $description,
    ':MODULE_SLUG_UPPER_ENABLED' => strtoupper(str_replace('-', '_', $moduleSlug)) . '_ENABLED',
];

// Get all files
$files = getAllFiles($rootDir);

// Exclude certain files and directories
$excludePatterns = [
    'configure.php',
    '.git/',
    'vendor/',
    'node_modules/',
];

$filesToProcess = array_filter($files, function ($file) use ($excludePatterns, $rootDir) {
    $relativePath = str_replace($rootDir . DIRECTORY_SEPARATOR, '', $file);
    foreach ($excludePatterns as $pattern) {
        if (str_contains($relativePath, $pattern)) {
            return false;
        }
    }
    return true;
});

// Replace placeholders in all files
foreach ($filesToProcess as $file) {
    replaceInFile($file, $replacements);
    writeln("  Updated: " . str_replace($rootDir . DIRECTORY_SEPARATOR, '', $file));
}

// Rename files with placeholders in their names
writeln();
info('Renaming files...');

// Rename ServiceProvider
$oldServiceProvider = $rootDir . '/src/:StudlyModuleName:ServiceProvider.php';
$newServiceProvider = $rootDir . '/src/' . $studlyModuleName . 'ServiceProvider.php';
if (file_exists($oldServiceProvider)) {
    rename($oldServiceProvider, $newServiceProvider);
    writeln("  Renamed: :StudlyModuleName:ServiceProvider.php -> {$studlyModuleName}ServiceProvider.php");
}

// Rename Controller
$oldController = $rootDir . '/src/Http/Controllers/:StudlyModuleName:Controller.php';
$newController = $rootDir . '/src/Http/Controllers/' . $studlyModuleName . 'Controller.php';
if (file_exists($oldController)) {
    rename($oldController, $newController);
    writeln("  Renamed: :StudlyModuleName:Controller.php -> {$studlyModuleName}Controller.php");
}

// Rename config file
$oldConfig = $rootDir . '/config/:module_slug.php';
$newConfig = $rootDir . '/config/' . $moduleSlug . '.php';
if (file_exists($oldConfig)) {
    rename($oldConfig, $newConfig);
    writeln("  Renamed: config/:module_slug.php -> config/{$moduleSlug}.php");
}

// Rename pages directory
$oldPagesDir = $rootDir . '/resources/js/pages/:module_slug';
$newPagesDir = $rootDir . '/resources/js/pages/' . $moduleSlug;
if (is_dir($oldPagesDir)) {
    rename($oldPagesDir, $newPagesDir);
    writeln("  Renamed: resources/js/pages/:module_slug -> resources/js/pages/{$moduleSlug}");
}

// Rename branch to 1.x
writeln();
info('Setting up git...');

$currentBranch = run('git rev-parse --abbrev-ref HEAD 2>/dev/null');
if ($currentBranch === 'main' || $currentBranch === 'master') {
    run('git branch -m 1.x');
    writeln("  Renamed branch '{$currentBranch}' to '1.x'");
}

// Ask about installing dependencies
writeln();

if (confirm('Run composer install?', true)) {
    writeln();
    info('Running composer install...');
    passthru('composer install');
}

writeln();

if (confirm('Run npm install?', true)) {
    writeln();
    info('Running npm install...');
    passthru('npm install');
}

// Delete this configure script
writeln();
info('Cleaning up...');

unlink(__FILE__);
writeln('  Deleted: configure.php');

// Done!
writeln();
success('========================================');
success('   Configuration complete!              ');
success('========================================');
writeln();
writeln('Your Hunter module is ready at:');
writeln("  Package: {$vendorSlug}/hunter-{$moduleSlug}");
writeln("  Namespace: {$vendorNamespace}\\{$studlyModuleName}");
writeln();
writeln('Next steps:');
writeln('  1. Review the generated files');
writeln('  2. Run: composer test');
writeln('  3. Start building your module!');
writeln();
