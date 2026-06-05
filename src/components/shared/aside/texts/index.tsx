'use client';

import React, { MutableRefObject, useState } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import { TextManager } from '@/libs/text-manager.lib';

import data from '@/components/shared/aside/texts/data';

import ButtonComponent from '@/components/ui/button.component';
import TextsStyledSwiperJsComponent from '@/components/shared/aside/texts/texts-styled-swiperjs.component';

interface AsideTextsOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>,
    historyRef: MutableRefObject<{ undo: any[], redo: any[] }>
}

const AsideTextsOptionComponent = ({ canvasRef, historyRef }: AsideTextsOptionProps) =>
{
    const [headerActive, setHeaderActive] = useState<number>(1);

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper custom-scrollbar h-full overflow-y-auto overflow-x-hidden px-4 py-6'>
            <ButtonComponent
                type='basicPrimary'
                className='w-full'
                content='Add body text'
                onClick={ () => TextManager.handleAdd(canvasRef, historyRef, 'paragraph', 12, 'Hello, Paragraph') }
            />
            <div className='mb-8 mt-4 flex w-full -space-x-px'>
                <button
                    onClick={
                        () =>
                        {
                            setHeaderActive(1);
                            TextManager.handleAdd(canvasRef, historyRef, 'h1', 32, 'Hello, H1');
                        }
                    }
                    className={
                        headerActive === 1
                            ?
                            'btn flex w-full content-center items-center justify-center rounded-none rounded-l-lg bg-primary-focus text-center align-middle text-xl font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            :
                            'btn flex w-full content-center items-center justify-center rounded-none rounded-l-lg bg-primary text-center align-middle text-xl font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>
                        H1
                    </p>
                </button>
                <button
                    onClick={
                        () =>
                        {
                            setHeaderActive(2);
                            TextManager.handleAdd(canvasRef, historyRef, 'h2', 24, 'Hello, H2');
                        }
                    }
                    className={
                        headerActive === 2
                            ?
                            'btn flex w-full content-center items-center justify-center rounded-none bg-primary-focus text-center align-middle text-lg font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            :
                            'btn flex w-full content-center items-center justify-center rounded-none bg-primary text-center align-middle text-lg font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>
                        H2
                    </p>
                </button>
                <button
                    onClick={
                        () =>
                        {
                            setHeaderActive(3);
                            TextManager.handleAdd(canvasRef, historyRef, 'h3', 18.72, 'Hello, H3');
                        }
                    }
                    className={
                        headerActive === 3
                            ?
                            'btn text-md flex w-full content-center items-center justify-center rounded-none bg-primary-focus text-center align-middle font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            :
                            'btn text-md flex w-full content-center items-center justify-center rounded-none bg-primary text-center align-middle font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>
                        H3
                    </p>
                </button>
                <button
                    onClick={
                        () =>
                        {
                            setHeaderActive(4);
                            TextManager.handleAdd(canvasRef, historyRef, 'h4', 16, 'Hello, H4');
                        }
                    }
                    className={
                        headerActive === 4
                            ?
                            'btn flex w-full content-center items-center justify-center rounded-none rounded-r-lg bg-primary-focus text-center align-middle text-sm font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            :
                            'btn flex w-full content-center items-center justify-center rounded-none rounded-r-lg bg-primary text-center align-middle text-sm font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>
                        H4
                    </p>
                </button>
            </div>

            {
                data.map((item, index) =>
                    (
                        <TextsStyledSwiperJsComponent
                            key={ item.title.split(' ').join('_').toUpperCase() + `_${ index }` }
                            id={ item.id }
                            title={ item.title }
                            items={ item.items }
                        />
                    ))
            }
        </motion.div>
    );
};

export default AsideTextsOptionComponent;
