'use client';

import React, { MutableRefObject } from 'react';
import Image from 'next/image';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import { ShapeManager } from '@/libs/shape-manager.lib';

import data from '@/components/shared/aside/shapes/data';

import CustomColorComponent from '@/components/ui/custom-color.component';

interface AsideShapesColorOptionProps
{
    id: string;
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    shapeNumberCounterObjectRef: MutableRefObject<{
        triangle: number,
        circle: number,
        rectangle: number,
        square: number
    }>;
}

const AsideShapesColorOptionComponent = ({ id, canvasRef, shapeNumberCounterObjectRef }: AsideShapesColorOptionProps) =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='custom-scrollbar size-full max-h-[calc(100vh-10rem)] overflow-y-auto'>
                <div className='custom-scrollbar size-full max-h-[calc(100vh-8rem)] overflow-y-auto'>
                    <ul className='grid grid-cols-4 gap-[8px] px-4'>
                        {
                            data.find((item) => item.id === id)?.items.map((item, index) =>
                                (
                                    <li
                                        key={ item + `_all_shapes_${ index }` }
                                        className='relative flex max-h-[calc(269px/4)] min-h-[calc(269px/4)] items-center justify-center align-middle'
                                        onClick={ () => ShapeManager.handleAddShape(item, canvasRef, shapeNumberCounterObjectRef) }
                                    >
                                        <div className='relative flex size-full max-h-[calc(269px/4)] min-h-[calc(269px/4)] cursor-pointer justify-center align-middle'>
                                            <Image
                                                fill
                                                alt={ item }
                                                src={ `/assets/images/shapes/${ item }` }
                                                style={ { objectFit: 'contain' } }
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                unoptimized
                                            />
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>

            <CustomColorComponent canvasRef={ canvasRef }/>
        </motion.div>
    );
};

export default AsideShapesColorOptionComponent;
