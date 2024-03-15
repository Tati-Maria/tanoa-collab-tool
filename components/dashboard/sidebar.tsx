import { NewButton } from "@/components/dashboard/new-button";
import { List } from "@/components/dashboard/list";

export const Sidebar = () => {
    return (
        <aside className="fixed z-10 left-0 bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
            <List />
            <NewButton />
        </aside>
    )
};