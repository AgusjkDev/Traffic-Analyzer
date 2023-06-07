import Image from "next/image";

import { SigninWithProviderButtons } from "components";

export default function Login() {
    return (
        <section className="mx-auto flex min-h-[calc(100vh-134.56px)] flex-col items-center justify-center gap-y-8 px-4 sm:px-0 md:min-h-[calc(100vh-92.56px)] md:w-[90%] md:flex-row xl:w-3/4 2xl:w-[70%]">
            <div className="md:flex-1">
                <Image
                    alt="Semáforo en luz roja"
                    src="/imgs/red-light.jpg"
                    className="w-full max-w-[280px] rounded-sm md:mx-auto md:flex-1 lg:max-w-sm 2xl:max-w-md"
                    width={2156}
                    height={2328}
                    priority
                />
            </div>

            <main className="flex w-full flex-col items-center gap-y-8 md:flex-1 2xl:gap-y-12">
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
