'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import NavbarToolBrComponent from '@/components/shared/navbar/navbar-tool-br.component';
import NavbarToolItemComponent from '@/components/shared/navbar/navbar-tool-item.component';
import NavbarLayoutComponent from './../navbar-world-layout-component';
import NavbarSortbyComponent from './../navbar-world-sortby-component';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import { BiArrowFromTop, BiArrowToTop, BiBookmark } from 'react-icons/bi';
import { MdOutlineContentPasteSearch, MdContentCopy } from 'react-icons/md';
import { RiBracketsFill } from 'react-icons/ri';
import { ImPower } from 'react-icons/im';
import { BsFolder2 } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';

const NavbarToolWorldComponent = () =>
{
    const dispatch = useAppDispatch();
    const [activeFrames, setActiveFrames] = useState<string[]>(['ruler']);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='justify-[end] m-auto flex  size-fit w-full flex-row-reverse items-center justify-items-end gap-1.5 justify-self-end text-base tracking-wider text-slate-800 dark:text-navy-100'
        >
            <div className='flex items-center justify-between gap-1'>
                <input
                    className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                    type='checkbox'
                    onChange={() =>
                    {}}
                />
            </div>

            <NavbarSortbyComponent />

            <NavbarLayoutComponent />

            <NavbarToolBrComponent />

            <NavbarToolItemComponent className='mx-auto ml-0' label='IoTrashOutline' icon={<IoTrashOutline size={ 18 } />} />

            <NavbarToolItemComponent className='mx-auto' label='MdContentCopy' icon={<MdContentCopy size={ 18 } />} />
            <NavbarToolItemComponent
                dropdownPlacement='bottom-start'
                dropdown={
                    <ul className='flex w-52 flex-col gap-1.5 py-1'>
                        <li
                            className={
                                'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' +
                                (activeFrames.includes('ruler') ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700')
                            }
                        >
                            <p className='flex  justify-start gap-2'>
                                <span>Crossing</span>
                            </p>
                        </li>
                        <li className='flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all '>
                            <p className='flex  justify-start gap-2'>
                                <span>Blue light theme</span>
                            </p>
                        </li>
                    </ul>
                }
                className='mx-auto'
                label='PiBookmarkSimple'
                icon={
                    <i className='ml-[-3px] mt-[-2px]'>
                        <BiBookmark size={18} />
                    </i>
                }
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_FOLDER'));
                    document.body.classList.add('is-sidebar-open');
                }}
                label='BsFolder2'
                icon={<BsFolder2 size={18} />}
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_POWER'));
                    document.body.classList.add('is-sidebar-open');
                }}
                label='ImPower'
                icon={<ImPower size={17} />}
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_SHORTCUT'));
                    document.body.classList.add('is-sidebar-open');
                }}
                label='RiBracketsFill'
                icon={<RiBracketsFill size={18} />}
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_SURVEY'));
                    document.body.classList.add('is-sidebar-open');
                }}
                label='MdOutlineContentPasteSearch'
                icon={<MdOutlineContentPasteSearch size={18} />}
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_SELECT'));
                    document.body.classList.add('is-sidebar-open');
                }}
                label='BiArrowFromTop'
                icon={<BiArrowFromTop size={18} />}
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_UPLOAD'));
                    document.body.classList.add('is-sidebar-open');
                }}
                label='BiArrowToTop'
                icon={<BiArrowToTop size={18} />}
            />

            <NavbarToolBrComponent />

            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('WORLD_THEMES'));
                    document.body.classList.add('is-sidebar-open');
                }}
                type='primary'
                label='Themes'
                content='Themes'
            />
        </motion.div>
    );
};

export default NavbarToolWorldComponent;
