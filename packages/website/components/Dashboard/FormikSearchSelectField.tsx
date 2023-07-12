"use client";
import { useState, useRef, useEffect } from "react";
import { useFormikContext, type FieldInputProps } from "formik";

import { compareSearch } from "helpers";
import type { FormValues } from "data";

interface FormikSearchSelectFieldProps extends FieldInputProps<string> {
    focusId: string;
    options: string[];
}

const PROPS_TO_REPLACE = ["focusId", "options"];

export default function FormikSearchSelectField(props: FormikSearchSelectFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [options, setOptions] = useState(props.options);
    const inputRef = useRef<HTMLInputElement>(null);
    const formikContext = useFormikContext<FormValues>();

    const handleSelectFocus = () => {
        inputRef.current?.focus();
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

    const elementProps = Object.entries(props).reduce<Partial<FieldInputProps<string>>>(
        (acc, [key, value]) =>
            PROPS_TO_REPLACE.some(prop => key === prop) ? acc : { ...acc, [key]: value },
        {}
    );

    useEffect(() => {
        setOptions(props.options.filter(option => compareSearch(option, props.value))); // TODO: To improve
    }, [props.value]);

    return (
        <div className="relative w-full">
            <select id={props.focusId} className="h-0 w-0 opacity-0" onFocus={handleSelectFocus} />

            <input
                {...elementProps}
                ref={inputRef}
                onBlur={handleInputBlur}
                onClick={() => setIsFocused(true)}
                onFocus={() => setIsFocused(true)}
                type="text"
                className="w-full rounded-md border-[1px] border-gray-300 bg-white p-2.5 text-sm transition-colors duration-300 placeholder:text-primary-light focus:border-gray-400 focus:outline-none"
            />

            {isFocused && options.length > 0 && (
                <div className="absolute top-11 z-[1] flex max-h-[228px] w-full flex-col divide-y overflow-y-auto rounded-md border-[1px] border-gray-300 bg-red-400 text-sm">
                    {options.map(option => (
                        <button
                            key={option}
                            onMouseDown={() => handleOptionClick(option)}
                            type="button"
                            className="w-full bg-white p-2.5 text-left"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
