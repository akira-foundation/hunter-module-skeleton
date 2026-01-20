import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import path from "path";
import { defineConfig } from "vite";
import { hunterModulePages } from "./resources/js/vite-plugins/hunter-module-pages";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
        tailwindcss(),
        hunterModulePages(),
    ],
    esbuild: {
        jsx: "automatic",
    },
    resolve: {
        alias: {
            // Allow module pages to import from the main app using @/
            "@": path.resolve(__dirname, "resources/js"),
            // Ensure module pages can resolve dependencies from the main app
            react: path.resolve(__dirname, "node_modules/react"),
            "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
            "@inertiajs/react": path.resolve(
                __dirname,
                "node_modules/@inertiajs/react",
            ),
        },
    },
});
