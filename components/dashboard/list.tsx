"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { ListItem } from "./list-item";

//more about oragnization list: https://clerk.com/docs

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  // If the user is not a member of any organizations, return null
  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((membership) => (
        <ListItem
          key={membership.organization.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
