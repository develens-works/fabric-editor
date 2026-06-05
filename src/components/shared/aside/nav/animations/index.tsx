'use client';

import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import { motion } from 'framer-motion';

import AnimationsItemComponent from '@/components/shared/aside/nav/animations/animations-item.component';
import AnimationsSwiperComponent from '@/components/shared/aside/nav/animations/animations-styled-swiperjs.component';

import data from '@/components/shared/aside/nav/animations/data';

interface AsideNavAnimationsOptionProps
{
    setOpenModal: any;
}

const AsideNavAnimationsOptionComponent: React.FC<AsideNavAnimationsOptionProps> = ({ setOpenModal }) =>
{
    const [tabActive, setTabActive] = useState<'side' | 'background' | 'navs'>('side');
    const [sideTabActive, setSideTabActive] = useState<'anime' | 'out'>('anime');
    const [backgroundTabActive, setBackgroundTabActive] = useState<'anime' | 'out'>('anime');
    const [navsTabActive, setNavsTabActive] = useState<'anime' | 'out'>('anime');

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-x-hidden pb-6'>
            <div className='tabs mt-6 flex h-fit w-full flex-col'>
                <div className='w-full'>
                    <div className='tabs-list flex w-full'>
                        <button
                            onClick={ () => setTabActive('side') }
                            className={ `tab btn w-[33.33%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'side' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                                Side
                        </button>
                        <button
                            onClick={ () => setTabActive('background') }
                            className={ `tab btn w-[33.33%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'background' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                                Background
                        </button>
                        <button
                            onClick={ () => setTabActive('navs') }
                            className={ `tab btn w-[33.33%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'navs' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                                Navs
                        </button>
                    </div>
                </div>
                <div className='h-fit'>
                    <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'side' && 'is-active' }` }>
                        <div className='grid h-fit grid-cols-2 gap-1.5 p-3'>
                            <div
                                className={ `flex flex-col items-center justify-center rounded-lg border px-4 pb-1 pt-4 ${ sideTabActive === 'anime' ? 'border-accent bg-navy-200/10 dark:border-accent-light dark:bg-navy-700' : 'border-slate-300 dark:border-navy-600' }` }>
                                <p onClick={ () => setSideTabActive('anime') } className={ `cursor-pointer ${ sideTabActive === 'anime' && 'text-accent dark:text-accent-light' }` }>
                                        Anime
                                </p>
                                <AnimationsItemComponent type='anime'/>
                            </div>
                            <div
                                className={ `flex flex-col items-center justify-center rounded-lg border px-4 pb-1 pt-4 ${ sideTabActive === 'out' ? 'border-accent bg-navy-200/10 dark:border-accent-light dark:bg-navy-700' : 'border-slate-300 dark:border-navy-600' }` }>
                                <p onClick={ () => setSideTabActive('out') } className={ `cursor-pointer ${ sideTabActive === 'out' && 'text-accent dark:text-accent-light' }` }>
                                        Out
                                </p>
                                <AnimationsItemComponent type='anime'/>
                            </div>
                        </div>

                        <div className='flex items-center justify-start gap-2 px-4'>
                            <p>
                                Reverse set as Anime/Out
                            </p>
                            <ul className='flex gap-1'>
                                <li
                                    onClick={() => setOpenModal(true)}
                                    className={ 'flex size-9 cursor-pointer items-center justify-center rounded border transition-all hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }
                                >
                                    <FaArrowLeft size={ 18 }/>
                                </li>
                                <li
                                    onClick={() => setOpenModal(true)}
                                    className={ 'flex size-9 cursor-pointer items-center justify-center rounded border transition-all hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }
                                >
                                    <FaArrowRight size={ 18 }/>
                                </li>
                            </ul>
                        </div>

                        <i className='mt-4 flex w-full border-b border-slate-300 dark:border-navy-600'/>

                        <div className='h-fit px-4'>
                            <div className={ `tab-content tab-shift-left w-full ${ sideTabActive === 'anime' && 'is-active' }` }>
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
                            <div className={ `tab-content tab-shift-left w-full ${ sideTabActive === 'out' && 'is-active' }` }>
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
                    </div>
                    <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'background' && 'is-active' }` }>
                        <div className="grid h-fit grid-cols-2 gap-1.5 p-3">
                            <div
                                className={ `flex flex-col items-center justify-center rounded-lg border px-4 pb-1 pt-4 ${ backgroundTabActive === 'anime' ? 'border-accent bg-navy-200/10 dark:border-accent-light dark:bg-navy-700' : 'border-slate-300 dark:border-navy-600' }` }>
                                <p onClick={ () => setBackgroundTabActive('anime') } className={ `cursor-pointer ${ backgroundTabActive === 'anime' && 'text-accent dark:text-accent-light' }` }>
                                    Anime
                                </p>
                                <AnimationsItemComponent type="anime"/>
                            </div>
                            <div
                                className={ `flex flex-col items-center justify-center rounded-lg border px-4 pb-1 pt-4 ${ backgroundTabActive === 'out' ? 'border-accent bg-navy-200/10 dark:border-accent-light dark:bg-navy-700' : 'border-slate-300 dark:border-navy-600' }` }>
                                <p onClick={ () => setBackgroundTabActive('out') } className={ `cursor-pointer ${ backgroundTabActive === 'out' && 'text-accent dark:text-accent-light' }` }>
                                    Out
                                </p>
                                <AnimationsItemComponent type="anime"/>
                            </div>
                        </div>

                        <div className="flex items-center justify-start gap-2 px-4">
                            <p>
                                Reverse set as Anime/Out
                            </p>
                            <ul className="flex gap-1">
                                <li
                                    onClick={ () => setOpenModal(true) }
                                    className={ 'flex size-9 cursor-pointer items-center justify-center rounded border transition-all hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }
                                >
                                    <FaArrowLeft size={ 18 }/>
                                </li>
                                <li
                                    onClick={ () => setOpenModal(true) }
                                    className={ 'flex size-9 cursor-pointer items-center justify-center rounded border transition-all hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }
                                >
                                    <FaArrowRight size={ 18 }/>
                                </li>
                            </ul>
                        </div>

                        <i className="mt-4 flex w-full border-b border-slate-300 dark:border-navy-600"/>

                        <div className="h-fit px-4">
                            <div className={ `tab-content tab-shift-left w-full ${ backgroundTabActive === 'anime' && 'is-active' }` }>
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
                            <div className={ `tab-content tab-shift-left w-full ${ backgroundTabActive === 'out' && 'is-active' }` }>
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
                    </div>
                    <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'navs' && 'is-active' }` }>
                        <div className="grid h-fit grid-cols-2 gap-1.5 p-3">
                            <div
                                className={ `flex flex-col items-center justify-center rounded-lg border px-4 pb-1 pt-4 ${ navsTabActive === 'anime' ? 'border-accent bg-navy-200/10 dark:border-accent-light dark:bg-navy-700' : 'border-slate-300 dark:border-navy-600' }` }>
                                <p onClick={ () => setNavsTabActive('anime') } className={ `cursor-pointer ${ navsTabActive === 'anime' && 'text-accent dark:text-accent-light' }` }>
                                    Anime
                                </p>
                                <AnimationsItemComponent type="anime"/>
                            </div>
                            <div
                                className={ `flex flex-col items-center justify-center rounded-lg border px-4 pb-1 pt-4 ${ navsTabActive === 'out' ? 'border-accent bg-navy-200/10 dark:border-accent-light dark:bg-navy-700' : 'border-slate-300 dark:border-navy-600' }` }>
                                <p onClick={ () => setNavsTabActive('out') } className={ `cursor-pointer ${ navsTabActive === 'out' && 'text-accent dark:text-accent-light' }` }>
                                    Out
                                </p>
                                <AnimationsItemComponent type='anime'/>
                            </div>
                        </div>

                        <div className='flex items-center justify-start gap-2 px-4'>
                            <p>
                                Reverse set as Anime/Out
                            </p>
                            <ul className='flex gap-1'>
                                <li
                                    onClick={ () => setOpenModal(true) }
                                    className={ 'flex size-9 cursor-pointer items-center justify-center rounded border transition-all hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }
                                >
                                    <FaArrowLeft size={ 18 }/>
                                </li>
                                <li
                                    onClick={ () => setOpenModal(true) }
                                    className={ 'flex size-9 cursor-pointer items-center justify-center rounded border transition-all hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }
                                >
                                    <FaArrowRight size={ 18 }/>
                                </li>
                            </ul>
                        </div>

                        <i className='mt-4 flex w-full border-b border-slate-300 dark:border-navy-600'/>

                        <div className='h-fit px-4'>
                            <div className={ `tab-content tab-shift-left w-full ${ navsTabActive === 'anime' && 'is-active' }` }>
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
                            <div className={ `tab-content tab-shift-left w-full ${ navsTabActive === 'out' && 'is-active' }` }>
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
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AsideNavAnimationsOptionComponent;
