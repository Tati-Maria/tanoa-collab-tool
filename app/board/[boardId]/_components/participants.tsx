'use client';

import { UserAvatar } from "@/components/common/user-avatar";
import { connectionIdColor } from "@/lib/utils";
import { useOthers, useSelf } from "@/liveblocks.config";

const MAX_PARTICIPANTS = 2;

export const Participants = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > MAX_PARTICIPANTS;

    return (
      <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        <div className="flex gap-x-2">
          {users.slice(0, MAX_PARTICIPANTS).map(({ connectionId, info }) => {
            return (
              <UserAvatar
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.charAt(0)}
                borderColor={connectionIdColor(connectionId)}
              />
            );
          })}
          {currentUser && (
            <UserAvatar
              src={currentUser.info?.picture}
              name={currentUser.info?.name + " (You)"}
              fallback={currentUser.info?.name?.charAt(0)}
              borderColor={connectionIdColor(currentUser.connectionId)}
            />
          )}
          {hasMoreUsers && (
            <UserAvatar
              name={`+${users.length - MAX_PARTICIPANTS} more`}
              borderColor="#21295C"
              fallback={`+${users.length - MAX_PARTICIPANTS}`}
            />
          )}
        </div>
      </div>
    );
}

export function ParticipantsSkeleton() {
    return (
      <div className="absolute w-[100px] h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md" />
    );
}