'use client';

import React, { MutableRefObject, useContext } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import { ShapeManager } from '@/libs/shape-manager.lib';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import NavbarToolBrComponent from '@/components/shared/navbar/navbar-tool-br.component';
import NavbarToolItemComponent from '@/components/shared/navbar/navbar-tool-item.component';

import { RefContext } from '@/app/context';

import {
    FaCode,
    FaEllipsisVertical,
    FaList,
    FaPersonSkiing,
    FaWordpressSimple
} from 'react-icons/fa6';
import { GiResize } from 'react-icons/gi';
import { GoCircleSlash } from 'react-icons/go';

import RangeInputComponent from '@/components/ui/range-input.component';

import Border1 from '../../../../../public/assets/images/illustrations/border-1.svg';
import Border2 from '../../../../../public/assets/images/illustrations/border-2.svg';
import Border3 from '../../../../../public/assets/images/illustrations/border-3.svg';
import Border4 from '../../../../../public/assets/images/illustrations/border-4.svg';
import BorderStyle from '../../../../../public/assets/images/illustrations/border-style.svg';

interface NavbarToolShapesProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const NavbarToolShapesComponent = ({ canvasRef }: NavbarToolShapesProps) =>
{
    const dispatch = useAppDispatch();

    const {
        customColorBtn
    } = useContext(RefContext);

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
                    dispatch(setAsideOption('SHAPE_ANIME'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='Button Animation'
                content='Anime'
                icon={ <FaPersonSkiing size={ 18 }/> }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                label='Button Resize'
                className='ml-0 mr-auto'
                icon={ <GiResize size={ 18 }/> }
                dropdown={
                    <div className='flex h-fit w-full min-w-[265px] max-w-[265px] flex-col gap-2 overflow-visible px-1 py-1.5'>
                        <RangeInputComponent
                            label='Shape Scale'
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
                        <RangeInputComponent label='Radius' setValue={ (value: number) => ShapeManager.handleChangeBorderRadius(canvasRef, value)} />
                    </div>
                }
                label='Border Style'
                icon={ <i className='ml-[-3px] mt-[-2px]'><BorderStyle width={ 19 } height={ 18 }/></i> }
            />

            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('SHAPES_COLOR'));
                    document.body.classList.add('is-sidebar-open');

                    if (customColorBtn?.current)
                        customColorBtn.current.click();
                } }
                type='image'
                src='/assets/images/rgb.png'
                label='Shape Color'
            />
        </motion.div>
    );
};

export default NavbarToolShapesComponent;
