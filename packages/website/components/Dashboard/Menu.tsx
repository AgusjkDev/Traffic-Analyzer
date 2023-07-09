import Link from "next/link";
import { usePathname } from "next/navigation";

import { Svg } from "components";
import { dashboardAnchors } from "data";

export default function DashboardMenu() {
    const pathname = usePathname();

    return (
        <aside className="fixed bottom-0 z-[1] flex w-full justify-evenly border-t-[1px] border-gray-100 bg-white p-2.5 md:relative md:bottom-auto md:w-auto md:flex-col md:justify-start md:gap-y-3.5 md:border-r-[1px] md:border-t-0 md:p-3.5 md:[&>*:last-child]:mt-auto">
            {dashboardAnchors.map(({ href, label, title, svg }) => {
                return (
                    <Link
                        key={label}
                        aria-label={label}
                        title={title}
                        href={href}
                        className="group aspect-square w-6"
                    >
                        <Svg
                            {...svg}
                            className={pathname === href ? "fill-secondary" : undefined}
                            width={24}
                            height={24}
                        />
                    </Link>
                );
            })}
        </aside>
    );
}
