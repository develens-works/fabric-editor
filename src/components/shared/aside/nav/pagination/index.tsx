'use client';

import React, { useState } from 'react';
import { GoCircleSlash } from 'react-icons/go';

import { motion } from 'framer-motion';

import RangeInputComponent from '@/components/ui/range-input.component';

import Border1 from '../../../../../../public/assets/images/illustrations/border-1.svg';
import Border2 from '../../../../../../public/assets/images/illustrations/border-2.svg';
import Border3 from '../../../../../../public/assets/images/illustrations/border-3.svg';
import Border4 from '../../../../../../public/assets/images/illustrations/border-4.svg';

const AsideNavPaginationOptionComponent = () =>
{
    const [activeSide, setActiveSide] = useState<number>(5);
    const [navigationItemType, setNavigationItemType] = useState<'dots' | 'thumbnail'>('dots');

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
                    Navigation item type
                </p>
                <ul className='flex w-full items-center justify-start gap-2'>
                    <li
                        onClick={ () => setNavigationItemType('dots') }
                        className={ `fade-option flex h-9 w-full cursor-pointer items-center justify-center rounded border transition-all  ${ navigationItemType === 'dots' ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }
                    >
                        <p className='whitespace-nowrap text-wrap'>
                            Dots
                        </p>
                    </li>
                    <li
                        onClick={ () => setNavigationItemType('thumbnail') }
                        className={ `fade-option flex h-9 w-full cursor-pointer items-center justify-center rounded border transition-all  ${ navigationItemType === 'thumbnail' ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }
                    >
                        <p className='whitespace-nowrap text-wrap'>
                            Thumbnail
                        </p>
                    </li>
                </ul>
            </div>

            <div className='flex flex-col items-start justify-start gap-2'>
                <p className='text-lg'>
                    Location
                </p>

                <ul className='grid h-28 w-full grid-cols-3 grid-rows-3 gap-2'>
                    <li onClick={ () => setActiveSide(0) } className={ `cursor-pointer rounded-tl ${ activeSide === 0 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(1) } className={ `cursor-pointer ${ activeSide === 1 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(2) } className={ `cursor-pointer rounded-tr ${ activeSide === 2 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>

                    <li onClick={ () => setActiveSide(3) } className={ `cursor-pointer ${ activeSide === 3 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(4) } className={ `cursor-pointer ${ activeSide === 4 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(5) } className={ `cursor-pointer ${ activeSide === 5 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>

                    <li onClick={ () => setActiveSide(6) } className={ `cursor-pointer rounded-bl ${ activeSide === 6 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(7) } className={ `cursor-pointer ${ activeSide === 7 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                    <li onClick={ () => setActiveSide(8) } className={ `cursor-pointer rounded-br ${ activeSide === 8 ? 'bg-gray-400 dark:bg-navy-300' : 'bg-gray-300 dark:bg-navy-900' }` }/>
                </ul>
            </div>

            <div className='flex flex-col items-start justify-start'>
                <p className='text-lg'>
                    Size
                </p>

                <RangeInputComponent className='-mt-8' />
            </div>

            <div className='flex flex-col items-start justify-start gap-2'>
                <p className='text-lg'>
                    Border
                </p>

                <div className='flex h-fit w-full flex-col'>
                    <ul className='mb-3 flex w-full items-center justify-start gap-2'>
                        <li className='flex w-full cursor-pointer items-center justify-center rounded border-2 border-accent-light p-2 px-3 align-middle transition-all'>
                            <GoCircleSlash size={ 18 }/>
                        </li>
                        <li className='flex w-full cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-3 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                            <Border1/>
                        </li>
                        <li className='flex w-full cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-3 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                            <Border2/>
                        </li>
                        <li className='flex w-full cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-3 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                            <Border3/>
                        </li>
                        <li className='flex w-full cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-3 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                            <Border4/>
                        </li>
                    </ul>

                    <RangeInputComponent label='Tickness'/>
                </div>
            </div>

            <div className='flex flex-col items-start justify-start gap-2'>
                <p className='text-lg'>
                    Hover
                </p>

                <RangeInputComponent label='Tickness'/>
            </div>
        </motion.div>
    );
};

export default AsideNavPaginationOptionComponent;
