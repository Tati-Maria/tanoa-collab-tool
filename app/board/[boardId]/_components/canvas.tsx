"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { connectionIdColor, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";

const MAX_LAYERS = 100;

export const Canvas = ({ boardId }: { boardId: string }) => {
  const layerIds = useStorage((s) => s.layerIds);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

   const resizeSelectedLayer = useMutation(
     ({ storage, self }, point: Point) => {
       if (canvasState.mode !== CanvasMode.Resizing) {
         return;
       }

       const bounds = resizeBounds(
         canvasState.initialBounds,
         canvasState.corner,
         point
       );

       const liveLayers = storage.get("layers");
       const layer = liveLayers.get(self.presence.selection[0]);

       if (layer) {
         layer.update(bounds);
       }
     },
     [canvasState]
   );


  // If the user scrolls, move the camera
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((prev) => ({
      x: prev.x - e.deltaX,
      y: prev.y - e.deltaY,
    }));
  }, []);

  //translate selected layer
  const translateSelectedLayer = useMutation(({storage, self}, point: Point) => {
    if(canvasState.mode !== CanvasMode.Translating){
      return;
    }

    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get("layers");
    for(const id of self.presence.selection){
      const layer = liveLayers.get(id);
      if(layer){
        layer.update({
          x: layer.get("x") + offset.x,
          y: layer.get("y") + offset.y
        });
      }
    }

    setCanvasState({mode: CanvasMode.Translating, current: point});
  }, [canvasState])

  // Update the user's cursor position
  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [canvasState, resizeSelectedLayer, camera, translateSelectedLayer]
  );

  // If the user leaves the window, remove their cursor
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  //
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, insertLayer, history]
  );

  //selection color
  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};
    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  // Resize layers
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  //onLayerPointerDown => meaning the user is trying to draw something in our presence
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layedId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();
      const current = pointerEventToCanvasPoint(e, camera);
      if(!self.presence.selection.includes(layedId)){
        setMyPresence({ selection: [layedId] }, { addToHistory: true });
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current
      });
    },

    [setCanvasState, camera, history, canvasState.mode]
  );

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={() => history.undo()}
        redo={() => history.redo()}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        className="h-[100vh] w-[100vw]"
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              selectionColor={layerIdsToColorSelection[layerId]}
              key={layerId}
              id={layerId}
              onLayerPointDown={onLayerPointerDown}
            />
          ))}
          <SelectionBox 
          onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
