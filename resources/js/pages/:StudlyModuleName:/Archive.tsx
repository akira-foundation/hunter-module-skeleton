import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Archive() {
    return (
        <AppLayout>
            <Head title="Archive" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Archive</h1>
                <p className="text-muted-foreground">
                    Browse archived :module_title items.
                </p>
            </div>
        </AppLayout>
    );
}
