"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";

export const CreateBoard: React.FC = () => {
  const { organization } = useOrganization();
  const create = useMutation(api.board.create);

  const onClick = () => {
    if (!organization) {
      return;
    } // bail if no organization

    create({
      orgId: organization.id,
      title: "Untitled Board",
    });
  };

  return (
    <Button onClick={onClick} type="button">
      Create Board
    </Button>
  );
};
