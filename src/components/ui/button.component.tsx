'use client';

import React, { Ref } from 'react';

interface ButtonProps
{
    type?: 'basic' | 'basicPrimary';
    content?: string;
    className?: string;
    onClick?(): void;
    icon?: React.ReactElement;
    elementRef?: Ref<HTMLButtonElement>;
}

const ButtonComponent: React.FC<ButtonProps> = ({ onClick, icon, className, content, type = 'basic', elementRef }) =>
{
    return (
        <>
            {
                type === 'basic'
                &&
                <button
                    onClick={ () =>
                    {
                        if (onClick)
                            onClick();
                    } }
                    className={ `btn bg-slate-150 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90 ${ className }` }
                >
                    { content }
                    { icon }
                </button>
            }
            {
                type === 'basicPrimary'
                &&
                <button
                    onClick={ () =>
                    {
                        if (onClick)
                            onClick();
                    } }
                    className={ `btn gap-2 bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 ${ className }` }
                    ref={ elementRef }
                >
                    { content }
                    { icon }
                </button>
            }
        </>
    );
};

export default ButtonComponent;
