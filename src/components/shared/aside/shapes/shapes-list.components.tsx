'use client';

import React, { MutableRefObject } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

import { ShapeManager } from '@/libs/shape-manager.lib';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import data from '@/components/shared/aside/shapes/data';

import InputComponent from '@/components/ui/input.component';

interface AsideAllShapesOptionProps
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

const AsideShapesListOptionComponent: React.FC<AsideAllShapesOptionProps> = ({ id, canvasRef, shapeNumberCounterObjectRef }) =>
{
    const dispatch = useAppDispatch();

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='mx-auto -mt-2 mb-2 flex w-[calc(100%-2rem)] gap-2'>
                <button
                    className='tooltip-main-sidebar relative flex size-8 min-w-8 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25'
                    onClick={ () => dispatch(setAsideOption('SHAPES')) }
                >
                    <FaArrowLeft/>
                </button>

                <p className='text-md my-auto font-semibold dark:text-gray-300'>
                    { data.find((item) => item.id === id)?.title }
                </p>
            </div>
            <div className='mx-auto flex w-[calc(100%-2rem)]'>
                <InputComponent
                    type='search'
                    placeholder='Search shapes...'
                />
            </div>
            <div className='custom-scrollbar mt-6 size-full max-h-[calc(100vh-12rem)] overflow-y-auto'>
                <ul className='grid grid-cols-4 gap-[8px] px-4'>
                    {
                        data.find((item) => item.id === id)?.items.map((item, index) =>
                            (
                                <li
                                    key={ item + `_all_shapes_${ index }` }
                                    className='relative flex max-h-[calc(269px/4)] min-h-[calc(269px/4)] items-center justify-center align-middle'
                                    onClick={() => ShapeManager.handleAddShape(item, canvasRef, shapeNumberCounterObjectRef)}
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
        </motion.div>
    );
};

export default AsideShapesListOptionComponent;
