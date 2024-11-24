"use client"
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface MainNavProps {
    data: Category[] | []
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
    const pathname = usePathname();

    const routes = data.map(route => ({
        href: `/category/${route.id}`,
        label: route.name,
        active: pathname === `/category/${route.id}`
    }))

    return (
        <nav className='flex items-center  ml-20 mr-20 text-center justify-center space-x-4 lg:space-x-6 '>
            {routes.map(route => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        'text-md sm:text-sm-custom md:text-md-custom lg:text-lg-custom xl:text-xl-custom font-bold transition-colors hover:text-[#994C00]',
                        route.active ? 'text-[#994C00]' : 'text-[#556B2F]'
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav;
