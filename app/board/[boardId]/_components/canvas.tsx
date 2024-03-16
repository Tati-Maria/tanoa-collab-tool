'use client';

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import { useSelf } from "@/liveblocks.config";

export const Canvas = ({boardId}: {boardId: string}) => {
    const info = useSelf((me) => me.info);

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info />
            <Participants />
            <Toolbar />
        </main>
    )
}