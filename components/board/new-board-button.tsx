"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton: React.FC<NewBoardButtonProps> = ({
  orgId,
  disabled,
}) => {
    const {mutate, loading} = useApiMutation(api.board.create);

    const createBoard = () => {
        mutate({orgId, title: "Untitled Board"})
        .then((id) => {
            toast.success("Board created successfully");
            //TODO: Redirect to the new board
        }).catch(() => {
            toast.error("Failed to create board");
        });
    }


  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        disabled && "cursor-not-allowed opacity-75 hover:bg-blue-600",
        loading && "cursor-wait"
      )}
      disabled={disabled || loading}
      onClick={createBoard}
    >
      <div />
      <Plus className="h-12 stroke-1 w-12 text-white" />
      <span className="mt-2 text-xs text-white font-light">New Board</span>
    </button>
  );
};
