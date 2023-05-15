import Link from "next/link";

import { navBarAnchors } from "data";

interface NavBarAnchorsProps {
    hideMenu: () => void;
}

export default function NavBarAnchors({ hideMenu }: NavBarAnchorsProps) {
    return (
        <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-8 md:gap-y-0">
            {navBarAnchors.map(navBarAnchor => (
                <Link
                    key={navBarAnchor.href}
                    {...navBarAnchor}
                    onClick={hideMenu}
                    className="mx-auto text-center text-lg transition-colors duration-300 hover:text-emerald-600 md:text-base"
                />
            ))}
        </div>
    );
}
