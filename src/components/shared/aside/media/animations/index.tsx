'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';

import data from '@/components/shared/aside/media/animations/data';

import AnimationsItemComponent from '@/components/shared/aside/media/animations/animations-item.component';
import AnimationsSwiperComponent from '@/components/shared/aside/media/animations/animations-styled-swiperjs.component';

const AsideMediaAnimationsOptionComponent = () =>
{
    const [tabActive, setTabActive] = useState<'anime' | 'out'>('anime');

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-x-hidden pb-6'>
            <div className='grid h-fit grid-cols-3'>
                <div className={ `col-span-2 flex flex-col items-center justify-center border-b border-slate-300 px-4 pt-4 dark:border-navy-600 ${ tabActive === 'anime' && 'bg-navy-200/10 dark:bg-navy-700' }` }>
                    <p onClick={() => setTabActive('anime')} className={ `cursor-pointer ${ tabActive === 'anime' && 'text-accent dark:text-accent-light' }` }>
                        Anime
                    </p>
                    <div className='custom-scrollbar m-auto mb-0 ml-0 flex size-full items-center justify-start overflow-x-auto overflow-y-hidden'>
                        <AnimationsItemComponent type='anime' selected/>
                        <AnimationsItemComponent type='anime' selected/>
                        <AnimationsItemComponent type='anime' selected/>
                        <AnimationsItemComponent type='anime' selected/>
                    </div>
                </div>

                <div className={ `flex flex-col items-center justify-center border-b border-l border-slate-300 px-4 pb-1 pt-4 dark:border-navy-600 ${ tabActive === 'out' && 'bg-navy-200/10 dark:bg-navy-700' }` }>
                    <p onClick={() => setTabActive('out')} className={ `cursor-pointer ${ tabActive === 'out' && 'text-accent dark:text-accent-light' }` }>
                        Out
                    </p>
                    <AnimationsItemComponent type='anime' selected/>
                </div>
            </div>

            <div className='h-fit px-4 pt-4'>
                <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'anime' && 'is-active' }` }>
                    {
                        data.map((item, index) =>
                            (
                                <AnimationsSwiperComponent
                                    key={ item.title.split(' ').join('_').toUpperCase() + `_${ index }` }
                                    id={ item.id }
                                    title={ item.title }
                                    items={ item.items }
                                />
                            ))
                    }
                </div>
                <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'out' && 'is-active' }` }>
                    {
                        data.map((item, index) =>
                            (
                                <AnimationsSwiperComponent
                                    key={ item.title.split(' ').join('_').toUpperCase() + `_${ index }` }
                                    id={ item.id }
                                    title={ item.title }
                                    items={ item.items }
                                />
                            ))
                    }
                </div>
            </div>
        </motion.div>
    );
};

export default AsideMediaAnimationsOptionComponent;
