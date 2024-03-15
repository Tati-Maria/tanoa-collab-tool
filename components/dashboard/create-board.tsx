"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";

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
