'use client';

import React, { useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaChevronDown } from 'react-icons/fa6';

import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import { motion } from 'framer-motion';

import Image from 'next/image';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import data from '@/components/shared/aside/texts/animations/modify/data';

import InputComponent from '@/components/ui/input.component';
import ButtonComponent from '@/components/ui/button.component';
import CustomRangeInputComponent from '@/components/ui/custom-range-input.component';

interface AsideTextsAnimationsItemOptionProps
{
    id: string;
}

const AsideTextsAnimationsItemOptionComponent: React.FC<AsideTextsAnimationsItemOptionProps> = ({ id }) =>
{
    const dispatch = useAppDispatch();

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [fade, setFade] = useState<'in' | 'out'>('in');
    const [direction, setDirection] = useState<string[]>(['up', 'left']);
    const [collapse, setCollapse] = useState<string[]>([]);
    const [basicsTabActive, setBasicsTabActive] = useState<'1' | '2' | '3' | '4' | '5' | '6'>('1');
    const [advancedTabActive, setAdvancedTabActive] = useState<'1' | '2' | '3' | '4' | '5' | '6'>('1');

    const handleDirection = (directionName: 'right' | 'left' | 'up' | 'down') =>
    {
        if (direction.includes(directionName))
            setDirection(direction.filter(directionX => directionX !== directionName));
        else
        {
            switch (directionName)
            {
                case 'right':
                {
                    if (direction.includes('left'))
                        setDirection([...direction.filter(directionX => directionX !== 'left'), 'right']);
                    else
                        setDirection([...direction, 'right']);

                    break;
                }
                case 'left':
                {
                    if (direction.includes('right'))
                        setDirection([...direction.filter(directionX => directionX !== 'right'), 'left']);
                    else
                        setDirection([...direction, 'left']);

                    break;
                }
                case 'up':
                {
                    if (direction.includes('down'))
                        setDirection([...direction.filter(directionX => directionX !== 'down'), 'up']);
                    else
                        setDirection([...direction, 'up']);

                    break;
                }
                case 'down':
                {
                    if (direction.includes('up'))
                        setDirection([...direction.filter(directionX => directionX !== 'up'), 'down']);
                    else
                        setDirection([...direction, 'down']);

                    break;
                }
            }
        }
    };

    const handleCollapse = (collapseName: 'basics' | 'advanced') =>
    {
        if (collapse.includes(collapseName))
            setCollapse([...collapse.filter(collapseX => collapseX !== collapseName)]);
        else
            setCollapse([...collapse, collapseName]);
    };

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='mx-auto -mt-2 mb-2 flex w-[calc(100%-2rem)] gap-2'>
                <button
                    className='tooltip-main-sidebar relative mt-3 flex size-8 min-w-8 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25'
                    onClick={ () => dispatch(setAsideOption('TEXTS_ANIMATIONS')) }
                >
                    <FaArrowLeft/>
                </button>

                <div className='flex items-center justify-end gap-2'>
                    <span className='relative flex size-14'>
                        <Image
                            fill
                            alt='rise aniamtion'
                            style={ { objectFit: 'contain' } }
                            src='/assets/images/animations/rise.webp'
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                            unoptimized
                        />
                    </span>
                    <p className='text-md my-auto font-semibold dark:text-gray-300'>
                        { data.find((item) => item.id === id)?.title }
                    </p>
                </div>
            </div>

            <div className='custom-scrollbar mt-6 size-full max-h-[calc(100vh-12rem)] overflow-y-auto'>
                <div className='mb-4 flex items-center justify-between px-4'>
                    <Tippy
                        allowHTML
                        interactive
                        trigger='click'
                        appendTo={ () => document.body }
                        arrow={ roundArrow }
                        placement={ 'bottom' }
                        animation={ 'shift-away' }
                        theme='fourthly'
                        className='save-as-dropdown shadow-3xl'
                        content={
                            <div className='flex w-full min-w-[calc(292px-1rem)] max-w-[calc(292px-1rem)] flex-col gap-2'>
                                <ButtonComponent content='Save' className='w-full dark:bg-navy-400'/>

                                <i className='relative my-2 flex h-[1px] min-h-[1px] w-full bg-slate-200 opacity-70 dark:bg-navy-500'/>

                                <InputComponent placeholder='Anime Name' className='!border-slate-150 dark:!border-navy-400'/>
                                <ButtonComponent content='Save as' className='w-full dark:bg-navy-400'/>
                            </div>
                        }
                    >
                        <span
                            onClick={ () => setOpenDropdown(!openDropdown)}
                            className='btn popper-ref relative flex w-full cursor-pointer gap-2 space-x-1 bg-slate-150 px-4 pr-10 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90 [&.is-active_svg]:rotate-180'
                        >
                            <FaRegSave size={ 16 } />
                            <p>
                                Save/As
                            </p>
                            <i className={ `absolute right-2 my-auto flex items-center justify-center transition-all ${ openDropdown && 'rotate-90' }` }>
                                <FaChevronDown />
                            </i>
                        </span>
                    </Tippy>
                </div>

                <div className='flex flex-col gap-2 px-4'>
                    <CustomRangeInputComponent
                        unit='ms'
                        min={ 0 }
                        max={ 100 }
                        defaultValue={ [0, 50] }
                        id='range-slider-gradient'
                        parentClassName='mb-2 gap-0 py-0'
                        className='single-thumb'
                        label='Duraction'
                    />

                    <CustomRangeInputComponent
                        unit='ms'
                        min={ 0 }
                        max={ 100 }
                        defaultValue={ [0, 50] }
                        id='range-slider-gradient'
                        parentClassName='mb-2 gap-0 py-0'
                        className='single-thumb'
                        label='Delay'
                    />

                    <div className='my-4 flex items-center justify-between'>
                        <p>
                            Direction:
                        </p>
                        <ul className='flex gap-2'>
                            <li onClick={ () => handleDirection('left') }
                                className={ `flex size-9 cursor-pointer items-center justify-center rounded border transition-all  ${ direction.includes('left') ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }>
                                <FaArrowLeft size={ 18 }/>
                            </li>
                            <li onClick={ () => handleDirection('right') }
                                className={ `flex size-9 cursor-pointer items-center justify-center rounded border transition-all  ${ direction.includes('right') ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }>
                                <FaArrowRight size={ 18 }/>
                            </li>
                            <li onClick={ () => handleDirection('up') }
                                className={ `flex size-9 cursor-pointer items-center justify-center rounded border transition-all  ${ direction.includes('up') ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }>
                                <FaArrowUp size={ 18 }/>
                            </li>
                            <li onClick={ () => handleDirection('down') }
                                className={ `flex size-9 cursor-pointer items-center justify-center rounded border transition-all  ${ direction.includes('down') ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }>
                                <FaArrowDown size={ 18 }/>
                            </li>
                        </ul>
                    </div>

                    <div className='mb-4 flex items-center justify-between'>
                        <p>
                            Fade:
                        </p>
                        <ul className='flex gap-2'>
                            <li onClick={ () => setFade('in') }
                                className={ `fade-option flex h-9 cursor-pointer items-center justify-center rounded border transition-all  ${ fade === 'in' ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }>
                                <p className='whitespace-nowrap text-wrap'>
                                    Fade-In
                                </p>
                            </li>
                            <li onClick={ () => setFade('out') }
                                className={ `fade-option flex h-9 cursor-pointer items-center justify-center rounded border transition-all  ${ fade === 'out' ? 'border-accent dark:border-accent-light' : 'hover:border-navy-200 dark:border-navy-600 dark:hover:border-navy-500' }` }>
                                <p className='whitespace-nowrap text-wrap'>
                                    Fade-Out
                                </p>
                            </li>
                        </ul>
                    </div>

                    <CustomRangeInputComponent
                        unit='ms'
                        min={ 0 }
                        max={ 100 }
                        defaultValue={ [0, 50] }
                        id='range-slider-gradient'
                        parentClassName='mb-2 gap-0 py-0'
                        className='single-thumb'
                        label='Scale (Distance)'
                    />

                    <CustomRangeInputComponent
                        unit='ms'
                        min={ 0 }
                        max={ 100 }
                        defaultValue={ [0, 50] }
                        id='range-slider-gradient'
                        parentClassName='mb-2 gap-0 py-0'
                        className='single-thumb'
                        label='Intensity'
                    />

                    <div className='mt-4 flex flex-col divide-y divide-slate-150 rounded-lg border border-slate-150 dark:divide-navy-500 dark:border-navy-500'>
                        <div className='ac'>
                            <div className='ac-trigger flex cursor-pointer items-center justify-between p-4 text-base font-medium text-slate-700 dark:text-navy-100 sm:px-5'
                                onClick={ () => handleCollapse('basics') }>
                                <p>
                                    Basics
                                </p>
                                <div
                                    className={ `ac-icon text-sm font-normal leading-none text-slate-400 transition-all duration-300 dark:text-navy-300 ${ collapse.includes('basics') && 'rotate-180' }` }>
                                    <FaChevronDown/>
                                </div>
                            </div>

                            <div className={ `ac-panel transition-all ${ collapse.includes('basics') ? 'h-auto' : 'h-0 overflow-hidden' }` }>
                                <div className='px-4 pb-4'>
                                    <div
                                        className='is-scrollbar-hidden mb-6 w-full overflow-x-auto rounded-lg bg-slate-200 text-slate-600 dark:bg-navy-800 dark:text-navy-200'>
                                        <div className='tabs-list flex gap-1 px-1.5 py-1'>
                                            <button
                                                onClick={ () => setBasicsTabActive('1') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ basicsTabActive === '1' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Layer
                                            </button>
                                            <button
                                                onClick={ () => setBasicsTabActive('2') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ basicsTabActive === '2' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Char
                                            </button>
                                            <button
                                                onClick={ () => setBasicsTabActive('3') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ basicsTabActive === '3' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Word
                                            </button>
                                            <button
                                                onClick={ () => setBasicsTabActive('4') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ basicsTabActive === '4' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Line
                                            </button>
                                            <button
                                                onClick={ () => setBasicsTabActive('5') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ basicsTabActive === '5' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Mask
                                            </button>
                                            <button
                                                onClick={ () => setBasicsTabActive('6') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ basicsTabActive === '6' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Color
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ basicsTabActive === '1' && 'is-active' }` }>
                                        1
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ basicsTabActive === '2' && 'is-active' }` }>
                                        2
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ basicsTabActive === '3' && 'is-active' }` }>
                                        3
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ basicsTabActive === '4' && 'is-active' }` }>
                                        4
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ basicsTabActive === '5' && 'is-active' }` }>
                                        5
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ basicsTabActive === '6' && 'is-active' }` }>
                                        6
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='ac'>
                            <div className='ac-trigger flex cursor-pointer items-center justify-between p-4 text-base font-medium text-slate-700 dark:text-navy-100 sm:px-5'
                                onClick={ () => handleCollapse('advanced') }>
                                <p>
                                    Advanced
                                </p>
                                <div
                                    className={ `ac-icon text-sm font-normal leading-none text-slate-400 transition-all duration-300 dark:text-navy-300 ${ collapse.includes('advanced') && 'rotate-180' }` }>
                                    <FaChevronDown/>
                                </div>
                            </div>

                            <div className={ `ac-panel transition-all ${ collapse.includes('advanced') ? 'h-auto' : 'h-0 overflow-hidden' }` }>
                                <div className='px-4 pb-4'>
                                    <div
                                        className='is-scrollbar-hidden mb-6 w-full overflow-x-auto rounded-lg bg-slate-200 text-slate-600 dark:bg-navy-800 dark:text-navy-200'>
                                        <div className='tabs-list flex gap-1 px-1.5 py-1'>
                                            <button
                                                onClick={ () => setAdvancedTabActive('1') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ advancedTabActive === '1' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Layer
                                            </button>
                                            <button
                                                onClick={ () => setAdvancedTabActive('2') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ advancedTabActive === '2' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Char
                                            </button>
                                            <button
                                                onClick={ () => setAdvancedTabActive('3') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ advancedTabActive === '3' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Word
                                            </button>
                                            <button
                                                onClick={ () => setAdvancedTabActive('4') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ advancedTabActive === '4' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Line
                                            </button>
                                            <button
                                                onClick={ () => setAdvancedTabActive('5') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ advancedTabActive === '5' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Mask
                                            </button>
                                            <button
                                                onClick={ () => setAdvancedTabActive('6') }
                                                className={ `tab btn shrink-0 px-3 py-1.5 font-medium ${ advancedTabActive === '6' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100 ' }` }
                                            >
                                                Color
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ advancedTabActive === '1' && 'is-active' }` }>
                                        1
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ advancedTabActive === '2' && 'is-active' }` }>
                                        2
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ advancedTabActive === '3' && 'is-active' }` }>
                                        3
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ advancedTabActive === '4' && 'is-active' }` }>
                                        4
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ advancedTabActive === '5' && 'is-active' }` }>
                                        5
                                    </div>
                                    <div
                                        className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-x-hidden overscroll-y-auto ${ advancedTabActive === '6' && 'is-active' }` }>
                                        6
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AsideTextsAnimationsItemOptionComponent;
