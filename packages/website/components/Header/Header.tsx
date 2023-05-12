import Link from "next/link";

import HeaderAnchor from "./HeaderAnchor";
import { headerAnchors } from "data";

export default function Header() {
    return (
        <header className="sticky top-0 p-6 flex border-b-gray-100 border-b-[1px] flex-col items-center gap-2 md:flex-row md:justify-between md:py-8 md:px-12 lg:px-16 xl:px-24">
            <Link href="/">
                <h1 className="text-4xl font-bold text-center">Traffic Analyzer</h1>
            </Link>

            <div className="flex flex-col gap-1 md:flex-row md:gap-6">
                {headerAnchors.map(({ href, title, children }) => (
                    <HeaderAnchor key={href} href={href} title={title}>
                        {children}
                    </HeaderAnchor>
                ))}
            </div>
        </header>
    );
}
