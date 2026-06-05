'use client';

import React, { MutableRefObject, useState } from 'react';

import { fabric } from 'fabric';

import { motion } from 'framer-motion';

import InputComponent from '@/components/ui/input.component';
import RangeInputComponent from '@/components/ui/range-input.component';
import CustomColorComponent from '@/components/ui/custom-color.component';

interface AsideNavArrowsOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideNavArrowsOptionComponent = ({ canvasRef }: AsideNavArrowsOptionProps) =>
{
    const [typeOfArrows, setTypeOfArrows] = useState<'horizontal' | 'vertical'>('horizontal');

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper custom-scrollbar flex h-full flex-col gap-6 overflow-y-auto overflow-x-hidden px-4 py-6'>
            <div className='flex w-full flex-col items-start justify-start gap-2'>
                <p className='text-lg'>
                    Show
                </p>
                <div className='flex w-full items-center justify-center'>
                    <div className='flex w-full items-center justify-start gap-2'>
                        <p className='text-md'>
                            Hover
                        </p>
                        <input
                            className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                            type='checkbox'
                        />
                    </div>
                    <div className='flex w-full items-center justify-start gap-2'>
                        <p className='text-md'>
                            Stick
                        </p>
                        <input
                            className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                            type='checkbox'
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center gap-2'>
                <p className='w-full text-lg'>
                    Type of arrows
                </p>
                <ul className='flex w-full items-center justify-start gap-2'>
                    <li
                        onClick={ () => setTypeOfArrows('horizontal') }
                        className={ `fade-option flex h-9 w-full cursor-pointer items-center justify-center rounded border transition-all  ${ typeOfArrows === 'horizontal' ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }
                    >
                        <p className='whitespace-nowrap text-wrap'>
                            Horizontal
                        </p>
                    </li>
                    <li
                        onClick={ () => setTypeOfArrows('vertical') }
                        className={ `fade-option flex h-9 w-full cursor-pointer items-center justify-center rounded border transition-all  ${ typeOfArrows === 'vertical' ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }
                    >
                        <p className='whitespace-nowrap text-wrap'>
                            Vertical
                        </p>
                    </li>
                </ul>
            </div>

            <p className='w-full text-lg'>
                Icon
            </p>

            <p className='w-full text-lg'>
                Content alignment
            </p>

            <div className="flex flex-col items-start justify-start gap-2">
                <div className='flex w-full items-center justify-between'>
                    <p className="text-lg">
                        Background
                    </p>

                    <input
                        className="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white"
                        type="checkbox"
                    />
                </div>

                <div className="flex items-center justify-start gap-8">
                    <div className="flex w-full items-center justify-start gap-1">
                        <p>
                            W:
                        </p>
                        <InputComponent
                            type="basic"
                            placeholder="Width"
                        />
                    </div>

                    <div className="flex w-full items-center justify-start gap-1">
                        <p>
                            H:
                        </p>
                        <InputComponent
                            type="basic"
                            placeholder="Height"
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className='mb-2 text-lg'>
                    Color & Transparency
                </p>

                <CustomColorComponent className='!mt-0 !w-full' canvasRef={ canvasRef }/>
            </div>

            <div className='flex flex-col items-start justify-start'>
                <p className='text-lg'>
                    Radius
                </p>

                <RangeInputComponent className='-mt-8'/>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Prev & Next thumbnail
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Prev & Next title
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Hovering
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
        </motion.div>
    );
};

export default AsideNavArrowsOptionComponent;
