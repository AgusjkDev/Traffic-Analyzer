import type { FieldInputProps } from "formik";

import StyledInput from "./StyledInput";
import { useSearchSelect, useSearch } from "hooks";

interface FormikSearchSelectFieldProps extends FieldInputProps<string> {
    focusId: string;
    options: string[];
}

const PROPS_TO_REPLACE = ["focusId", "options"];

export default function FormikSearchSelectField(props: FormikSearchSelectFieldProps) {
    const {
        isFocused,
        inputRef,
        handleSelectFocus,
        handleInputClick,
        handleInputFocus,
        handleInputBlur,
        handleOptionClick,
    } = useSearchSelect(props);
    const matchings = useSearch({ terms: props.options, term: props.value });

    const elementProps = Object.entries(props).reduce<Partial<FieldInputProps<string>>>(
        (acc, [key, value]) =>
            PROPS_TO_REPLACE.some(prop => key === prop) ? acc : { ...acc, [key]: value },
        {}
    );

    return (
        <div className="relative w-full">
            <select id={props.focusId} className="h-0 w-0 opacity-0" onFocus={handleSelectFocus} />

            <StyledInput
                {...elementProps}
                ref={inputRef}
                onClick={handleInputClick}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                type="text"
            />

            {isFocused && matchings.length > 0 && (
                <div className="absolute top-11 z-[1] flex max-h-[228px] w-full flex-col divide-y overflow-y-auto rounded-md border-[1px] border-gray-300 bg-red-400 text-sm">
                    {matchings.map(option => (
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
