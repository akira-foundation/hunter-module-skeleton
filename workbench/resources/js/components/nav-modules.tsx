import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
    type ModuleNavGroup,
    type ModuleNavItem,
    type ModuleNavigation,
} from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, ExternalLink, Package } from 'lucide-react';
import { useState } from 'react';

function isNavGroup(
    item: ModuleNavItem | ModuleNavGroup,
): item is ModuleNavGroup {
    return 'items' in item && Array.isArray(item.items);
}

/** Extract path from URL (removes protocol, domain, and query string) */
function getPath(url: string): string {
    try {
        // Handle full URLs
        const parsed = new URL(url);
        return parsed.pathname;
    } catch {
        // Handle relative paths
        return url.split('?')[0];
    }
}

/** Check if current page URL matches the item href */
function isActiveUrl(currentUrl: string, itemHref: string): boolean {
    const currentPath = getPath(currentUrl);
    const itemPath = getPath(itemHref);
    return currentPath === itemPath;
}

/** Recursively check if any child item is active */
function hasActiveChild(
    items: (ModuleNavItem | ModuleNavGroup)[],
    currentUrl: string,
): boolean {
    return items.some((item) => {
        if (isNavGroup(item)) {
            return hasActiveChild(item.items, currentUrl);
        }
        return isActiveUrl(currentUrl, item.href);
    });
}

function NavModuleSubItem({ item }: { item: ModuleNavItem }) {
    const page = usePage();
    const isActive = isActiveUrl(page.url, item.href);

    if (item.external) {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={isActive}>
                    <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>{item.title}</span>
                        <ExternalLink className="ml-auto size-3 opacity-50" />
                    </a>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        );
    }

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild isActive={isActive}>
                <Link href={item.href} prefetch>
                    <span>{item.title}</span>
                    {item.badge && (
                        <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                            {item.badge}
                        </span>
                    )}
                </Link>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
}

function NavModuleNestedGroup({ group }: { group: ModuleNavGroup }) {
    const page = usePage();
    const isChildActive = hasActiveChild(group.items, page.url);
    const [isOpen, setIsOpen] = useState(isChildActive || !group.collapsed);

    return (
        <SidebarMenuSubItem>
            <Collapsible
                open={isOpen || isChildActive}
                onOpenChange={setIsOpen}
                className="group/nested"
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton className="cursor-pointer">
                        <span>{group.title}</span>
                        <ChevronRight className="ml-auto size-3 transition-transform duration-200 group-data-[state=open]/nested:rotate-90" />
                    </SidebarMenuSubButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub className="ml-2 border-l border-sidebar-border pl-2">
                        {[...group.items]
                            .sort((a, b) => a.order - b.order)
                            .map((item) =>
                                isNavGroup(item) ? (
                                    <NavModuleNestedGroup
                                        key={item.title}
                                        group={item}
                                    />
                                ) : (
                                    <NavModuleSubItem
                                        key={item.href}
                                        item={item}
                                    />
                                ),
                            )}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuSubItem>
    );
}

function NavModuleItem({ item }: { item: ModuleNavItem }) {
    const page = usePage();
    const isActive = isActiveUrl(page.url, item.href);

    if (item.external) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={{ children: item.title }}
                >
                    <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Package className="size-4" />
                        <span>{item.title}</span>
                        <ExternalLink className="ml-auto size-3 opacity-50" />
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={{ children: item.title }}
            >
                <Link href={item.href} prefetch>
                    <Package className="size-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                        <span className="ml-auto rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                            {item.badge}
                        </span>
                    )}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

function NavModuleGroup({ group }: { group: ModuleNavGroup }) {
    const page = usePage();
    const isChildActive = hasActiveChild(group.items, page.url);
    const [isOpen, setIsOpen] = useState(isChildActive || !group.collapsed);

    return (
        <Collapsible
            open={isOpen || isChildActive}
            onOpenChange={setIsOpen}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={{ children: group.title }}>
                        <Package className="size-4" />
                        <span>{group.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {[...group.items]
                            .sort((a, b) => a.order - b.order)
                            .map((item) =>
                                isNavGroup(item) ? (
                                    <NavModuleNestedGroup
                                        key={item.title}
                                        group={item}
                                    />
                                ) : (
                                    <NavModuleSubItem
                                        key={item.href}
                                        item={item}
                                    />
                                ),
                            )}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

export function NavModules({ items = [] }: { items: ModuleNavigation }) {
    if (items.length === 0) {
        return null;
    }

    // Sort items by order
    const sortedItems = [...items].sort((a, b) => a.order - b.order);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Modules</SidebarGroupLabel>
            <SidebarMenu>
                {sortedItems.map((item) =>
                    isNavGroup(item) ? (
                        <NavModuleGroup key={item.title} group={item} />
                    ) : (
                        <NavModuleItem key={item.href} item={item} />
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
