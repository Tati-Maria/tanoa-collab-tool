import { Icons } from "@/components/ui/icons"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

export const Loading = () => {
    return (
        <main className="h-full w-full bg-neutral-100 relative touch-none flex items-center justify-center">
            <Icons.spinner className="animate-spin h-8 w-8 text-muted-foreground" />
            <Info.Skeleton />
            <Participants.Skeleton />
            <Toolbar.Skeleton />
        </main>
    )
}