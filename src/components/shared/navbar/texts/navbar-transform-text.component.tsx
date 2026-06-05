import React, { MutableRefObject, useState, useEffect } from 'react';
import { fabric } from 'fabric';

import { FaCheck } from 'react-icons/fa6';
import { GoCircleSlash } from 'react-icons/go';
import { CgFormatUppercase } from 'react-icons/cg';
import { RxLetterCaseLowercase, RxLetterCaseUppercase } from 'react-icons/rx';

import { TextManager } from '@/libs/text-manager.lib';

import NavbarItemComponent from '@/components/shared/navbar/navbar-item.component';
import { ObjectManager } from '@/libs/object-manager.lib';

interface NavbarToolTransformProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const NavbarToolTransformComponent = ({ canvasRef }: NavbarToolTransformProps) =>
{
    const canvas = canvasRef.current;
    if (!canvas) return;
    const [activeTransform, setActiveTransform] = useState<string>('none');
    useEffect (() =>
    {
        if (canvasRef.current instanceof fabric.Canvas)
        {
            const canvas: fabric.Canvas = canvasRef.current;
            canvas.on('text:selection:changed', () =>
            {
                setActiveTransform(ObjectManager.transformTextResult(canvas));
            });
            canvas.on('selection:created', () =>
            {
                setActiveTransform(ObjectManager.transformTextResult(canvas));
            });
            canvas.on('selection:updated', () =>
            {
                setActiveTransform(ObjectManager.transformTextResult(canvas));
            });
            canvas.on('selection:cleared', () =>
            {
                setActiveTransform(ObjectManager.transformTextResult(canvas));
            });
        }
    }, [canvasRef.current]);

    return (
        <NavbarItemComponent
            label="Transform"
            icon={ <CgFormatUppercase size={ 30 }/> }
            dropdown={
                <ul className='flex w-64 flex-col gap-1.5 py-1'>
                    <li
                        onClick={() =>
                        {
                            setActiveTransform('upper-case');
                            TextManager.handleTextUppercase(canvasRef);
                        }}
                        className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeTransform === 'upper-case' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }
                    >
                        <p className='flex items-center justify-start gap-2'>
                            <i className='w-6'>
                                {
                                    activeTransform === 'upper-case'
                                    &&
                                    <FaCheck/>
                                }
                            </i>
                            <i>
                                <RxLetterCaseUppercase size={ 20 }/>
                            </i>
                            <span>
                                Upper case
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                    <li
                        onClick={() =>
                        {
                            setActiveTransform('lower-case');
                            TextManager.handleTextLowercase(canvasRef);
                        }}
                        className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeTransform === 'lower-case' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }
                    >
                        <p className="flex items-center justify-start gap-2">
                            <i className="w-6">
                                {
                                    activeTransform === 'lower-case'
                                    &&
                                    <FaCheck/>
                                }
                            </i>
                            <i>
                                <RxLetterCaseLowercase size={ 20 }/>
                            </i>
                            <span>
                                Lower case
                            </span>
                        </p>

                        <span className="opacity-80">
                            Ctrl + S
                        </span>
                    </li>
                    <li onClick={() => setActiveTransform('none')} className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeTransform === 'none' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                        <p className="flex items-center justify-start gap-2">
                            <i className="w-6">
                                {
                                    activeTransform === 'none'
                                    &&
                                    <FaCheck/>
                                }
                            </i>
                            <i>
                                <GoCircleSlash size={ 20 }/>
                            </i>
                            <span>
                                None
                            </span>
                        </p>

                        <span className="opacity-80">
                            Ctrl + S
                        </span>
                    </li>
                </ul>
            }
        />
    );
};

export default NavbarToolTransformComponent;
