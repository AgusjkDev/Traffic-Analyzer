import Link from "next/link";

import { navBarAnchors } from "data";

interface NavBarAnchorsProps {
    hideMenu: () => void;
}

export default function NavBarAnchors({ hideMenu }: NavBarAnchorsProps) {
    return (
        <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6 md:gap-y-0">
            {navBarAnchors.map(navBarAnchor => (
                <Link
                    key={navBarAnchor.href}
                    {...navBarAnchor}
                    onClick={hideMenu}
                    className="mx-auto text-center transition-colors duration-300 hover:text-secondary md:text-sm"
                />
            ))}
        </div>
    );
}
