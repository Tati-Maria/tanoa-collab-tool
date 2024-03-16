import { Icons } from "@/components/ui/icons";
import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";

export const Loading = () => {
  return (
    <main className="h-full w-full bg-neutral-100 relative touch-none flex items-center justify-center">
      <Icons.spinner className="animate-spin h-8 w-8 text-muted-foreground" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
};
