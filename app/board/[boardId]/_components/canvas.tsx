"use client";
import { useState } from "react";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { useHistory, useCanUndo, useCanRedo } from "@/liveblocks.config";

export const Canvas = ({ boardId }: { boardId: string }) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();


  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={() => history.undo()}
        redo={() => history.redo()}
        clearAll={() => history.clear()}
        canUndo={canUndo}
        canRedo={canRedo}
        canClearAll={canUndo || canRedo}
      />
    </main>
  );
};
