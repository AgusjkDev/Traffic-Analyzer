import Link from "next/link";
import Image from "next/image";

export default function Logo() {
    return (
        <Link aria-label="Ir al Inicio" title="Ir al Inicio" href="/">
            <Image
                alt="Logo de Traffic Analyzer"
                src="/imgs/logo.png"
                priority
                width={470}
                height={140}
            />
        </Link>
    );
}
