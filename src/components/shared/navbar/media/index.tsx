'use client';

import React, { MutableRefObject } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import { MediaManager } from '@/libs/media-manager.lib';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import RangeInputComponent from '@/components/ui/range-input.component';
import NavbarToolBrComponent from '@/components/shared/navbar/navbar-tool-br.component';
import NavbarToolItemComponent from '@/components/shared/navbar/navbar-tool-item.component';

import { FaEllipsisVertical, FaLink, FaList, FaPersonSkiing, FaWordpressSimple } from 'react-icons/fa6';
import { GoCircleSlash } from 'react-icons/go';
import { RiCropLine, RiImageEditLine } from 'react-icons/ri';
import { PiChatTeardropDotsFill } from 'react-icons/pi';

import Animate from '../../../../../public/assets/images/illustrations/animate.svg';
import Border1 from '../../../../../public/assets/images/illustrations/border-1.svg';
import Border2 from '../../../../../public/assets/images/illustrations/border-2.svg';
import Border3 from '../../../../../public/assets/images/illustrations/border-3.svg';
import Border4 from '../../../../../public/assets/images/illustrations/border-4.svg';
import BorderStyle from '../../../../../public/assets/images/illustrations/border-style.svg';
import Transparency from '../../../../../public/assets/images/illustrations/transparency.svg';

interface NavbarToolMediaProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>;
}

const NavbarToolMediaComponent = ({ canvasRef }: NavbarToolMediaProps) =>
{
    const dispatch = useAppDispatch();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='justify-[end] m-auto mr-0 flex size-fit w-full flex-row-reverse justify-items-end gap-1.5 justify-self-end text-base tracking-wider text-slate-800 dark:text-navy-100'
        >
            <NavbarToolItemComponent label='FaEllipsisVertical' icon={<FaEllipsisVertical size={18} />} />

            <NavbarToolItemComponent
                label='Transparency'
                icon={
                    <i className='-mt-px ml-[-2px]'>
                        <Transparency width={18} height={18} />
                    </i>
                }
            />
            <NavbarToolItemComponent label='FaLink' icon={<FaLink size={18} />} />
            <NavbarToolItemComponent label='FaPersonSkiing' icon={<FaPersonSkiing size={18} />} />

            <NavbarToolBrComponent />
            <NavbarToolItemComponent
                dropdownPlacement='bottom-start'
                dropdown={
                    <div className='flex h-fit w-full flex-col p-2 py-4'>
                        <ul className='mb-5 flex gap-2'>
                            <li className='flex cursor-pointer items-center justify-center rounded border-2 border-accent-light p-2 px-4 align-middle transition-all'>
                                <GoCircleSlash size={18} />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border1 />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border2 />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border3 />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border4 />
                            </li>
                        </ul>

                        <RangeInputComponent label='Border weight' />
                        <RangeInputComponent label='Border Radius' setValue={(value: number) => MediaManager.handleApplyBorderRadius(canvasRef, value)} />
                    </div>
                }
                className='mx-auto ml-0'
                label='Border Style'
                icon={
                    <i className='ml-[-3px] mt-[-2px]'>
                        <PiChatTeardropDotsFill size={18} />
                    </i>
                }
            />
            <NavbarToolItemComponent label='FaWordpressSimple' icon={<FaWordpressSimple size={18} />} />

            <NavbarToolItemComponent label='FaList' icon={<FaList size={18} />} />

            <NavbarToolBrComponent />

            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('MEDIA_ANIMATIONS'));
                    document.body.classList.add('is-sidebar-open');
                }}
                type='primary'
                label='FaPersonSkiing'
                content='Anime'
                icon={<Animate size={18} />}
            />
            <NavbarToolItemComponent
                onClick={() =>
                {
                    dispatch(setAsideOption('MEDIA_EFFECTS'));
                    document.body.classList.add('is-sidebar-open');
                }}
                type='primary'
                label='Font Effects'
                content='Effects'
            />

            <NavbarToolBrComponent />

            <NavbarToolItemComponent
                dropdownPlacement='bottom-start'
                dropdown={
                    <div className='flex h-fit w-full flex-col p-2 py-4'>
                        <ul className='mb-5 flex gap-2'>
                            <li className='flex cursor-pointer items-center justify-center rounded border-2 border-accent-light p-2 px-4 align-middle transition-all'>
                                <GoCircleSlash size={18} />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border1 />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border2 />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border3 />
                            </li>
                            <li className='flex cursor-pointer items-center justify-center rounded border border-gray-800/30 p-2 px-4 align-middle transition-all hover:border-gray-800/50 dark:border-gray-200/30 dark:hover:border-gray-200/50'>
                                <Border4 />
                            </li>
                        </ul>

                        <RangeInputComponent label='Border weight' />
                        <RangeInputComponent label='Border Radius' setValue={(value: number) => MediaManager.handleApplyBorderRadius(canvasRef, value)} />
                    </div>
                }
                className='mx-auto ml-0'
                label='Border Style'
                icon={
                    <i className='ml-[-3px] mt-[-2px]'>
                        <BorderStyle width={18} height={18} />
                    </i>
                }
            />
            <NavbarToolItemComponent label='Crop & Rotate Image' icon={<RiCropLine size={20} />} />
            <NavbarToolItemComponent label='Edit Image' icon={<RiImageEditLine size={18} />} />
        </motion.div>
    );
};

export default NavbarToolMediaComponent;
