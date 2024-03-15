"use client";

import Image from "next/image";
import { Hint } from "@/components/common/hint";

import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface ListItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const ListItem = ({ id, name, imageUrl }: ListItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;
  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <li className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
          fill
          src={imageUrl}
          alt={name}
          onClick={onClick}
        />
      </Hint>
    </li>
  );
};
