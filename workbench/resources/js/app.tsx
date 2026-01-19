import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import type { ReactNode } from "react";

interface PageModule {
    default: React.ComponentType & {
        layout?: (page: ReactNode) => ReactNode;
    };
}

function generateBreadcrumbs(pageName: string): BreadcrumbItem[] {
    const parts = pageName.split("/");
    const breadcrumbs: BreadcrumbItem[] = [{ title: "Home", href: "/" }];

    let href = "";
    for (const part of parts) {
        href += `/${part.toLowerCase()}`;
        breadcrumbs.push({
            title: part.replace(/([A-Z])/g, " $1").trim(),
            href,
        });
    }

    return breadcrumbs;
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
        let isModulePage = false;

        if (!page) {
            page = modulePages[`../../../resources/js/pages/${name}.tsx`];
            isModulePage = true;
        }

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        // Apply default layout to pages that don't have one
        const pageComponent = page.default;
        if (!pageComponent.layout) {
            const breadcrumbs = isModulePage ? generateBreadcrumbs(name) : [];
            pageComponent.layout = (page: ReactNode) => (
                <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
            );
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
