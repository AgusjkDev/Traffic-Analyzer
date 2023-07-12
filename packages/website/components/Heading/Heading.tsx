"use client";
import { twMerge } from "tailwind-merge";

import { Logo, Svg } from "components";
import NavBarAnchors from "./NavBarAnchors";
import { useMenu } from "hooks";
import { svgs } from "data";

export default function Heading() {
    const { showMenu, toggleShowMenu, hideMenu } = useMenu();

    return (
        <>
            <header className="sticky top-0 flex flex-col items-center gap-y-2 border-b-[1px] border-b-gray-100 bg-white pb-2.5 pt-5 md:flex-row md:justify-between md:px-12 md:py-4 lg:px-16 xl:px-24 2xl:px-32">
                <div className="max-w-[200px]">
                    <Logo />
                </div>

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
                className={twMerge(
                    "fixed inset-0 z-[2] flex min-h-screen w-full flex-col items-center justify-center gap-y-12 bg-white transition-all duration-500 md:hidden",
                    !showMenu && "translate-x-full opacity-0"
                )}
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
