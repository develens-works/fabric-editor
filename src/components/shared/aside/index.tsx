import React, { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import AsideOptionComponent from '@/components/shared/aside/aside-option.component';
import AsideSidebarComponent from '@/components/shared/aside/aside-sidebar.component';

interface AsideParentProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>,
    historyRef: MutableRefObject<{ undo: any[], redo: any[] }>,
    shapeNumberCounterObjectRef: MutableRefObject<{
        triangle: number,
        circle: number,
        rectangle: number,
        square: number
    }>
}

const AsideParentComponent = ({ canvasRef, historyRef, shapeNumberCounterObjectRef }: AsideParentProps) =>
{
    return (
        <div className="sidebar print:hidden">
            <AsideSidebarComponent />
            <AsideOptionComponent canvasRef={ canvasRef } historyRef={ historyRef } shapeNumberCounterObjectRef={ shapeNumberCounterObjectRef } />
        </div>
    );
};

export default AsideParentComponent;
