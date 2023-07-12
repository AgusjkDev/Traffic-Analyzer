"use client";
import { Field } from "formik";

import FormErrorMessage from "./FormErrorMessage";
import type { FormField } from "data";

interface FormFieldProps {
    field: FormField;
    errorMessage?: string;
}

export default function FormField({ field, errorMessage }: FormFieldProps) {
    const { for: htmlFor, label, as: is, props } = field;

    return (
        <div className="flex flex-col items-start gap-y-2">
            <label htmlFor={htmlFor} className="text-sm">
                {label}
            </label>

            <Field
                {...props}
                {...(is && { as: is })}
                {...(!is && {
                    className:
                        "w-full rounded-md border-[1px] border-gray-300 bg-white p-2.5 text-sm transition-colors duration-300 placeholder:text-primary-light focus:border-gray-400 focus:outline-none",
                })}
            />

            {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </div>
    );
}
