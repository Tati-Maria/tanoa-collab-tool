'use client';

import { colorToCSS } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface Props {
    onChange: (color: Color) => void;
}


export const ColorPicker = ({onChange}: Props) => {
    return (
        <div
        className="flex flex-wrap items-center gap-2 max-w-[164px] mr-2 pr-2 border-r border-neutral-200"
        >
            <ColorButton onClick={onChange} color={{r: 255, g: 255, b: 255}} />
            <ColorButton onClick={onChange} color={{r: 0, g: 0, b: 0}} />
            <ColorButton onClick={onChange} color={{r: 255, g: 0, b: 0}} />
            <ColorButton onClick={onChange} color={{r: 0, g: 255, b: 0}} />
            <ColorButton onClick={onChange} color={{r: 0, g: 0, b: 255}} />
            <ColorButton onClick={onChange} color={{r: 244, g: 236, b: 214}} />
            <ColorButton onClick={onChange} color={{r: 255, g: 0, b: 255}} />
            <ColorButton onClick={onChange} color={{r: 234, g: 55, b: 136}} />
        </div>
    )
}


interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({onClick, color}: ColorButtonProps) => {
    return (
        <button
        onClick={() => onClick(color)}
        className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 cursor-pointer"
        style={{backgroundColor: colorToCSS(color)}}
        />
    )
}