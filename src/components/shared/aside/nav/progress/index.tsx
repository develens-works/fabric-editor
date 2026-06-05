'use client';

import React, { MutableRefObject, useState } from 'react';

import { fabric } from 'fabric';

import { motion } from 'framer-motion';

import CustomColorComponent from '@/components/ui/custom-color.component';
import InputComponent from '@/components/ui/input.component';
import data from '@/components/shared/aside/nav/data';
import Image from 'next/image';

interface AsideNavProgressOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideNavProgressOptionComponent = ({ canvasRef }: AsideNavProgressOptionProps) =>
{
    const [activeSide, setActiveSide] = useState<number>(5);

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper custom-scrollbar flex h-full flex-col gap-6 overflow-y-auto overflow-x-hidden py-6'>
            <div className='flex items-center justify-between px-4'>
                <p className='text-lg'>
                    Show Progress
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>

            <div className='flex flex-col items-start justify-start gap-2 px-4'>
                <p className='text-lg'>
                    Alignment
                </p>

                <ul className='grid h-18 w-full grid-cols-3 grid-rows-2 gap-2'>
                    <li onClick={ () => setActiveSide(0) } className={ `cursor-pointer rounded-tl ${ activeSide === 0 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(1) } className={ `cursor-pointer ${ activeSide === 1 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(2) } className={ `cursor-pointer rounded-tr ${ activeSide === 2 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>

                    <li onClick={ () => setActiveSide(3) } className={ `cursor-pointer rounded-bl ${ activeSide === 3 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(4) } className={ `cursor-pointer ${ activeSide === 4 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(5) } className={ `cursor-pointer rounded-br ${ activeSide === 5 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                </ul>
            </div>

            <div className='px-4'>
                <p className='mb-2 text-lg'>
                    Color & Transparency
                </p>

                <CustomColorComponent className='!mt-0 !w-full' canvasRef={ canvasRef }/>
            </div>

            <div className='flex flex-col items-start justify-start gap-2 px-4'>
                <p className='text-lg'>
                    Size
                </p>

                <div className='flex items-center justify-start gap-8'>
                    <div className='flex w-full items-center justify-start gap-1'>
                        <p>
                            W:
                        </p>
                        <InputComponent
                            type='basic'
                            placeholder='Width'
                        />
                    </div>

                    <div className='flex w-full items-center justify-start gap-1'>
                        <p>
                            H:
                        </p>
                        <InputComponent
                            type='basic'
                            placeholder='Height'
                        />
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between px-4'>
                <p className='text-lg'>
                    Reverse
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>

            <div className='flex w-full flex-col items-start justify-start gap-2'>
                <p className='px-4 text-lg'>
                    Progress Type
                </p>
                <ul className='custom-scrollbar grid max-h-[calc(100vh-36rem)] w-full grid-cols-2 gap-1 overflow-y-auto px-4'>
                    {
                        data.progress.map((imageSrc, index) =>
                            (
                                <li
                                    key={ `progress_image_${ index }` }
                                    className='relative flex h-full max-h-40 min-h-40 justify-center align-middle'
                                >
                                    <Image
                                        fill
                                        alt={ `Progress Image ${ index + 1 }` }
                                        style={ { objectFit: 'contain' } }
                                        src={ `/assets/images/nav/progress/${ imageSrc }` }
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        unoptimized
                                    />
                                </li>
                            ))
                    }
                </ul>
            </div>
        </motion.div>
    );
};

export default AsideNavProgressOptionComponent;
