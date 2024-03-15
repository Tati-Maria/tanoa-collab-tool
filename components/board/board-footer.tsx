import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "../common/typography";

interface BoardFooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const BoardFooter: React.FC<BoardFooterProps> = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}) => {
  return (
    <div className="bg-white relative p-3">
      <Typography
        variant="h3"
        text={title}
        className="truncate max-w-[calc(100%-20px)] text-[13px]"
      />
      <Typography
        variant="p"
        text={`${authorLabel}, ${createdAtLabel}`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate"
      />
      <button
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        <Star 
        className={cn("h-4 w-4", isFavorite && "fill-blue-600 text-blue-600")}
        />
      </button>
    </div>
  );
};
