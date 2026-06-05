'use client';

import React, { MutableRefObject, useContext } from 'react';
import { fabric } from 'fabric';
import { FaMinus, FaPlus } from 'react-icons/fa6';

import { TextManager } from '@/libs/text-manager.lib';

import { RefContext } from '@/app/context';

interface CounterProps
{
    defaultValue?: number;
    canvasRef: MutableRefObject<fabric.Canvas | null>;
}

const CounterComponent: React.FC<CounterProps> = ({ canvasRef }) =>
{
    const { fontSizeInput } = useContext(RefContext);

    return (
        <div className='flex h-8 min-w-24 overflow-hidden rounded-lg'>
            <button
                className='flex size-8 min-w-8 items-center justify-center bg-navy-200/40 align-middle transition-all hover:bg-navy-200/50 dark:bg-navy-300/20 dark:hover:bg-navy-300/30 dark:focus:bg-navy-300/30 dark:active:bg-navy-300/30'
                onClick={
                    () =>
                    {
                        if (!fontSizeInput?.current)
                            return;

                        TextManager.handleFontSizeChange(canvasRef, Number(fontSizeInput.current.value) + 1);
                        fontSizeInput.current.value = String(Number(fontSizeInput.current.value) + 1);
                    }
                }
            >
                <FaPlus size={ 14 } />
            </button>
            <input
                ref={ fontSizeInput }
                onBlur= {
                    (event) =>
                        TextManager.handleFontSizeChange(canvasRef, Number(event.target.value))

                }
                className='flex size-8 items-center justify-center bg-navy-200/40 text-center align-middle outline-none dark:bg-navy-300/20'
            />
            <button
                className='flex size-8 min-w-8 items-center justify-center bg-navy-200/40 align-middle transition-all hover:bg-navy-200/50 dark:bg-navy-300/20 dark:hover:bg-navy-300/30 dark:focus:bg-navy-300/30 dark:active:bg-navy-300/30'
                onClick={
                    () =>
                    {
                        if (!fontSizeInput?.current)
                            return;

                        TextManager.handleFontSizeChange(canvasRef, Number(fontSizeInput.current.value) - 1);
                        fontSizeInput.current.value = String(Number(fontSizeInput.current.value) - 1);
                    }
                }
            >
                <FaMinus size={ 14 } />
            </button>
        </div>
    );
};

export default CounterComponent;
