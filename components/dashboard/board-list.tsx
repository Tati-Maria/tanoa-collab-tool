"use client";

import { EmptySearch } from "./empty-search";

interface BoardListProps {
  query: {
    search?: string;
    favorites?: string;
  };
  orgId: string;
}

export const BoardList: React.FC<BoardListProps> = ({ orgId, query }) => {
  const data = []; // TODO: fetch data from server

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
    return <div></div>;
  }
};
