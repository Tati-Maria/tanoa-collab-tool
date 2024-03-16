"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Typography from "@/components/common/typography";
import Link from "next/link";
import { Hint } from "@/components/common/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/common/actions";
import { Menu } from "lucide-react";

// TODO: WE MIGHT NEED TO CHANGE THIS LATER

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-400 px-1.5">
    |
  </div>;
};

//main components
export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white h-12 rounded-md px-1.5 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "board" }),
            "flex items-center gap-x-2"
          )}
        >
          <Image src="/tanoa.svg" alt="logo" width={24} height={24} />
          <Typography
            className={cn("font-semibold text-xl", font.className)}
            variant="span"
            text="Tanoa"
          />
        </Link>
      </Hint>
      <TabSeparator />
      <Hint label="Rename board" sideOffset={10} side="bottom">
        <Button
          type="button"
          className="text-base font-normal px-2 truncate"
          onClick={() => onOpen(data._id, data.title)}
          variant={"board"}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu className="w-6 h-6" />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white h-12 w-[300px] rounded-md px-1.5 flex items-center shadow-md" />
  );
};
