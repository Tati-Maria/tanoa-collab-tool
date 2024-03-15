"use client";
import { LayoutDashboard, Star } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Typography from "@/components/common/typography";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrganizationSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href={"/"}>
        <div className="flex items-center gap-x-2">
          <Image src="/tanoa.svg" alt="logo" width={24} height={24} />
          <Typography
            className={cn("font-semibold text-2xl", font.className)}
            variant="span"
            text="Tanoa"
          />
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "ghost": "secondary"}
          asChild
          size={"lg"}
          className="justify-start font-normal w-full px-2"
          type="button"
        >
          <Link href={"/"}>
            <LayoutDashboard className="w-4 h-4 mr-2" /> Team Boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary": "ghost"}
          asChild
          size={"lg"}
          className="justify-start font-normal w-full px-2"
          type="button"
        >
          <Link href={{
            pathname: "/",
            query: { favorites: true },
          }}>
            <Star className="w-4 h-4 mr-2" /> Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
