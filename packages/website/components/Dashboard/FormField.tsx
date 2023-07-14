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

            <Field {...props} {...(is && { as: is })} />

            {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </div>
    );
}
