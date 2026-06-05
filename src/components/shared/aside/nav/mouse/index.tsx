'use client';

import React from 'react';

import { motion } from 'framer-motion';

const AsideNavMouseOptionComponent: React.FC = () =>
{
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

            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Slide with mouse scroll
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Reverse scroll sliding
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Stop when mouse on
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>

            <div className='flex w-full flex-col items-start justify-start gap-2'>
                <p className='text-lg'>
                    Keyboard arrows
                </p>
                <div className='flex w-full items-center justify-center'>
                    <div className='flex w-full items-center justify-start gap-2'>
                        <p className='text-md'>
                            Left/Right
                        </p>
                        <input
                            className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                            type='checkbox'
                        />
                    </div>
                    <div className='flex w-full items-center justify-start gap-2'>
                        <p className='text-md'>
                            Up/Down
                        </p>
                        <input
                            className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                            type='checkbox'
                        />
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Mobile swipe
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-lg'>
                    Desktop swipe
                </p>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                />
            </div>
        </motion.div>
    );
};

export default AsideNavMouseOptionComponent;
