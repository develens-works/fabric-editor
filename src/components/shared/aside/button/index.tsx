'use client';

import React, { MutableRefObject } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { fabric } from 'fabric';

import { motion } from 'framer-motion';
import { ButtonManager } from '@/libs/button-manager.lib';

import InputComponent from '@/components/ui/input.component';
import ButtonComponent from '@/components/ui/button.component';

interface AsideButtonProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideButtonOptionComponent = ({ canvasRef }: AsideButtonProps) =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='mx-auto flex w-[calc(100%-2rem)]'>
                <InputComponent
                    type='search'
                    placeholder='Search buttons...'
                />
            </div>
            <div className='custom-scrollbar mt-6 size-full max-h-[calc(100vh-9rem)] overflow-y-auto'>
                <ul className='mx-auto grid w-[calc(100%-2rem)] grid-cols-2 gap-4'>
                    <li className='flex h-14 items-center justify-center rounded-lg align-middle dark:border-gray-900'>
                        <ButtonComponent
                            className='h-fit w-full'
                            type='basicPrimary'
                            content='Button'
                            icon={ <FaPlus/> }
                            onClick={ () => ButtonManager.handleAdd(canvasRef, 'Button') }
                        />
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};

export default AsideButtonOptionComponent;
