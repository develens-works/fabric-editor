'use client';

import React from 'react';

interface ModalReplaceAnimationProps
{
    setOpenModal: any;
}

const ModalReplaceAnimationComponent: React.FC<ModalReplaceAnimationProps> = ({ setOpenModal }) =>
{
    return (
        <div className='modal show fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5'>
            <div
                onClick={() => setOpenModal(false)}
                className='modal-overlay absolute inset-0 bg-slate-900/60 backdrop-blur'
            />

            <div className='modal-content scrollbar-sm relative flex max-w-lg flex-col items-center overflow-y-auto rounded-lg bg-white px-4 py-10 text-center dark:bg-navy-700 sm:px-5'>
                <div className=''>
                    <p className='mb-6 text-left text-lg'>
                        Are you sure to replace all the Anime/Out animations?
                    </p>

                    <div className='mx-auto flex w-fit gap-2'>
                        <button
                            onClick={() => setOpenModal(false)}
                            className='btn mt-6 bg-accent font-medium text-white hover:bg-accent-focus dark:bg-accent-light dark:hover:bg-accent'
                        >
                            Yes, replace all
                        </button>
                        <button
                            onClick={() => setOpenModal(false)}
                            className='btn mt-6 border border-accent font-medium text-white hover:border-accent-focus dark:border-accent-light dark:hover:border-accent'
                        >
                            Skip modified ones
                        </button>
                    </div>

                    <div className='mx-auto mt-4 flex w-fit items-center justify-between gap-4'>
                        <p className='text-lg'>
                            Remember this settings
                        </p>
                        <input
                            className='form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white'
                            type='checkbox'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalReplaceAnimationComponent;
