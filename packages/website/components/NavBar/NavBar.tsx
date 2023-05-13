"use client";
import { useState } from "react";
import Link from "next/link";

import { Svg } from "components";
import { svgs } from "data";
import NavBarAnchors from "./NavBarAnchors";

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleShowMenu = () => setShowMenu(prevState => !prevState);
    const hideMenu = () => setShowMenu(false);

    return (
        <>
            <header className="sticky flex-col md:flex-row md:justify-between md:py-6 md:px-12 lg:px-16 xl:px-24 top-0 p-6 gap-2 flex border-b-gray-100 border-b-[1px] items-center">
                <Link href="/">
                    <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-emerald-600">
                        Traffic Analyzer
                    </h1>
                </Link>

                <button
                    aria-label="Abrir Menu"
                    title="Abrir Menu"
                    onClick={toggleShowMenu}
                    className="md:hidden group"
                >
                    <Svg {...svgs.menu} />
                </button>

                <div className="hidden md:block">
                    <NavBarAnchors hideMenu={hideMenu} />
                </div>
            </header>

            <div
                className={`fixed md:hidden gap-y-12 justify-center bg-white transition-all flex flex-col items-center duration-500 inset-0 w-full min-h-screen ${
                    showMenu ? "" : "translate-x-full opacity-0"
                }`}
            >
                <button
                    aria-label="Cerrar Menu"
                    title="Cerrar Menu"
                    onClick={hideMenu}
                    className="md:hidden group"
                >
                    <Svg {...svgs.x} />
                </button>

                <NavBarAnchors hideMenu={hideMenu} />
            </div>
        </>
    );
}
