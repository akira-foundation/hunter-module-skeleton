import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AppLayout>
            <Head title=":module_title" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">:module_title</h1>
                <p className="text-muted-foreground">
                    Welcome to the :module_title module.
                </p>
            </div>
        </AppLayout>
    );
}
