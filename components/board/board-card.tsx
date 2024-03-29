"use client";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "@/components/common/overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { BoardFooter } from "@/components/board/board-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/common/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/lib/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

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

  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  //Favoriting feature
  const { mutate: onFavorite, loading, error } = useApiMutation(api.board.favorite);
  const { mutate: onUnFavorite, loading: pending, error: errorUnfavorite } = useApiMutation(api.board.unFavorite);

  const toggleFavorite = () => {
    if(isFavorite) {
      onUnFavorite({ id})
      .catch((error) => {
        toast.error("Failed to remove favorite");
      });
    } else {
      onFavorite({ id, orgId})
      .catch((error) => {
        toast.error("Failed to add favorite");
      });
    }
  };

  return (
    <li className="group hover:shadow-sm">
      <Link href={`/board/${id}`}>
        <div className="aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="relative flex-1 bg-blue-50">
            <Image alt={title} fill src={imageUrl} className="object-fit" />
            <Overlay />
            <Actions id={id} title={title} side="right">
              <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 py-2 px-3 outline-none">
                <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
              </button>
            </Actions>
          </div>
          <BoardFooter
            isFavorite={isFavorite}
            title={title}
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            onClick={toggleFavorite}
            disabled={loading || pending}
          />
        </div>
      </Link>
    </li>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
