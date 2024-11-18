"use client";

import Link from 'next/link'; // Import Link from next/link
import { cn } from '@/lib/utils'; // Assuming cn is a utility for conditional classNames
import { usePathname } from 'next/navigation';
import { Category } from '@/types'; // Assuming Category is properly defined in types

interface MainNavProps {
    data: Category[] | [];
    className?: string; // Allow className to be passed in
}

const MainNav: React.FC<MainNavProps> = ({ data, className }) => {
    const pathname = usePathname();

    const routes = data.map(route => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }));

    return (
        <nav className={`flex items-center mx-6 space-x-4 lg:space-x-6 ${className}`}>
            {routes.map(route => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn('text-lg font-bold transition-colors text-green-900', route.active ? 'text-black' : 'text-neutral-500')}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default MainNav;
