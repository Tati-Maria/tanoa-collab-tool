import Image from "next/image";
import Typography from "@/components/common/typography";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {Dialog, DialogTrigger, DialogContent} from "@/components/ui/dialog"

export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/elements.png"} alt="empty org" height={200} width={200} />
      <Typography
        variant="h2"
        className="mt-6 font-semibold text-2xl"
        text="Welcome to Tanoa!"
      />{" "}
      <Typography
        variant="p"
        text="Create your first organization to get started."
        className="text-muted-foreground text-sm mt-2"
      />
      <div className="mt-6">
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"}>
                    Create Organization
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-transparent p-0 border-none max-w-[480px]">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
