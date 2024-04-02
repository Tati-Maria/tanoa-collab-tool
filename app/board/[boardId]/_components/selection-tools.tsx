'use client';

import { useSelectionBounds } from "@/lib/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";

type Props = {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}


export const SelectionTools = memo(({camera, setLastUsedColor}: Props) => {
    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();

    const setFill = useMutation(({storage}, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [selection, setLastUsedColor])

    if(!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div
        style={{
            transform: `translate(calc(${x}px - 50%), calc(${y -16}px - 100%))`
        }}
        className="absolute rounded-xl p-3 bg-white shadow-sm border flex select-none"
        >
            <ColorPicker 
            onChange={setFill}
            />
        </div>
    )
});

SelectionTools.displayName = "SelectionTools";