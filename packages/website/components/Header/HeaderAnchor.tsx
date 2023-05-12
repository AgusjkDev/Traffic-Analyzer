import Link from "next/link";

import type { HeaderAnchor } from "data";

interface HeaderAnchorProps extends HeaderAnchor {}

export default function HeaderAnchor({ href, title, children }: HeaderAnchorProps) {
    return (
        <Link
            href={href}
            title={title}
            className="text-center transition-colors duration-300 hover:text-primary"
        >
            {children}
        </Link>
    );
}
