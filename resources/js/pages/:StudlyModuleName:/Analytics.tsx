import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function Analytics() {
    return (
        <AppLayout>
            <Head title="Analytics" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-muted-foreground">
                    View :module_title performance and statistics.
                </p>
            </div>
        </AppLayout>
    );
}
