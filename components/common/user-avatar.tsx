import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/common/hint";

interface UserAvatarProps {
  name?: string;
  src?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  src,
  borderColor,
  fallback,
}) => {
  return (
    <Hint label={name || "Anonymous"} side="bottom" sideOffset={18}>
      <Avatar style={{ borderColor }} className="h-8 w-8 border-2">
        <AvatarImage alt={name || "Anonymous"} src={src} />
        <AvatarFallback className="text-xs font-semibold">
            {fallback || "A"}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
