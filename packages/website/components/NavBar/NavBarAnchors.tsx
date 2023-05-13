import Link from "next/link";

import { navBarAnchors } from "data";

interface NavBarAnchorsProps {
    hideMenu: () => void;
}

export default function NavBarAnchors({ hideMenu }: NavBarAnchorsProps) {
    return (
        <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 md:gap-x-8">
            {navBarAnchors.map(navBarAnchor => (
                <Link
                    key={navBarAnchor.href}
                    {...navBarAnchor}
                    onClick={hideMenu}
                    className="mx-auto text-lg text-center transition-colors duration-300 md:text-base hover:text-emerald-600"
                />
            ))}
        </div>
    );
}
