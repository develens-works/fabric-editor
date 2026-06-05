'use client';

import React, { MutableRefObject } from 'react';

import { fabric } from 'fabric';

import { useAppSelector } from '@/redux/app/hooks';

import NavbarToolNavComponent from '@/components/shared/navbar/nav';
import NavbarToolWorldComponent from '@/components/shared/navbar/world';
import NavbarToolMediaComponent from '@/components/shared/navbar/media';
import NavbarToolTextsComponent from '@/components/shared/navbar/texts';
import NavbarToolShapesComponent from '@/components/shared/navbar/shapes';
import NavbarToolButtonComponent from '@/components/shared/navbar/button';

interface NavbarToolProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    navbarDeviceComponentInputsRef: MutableRefObject<{
        width: HTMLInputElement | null,
        height: HTMLInputElement | null,
        x: HTMLInputElement | null,
        y: HTMLInputElement | null,
        label: HTMLInputElement | null,
        zoom: HTMLInputElement | null,
        fontSize: HTMLInputElement | null}>
}

const NavbarToolComponent = ({ canvasRef, navbarDeviceComponentInputsRef }: NavbarToolProps) =>
{
    const toolsState = useAppSelector((state) => state.tools);

    return (
        <nav className={ 'navbar-tool-container fixed right-0 top-[3.5rem] z-10 flex size-full max-h-[3rem] min-h-[3rem] flex-col justify-end justify-items-end justify-self-end bg-gray-200 align-middle dark:bg-navy-900' }>
            {
                toolsState.toolsOption === 'MEDIA'
                &&
                <NavbarToolMediaComponent canvasRef={ canvasRef } />
            }

            {
                toolsState.toolsOption.split('_')[0] === 'TEXTS'
                &&
                <NavbarToolTextsComponent canvasRef={ canvasRef } navbarDeviceComponentInputsRef={navbarDeviceComponentInputsRef}/>
            }

            {
                (['BUTTON_COLOR', 'BUTTON_ANIME'].includes(toolsState.toolsOption) || (toolsState.toolsOption.split('_')[0] === 'BUTTON'))
                &&
                <NavbarToolButtonComponent />
            }

            {
                toolsState.toolsOption === 'SHAPES'
                &&
                <NavbarToolShapesComponent canvasRef={ canvasRef } />
            }

            {
                toolsState.toolsOption === 'NAV'
                &&
                <NavbarToolNavComponent />
            }

            {
                toolsState.toolsOption === 'WORLD'
                &&
                <NavbarToolWorldComponent />
            }

            <i className='absolute inset-x-0 bottom-0 z-1 m-auto mb-0 h-[1px] w-full bg-slate-300 dark:bg-navy-800'/>
        </nav>
    );
};

export default NavbarToolComponent;
