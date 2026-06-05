'use client';

import React, { MutableRefObject, useState, useEffect, useRef } from 'react';
import { FaMagnifyingGlassPlus } from 'react-icons/fa6';
import { fabric } from 'fabric';

import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import { ZoomManager } from '@/libs/zoom-manager.lib';

import CustomTooltip from '@/components/ui/custom-tooltip.component';
import RangeInputComponent from '@/components/ui/range-input.component';

interface ZoomProps
{
    defaultValue: number;
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    navbarDeviceComponentInputsRef: MutableRefObject<
    {
        width: HTMLInputElement | null,
        height: HTMLInputElement | null,
        x: HTMLInputElement | null,
        y: HTMLInputElement | null,
        zoom: HTMLInputElement | null
    }>;
}

const NavbarZoomComponent = ({ defaultValue, canvasRef, navbarDeviceComponentInputsRef }: ZoomProps) =>
{
    const [counter, setCounter] = useState<number>(0);
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    const zoomRef = useRef(null);

    // Set zoomRef for use in page file
    const setInputElementsRef = () =>
    {
        navbarDeviceComponentInputsRef.current.zoom = zoomRef.current;
    };

    // Add useEffect for adding event on canvas
    useEffect (() =>
    {
        if (canvasRef.current instanceof fabric.Canvas)
        {
            const canvas: fabric.Canvas = canvasRef.current;
            setCounter(defaultValue);
            canvas.on('mouse:wheel', (opt: fabric.IEvent<Event>) =>
            {
                const wheelEvent: WheelEvent = opt.e as WheelEvent;
                // Ctrl + Wheel for zoom in and zoom out
                if (wheelEvent.ctrlKey)
                {
                    ZoomManager.zoomOutIn(opt, canvas, wheelEvent);
                    setCounter(Math.round((canvas.getZoom()) * 100));
                }
                // Shift + Wheel for change viewport of canvas in x axis
                else if (wheelEvent.shiftKey)
                {
                    if (canvas.viewportTransform && canvas.viewportTransform[4])
                    {
                        const delta = wheelEvent.deltaY;
                        canvas.viewportTransform[4] += delta > 0 ? -20 : 20;
                        canvas.getObjects().forEach((obj) =>
                        {
                            obj.setCoords();
                        });
                        canvas.renderAll();
                    }
                }
                // Empty Wheel for change viewport of canvas in y axis
                else
                {
                    if (canvas.viewportTransform && canvas.viewportTransform[5])
                    {
                        const delta = wheelEvent.deltaY;
                        canvas.viewportTransform[5] += delta > 0 ? -20 : 20;
                        canvas.getObjects().forEach((obj) =>
                        {
                            obj.setCoords();
                        });
                        canvas.renderAll();
                    }
                }
            });
        }
    }, [canvasRef.current]);

    useEffect(() =>
    {
        setInputElementsRef();
    }, []);

    return (
        <CustomTooltip disabled={ openDropdown } placement='bottom' content='Zoom Page' >
            <Tippy
                allowHTML
                interactive
                appendTo='parent'
                visible={ openDropdown }
                arrow={ roundArrow }
                placement='bottom'
                animation='shift-away'
                className='bg-gray-50'
                onClickOutside={() => setOpenDropdown(false)}
                content={
                    <div className='flex size-fit flex-col gap-1 overflow-hidden rounded'>
                        <RangeInputComponent
                            className="mb-2 gap-0 py-0"
                            label="Zoom"
                            min={ 10 }
                            max={ 1000 }
                            step={ 1 }
                            defaultValue={defaultValue || 100}
                            counterStateOfZoomComponent={counter}
                            ableTextInput={false}
                            setValue={(value: number) =>
                            {
                                ZoomManager.setZoom(canvasRef, value);
                                setCounter(value);
                            }}
                        />
                    </div>
                }
            >
                <div
                    className='flex h-9 w-fit items-center justify-center gap-1 rounded-lg bg-navy-200/20 px-2.5 outline-none transition-colors duration-200 dark:bg-navy-300/10'>
                    <i className='cursor-pointer' onClick={() => setOpenDropdown(!openDropdown)}>
                        <FaMagnifyingGlassPlus size={ 20 }/>
                    </i>
                    <input
                        ref={ zoomRef }
                        value={ counter }
                        type='number'
                        onChange={ (event) =>
                        {
                            // If value of input has character more than one and we have 0 before the number delete it
                            if (event.target.value.length > 1 && event.target.value[0] === '0')
                                event.target.value = event.target.value.substring(1);

                            // If the value of input is between 0 and 1000
                            if (Number(event.target.value) >= 0 && Number(event.target.value) <= 1000)
                            {
                                // If the number of input changed by ++ or -- setZoom work
                                if (Math.abs(Number(event.target.value) - Number(counter)) === 1 && counter !== 0 && event.target.value !== '')
                                {
                                    if (Number(event.target.value) !== 0)
                                        ZoomManager.setZoom(canvasRef, Number(event.target.value));
                                }

                                setCounter(Number(event.target.value));
                            }
                        }
                        }
                        onBlur={() =>
                        {
                            // If the value of input is between 0 and 1000
                            if (counter <= 0)
                            {
                                ZoomManager.setZoom(canvasRef, 10);
                                return;
                            }
                            else if (counter > 1000)
                            {
                                ZoomManager.setZoom(canvasRef, 1000);
                                return;
                            }

                            ZoomManager.setZoom(canvasRef, counter);
                        }
                        }
                        className='flex w-12 cursor-text items-center justify-center bg-transparent px-2 pr-0 text-right align-middle outline-none'/>
                    <span className='w-2 cursor-pointer bg-transparent pr-4 text-left' onClick={() => setOpenDropdown(!openDropdown)}>
                        %
                    </span>
                </div>
            </Tippy>
        </CustomTooltip>
    );
};

export default NavbarZoomComponent;
