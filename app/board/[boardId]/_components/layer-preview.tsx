'use client';
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";

interface LayerPreviewProps {
    id: string
    onLayerPointDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string;
}

export const LayerPreview = memo(({id, selectionColor, onLayerPointDown}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if(!layer) {
        return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />;
      default:
        console.warn("Unknown layer type", layer);
        return null;
    };
});

LayerPreview.displayName = "LayerPreview";