'use client';

import { memo} from 'react';
import { MousePointer2 } from 'lucide-react';

import { connectionIdColor } from '@/lib/utils';
import { useOther } from '@/liveblocks.config';


export const Cursor = memo(({ connectionId }: { connectionId: number }) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user?.presence?.cursor);

    const name = info?.name || 'Anonymous';

    if(!cursor) return null;

    const { x, y } = cursor;


    return (
        <foreignObject
        style={{
            transform: `translate(${x}px, ${y}px)`
        }}
        height={50}
        width={name.length  * 10 + 24} // 10px per character + 24px padding
        className='relative drop-shadow-md'
        >
            <MousePointer2 
            style={{
                fill: connectionIdColor(connectionId),
                color: connectionIdColor(connectionId)
            }}
            className='h-5 w-5'  />
            <div
            style={{
                backgroundColor: connectionIdColor(connectionId)
            }}
            className='absolute text-xs px-1.5 py-0.5 left-5 rounded-md text-white font-semibold'
            >
                {name}
            </div>
        </foreignObject>
    )
});

Cursor.displayName = 'Cursor';