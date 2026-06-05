'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import RangeInputComponent from '@/components/ui/range-input.component';
import SideSelectorComponent from '@/components/ui/side-selector.component';
import NavbarToolBrComponent from '@/components/shared/navbar/navbar-tool-br.component';
import NavbarToolItemComponent from '@/components/shared/navbar/navbar-tool-item.component';

import {
    FaCode,
    FaEllipsisVertical,
    FaList,
    FaPersonSkiing,
    FaWordpressSimple
} from 'react-icons/fa6';
import { PiTextT } from 'react-icons/pi';
import { GiResize } from 'react-icons/gi';
import { RxShadowOuter } from 'react-icons/rx';
import { GoCircleSlash } from 'react-icons/go';

import Border1 from '../../../../../public/assets/images/illustrations/border-1.svg';
import Border2 from '../../../../../public/assets/images/illustrations/border-2.svg';
import Border3 from '../../../../../public/assets/images/illustrations/border-3.svg';
import Border4 from '../../../../../public/assets/images/illustrations/border-4.svg';
import BorderStyle from '../../../../../public/assets/images/illustrations/border-style.svg';

const NavbarToolButtonComponent = () =>
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
                    dispatch(setAsideOption('BUTTON_ANIME'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='FaPersonSkiing'
                content='Anime'
                icon={ <FaPersonSkiing size={ 18 }/> }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                dropdownPlacement='bottom-start'
                dropdown={
                    <div className='flex h-fit w-full flex-col p-2 py-4'>
                        <RangeInputComponent className='pb-2 pt-0' label='Intensity'/>
                        <SideSelectorComponent label='Side'/>
                    </div>
                }
                className='mx-auto ml-0'
                label='Shadow'
                icon={ <RxShadowOuter size={ 18 }/> }
            />
            <NavbarToolItemComponent
                dropdownPlacement='bottom-start'
                dropdown={
                    <div className='flex h-fit w-full flex-col p-2 py-4'>
                        <ul className='mb-5 flex gap-2'>
                            <li className='flex cursor-pointer items-center justify-center rounded border-2 border-accent-light p-2 px-4 align-middle transition-all'>
                                <GoCircleSlash size={ 18 }/>
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border1/>
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border2/>
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border3/>
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border4/>
                            </li>
                        </ul>

                        <RangeInputComponent label='Tickness'/>
                        <RangeInputComponent label='Radius'/>
                    </div>
                }
                label='Border Style'
                icon={ <i className='ml-[-3px] mt-[-2px]'><BorderStyle width={ 19 } height={ 18 }/></i> }
            />
            <NavbarToolItemComponent
                label='PiTextT '
                icon={ <PiTextT size={ 24 }/> }
            />
            <NavbarToolItemComponent
                label='GiResize'
                icon={ <GiResize size={ 18 }/> }
                dropdown={
                    <div className='flex h-fit w-full min-w-[265px] max-w-[265px] flex-col gap-2 overflow-visible px-1 py-1.5'>
                        <RangeInputComponent
                            label='Button Scale'
                            min={ 0 }
                            max={ 100 }
                            defaultValue={ 10 }
                        />
                        <RangeInputComponent
                            label='Background Scale'
                            min={ 0 }
                            max={ 100 }
                            defaultValue={ 10 }
                        />
                        <RangeInputComponent
                            label='Font Scale'
                            min={ 0 }
                            max={ 100 }
                            defaultValue={ 10 }
                        />
                    </div>
                }
            />
            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('BUTTON_COLOR'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='image'
                src='/assets/images/rgb.png'
                label='Font Color'
            />
        </motion.div>
    );
};

export default NavbarToolButtonComponent;
