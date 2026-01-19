import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { Package } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [{ title: "Home", href: "/" }];

export default function Welcome() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Welcome" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 p-8">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Package className="size-8 text-primary" />
                </div>
                <div className="max-w-md text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Hunter Workbench
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        This is a local development environment for testing your
                        Hunter module. The sidebar shows your module's
                        navigation items.
                    </p>
                </div>
                <div className="mt-4 rounded-lg border bg-card p-6 text-sm">
                    <h2 className="font-medium">Getting Started</h2>
                    <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
                        <li>
                            Add pages to{" "}
                            <code className="rounded bg-muted px-1.5 py-0.5">
                                resources/js/pages/
                            </code>
                        </li>
                        <li>
                            Define routes in{" "}
                            <code className="rounded bg-muted px-1.5 py-0.5">
                                routes/
                            </code>
                        </li>
                        <li>Configure navigation in your ServiceProvider</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
