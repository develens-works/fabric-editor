'use client';

import React, { MutableRefObject, useEffect, useRef, useState, useContext } from 'react';
import { FaSliders } from 'react-icons/fa6';
import { fabric } from 'fabric';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import ColorPicker from 'react-best-gradient-color-picker';

import { TextManager } from '@/libs/text-manager.lib';
import { ShapeManager } from '@/libs/shape-manager.lib';

import ButtonComponent from '@/components/ui/button.component';

import { ObjectManager } from '@/libs/object-manager.lib';

import { RefContext } from '@/app/context';

interface CustomColorProps
{
    content?: string;
    className?: string;
    icon?: boolean;
    canvasRef: MutableRefObject<fabric.Canvas | null>;
}

const CustomColorComponent = ({ className, canvasRef, content = 'Custom Color', icon = true }: CustomColorProps) =>
{
    // Get the current canvas reference
    const canvas = canvasRef.current;

    // If the canvas does not exist, exit the function
    if (!canvas) return;

    // Initialize state for selected color with a default value of 'rgba(255, 0, 0, 1)'
    const [selectedColor, setSelectedColor] = useState('rgba(255, 0, 0, 1)');

    const {
        customColorBtn
    } = useContext(RefContext);

    // Create a mutable reference to track if the color state change is triggered by an event
    const isColorStateChangeByEvent: MutableRefObject<boolean> = useRef<boolean>(false);

    // useEffect hook to set the selected color when the component mounts
    useEffect(() =>
    {
        // If there is an active object on the canvas, update the selected color
        if (canvas.getActiveObject())
        {
            setSelectedColor(ObjectManager.colorPickerSelectedObject(canvas));
            // Set the flag to indicate that the color state change was triggered by an event
            isColorStateChangeByEvent.current = true;
        }
    }, []);

    // useEffect hook to handle changes to the selected color
    useEffect(() =>
    {
        // If the color state change was not triggered by an event
        if (!isColorStateChangeByEvent.current)
        {
            // If the active object on the canvas is a text object, update its color
            if (canvasRef.current?.getActiveObject() instanceof fabric.Text)
                TextManager.handleTextColor(canvasRef, selectedColor);
            else
                // Otherwise, update the color of the shape object
                ShapeManager.handleChangeShapeColor(canvasRef, selectedColor);
        }
        else
            // Reset the flag
            isColorStateChangeByEvent.current = false;
    }, [selectedColor]);

    // useEffect hook to add event listeners to the canvas when the component mounts
    useEffect(() =>
    {
        // Check if the canvas reference is an instance of fabric.Canvas
        if (canvasRef.current instanceof fabric.Canvas)
        {
            const canvas: fabric.Canvas = canvasRef.current;

            // Add event listener for text selection change
            canvas.on('text:selection:changed', () =>
            {
                setSelectedColor(ObjectManager.colorPickerSelectedObject(canvas));
                isColorStateChangeByEvent.current = true;
            });

            // Add event listener for selection created
            canvas.on('selection:created', () =>
            {
                setSelectedColor(ObjectManager.colorPickerSelectedObject(canvas));
                isColorStateChangeByEvent.current = true;
            });

            // Add event listener for selection updated
            canvas.on('selection:updated', () =>
            {
                setSelectedColor(ObjectManager.colorPickerSelectedObject(canvas));
                isColorStateChangeByEvent.current = true;
            });

            // Add event listener for selection cleared
            canvas.on('selection:cleared', () =>
            {
                setSelectedColor(ObjectManager.colorPickerSelectedObject(canvas));
                isColorStateChangeByEvent.current = true;
            });
        }
    }, [canvasRef.current]);

    return (
        <Tippy
            disabled={ false }
            allowHTML
            interactive
            trigger='click'
            appendTo={ () => document.body }
            arrow={ roundArrow }
            placement={ 'top' }
            animation={ 'shift-away' }
            className='tippy-no-padding bg-gray-200 shadow-2xl'
            content={
                <div className='flex h-fit w-[calc(350px-2rem)] min-w-[calc(350px-2rem)] max-w-[calc(350px-2rem)] gap-1 overflow-hidden rounded p-3'>
                    <ColorPicker value={selectedColor} onChange={(event) => setSelectedColor(event)} />
                </div>
            }
        >
            <div>
                <ButtonComponent
                    elementRef={ customColorBtn }
                    type='basicPrimary'
                    className={`mx-auto mt-6 flex w-[calc(100%-2rem)] ${ className }`}
                    icon={ icon ? <FaSliders/> : undefined }
                    content={ content }
                />
            </div>
        </Tippy>
    );
};

export default CustomColorComponent;
