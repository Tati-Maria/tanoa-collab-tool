import Image from "next/image";
import Typography from "@/components/common/typography";
import { CreateBoard } from "@/components/dashboard/create-board";

interface EmptySearchProps {
  search: string;
  image: string;
  create?: boolean;
}

export function EmptySearch({ search, image, create=false }: EmptySearchProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image src={image} alt="No boards found" width={140} height={140} />
      <Typography
        variant="h2"
        className="mt-6 font-semibold text-xl md:text-2xl"
        text="Uh oh!"
      />{" "}
      <Typography
        className="text-muted-foreground text-sm mt-2"
        text={search}
        variant="p"
      />
      {/* When empty display a button to create */}
      {create && (
        <div className="mt-6">
          <CreateBoard />
        </div>
      )}
    </div>
  );
}
