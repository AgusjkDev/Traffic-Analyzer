"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Svg } from "components";
import { svgs } from "data";
import HeadingText from "./HeadingText";

export default function DevicesLayoutHeader() {
    const pathname = usePathname();

    return pathname === "/dashboard/devices" ? (
        <HeadingText>Selecciona una función para continuar</HeadingText>
    ) : (
        <Link title="Volver" href="/dashboard/devices" className="group flex gap-x-1">
            <Svg {...svgs.arrowLeft} width={20} height={20} className="fill-primary-light" />

            <HeadingText className="transition-colors duration-300 group-hover:text-secondary">
                Volver
            </HeadingText>
        </Link>
    );
}
