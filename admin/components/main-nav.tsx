"use client"

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function MainNav({ className, ...props } : React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const routes = [{
        href: `/${params.storeId}`,
        label: 'Home',
        active: pathname === `/${params.storeId}`
    }, {
        href: `/${params.storeId}/billboards`,
        label: 'Billboards',
        active: pathname === `/${params.storeId}/billboards`
    }, {
        href: `/${params.storeId}/pathways`,
        label: 'Pathways',
        active: pathname === `/${params.storeId}/pathways`
    }, {
        href: `/${params.storeId}/grades`,
        label: 'Grades',
        active: pathname === `/${params.storeId}/grades`
    }, {
        href: `/${params.storeId}/durations`,
        label: 'Durations',
        active: pathname === `/${params.storeId}/durations`
    }, {
        href: `/${params.storeId}/books`,
        label: 'Books',
        active: pathname === `/${params.storeId}/books`
    }, {
        href: `/${params.storeId}/orders`,
        label: 'Orders',
        active: pathname === `/${params.storeId}/orders`
    }, {
        href: `/${params.storeId}/settings`,
        label: 'Settings',
        active: pathname === `/${params.storeId}/settings`
    }];

    return (
        <>
            {/* Mobile menu toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {/* Desktop navigation */}
            <nav className={cn("hidden lg:flex items-center space-x-4 lg:space-x-6", className)}>
                {routes.map((route, index) => (
                    <Link
                        key={index}
                        href={route.href}
                        className={cn(
                            "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                            "hover:bg-primary/10 hover:text-primary active:bg-primary/20 active:text-primary",
                            route.active
                                ? "bg-primary/20 text-primary border border-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile navigation dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b rounded-b-3xl lg:hidden">
                    <nav className="flex flex-col p-4 space-y-2">
                        {routes.map((route, index) => (
                            <Link
                                key={index}
                                href={route.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                    "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                                    "hover:bg-primary/10 hover:text-primary active:bg-primary/20 active:text-primary",
                                    route.active
                                        ? "bg-primary/20 text-primary border border-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}