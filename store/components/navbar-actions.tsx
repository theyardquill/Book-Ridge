"use client"
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const cart = useCart();
    const router = useRouter();

    if(!isMounted) {
        return null;
    }

    return (
        <div className="flex items-center  gap-x-1">
            <Button className='flex items-center px-2 py-2 bg-[#994C00] -mr-4 rounded-xl'
                onClick={() => router.push("/cart")}>
                <ShoppingBag size={20} color='white' />
                <span className='ml-2 text-sm  text-white'>
                 Bookings:{cart?.items?.length}
                </span>
            </Button>
        </div>
    )
}

export default NavbarActions;
