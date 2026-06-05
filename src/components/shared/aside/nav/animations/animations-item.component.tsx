'use client';

import React, { useState } from 'react';
import { CgScrollV } from 'react-icons/cg';
import { GoCircleSlash } from 'react-icons/go';
import { FaCheck, FaChevronRight, FaPen } from 'react-icons/fa6';
import { TbClick, TbRefresh } from 'react-icons/tb';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { HiCursorClick, HiOutlineCursorClick } from 'react-icons/hi';

import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import Image from 'next/image';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import RangeInputComponent from '@/components/ui/range-input.component';

const tags =
[
    'my tag 1',
    'their tag 2',
    'your tag 3',
    'our tag 4',
    'my tag 5',
    'your tag 6',
    'our tag 7',
    'their tag 8',
    'our tag 9',
    'their tag 10',
    'your tag 11'
];

interface AnimationsItemComponentProps
{
    type?: 'anime' | 'out' | 'list';
    system?: boolean;
    selected?: boolean;
}

const AnimationsItemComponent: React.FC<AnimationsItemComponentProps> = ({ type = 'anime', system = false, selected = false }) =>
{
    const dispatch = useAppDispatch();

    const [showAllTags, setShowAllTags] = useState<boolean>(false);

    return (
        <div className='aside-text-animations-item relative flex size-full w-24 min-w-24 max-w-24 items-center justify-center pt-3'>
            {
                selected
                &&
                <div className='absolute left-2 top-4 z-10 flex items-center justify-start gap-1 opacity-40'>
                    <i className='size-4'>
                        <TbRefresh size={ 16 }/>
                    </i>
                    <i className='size-4'>
                        <TbClick size={ 16 }/>
                    </i>
                </div>
            }

            <Tippy
                allowHTML
                interactive
                trigger='click'
                appendTo={ () => document.body }
                arrow={ roundArrow }
                placement={ 'right-start' }
                animation={ 'shift-away' }
                content={
                    <>
                        {
                            type === 'anime'
                            &&
                            <ul className='flex w-48 flex-col gap-1.5 py-1'>
                                <li
                                    className={ 'flex items-center justify-between gap-2 rounded-md p-2 px-3' }>
                                    <p className='flex items-center justify-start gap-2 text-lg'>
                                        My Animation Name
                                    </p>
                                </li>

                                <li
                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-navy-600' }>
                                    <p className='flex items-center justify-start gap-2'>
                                        <i>
                                            <FaPen size={ 18 }/>
                                        </i>
                                        <span>
                                            Modify
                                        </span>
                                    </p>
                                </li>

                                <li
                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md bg-red-500 p-2 px-3 transition-all hover:bg-red-600' }>
                                    <p className='flex items-center justify-start gap-2'>
                                        <i>
                                            <GoCircleSlash size={ 18 }/>
                                        </i>
                                        <span>
                                            Remove
                                        </span>
                                    </p>
                                </li>

                                <span className='m-auto my-2 flex h-[1px] w-full items-center justify-center bg-slate-100 dark:bg-navy-600'/>

                                <Tippy
                                    allowHTML
                                    interactive
                                    trigger='mouseenter'
                                    appendTo='parent'
                                    arrow={ roundArrow }
                                    placement={ 'right-start' }
                                    animation={ 'shift-away' }
                                    theme='tertiary'
                                    content={
                                        <>
                                            <ul className='flex w-44 flex-col gap-1.5 py-1'>
                                                <li
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-300 dark:hover:bg-navy-600' }>
                                                    <p className='flex w-full items-center justify-start gap-2'>
                                                        <i>
                                                            <HiOutlineCursorClick size={ 18 }/>
                                                        </i>
                                                        <span>
                                                            Hover
                                                        </span>
                                                        <i className='ml-auto w-4'>
                                                            <FaCheck/>
                                                        </i>
                                                    </p>
                                                </li>
                                                <li
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-300 dark:hover:bg-navy-600' }>
                                                    <p className='flex w-full items-center justify-start gap-2'>
                                                        <i>
                                                            <HiCursorClick size={ 18 }/>
                                                        </i>
                                                        <span>
                                                            Click
                                                        </span>
                                                        <i className='ml-auto w-4'>
                                                            {/* <FaCheck/> */ }
                                                        </i>
                                                    </p>
                                                </li>
                                                <li
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-300 dark:hover:bg-navy-600' }>
                                                    <p className='flex w-full items-center justify-start gap-2'>
                                                        <i>
                                                            <CgScrollV size={ 18 }/>
                                                        </i>
                                                        <span>
                                                            Scroll
                                                        </span>
                                                        <i className='ml-auto w-4'>
                                                            <FaCheck/>
                                                        </i>
                                                    </p>
                                                </li>
                                            </ul>
                                        </>
                                    }
                                >
                                    <li
                                        className={ 'animation-item-dropdown flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3' }
                                    >
                                        <p className='flex items-center justify-start gap-2'>
                                            <span>
                                                On Action
                                            </span>
                                        </p>

                                        <i className={ 'absolute right-4 my-auto flex items-center justify-center transition-all' }>
                                            <FaChevronRight />
                                        </i>
                                    </li>
                                </Tippy>

                                <Tippy
                                    allowHTML
                                    interactive
                                    trigger='mouseenter'
                                    appendTo='parent'
                                    arrow={ roundArrow }
                                    placement={ 'right-start' }
                                    animation={ 'shift-away' }
                                    theme='tertiary'
                                    content={
                                        <>
                                            <ul className='flex w-44 flex-col gap-1.5 py-1'>
                                                <li
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all' }>
                                                    <RangeInputComponent
                                                        sliderClassname='!w-full'
                                                        className='w-full gap-0 py-0'
                                                        label='Gap'
                                                        step={ 0.001 }
                                                        min={ 0 }
                                                        max={ 10 }
                                                        defaultValue={ 0 }
                                                    />
                                                </li>
                                                <li
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 pt-0 transition-all' }>
                                                    <RangeInputComponent
                                                        infinityAt21
                                                        sliderClassname='!w-full'
                                                        className='w-full gap-0 py-0'
                                                        label='Repeat'
                                                        step={ 1 }
                                                        min={ 1 }
                                                        max={ 21 }
                                                        defaultValue={ 1 }
                                                    />
                                                </li>
                                            </ul>
                                        </>
                                    }
                                >
                                    <li
                                        className={ 'animation-item-dropdown flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3' }
                                    >
                                        <p className="flex items-center justify-start gap-2">
                                            <span>
                                                Loop
                                            </span>
                                        </p>

                                        <i className={ 'absolute right-4 my-auto flex items-center justify-center transition-all' }>
                                            <FaChevronRight/>
                                        </i>
                                    </li>
                                </Tippy>

                                <span className="m-auto my-2 flex h-[1px] w-full items-center justify-center bg-slate-100 dark:bg-navy-600"/>

                                <ul className='flex w-full flex-wrap gap-1.5'>
                                    {
                                        tags.slice(0, showAllTags ? tags.length : 4).map((tag, index) =>
                                            (
                                                <li className='cursor-pointer rounded border px-1.5 py-[.1rem] transition-all hover:bg-navy-100 dark:hover:bg-navy-450'
                                                    key={ `${ tag.split(' ').join('_') }_${ index }` }>
                                                    { tag }
                                                </li>
                                            ))
                                    }
                                </ul>
                                {
                                    (tags.length > 4 && !showAllTags)
                                    &&
                                    <button className='m-auto ml-0 mt-1 text-accent transition-all hover:text-accent-light dark:text-accent-light' onClick={ () => setShowAllTags(!showAllTags) }>
                                        Show all tags
                                    </button>
                                }
                                {
                                    (tags.length > 4 && showAllTags)
                                    &&
                                    <button className='m-auto ml-0 mt-1 text-accent transition-all hover:text-accent-light dark:text-accent-light' onClick={ () => setShowAllTags(!showAllTags) }>
                                        Show fewer tags
                                    </button>
                                }
                            </ul>
                        }
                        {
                            type === 'list'
                            &&
                            <ul className='flex w-48 flex-col gap-1.5 py-1'>
                                <li
                                    className={ 'flex items-center justify-between gap-2 rounded-md p-2 px-3 pb-0' }>
                                    <p className='flex items-center justify-start gap-2 text-lg'>
                                        My Animation Name
                                    </p>
                                </li>

                                <span className='m-auto my-2 flex h-[1px] w-full items-center justify-center bg-slate-100 dark:bg-navy-600'/>

                                <li
                                    className={ 'flex items-center justify-between gap-2 rounded-md p-2 px-3' }>
                                    <p className='flex items-center justify-start gap-2'>
                                        <span>
                                            Add to
                                        </span>
                                    </p>
                                </li>
                                <li
                                    className={ 'ml-4 flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-100 dark:hover:bg-navy-600' }>
                                    <p className='flex w-full items-center justify-start gap-2'>
                                        <i>
                                            <IoIosLogIn size={ 18 }/>
                                        </i>
                                        <span>
                                            Anime
                                        </span>
                                    </p>
                                </li>
                                <li
                                    className={ 'ml-4 flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-100 dark:hover:bg-navy-600' }>
                                    <p className='flex w-full items-center justify-start gap-2'>
                                        <i>
                                            <IoIosLogOut size={ 18 }/>
                                        </i>
                                        <span>
                                            Out
                                        </span>
                                    </p>
                                </li>

                                <span className='m-auto my-2 flex h-[1px] w-full items-center justify-center bg-slate-100 dark:bg-navy-600'/>

                                {
                                    !system
                                    &&
                                    <>
                                        <li
                                            className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-100 dark:hover:bg-navy-600' }>
                                            <p className='flex items-center justify-start gap-2'>
                                                <i>
                                                    <FaPen size={ 18 }/>
                                                </i>
                                                <span>
                                                    Rename
                                                </span>
                                            </p>
                                        </li>

                                        <li
                                            className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md bg-red-500 p-2 px-3 transition-all hover:bg-red-600' }>
                                            <p className='flex items-center justify-start gap-2'>
                                                <i>
                                                    <GoCircleSlash size={ 18 }/>
                                                </i>
                                                <span>
                                                    Delete
                                                </span>
                                            </p>
                                        </li>

                                        <span className='m-auto my-2 flex h-[1px] w-full items-center justify-center bg-slate-100 dark:bg-navy-600'/>
                                    </>
                                }

                                <ul className='flex w-full flex-wrap gap-1.5'>
                                    {
                                        tags.slice(0, showAllTags ? tags.length : 4).map((tag, index) =>
                                            (
                                                <li className='cursor-pointer rounded border px-1.5 py-[.1rem] transition-all hover:bg-navy-100 dark:hover:bg-navy-450'
                                                    key={ `${ tag.split(' ').join('_') }_${ index }` }>
                                                    { tag }
                                                </li>
                                            ))
                                    }
                                </ul>
                                {
                                    (tags.length > 4 && !showAllTags)
                                    &&
                                    <button className='m-auto ml-0 mt-1 text-accent transition-all hover:text-accent-light dark:text-accent-light' onClick={ () => setShowAllTags(!showAllTags) }>
                                        Show all tags
                                    </button>
                                }
                                {
                                    (tags.length > 4 && showAllTags)
                                    &&
                                    <button className='m-auto ml-0 mt-1 text-accent transition-all hover:text-accent-light dark:text-accent-light' onClick={ () => setShowAllTags(!showAllTags) }>
                                        Show fewer tags
                                    </button>
                                }
                            </ul>
                        }
                    </>
                }
            >
                <i className='absolute right-2 top-4 z-10 size-6 cursor-pointer hover:text-gray-950 hover:dark:text-white'>
                    <BiDotsHorizontalRounded size={ 24 }/>
                </i>
            </Tippy>

            <span
                onClick={() =>
                {
                    if (type !== 'list')
                        dispatch(setAsideOption('NAV_ANIMATIONS_RISE'));
                }}
                className='relative mt-3.5 flex size-20 cursor-pointer items-center justify-center'
            >
                <Image
                    fill
                    alt='rise aniamtion'
                    style={ { objectFit: 'contain' } }
                    src='/assets/images/animations/rise.webp'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    unoptimized
                />
            </span>
        </div>
    );
};

export default AnimationsItemComponent;
