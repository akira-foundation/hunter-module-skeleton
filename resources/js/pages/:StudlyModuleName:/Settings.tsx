import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Settings() {
    return (
        <AppLayout>
            <Head title="Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">
                    Configure :module_title module settings.
                </p>
            </div>
        </AppLayout>
    );
}
