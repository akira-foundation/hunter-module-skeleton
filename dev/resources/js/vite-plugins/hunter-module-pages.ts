import fs from 'fs';
import path from 'path';
import type { Plugin, ResolvedConfig } from 'vite';

/**
 * Get all Hunter module page directories from composer.json
 */
function getModulePageDirs(rootDir: string): string[] {
    const composerJsonPath = path.resolve(rootDir, 'composer.json');

    if (!fs.existsSync(composerJsonPath)) {
        return [];
    }

    const composerJson = JSON.parse(fs.readFileSync(composerJsonPath, 'utf-8'));
    const repositories = composerJson.repositories || [];
    const moduleDirs: string[] = [];

    for (const repo of repositories) {
        if (repo.type === 'path' && repo.url) {
            // Resolve the path relative to the project root
            const repoPath = path.resolve(rootDir, repo.url);
            const pagesDir = path.join(repoPath, 'resources/js/pages');

            if (fs.existsSync(pagesDir)) {
                moduleDirs.push(repoPath);
            }
        }
    }

    return moduleDirs;
}

/**
 * Vite plugin to handle Hunter module pages.
 *
 * In development:
 * - Allows Vite to serve files from module directories
 * - Resolves module page imports
 *
 * In production:
 * - Normalizes module page paths in the manifest
 */
export function hunterModulePages(): Plugin {
    let config: ResolvedConfig;
    let moduleDirs: string[] = [];

    return {
        name: 'hunter-module-pages',
        enforce: 'pre',

        config(userConfig, { command }) {
            const rootDir = userConfig.root || process.cwd();
            moduleDirs = getModulePageDirs(rootDir);

            if (moduleDirs.length === 0) {
                return;
            }

            // In dev mode, configure server to allow serving module files
            if (command === 'serve') {
                return {
                    server: {
                        fs: {
                            allow: [rootDir, ...moduleDirs],
                        },
                    },
                };
            }
        },

        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },

        // Resolve module page imports in dev mode
        resolveId(source, importer) {
            // Check if this is a page import like ./pages/TestModule/Settings/General
            if (!importer || !source.startsWith('./pages/')) {
                return null;
            }

            // Extract the page path (e.g., TestModule/Settings/General)
            const pagePathMatch = source.match(
                /\.\/pages\/([A-Z][A-Za-z0-9]*(?:\/[A-Z][A-Za-z0-9]*)*)$/,
            );

            if (!pagePathMatch) {
                return null;
            }

            const pagePath = pagePathMatch[1];

            // First check if it exists in the main app
            const mainAppPath = path.resolve(
                config.root,
                'resources/js/pages',
                `${pagePath}.tsx`,
            );

            if (fs.existsSync(mainAppPath)) {
                return mainAppPath;
            }

            // Then check in module directories
            for (const moduleDir of moduleDirs) {
                const modulePath = path.resolve(
                    moduleDir,
                    'resources/js/pages',
                    `${pagePath}.tsx`,
                );

                if (fs.existsSync(modulePath)) {
                    return modulePath;
                }
            }

            return null;
        },

        // Normalize manifest paths in production build
        closeBundle() {
            if (config.command !== 'build') {
                return;
            }

            const manifestPath = path.resolve(
                config.root,
                config.build.outDir,
                'manifest.json',
            );

            if (!fs.existsSync(manifestPath)) {
                return;
            }

            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
            const normalizedManifest: Record<string, unknown> = {};
            let hasChanges = false;

            for (const [key, value] of Object.entries(manifest)) {
                // Check if this is a module page path
                // Matches paths like:
                // - ../../../../../../private/tmp/hunter-test-module/resources/js/pages/TestModule/Index.tsx
                // - ../vendor/acme/hunter-test-module/resources/js/pages/TestModule/Index.tsx
                const modulePageMatch = key.match(
                    /\/resources\/js\/pages\/([A-Z][A-Za-z0-9]*(?:\/[A-Z][A-Za-z0-9]*)*\.tsx)$/,
                );

                if (modulePageMatch && !key.startsWith('resources/')) {
                    // Add normalized entry: resources/js/pages/TestModule/Index.tsx
                    const normalizedKey = `resources/js/pages/${modulePageMatch[1]}`;

                    if (!normalizedManifest[normalizedKey]) {
                        normalizedManifest[normalizedKey] = value;
                        hasChanges = true;
                    }
                }

                // Keep original entry
                normalizedManifest[key] = value;
            }

            if (hasChanges) {
                fs.writeFileSync(
                    manifestPath,
                    JSON.stringify(normalizedManifest, null, 2),
                );
            }
        },
    };
}
