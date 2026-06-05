'use client';

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import ColorPicker from 'react-best-gradient-color-picker';

import ButtonComponent from '@/components/ui/button.component';

import { ObjectManager } from '@/libs/object-manager.lib';

interface CustomColorProps
{
    content?: string;
    className?: string;
    icon?: boolean;
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    colorBtnRef?: MutableRefObject<HTMLButtonElement | null> | null
    btnType: 'shadow' | 'stroke'
}

const EffectCustomColorComponent = ({ className, canvasRef, colorBtnRef, btnType }: CustomColorProps) =>
{
    const canvas = canvasRef.current;

    if (!canvas)
        return;

    const [selectedColor, setSelectedColor] = useState('black');

    // Make a ref for check when the state is changed by fabric event shadowSetter and strokeSetter don't work
    const isColorStateChangeByEvent: MutableRefObject<boolean> = useRef<boolean>(false);

    useEffect(() =>
    {
        // At first render check does exist a selected object
        if (canvas.getActiveObject())
        {
            if (btnType === 'shadow')
                setSelectedColor(ObjectManager.shadowGetter(canvas, 'color'));
            else if (btnType === 'stroke')
                setSelectedColor(ObjectManager.strokeGetter(canvas, 'stroke'));

            // True the ref till the shadowSetter and strokeSetter don't work
            isColorStateChangeByEvent.current = true;
        }
    }, []);

    useEffect(() =>
    {
        // If the state is not changed by event of fabric
        if (!isColorStateChangeByEvent.current)
        {
            // Set color bor the object based on the type of color btn
            if (btnType === 'shadow')
                ObjectManager.shadowSetter(canvas, 'color', selectedColor);
            else if (btnType === 'stroke')
                ObjectManager.strokeSetter(canvas, 'stroke', selectedColor);

            if (!colorBtnRef?.current)
                return;

            // Change the background of btn color
            colorBtnRef.current.style.backgroundColor = selectedColor;
        }
        // If state is changed by the event of fabric false the ref for the the next state that changed the shadowSetter and StrokeSetter word
        else
            isColorStateChangeByEvent.current = false;
    }, [selectedColor]);

    useEffect (() =>
    {
        // Set events of fabric
        if (canvasRef.current instanceof fabric.Canvas)
        {
            const canvas: fabric.Canvas = canvasRef.current;

            canvas.on('text:selection:changed', () =>
            {
                getterFunction();
            });

            canvas.on('selection:created', () =>
            {
                getterFunction();
            });

            canvas.on('selection:updated', () =>
            {
                getterFunction();
            });

            canvas.on('selection:cleared', () =>
            {
                getterFunction();
            });
        }
    }, [canvasRef.current]);

    // Function for setState by event
    const getterFunction = () =>
    {
        // Check the type of the component and based of this call the related method
        if (btnType === 'shadow')
            setSelectedColor(ObjectManager.shadowGetter(canvas, 'color'));
        else if (btnType === 'stroke')
            setSelectedColor(ObjectManager.strokeGetter(canvas, 'stroke'));

        // At the end make the isColorStateChangeByEvent ref true that the shadowSetter and strokeSetter doesn't work
        isColorStateChangeByEvent.current = true;
    };

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
            className='tippy-no-padding h-[300px] overflow-y-scroll bg-gray-200 shadow-2xl'
            content={
                <div className='flex w-[calc(350px-2rem)] min-w-[calc(350px-2rem)] max-w-[calc(350px-2rem)] gap-1 rounded p-3'>
                    <ColorPicker value={selectedColor} onChange={(event) => setSelectedColor(event)} />
                </div>
            }
        >
            <div className='flex w-full justify-between'>
                <p className='mt-6 self-center font-bold'>color</p>
                <ButtonComponent
                    type='basicPrimary'
                    className={`mt-6 flex h-8 w-1/4 ${ className }`}
                    elementRef={ colorBtnRef }
                />
            </div>
        </Tippy>
    );
};

export default EffectCustomColorComponent;
