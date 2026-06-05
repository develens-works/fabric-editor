'use client';

import React from 'react';

import { motion } from 'framer-motion';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import RangeInputComponent from '@/components/ui/range-input.component';
import NavbarToolBrComponent from '@/components/shared/navbar/navbar-tool-br.component';
import NavbarToolItemComponent from '@/components/shared/navbar/navbar-tool-item.component';

import {
    FaCode,
    FaEllipsisVertical, FaHandPointer,
    FaList,
    FaPersonSkiing,
    FaWordpressSimple
} from 'react-icons/fa6';
import { GiResize } from 'react-icons/gi';
import { RxButton } from 'react-icons/rx';
import { CgArrowsH } from 'react-icons/cg';
import { ImSpinner2 } from 'react-icons/im';

const NavbarToolNavComponent = () =>
{
    const dispatch = useAppDispatch();

    return (
        <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            className='justify-[end] m-auto mr-0 flex size-fit w-full flex-row-reverse justify-items-end gap-1.5 justify-self-end text-base tracking-wider text-slate-800 dark:text-navy-100'
        >
            <NavbarToolItemComponent
                label='FaEllipsisVertical'
                icon={ <FaEllipsisVertical size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='FaCode'
                icon={ <FaCode size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='FaPersonSkiing'
                icon={ <FaPersonSkiing size={ 18 }/> }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                label='FaWordpressSimple'
                icon={ <FaWordpressSimple size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='FaList'
                icon={ <FaList size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='FaList'
                icon={ <FaList size={ 18 }/> }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('NAV_ANIMATIONS'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='FaPersonSkiing'
                content='Anime'
                icon={ <FaPersonSkiing size={ 18 }/> }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                className='mx-auto ml-0'
                label='Arrows'
                onClick={ () =>
                {
                    dispatch(setAsideOption('NAV_ARROWS'));
                    document.body.classList.add('is-sidebar-open');
                } }
                icon={ <CgArrowsH size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='Pagination'
                onClick={ () =>
                {
                    dispatch(setAsideOption('NAV_PAGINATION'));
                    document.body.classList.add('is-sidebar-open');
                } }
                icon={ <RxButton size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='Progress'
                onClick={ () =>
                {
                    dispatch(setAsideOption('NAV_PROGRESS'));
                    document.body.classList.add('is-sidebar-open');
                } }
                icon={ <ImSpinner2 size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='Mouse'
                onClick={ () =>
                {
                    dispatch(setAsideOption('NAV_MOUSE'));
                    document.body.classList.add('is-sidebar-open');
                } }
                icon={ <FaHandPointer size={ 18 }/> }
            />
            <NavbarToolItemComponent
                label='GiResize'
                icon={ <GiResize size={ 18 }/> }
                dropdown={
                    <div className='flex h-fit w-full min-w-[265px] max-w-[265px] flex-col gap-2 overflow-visible px-1 py-1.5'>
                        <RangeInputComponent
                            label='All'
                            min={ 0 }
                            max={ 100 }
                            sliderClassname='!w-full'
                            defaultValue={ 10 }
                        />
                        <RangeInputComponent
                            label='Arrows'
                            min={ 0 }
                            max={ 100 }
                            sliderClassname='!w-full'
                            defaultValue={ 10 }
                        />
                        <RangeInputComponent
                            label='Paginations'
                            min={ 0 }
                            max={ 100 }
                            sliderClassname='!w-full'
                            defaultValue={ 10 }
                        />
                    </div>
                }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('NAV'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='Themes'
                content='Themes'
            />
        </motion.div>
    );
};

export default NavbarToolNavComponent;
