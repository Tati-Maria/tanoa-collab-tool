"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const CreateBoard: React.FC = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const {mutate, loading, error} = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) {
      return;
    } // bail if no organization

    mutate({
      orgId: organization.id,
      title: "Untitled Board",
    }).then((id) => {
      toast.success("Board created!");
      router.push(`/board/${id}`);
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
