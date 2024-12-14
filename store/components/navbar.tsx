import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import Image from "next/image";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <nav className="bg-white shadow-md border-b border-[#994C00] shadow-[#994C00] w-full px-4">
      <Container>
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap md:h-16 h-28 mx-auto">
          {/* Branding */}
          <Link href="/" className="flex items-center space-x-2 text-[#994C00]">
            {/* Logo */}
            <Image
              src="/Logo.png" // Path to your logo
              alt="Cabimah Adventures Logo"
              width={64} // Base width
              height={64} // Base height
              className="w-16 h-16"
              priority // Ensures the logo loads quickly
            />
            <span className="text-lg font-bold md:text-xl">Cabimah Adventures</span>
          </Link>

          {/* Navigation Links */}
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <MainNav data={categories || []} />
          </div>

          {/* Actions */}
          <div className="mt-4 md:mt-0">
            <NavbarActions />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
