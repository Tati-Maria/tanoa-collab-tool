'use client';

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/common/hint";

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
}


export const ToolButton: React.FC<ToolButtonProps> = ({label, icon: Icon, isActive, isDisabled, onClick}) => {
    return (
        <Hint label={label} side="right" sideOffset={14}>
            <Button
            onClick={onClick}
            disabled={isDisabled}
            size={"icon"}
            variant={isActive ? "boardActive" : "board"}
            >
                <Icon />
            </Button>
        </Hint>
    )
}