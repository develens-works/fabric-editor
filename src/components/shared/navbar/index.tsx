'use client';

import React, { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaArrowsToEye, FaArrowRotateLeft, FaArrowRotateRight, FaRegGem } from 'react-icons/fa6';

import NavbarZoomComponent from '@/components/shared/navbar/navbar-zoom.component';
import NavbarItemComponent from '@/components/shared/navbar/navbar-item.component';
import NavbarFrameComponent from '@/components/shared/navbar/navbar-frame.component';
import NavbarDeviceComponent from '@/components/shared/navbar/navbar-device.component';
import NavbarObjectComponent from '@/components/shared/navbar/navbar-object.component';

interface Navbar
{
    canvasRef: MutableRefObject<fabric.Canvas | null>,
    navbarDeviceComponentInputsRef: MutableRefObject<
    {
        width: HTMLInputElement | null,
        height: HTMLInputElement | null,
        x: HTMLInputElement | null,
        y: HTMLInputElement | null,
        label: HTMLInputElement | null,
        zoom: HTMLInputElement | null
    }>
}

const NavbarComponent: React.FC<Navbar> = ({ canvasRef, navbarDeviceComponentInputsRef }) =>
{
    return (
        <nav className='header print:hidden'>
            <div className='header-container relative flex w-full bg-navy-85 dark:bg-navy-700 print:hidden'>
                <div className='flex w-full items-center justify-items-start'>
                    <button
                        className="m-auto mx-0 flex h-11 w-16 items-center justify-center rounded-lg outline-none transition-colors duration-200">
                        <FaRegQuestionCircle size={ 24 }/>
                    </button>

                    <i className="m-auto mx-0 flex h-[calc(100%-2rem)] w-px bg-slate-300 opacity-40 dark:bg-navy-900"/>

                    <button
                        className="btn ml-10 space-x-2 border border-primary/30 bg-primary/10 font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:border-accent-light/30 dark:bg-accent-light/10 dark:text-accent-light hover:dark:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
                        <FaRegGem size={ 18 }/>
                        <span className='text-nowrap'>
                            Try Pro
                        </span>
                    </button>

                    <div className="ml-10 flex gap-5">
                        <NavbarItemComponent
                            label="FaArrowRotateLeft"
                            icon={ <FaArrowRotateLeft size={ 22 }/> }
                        />
                        <NavbarItemComponent
                            label="FaArrowRotateRight"
                            icon={ <FaArrowRotateRight size={ 22 }/> }
                        />
                    </div>

                    <div className="m-auto mr-10 flex gap-2">
                        <NavbarDeviceComponent canvasRef={ canvasRef } navbarDeviceComponentInputsRef={ navbarDeviceComponentInputsRef } />
                    </div>

                    <i className="mr-10 flex h-[calc(100%-2rem)] w-px bg-slate-300 opacity-40 dark:bg-navy-900"/>

                    <div className="mr-10 flex gap-5">
                        <NavbarFrameComponent/>

                        <NavbarObjectComponent canvasRef={ canvasRef }/>

                        <NavbarZoomComponent defaultValue={ 100 } canvasRef={ canvasRef } navbarDeviceComponentInputsRef={ navbarDeviceComponentInputsRef }/>
                    </div>

                    <i className="mr-10 flex h-[calc(100%-2rem)] w-px bg-slate-300 opacity-40 dark:bg-navy-900"/>

                    <NavbarItemComponent
                        label="FaArrowsToEye"
                        icon={ <FaArrowsToEye size={ 22 }/> }
                    />

                    <button className="btn my-auto ml-4 mr-4 bg-success px-10 font-semibold text-white hover:bg-success-focus focus:bg-success-focus active:bg-success-focus/90">
                        Save
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
