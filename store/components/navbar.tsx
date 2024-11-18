import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return (
        <nav className="bg-white shadow shadow-gray-300 w-full px-8 md:px-4">
            <Container>
                <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    {/* Branding */}
                    <Link href="/" className="text-[#994C00] md:order-1 flex items-center">
                        <p className="text-md font-bold">Cabimah Adventures</p>
                    </Link>
                    
                    {/* Navigation Links */}
                    <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
                        <MainNav data={categories || []} />
                    </div>

                    {/* Actions */}
                    <div className="order-2 md:order-3">
                        <NavbarActions />
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
