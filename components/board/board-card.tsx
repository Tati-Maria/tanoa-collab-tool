"use client";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "@/components/common/overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { BoardFooter } from "./board-footer";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardCardProps {
  id: string;
  title: string;
  orgId: string;
  authorName: string;
  authorId: string;
  imageUrl: string;
  createdAt: number;
  isFavorite: boolean;
}

export const BoardCard = (props: BoardCardProps) => {
  const {
    id,
    title,
    orgId,
    authorName,
    authorId,
    imageUrl,
    createdAt,
    isFavorite,
  } = props;
  const {userId} = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <li>
      <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 bg-blue-50">
            <Image alt={title} fill src={imageUrl} className="object-fit" />
            <Overlay />
          </div>
          <BoardFooter 
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
          />
        </div>
      </Link>
    </li>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full"/>
    </div>
  );
}