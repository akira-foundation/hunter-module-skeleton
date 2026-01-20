import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ReactDOMServer from "react-dom/server";

const appName = import.meta.env.VITE_APP_NAME || "Hunter Dev";

// Application pages (dev environment has none by default)
const appPages = import.meta.glob("./pages/**/*.tsx");

// Module pages - loaded from the parent directory (the module being developed)
const modulePages = import.meta.glob("../../../resources/js/pages/**/*.tsx");

// Module pages from vendor (for any dependencies)
const vendorPages = import.meta.glob(
    "../../vendor/*/*/resources/js/pages/**/*.tsx",
);

// Merge all pages
const allPages = { ...appPages, ...modulePages, ...vendorPages };

// Normalize module paths to match Inertia page names
function normalizeModulePath(path: string): string {
    const match = path.match(/\/resources\/js\/pages\/(.+)$/);

    return match ? `./pages/${match[1]}` : path;
}

const normalizedPages: Record<string, () => Promise<unknown>> = {};

for (const [path, resolver] of Object.entries(allPages)) {
    const normalizedPath = normalizeModulePath(path);
    if (!normalizedPages[normalizedPath]) {
        normalizedPages[normalizedPath] = resolver;
    }
}

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) =>
            resolvePageComponent(`./pages/${name}.tsx`, normalizedPages),
        setup: ({ App, props }) => {
            return <App {...props} />;
        },
    }),
);
