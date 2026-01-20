import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Items() {
    return (
        <AppLayout>
            <Head title="Items" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Items</h1>
                <p className="text-muted-foreground">
                    Manage your :module_title items here.
                </p>
            </div>
        </AppLayout>
    );
}
