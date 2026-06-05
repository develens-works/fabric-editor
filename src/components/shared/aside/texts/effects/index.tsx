'use client';

import React, { MutableRefObject, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

import { RefContext } from '@/app/context';

import { ObjectManager } from '@/libs/object-manager.lib';

import InputComponent from '@/components/ui/input.component';
import EffectCustomColorComponent from './effect-color.component';

interface AsideTextColorOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideTextsEffectsOptionComponent = ({ canvasRef }: AsideTextColorOptionProps) =>
{
    const canvas = canvasRef.current;
    if (!canvas)
        return;

    // Get ref elements
    const {
        rangeOffsetXRef,
        inputOffsetXRef,
        rangeOffsetYRef,
        inputOffsetYRef,
        rangeBlurRef,
        inputBlurRef,
        shadowColorBtn,
        strokeColorBtn,
        rangeStrokeWidthRef,
        inputStrokeWidthRef
    } = useContext(RefContext);

    useEffect(() =>
    {
        // When the component render for the first time initialize the children element
        if (
            !rangeOffsetXRef?.current ||
            !inputOffsetXRef?.current ||
            !rangeOffsetYRef?.current ||
            !inputOffsetYRef?.current ||
            !rangeBlurRef?.current ||
            !inputBlurRef?.current ||
            !shadowColorBtn?.current ||
            !strokeColorBtn?.current ||
            !rangeStrokeWidthRef?.current ||
            !inputStrokeWidthRef?.current) return;

        rangeOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
        inputOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
        rangeOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
        inputOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
        rangeBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
        inputBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
        rangeStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
        inputStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
        shadowColorBtn.current.style.backgroundColor = ObjectManager.shadowGetter(canvas, 'color');
        strokeColorBtn.current.style.backgroundColor = ObjectManager.strokeGetter(canvas, 'stroke');
    }, []);

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper custom-scrollbar h-full overflow-x-hidden pb-6'>
            <div>
                <p className='text-md my-auto mt-4 flex h-12 w-full items-center justify-start px-4 align-middle text-lg font-semibold dark:text-gray-300'>
                    Shadow
                </p>
                <div className='grid grid-cols-3 items-stretch justify-stretch gap-2 gap-y-4 px-4'>
                    <div style={ { gridColumnEnd: -1, gridColumnStart: 1 }} className='w-full pb-6'>
                        <div className='flex w-full justify-between'>
                            <p className='mt-6 self-center font-bold'>offsetY</p>
                            <InputComponent
                                min={-5}
                                max={5}
                                inputType='number'
                                elementRef={ inputOffsetYRef }
                                onChange={
                                    (event) =>
                                    {
                                        const canvas = canvasRef.current;
                                        if (!canvas)
                                            return;

                                        ObjectManager.shadowSetter(canvas, 'offsetY', event.target.value);

                                        if (!rangeOffsetYRef?.current)
                                            return;

                                        rangeOffsetYRef.current.value = event.target.value;
                                    }
                                }
                                className='mt-2 w-full max-w-12 rounded-md px-[2px] py-[2.5px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                            />
                        </div>
                        <input
                            type='range'
                            ref= { rangeOffsetYRef }
                            min={-5}
                            max={5}
                            onChange={
                                (event) =>
                                {
                                    const canvas = canvasRef.current;
                                    if (!canvas)
                                        return;

                                    ObjectManager.shadowSetter(canvas, 'offsetY', event.target.value);

                                    if (!inputOffsetYRef?.current)
                                        return;

                                    inputOffsetYRef.current.value = event.target.value;
                                }
                            }
                        />

                        <div className='flex w-full justify-between'>
                            <p className='mt-6 self-center font-bold'>offsetX</p>
                            <InputComponent
                                inputType='number'
                                elementRef={ inputOffsetXRef }
                                min={ -5 }
                                max={ 5 }
                                onChange={
                                    (event) =>
                                    {
                                        const canvas = canvasRef.current;
                                        if (!canvas)
                                            return;

                                        ObjectManager.shadowSetter(canvas, 'offsetX', event.target.value);

                                        if (!rangeOffsetXRef?.current)
                                            return;

                                        rangeOffsetXRef.current.value = event.target.value;
                                    }
                                }
                                className='w-full max-w-12 rounded-md px-[2px] py-[2.5px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                            />
                        </div>
                        <input
                            type='range'
                            min={-5}
                            max={5}
                            ref={ rangeOffsetXRef }
                            onChange={
                                (event) =>
                                {
                                    const canvas = canvasRef.current;
                                    if (!canvas)
                                        return;

                                    ObjectManager.shadowSetter(canvas, 'offsetX', event.target.value);

                                    if (!inputOffsetXRef?.current)
                                        return;

                                    inputOffsetXRef.current.value = event.target.value;
                                }
                            }
                        />

                        <div className='flex w-full justify-between'>
                            <p className='mt-6 self-center font-bold'>blur</p>
                            <InputComponent
                                inputType='number'
                                min={ 0 }
                                max={ 10 }
                                elementRef={ inputBlurRef }
                                onChange={
                                    (event) =>
                                    {
                                        const canvas = canvasRef.current;
                                        if (!canvas)
                                            return;

                                        ObjectManager.shadowSetter(canvas, 'blur', event.target.value);

                                        if (!rangeBlurRef?.current)
                                            return;

                                        rangeBlurRef.current.value = event.target.value;
                                    }
                                }
                                className='w-full max-w-12 rounded-md px-[2px] py-[2.5px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                            />
                        </div>
                        <input
                            type='range'
                            min={0}
                            max={10}
                            ref={ rangeBlurRef }
                            onChange={
                                (event) =>
                                {
                                    const canvas = canvasRef.current;
                                    if (!canvas)
                                        return;

                                    ObjectManager.shadowSetter(canvas, 'blur', event.target.value);

                                    if (!inputBlurRef?.current)
                                        return;

                                    inputBlurRef.current.value = event.target.value;
                                }
                            }
                        />

                        <EffectCustomColorComponent canvasRef={canvasRef} colorBtnRef={ shadowColorBtn } btnType='shadow'/>
                    </div>
                </div>
            </div>
            <div>
                <p className='text-md my-auto mt-6 flex h-12 w-full items-center justify-start px-4 align-middle text-lg font-semibold dark:text-gray-300'>
                    Stroke
                </p>
                <div className='grid grid-cols-3 items-stretch justify-stretch gap-2 gap-y-4 px-4'>
                    <div style={ { gridColumnEnd: -1, gridColumnStart: 1 }} className='w-full pb-6'>
                        <div className='flex w-full justify-between'>
                            <p className='mt-6 self-center font-bold'>stroke</p>
                            <InputComponent
                                inputType='number'
                                min={ 0 }
                                max={ 3 }
                                elementRef={ inputStrokeWidthRef }
                                onChange={
                                    (event) =>
                                    {
                                        const canvas = canvasRef.current;
                                        if (!canvas)
                                            return;

                                        ObjectManager.strokeSetter(canvas, 'strokeWidth', event.target.value);

                                        if (!rangeStrokeWidthRef?.current)
                                            return;

                                        rangeStrokeWidthRef.current.value = event.target.value;
                                    }
                                }
                                className='mt-2 w-full max-w-12 rounded-md px-[2px] py-[2.5px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                            />
                        </div>
                        <input
                            type='range'
                            step={ 0.3 }
                            min={ 0 }
                            max={ 3 }
                            ref={ rangeStrokeWidthRef }
                            onChange={
                                (event) =>
                                {
                                    const canvas = canvasRef.current;
                                    if (!canvas)
                                        return;

                                    ObjectManager.strokeSetter(canvas, 'strokeWidth', event.target.value);

                                    if (!inputStrokeWidthRef?.current)
                                        return;

                                    inputStrokeWidthRef.current.value = event.target.value;
                                }
                            }
                        />
                        <EffectCustomColorComponent canvasRef={canvasRef} colorBtnRef={ strokeColorBtn } btnType='stroke' />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AsideTextsEffectsOptionComponent;
