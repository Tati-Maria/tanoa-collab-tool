import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image
                src="/tanoa.svg"
                alt="Tanoa logo"
                width={120}
                height={120}
                className="animate-pulse duration-700 transition-all ease-in-out"
            />
            <p className="text-2xl font-bold mt-4">Loading...</p>
        </div>
    )
};