"use client";

import { useSelectionBounds } from "@/lib/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayer } from "@/lib/hooks/use-delete-layer";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/common/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

type Props = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

export const SelectionTools = memo(({ camera, setLastUsedColor }: Props) => {
  const selection = useSelf((me) => me.presence.selection);

  const selectionBounds = useSelectionBounds();

  // Send to back
  const moveBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );

  // Bring to front
  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];
      const arr = liveLayerIds.toImmutable();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i));
      }
    },
    [selection]
  );

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  const deleteLayers = useDeleteLayer();

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}
      className="absolute rounded-xl p-3 bg-white shadow-sm border flex select-none"
    >
      <ColorPicker onChange={setFill} />
      <div className="flex flex-col gap-y-0.5">
        <Hint label="Bring to front">
          <Button onClick={moveToFront} variant={"board"} size={"icon"}>
            <BringToFront />
          </Button>
        </Hint>
        <Hint label="Send to back">
          <Button onClick={moveBack} variant={"board"} size={"icon"}>
            <SendToBack />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
            <Trash2 className="" />
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";
