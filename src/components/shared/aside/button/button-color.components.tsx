'use client';

import React, { MutableRefObject } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { motion } from 'framer-motion';

import ButtonComponent from '@/components/ui/button.component';
import CustomColorComponent from '@/components/ui/custom-color.component';
import { fabric } from 'fabric';

interface AsideButtonColorOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideButtonColorOptionComponent = ({ canvasRef }: AsideButtonColorOptionProps) =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <ul className='grid max-h-[calc(100vh-12.5rem)] grid-cols-2 gap-4 overflow-hidden px-4 pb-6'>
                <li className='flex h-11 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                    <ButtonComponent
                        className='h-fit w-full'
                        type='basicPrimary'
                        content='Button'
                        icon={ <FaPlus/> }
                    />
                </li>

                <li className='flex h-11 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                    <ButtonComponent
                        className='h-fit w-full dark:bg-red-600'
                        type='basicPrimary'
                        content='Button'
                        icon={ <FaPlus/> }
                    />
                </li>
                <li className='flex h-11 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                    <ButtonComponent
                        className='h-fit w-full dark:bg-success'
                        type='basicPrimary'
                        content='Button'
                        icon={ <FaPlus/> }
                    />
                </li>
                <li className='flex h-11 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                    <ButtonComponent
                        className='h-fit w-full dark:bg-yellow-300'
                        type='basicPrimary'
                        content='Button'
                        icon={ <FaPlus/> }
                    />
                </li>
                <li className='flex h-11 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                    <ButtonComponent
                        className='h-fit w-full dark:bg-orange-400'
                        type='basicPrimary'
                        content='Button'
                        icon={ <FaPlus/> }
                    />
                </li>
                <li className='flex h-11 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                    <ButtonComponent
                        className='h-fit w-full dark:bg-info'
                        type='basicPrimary'
                        content='Button'
                        icon={ <FaPlus/> }
                    />
                </li>
            </ul>

            <div className='mx-auto mt-5 flex h-11 w-[calc(50%-1rem)] items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                <ButtonComponent
                    className='h-fit w-full dark:bg-red-600'
                    type='basicPrimary'
                    content='Button'
                    icon={ <FaPlus/> }
                />
            </div>

            <div className='grid grid-cols-3'>
                <CustomColorComponent content='BG' icon={ false } canvasRef={ canvasRef }/>
                <CustomColorComponent content='Text' icon={ false } canvasRef={ canvasRef }/>
                <CustomColorComponent content='Border' icon={ false } canvasRef={ canvasRef }/>
            </div>

            <i className='relative my-2 mt-10 flex h-[1px] min-h-[1px] w-full bg-slate-200 opacity-70 dark:bg-navy-500'/>

            <p className='mb-2 ml-5 mt-5 flex text-md+ font-semibold'>
                Hover:
            </p>

            <div className='mx-auto flex h-11 w-[calc(50%-1rem)] items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                <ButtonComponent
                    className='h-fit w-full dark:bg-red-600'
                    type='basicPrimary'
                    content='Button'
                    icon={ <FaPlus/> }
                />
            </div>

            <div className='grid grid-cols-3'>
                <CustomColorComponent content='BG' icon={ false } canvasRef={ canvasRef }/>
                <CustomColorComponent content='Text' icon={ false } canvasRef={ canvasRef }/>
                <CustomColorComponent content='Border' icon={ false } canvasRef={ canvasRef }/>
            </div>
        </motion.div>
    );
};

export default AsideButtonColorOptionComponent;
