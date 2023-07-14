import * as Yup from "yup";

import { StyledInput, FormikSearchSelectField } from "components/Dashboard";
import { regex } from "data";

export interface FormValues {
    deviceId: string;
    streetName: string;
    streetNumber: number;
}

export interface FormField {
    label: string;
    for: string;
    as?: any;
    props: {
        name: keyof FormValues;
        [key: string]: any;
    };
}

interface DevicesActivateForm {
    initialValues: FormValues;
    validationSchema: (streetNameOptions: string[]) => Yup.Schema<FormValues>;
    fields: (streetNameOptions: string[]) => FormField[];
}

const devicesActivateForm: DevicesActivateForm = {
    initialValues: {
        deviceId: "",
        streetName: "",
        streetNumber: 0,
    },
    validationSchema: streetNameOptions => {
        const streetNameRegex = new RegExp(`^(${streetNameOptions.join("|")})$`);

        return Yup.object({
            deviceId: Yup.string()
                .required("¡Éste campo es obligatorio!")
                .test("uuid", "¡El identificador tiene un formato inválido!", value =>
                    regex.uuid.test(value)
                ),
            streetName: Yup.string()
                .required("¡Éste campo es obligatorio!")
                .test("existence", "¡Esa calle no existe o no fue creada!", value =>
                    streetNameRegex.test(value)
                ),
            streetNumber: Yup.number()
                .required("¡Éste campo es obligatorio!")
                .min(0, "¡La altura de la calle debe ser mayor o igual a 0!")
                .max(32767, "¡La altura de la calle debe ser menor o igual a 32767!"),
        });
    },
    fields: streetNameOptions => [
        {
            for: "deviceId",
            label: "Identificador del Dispositivo",
            as: StyledInput,
            props: {
                id: "deviceId",
                name: "deviceId",
                placeholder: "Ej: 6448c3d9-9260-4c8c-92fe-557a4f84d6ed",
            },
        },
        {
            for: "focusStreetName",
            label: "Calle",
            as: FormikSearchSelectField,
            props: {
                id: "streetName",
                focusId: "focusStreetName",
                name: "streetName",
                placeholder: "Ej: Av. Argentina",
                options: streetNameOptions,
            },
        },
        {
            for: "streetNumber",
            label: "Altura de la calle",
            as: StyledInput,
            props: {
                id: "streetNumber",
                name: "streetNumber",
                placeholder: "Ej: 467",
                type: "number",
            },
        },
    ],
};

export default devicesActivateForm;
