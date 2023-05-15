import type { SVG } from "data";

interface SvgProps extends SVG {
    width?: number;
    height?: number;
}

export default function Svg({ d, width = 36, height = 36 }: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            className="fill-primary transition-colors duration-300 group-hover:fill-emerald-600"
        >
            <path d={d} />
        </svg>
    );
}
