import Image from "next/image";

import { SigninWithProviderButtons } from "components";

export default function Login() {
    return (
        <section className="px-4 sm:px-0 md:w-[90%] 2xl:w-[70%] xl:w-3/4 md:flex-row gap-y-8 mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-129px)] md:min-h-[calc(100vh-85px)]">
            <div className="md:flex-1">
                <Image
                    alt="Semáforo en luz roja"
                    src="/imgs/red-light.jpg"
                    className="w-full rounded-sm max-w-[280px] md:flex-1 lg:max-w-sm md:mx-auto 2xl:max-w-md"
                    width={2156}
                    height={2328}
                    priority
                />
            </div>

            <main className="flex flex-col items-center w-full gap-y-8 2xl:gap-y-12 md:flex-1">
                <header className="flex items-center">
                    <span className="text-center lg:text-lg">
                        Debes iniciar sesión para continuar
                    </span>
                </header>

                <SigninWithProviderButtons />
            </main>
        </section>
    );
}
