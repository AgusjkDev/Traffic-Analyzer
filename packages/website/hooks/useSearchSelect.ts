import { useState, useRef } from "react";
import { useFormikContext, type FieldInputProps } from "formik";

import type { FormValues } from "data";

export default function useSearchSelect(props: FieldInputProps<string>) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const formikContext = useFormikContext<FormValues>();

    const handleSelectFocus = () => {
        inputRef.current?.focus();
        setIsFocused(true);
    };

    const handleInputClick = () => {
        setIsFocused(true);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);

        if (props.onBlur) props.onBlur(e);
    };

    const handleOptionClick = (option: string) => {
        formikContext.setValues({
            ...formikContext.values,
            streetName: option,
        });
    };

    return {
        isFocused,
        inputRef,
        handleSelectFocus,
        handleInputClick,
        handleInputFocus,
        handleInputBlur,
        handleOptionClick,
    };
}
