"use client";
import { useContext } from "react";

import { DashboardContext } from "context";
import { PageWrapper, HeadingText, NewStreetInput, StreetInput } from "components/Dashboard";

export default function Streets() {
    const { streets, createStreet, updateStreetName, removeStreet } = useContext(DashboardContext);

    return (
        <PageWrapper
            title="Calles"
            introduction="Observa, crea, edita y elimina las calles que utilizan tus dispositivos."
        >
            <div className="flex flex-col gap-4">
                <HeadingText>
                    {streets && !streets.length
                        ? "No hay calles disponibles, intenta creando una nueva"
                        : "Tus calles disponibles"}
                </HeadingText>

                <div className="grid max-w-prose gap-y-4 md:max-w-prose-lg md:grid-cols-3 md:gap-4">
                    <NewStreetInput createStreet={createStreet} />

                    {streets &&
                        streets.map(street => (
                            <StreetInput
                                key={street.id}
                                street={street}
                                updateStreetName={updateStreetName}
                                removeStreet={removeStreet}
                            />
                        ))}
                </div>
            </div>
        </PageWrapper>
    );
}
