"use client";

import { EmptySearch } from "@/components/dashboard/empty-search";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Icons } from "@/components/ui/icons";
import Typography from "@/components/common/typography";
import { BoardCard } from "@/components/board/board-card";
import { NewBoardButton } from "@/components/board/new-board-button";

interface BoardListProps {
  query: {
    search?: string;
    favorites?: string;
  };
  orgId: string;
}

export const BoardList: React.FC<BoardListProps> = ({ orgId, query }) => {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <>
        <Typography
          className="text-3xl"
          variant="h2"
          text={query.favorites ? "Favorite Boards" : "Team Boards"}
        />
        <ul className="mt-8 pb-10 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton orgId={orgId} disabled={true} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </ul>
      </>
    );
  }

  if (!data?.length && query.search) {
    return (
      <EmptySearch
        image="/empty-search.png"
        search={`No boards found for "${query.search}"`}
      />
    );
  } else if (!data?.length && query.favorites) {
    return (
      <EmptySearch
        image="/empty-favorites.png"
        search="No favorite boards found"
      />
    );
  } else if (!data?.length) {
    return (
      <EmptySearch
        image="/empty-boards.png"
        search="No boards found. Create a new board to get started!"
        create={true}
      />
    );
  } else {
    return (
      <>
        <Typography
          className="text-3xl"
          variant="h2"
          text={query.favorites ? "Favorite Boards" : "Team Boards"}
        />
        <ul className="mt-8 pb-10 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton orgId={orgId} />
          {data?.map((board) => (
            <BoardCard
              key={board._id}
              title={board.title}
              id={board._id}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavorite={board.isFavorite}
            />
          ))}
        </ul>
      </>
    );
  }
};
