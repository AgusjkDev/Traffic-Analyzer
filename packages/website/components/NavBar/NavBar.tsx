"use client";
import { useState } from "react";
import Link from "next/link";

import { Svg } from "components";
import NavBarAnchors from "./NavBarAnchors";
import { svgs } from "data";

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleShowMenu = () => setShowMenu(prevState => !prevState);
    const hideMenu = () => setShowMenu(false);

    return (
        <>
            <header className="sticky top-0 flex flex-col items-center gap-2 border-b-[1px] border-b-gray-100 bg-white p-6 md:flex-row md:justify-between md:px-12 md:py-6 lg:px-16 xl:px-24">
                <Link href="/">
                    <h1 className="bg-gradient-to-r from-red-600 via-yellow-500 to-emerald-600 bg-clip-text text-center text-3xl font-bold text-transparent">
                        Traffic Analyzer
                    </h1>
                </Link>

                <button
                    aria-label="Abrir Menu"
                    title="Abrir Menu"
                    onClick={toggleShowMenu}
                    className="group md:hidden"
                >
                    <Svg {...svgs.menu} />
                </button>

                <div className="hidden md:block">
                    <NavBarAnchors hideMenu={hideMenu} />
                </div>
            </header>

            <div
                className={`fixed inset-0 flex min-h-screen w-full flex-col items-center justify-center gap-y-12 bg-white transition-all duration-500 md:hidden ${
                    showMenu ? "" : "translate-x-full opacity-0"
                }`}
            >
                <button
                    aria-label="Cerrar Menu"
                    title="Cerrar Menu"
                    onClick={hideMenu}
                    className="group md:hidden"
                >
                    <Svg {...svgs.x} />
                </button>

                <NavBarAnchors hideMenu={hideMenu} />
            </div>
        </>
    );
}
