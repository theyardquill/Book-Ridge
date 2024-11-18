import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();

    return (
        <nav className="bg-white shadow shadow-gray-300 w-full px-4 md:px-8">
            <Container>
                <div className="h-auto md:h-16 mx-auto container flex items-center justify-between flex-wrap md:flex-nowrap gap-y-4 xs:gap-y-2">
                    {/* Branding */}
                    <Link href="/" className="text-[#994C00] flex items-center flex-1 md:flex-none">
                        <p className="text-lg sm:text-xl font-bold">Cabimah Adventures</p>
                    </Link>

                    {/* Navigation Links */}
                    <div className="w-full md:w-auto flex-1 md:flex-none xs:flex-col xs:gap-y-2 md:flex-row">
                        <MainNav data={categories || []} className="text-[#556B2F] text-base sm:text-lg font-bold" />
                    </div>

                    {/* Actions */}
                    <div className="flex-1 md:flex-none flex justify-end xs:justify-center">
                        <NavbarActions />
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
