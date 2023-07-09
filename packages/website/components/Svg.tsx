import { twMerge } from "tailwind-merge";
import type { SVG } from "data";

interface SvgProps extends SVG {
    className?: string;
    width?: number;
    height?: number;
}

export default function Svg({ d, className, width = 36, height = 36 }: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            className={twMerge(
                "fill-primary transition-colors duration-300 group-hover:fill-secondary",
                className
            )}
        >
            <path d={d} />
        </svg>
    );
}
