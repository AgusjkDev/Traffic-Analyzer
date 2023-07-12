interface FormErrorMessage {
    children: React.ReactNode;
}

export default function FormErrorMessage({ children }: FormErrorMessage) {
    return (
        <span className="w-full rounded-sm bg-red-600 p-1 text-center text-xs font-semibold text-white">
            {children}
        </span>
    );
}
