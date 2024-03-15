"use client";

import { BoardList } from "@/components/board/board-list";
import { EmptyOrg } from "@/components/dashboard/empty-org";
import { useOrganization } from "@clerk/nextjs";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList query={searchParams} orgId={organization.id} />
      )}
    </div>
  );
}
