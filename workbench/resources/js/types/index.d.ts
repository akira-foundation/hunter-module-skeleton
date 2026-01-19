import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

/** Module navigation item from backend */
export interface ModuleNavItem {
    title: string;
    href: string;
    icon: string | null;
    order: number;
    badge: string | null;
    external: boolean;
}

/** Module navigation group from backend (supports nested groups) */
export interface ModuleNavGroup {
    title: string;
    items: (ModuleNavItem | ModuleNavGroup)[];
    icon: string | null;
    order: number;
    collapsible: boolean;
    collapsed: boolean;
}

export type ModuleNavigation = (ModuleNavItem | ModuleNavGroup)[];

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    moduleNavigation: ModuleNavigation;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
