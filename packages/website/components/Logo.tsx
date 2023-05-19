import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <h1 className="bg-gradient-to-r from-red-600 via-yellow-500 to-secondary bg-clip-text text-center text-3xl font-bold text-transparent">
                Traffic Analyzer
            </h1>
        </Link>
    );
}
