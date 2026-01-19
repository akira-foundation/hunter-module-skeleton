import { NavModules } from "@/components/nav-modules";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Package } from "lucide-react";

export function AppSidebar() {
    const { moduleNavigation = [] } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Package className="size-5" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Hunter
                                    </span>
                                    <span className="truncate text-xs text-sidebar-foreground/70">
                                        Workbench
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavModules items={moduleNavigation} />
            </SidebarContent>
        </Sidebar>
    );
}
