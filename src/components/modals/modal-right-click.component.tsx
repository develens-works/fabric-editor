'use client';

import { MutableRefObject, RefObject } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

import { GroupManager } from '@/libs/group-manager.lib';
import { ObjectManager } from '@/libs/object-manager.lib';

interface ModalRightClickProps
{
    innerRef: RefObject<HTMLDivElement>;
    position: { x: number, y: number };
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    historyRef: MutableRefObject<{ undo: any[], redo: any[] }>;
}

const ModalRightClickComponent = ({ innerRef, position, canvasRef, historyRef }: ModalRightClickProps) =>
{
    return (
        <>
            <motion.div
                initial={ { opacity: 0 } }
                animate={ { opacity: 1 } }
                ref={ innerRef }
                className={ 'fixed z-50 w-[10%] rounded-xl bg-lime-600 p-6 shadow' }
                style={ { left: `${ position.x }px`, top: `${ position.y }px` } }
            >
                <ul className={ 'flex' }>
                    <li className={ 'flex flex-col items-center' }>
                        <button onClick={ () => GroupManager.handleGroup(canvasRef, historyRef) }>Group</button>
                        <button onClick={ () => GroupManager.handleUngroup(canvasRef, historyRef) }>UnGroup</button>
                        <button onClick={ () => ObjectManager.moveToFront(canvasRef) }>Move Object To Front</button>
                        <button onClick={ () => ObjectManager.moveToBack(canvasRef) }>Move Object To Back</button>
                    </li>
                </ul>
            </motion.div>
        </>
    );
};

export default ModalRightClickComponent;
