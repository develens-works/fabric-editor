'use client';

import React, { Ref } from 'react';

import { FaLink } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

interface InputProps
{
    inputType?: string;
    type?: 'basic' | 'iconWithButton' | 'search' | 'pixel' | 'withButton';
    placeholder?: string;
    className?: string;
    buttonContent?: string;
    loading?: boolean;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: any;
    pattern?: string;
    elementRef?: Ref<HTMLInputElement>;
    min?: number
    max?: number
}

const InputComponent: React.FC<InputProps> = ({ buttonContent, loading = false, pattern, inputType = 'text', onChange, value, className, placeholder, type = 'basic', onClick, elementRef, min, max }) =>
{
    return (
        <>
            {
                type === 'basic'
                &&
                <input
                    pattern={ pattern }
                    value={ value }
                    onChange={ onChange }
                    className={ `form-input w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent ${ className }` }
                    placeholder={ placeholder }
                    type={ inputType }
                    ref={ elementRef }
                    min={ min }
                    max={ max }
                />
            }
            {
                type === 'pixel'
                &&
                <label className='mt-1.5 flex -space-x-px'>
                    <input
                        pattern={ pattern }
                        className='form-input w-full rounded-l-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent'
                        placeholder={ placeholder }
                        onChange={ onChange }
                        type='text'
                    />
                    <div
                        className='flex items-center justify-center rounded-r-lg border border-slate-300 px-3.5 font-inter dark:border-navy-600'
                    >
                        <span>px</span>
                    </div>
                </label>
            }
            {
                type === 'iconWithButton'
                &&
                <div className='relative flex -space-x-px'>
                    <input
                        pattern={ pattern }
                        className={ `form-input peer w-full rounded-l-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent ${ className }` }
                        placeholder={ placeholder }
                        onChange={ onChange }
                        type='text'
                    />

                    <div
                        className='pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent'>
                        <FaLink />
                    </div>

                    <button
                        onClick={ onClick }
                        className='btn rounded-l-none bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    >
                        { buttonContent || 'Insert' }
                    </button>
                </div>
            }
            {
                type === 'withButton'
                &&
                <div className='relative flex w-full -space-x-px'>
                    <input
                        pattern={ pattern }
                        className={ `form-input peer w-full rounded-l-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent ${ className }` }
                        placeholder={ placeholder }
                        onChange={ onChange }
                        type='text'
                    />

                    <button
                        onClick={ onClick }
                        className='btn rounded-l-none bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    >
                        { buttonContent || 'Insert' }
                    </button>
                </div>
            }
            {
                type === 'search'
                &&
                <label className='relative flex w-full'>
                    <input
                        pattern={ pattern }
                        className='form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent'
                        placeholder={ placeholder }
                        onChange={ onChange }
                        type='text'
                    />
                    <div className='pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent'>
                        <FaSearch />
                    </div>
                    {
                        loading
                        &&
                        <div className='pointer-events-none absolute right-0 flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent'>
                            <div className='spinner size-5 animate-spin rounded-full border-2 border-slate-150 border-r-slate-400 dark:border-navy-600 dark:border-r-navy-300'/>
                        </div>
                    }
                </label>
            }
        </>
    );
};

export default InputComponent;
