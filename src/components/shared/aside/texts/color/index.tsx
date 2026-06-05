'use client';

import React, { MutableRefObject } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

import CustomColorComponent from '@/components/ui/custom-color.component';

interface AsideTextColorOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideTextsColorOptionComponent = ({ canvasRef }: AsideTextColorOptionProps) =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='custom-scrollbar size-full max-h-[calc(100vh-11rem)] overflow-y-auto'>
                <ul className='space-y-2 font-inter font-medium'>
                    <li className='px-4'>
                        <div
                            className='flex cursor-pointer flex-col rounded-lg bg-slate-150 px-4 py-2.5 tracking-wide text-slate-800 outline-none transition-all dark:bg-navy-500 dark:text-navy-50'>
                            <p className='text-lg text-error'>
                                Example Text Content
                            </p>
                        </div>
                    </li>
                    <li className='px-4'>
                        <div
                            className='flex cursor-pointer flex-col rounded-lg px-4 py-2.5 tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100'>
                            <p className='text-lg text-success'>
                                Example Text Content
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <CustomColorComponent canvasRef={ canvasRef } />
        </motion.div>
    );
};

export default AsideTextsColorOptionComponent;
