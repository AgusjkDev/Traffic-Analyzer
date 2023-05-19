import Link from "next/link";

import { dashboardAnchors } from "data";

export default function Introduction() {
    const firstAnchor = dashboardAnchors[1];
    const secondAnchor = dashboardAnchors[2];

    return (
        <p className="max-w-prose text-sm text-primary-light md:max-w-prose-lg md:text-base">
            Éste es tu panel de control o <i>dashboard</i>, en él podrás realizar ciertas acciones
            como&nbsp;
            <Link href={firstAnchor.href} className="lowercase underline">
                {firstAnchor.title}
            </Link>
            &nbsp; o&nbsp;
            <Link href={secondAnchor.href} className="lowercase underline">
                {secondAnchor.title}
            </Link>
            &#46;
        </p>
    );
}
