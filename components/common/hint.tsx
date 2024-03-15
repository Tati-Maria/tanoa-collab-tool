import {Tooltip, TooltipProvider, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import Typography from "@/components/common/typography";


export interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
}

export const Hint = ({label, children, side = "right", align = "center", sideOffset = 0, alignOffset = 0}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                className="text-white bg-black border-black"
                side={side}
                align={align}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                >
                    <Typography className="font-semibold capitalize" variant="p" text={label} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}