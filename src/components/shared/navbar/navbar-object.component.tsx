import React, { MutableRefObject, useRef } from 'react';
import { fabric } from 'fabric';

import { PiSlideshow } from 'react-icons/pi';
import { LiaWindowRestore } from 'react-icons/lia';
import { VscEmptyWindow, VscMultipleWindows } from 'react-icons/vsc';

import { ZoneManager } from '@/libs/zone-manager.lib';
import { SliderManager } from '@/libs/slider-manager.lib';
import { ObjectManager } from '@/libs/object-manager.lib';

import NavbarItemComponent from '@/components/shared/navbar/navbar-item.component';

interface NavbarObject
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const NavbarObjectComponent = ({ canvasRef }: NavbarObject) =>
{
    const numberOfZone = useRef(1);
    const numberOfSlider = useRef(1);

    return (
        <NavbarItemComponent
            arrow
            label='New Object'
            icon={ <PiSlideshow size={ 24 }/> }
            dropdown={
                <ul className='flex w-48 flex-col gap-1.5 py-1'>
                    <li
                        onClick={
                            () =>
                            {
                            }
                        }
                        className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800' }
                    >
                        <p className='flex items-center justify-start gap-2'>
                            <i>
                                <VscEmptyWindow size={ 20 }/>
                            </i>
                            <span>
                                Block
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                    <li
                        onClick={
                            () =>
                            {
                                ZoneManager.handleAdd(canvasRef, numberOfZone, numberOfSlider, ObjectManager.findLastSliderClassNumberZIndex);
                            }
                        }
                        className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800' }
                    >
                        <p className='flex items-center justify-start gap-2'>
                            <i>
                                <LiaWindowRestore size={ 22 }/>
                            </i>
                            <span>
                                Zone
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                    <li
                        onClick={
                            () =>
                            {
                                SliderManager.handleAdd(canvasRef, numberOfSlider, ObjectManager.findLastSliderClassNumberZIndex);
                            }
                        }
                        className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800' }
                    >
                        <p className='flex items-center justify-start gap-2'>
                            <i>
                                <VscMultipleWindows size={ 20 }/>
                            </i>
                            <span>
                                Slider
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                </ul>
            }
        />
    );
};

export default NavbarObjectComponent;
