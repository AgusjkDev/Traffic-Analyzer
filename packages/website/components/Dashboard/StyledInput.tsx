import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const PROPS_TO_REPLACE = ["className"];

export default forwardRef(function StyledInput(
    props: StyledInputProps,
    ref?: React.ForwardedRef<HTMLInputElement>
) {
    const elementProps = Object.entries(props).reduce<React.InputHTMLAttributes<HTMLInputElement>>(
        (acc, [key, value]) =>
            PROPS_TO_REPLACE.some(prop => key === prop) ? acc : { ...acc, [key]: value },
        {}
    );

    return (
        <input
            {...(ref && { ref })}
            {...elementProps}
            className={twMerge(
                "w-full rounded-md border-[1px] border-gray-200 bg-white p-2.5 text-sm transition-colors placeholder:text-primary-light",
                props.className,
                "shadow-input outline-none transition duration-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            )}
        />
    );
});
