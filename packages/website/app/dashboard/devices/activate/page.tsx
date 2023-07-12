"use client";
import { useContext } from "react";
import Link from "next/link";
import { Formik, Form, FormikHelpers } from "formik";

import { DashboardContext } from "context";
import { FormField } from "components/Dashboard";
import { devicesActivateForm, type FormValues } from "data";

export default function Activate() {
    const { streets, activateDevice } = useContext(DashboardContext);

    if (!streets) return;

    if (!streets.length) {
        return (
            <span className="text-sm font-light text-primary-light">
                No se han encontrado calles disponibles.&nbsp;
                <Link href="/dashboard/streets" className="underline">
                    Crear calle
                </Link>
            </span>
        );
    }

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        activateDevice(values);
        setSubmitting(false);
    };

    const streetNames = streets.map(({ name }) => name);

    return (
        <Formik
            initialValues={devicesActivateForm.initialValues}
            validationSchema={devicesActivateForm.validationSchema(streetNames)}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form autoComplete="off" className="flex w-full flex-col gap-y-4 py-4">
                    {devicesActivateForm.fields(streetNames).map(field => {
                        const fieldName = field.props.name;
                        const errorMessage = touched[fieldName] && errors[fieldName];

                        return (
                            <FormField
                                key={fieldName}
                                field={field}
                                {...(errorMessage && { errorMessage })}
                            />
                        );
                    })}

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-md border-[1px] border-gray-300 bg-white p-2.5 text-sm transition-colors duration-300 hover:border-gray-400 focus:outline-none"
                    >
                        Activar
                    </button>
                </Form>
            )}
        </Formik>
    );
}
