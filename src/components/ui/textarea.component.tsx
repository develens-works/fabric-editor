'use client';

import React from 'react';

interface TextareaProps
{
    type?: 'basic' | 'filled';
    className?: string;
    placeholder?: string;
}

const TextareaComponent: React.FC<TextareaProps> = ({ className, type = 'basic', placeholder = 'Enter text' }) =>
{
    return (
        <>
            {
                type === 'basic'
                &&
                <textarea placeholder={ placeholder } className={ `form-textarea w-full resize-none rounded-lg border border-slate-300 bg-transparent p-2.5 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent ${ className }` } />
            }
            {
                type === 'filled'
                &&
                <textarea placeholder={ placeholder } className={ `form-textarea w-full resize-none rounded-lg bg-slate-150 p-2.5 placeholder:text-slate-400 dark:bg-navy-900 dark:placeholder:text-navy-300 ${ className }` } />
            }
        </>
    );
};

export default TextareaComponent;
