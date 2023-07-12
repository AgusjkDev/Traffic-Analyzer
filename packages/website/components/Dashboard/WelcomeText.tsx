import Link from "next/link";

import { dashboardAnchors } from "data";

export default function WelcomeText() {
    const [, firstAnchor, secondAnchor] = dashboardAnchors;

    return (
        <>
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
        </>
    );
}
