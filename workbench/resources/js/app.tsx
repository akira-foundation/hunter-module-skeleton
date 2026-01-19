import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

createInertiaApp({
    title: (title) =>
        title ? `${title} - Hunter Workbench` : "Hunter Workbench",
    resolve: (name) => {
        // Load pages from both workbench and module
        const workbenchPages = import.meta.glob("./pages/**/*.tsx", {
            eager: true,
        });
        const modulePages = import.meta.glob(
            "../../../resources/js/pages/**/*.tsx",
            { eager: true },
        );

        // Try workbench pages first, then module pages
        const workbenchPage = workbenchPages[`./pages/${name}.tsx`];
        if (workbenchPage) {
            return workbenchPage;
        }

        const modulePage =
            modulePages[`../../../resources/js/pages/${name}.tsx`];
        if (modulePage) {
            return modulePage;
        }

        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
