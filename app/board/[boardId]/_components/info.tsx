import { Skeleton } from "@/components/ui/skeleton"

export const Info = () => {
    return (
        <div className="absolute top-2 left-2 bg-white h-12 rounded-md px-1.5 flex items-center shadow-md">Info!</div>
    )
}

Info.Skeleton = function InfoSkeleton() {
    return (
        <div className="absolute top-2 left-2 bg-white h-12 w-[300px] rounded-md px-1.5 flex items-center shadow-md" />
    )
}