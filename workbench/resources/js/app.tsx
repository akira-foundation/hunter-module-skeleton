import AppLayout from "@/layouts/app-layout";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";

interface PageModule {
    default: React.ComponentType & {
        layout?: (page: ReactNode) => ReactNode;
    };
}

createInertiaApp({
    title: (title) =>
        title ? `${title} - Hunter Workbench` : "Hunter Workbench",
    resolve: (name) => {
        // Load pages from both workbench and module
        const workbenchPages = import.meta.glob<PageModule>(
            "./pages/**/*.tsx",
            {
                eager: true,
            },
        );
        const modulePages = import.meta.glob<PageModule>(
            "../../../resources/js/pages/**/*.tsx",
            { eager: true },
        );

        // Try workbench pages first, then module pages
        let page = workbenchPages[`./pages/${name}.tsx`];

        if (!page) {
            page = modulePages[`../../../resources/js/pages/${name}.tsx`];
        }

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        // Apply default layout to module pages that don't have one
        const pageComponent = page.default;
        if (!pageComponent.layout) {
            pageComponent.layout = (page: ReactNode) => (
                <AppLayout>{page}</AppLayout>
            );
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
