"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { toast } from "sonner";

export const CreateBoard: React.FC = () => {
  const { organization } = useOrganization();
  const {mutate, loading, error} = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) {
      return;
    } // bail if no organization

    mutate({
      orgId: organization.id,
      title: "Untitled Board",
    }).then((response) => {
      toast.success("Board created!");
      // TODO: redirect to the new board
    }).catch((error) => {
      toast.error("Failed to create board. Please try again.");
    });
  };

  return (
    <Button 
    disabled={loading}
    variant={error ? "destructive" : "default"}
    onClick={onClick} type="button"
    >
      {loading ? "Creating..." : error ? "Error!" : "Create Board"}
    </Button>
  );
};
