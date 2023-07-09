import { twMerge } from "tailwind-merge";

interface HeadingTextProps {
    children: React.ReactNode;
    className?: string;
}

export default function HeadingText({ children, className }: HeadingTextProps) {
    return (
        <h3 className={twMerge("text-sm font-light text-primary-light", className)}>{children}</h3>
    );
}
