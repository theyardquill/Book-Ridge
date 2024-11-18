"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import { MainNav } from "@/components";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { useState } from "react";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="border-b bg-white">
            <Container>
                <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    {/* Brand Logo */}
                    <Link href="/" className="flex gap-x-2">
                        <p className="text-lg sm:text-xl font-bold text-[#994C00]">Cabimah Adventures</p>
                    </Link>

                    {/* Main Navigation */}
                    <div className={`hidden lg:flex`}>
                        <MainNav data={categories || []} />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="lg:hidden">
                        <button
                            className="text-xl text-[#994C00]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open navigation</span>
                            {mobileMenuOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 8h16M4 16h16"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden px-4 pb-4">
                        <MainNav data={categories || []} />
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Navbar;
