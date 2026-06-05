'use client';

import React, { MutableRefObject, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

import { MediaManager } from '@/libs/media-manager.lib';

import data from '@/components/shared/aside/media/data';

import InputComponent from '@/components/ui/input.component';
import TextareaComponent from '@/components/ui/textarea.component';

interface AsideMediaOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>
}

const AsideMediaOptionComponent = ({ canvasRef }: AsideMediaOptionProps) =>
{
    const [tabActive, setTabActive] = useState<'edited' | 'inserted'>('inserted');
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.files)
        {
            const files = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
            setUploadedImages([...uploadedImages, ...files]);
        }
    };

    const handleUrlSubmit = () =>
    {
        if (imageUrl)
        {
            setUploadedImages([...uploadedImages, imageUrl]);
            setImageUrl('');
        }
    };

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <p className='mb-1'>
                New file
            </p>
            <div className='flex w-full items-center justify-center'>
                <label form='dropzone-file' className='flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-navy-750 dark:hover:border-gray-500 dark:hover:bg-navy-700'>
                    <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                        <svg className='mb-4 size-8 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 16'>
                            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'/>
                        </svg>
                        <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'><span className='font-semibold'>Click to upload</span> or drag and drop</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id='dropzone-file' accept='image/*' type='file' multiple className='hidden' onChange={ handleFileChange } />
                </label>
            </div>

            <p className='mb-1 mt-4'>
                Insert file from URL
            </p>
            <InputComponent
                type='iconWithButton'
                placeholder='URL'
                onChange={ (e) => setImageUrl(e.target.value) }
                onClick={ handleUrlSubmit }
            />

            <p className='mb-1 mt-4'>
                Generate with AI
            </p>
            <TextareaComponent
                type='filled'
                className='h-32'
                placeholder='Describe the image you want to be created'
            />

            <div className='mt-2 flex items-center justify-start gap-2 align-middle'>
                <span className='mr-1'>Size:</span>
                <InputComponent
                    type='basic'
                    placeholder='Width'
                />
                <span>
                                x
                </span>
                <InputComponent
                    type='basic'
                    placeholder='Height'
                />
                <button
                    className='btn ml-2.5 border border-primary bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                >
                    Submit
                </button>
            </div>

            <div className='tabs mt-6 flex h-fit w-full flex-col'>
                <div className='w-full'>
                    <div className='tabs-list flex w-full'>
                        <button
                            onClick={ () => setTabActive('inserted') }
                            className={ `tab btn w-[50%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'inserted' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                            Inserted
                        </button>
                        <button
                            onClick={ () => setTabActive('edited') }
                            className={ `tab btn w-[50%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'edited' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                            Edited
                        </button>
                    </div>
                </div>
                <div className='h-fit pt-4'>
                    <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'inserted' && 'is-active' }` }>
                        <ul className='grid grid-cols-2 gap-1'>
                            {
                                uploadedImages.map((imageSrc, index) => (
                                    <li
                                        key={`uploaded_image_${ index }`}
                                        className='relative flex h-36 justify-center align-middle'
                                        onClick={() => MediaManager.handleAddImage(canvasRef, imageSrc) }
                                    >
                                        <Image
                                            fill
                                            alt={`Uploaded Image ${ index + 1 }`}
                                            style={{ objectFit: 'contain' }}
                                            src={imageSrc}
                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                            unoptimized
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={ `tab-content tab-shift-left w-full ${ tabActive === 'edited' && 'is-active' }` }>
                        <ul className='grid grid-cols-2 gap-1'>
                            {
                                data.edited.map((item, index) =>
                                    (
                                        <li key={ item + `_edited_${ index }` } className='relative flex h-36 justify-center align-middle'>
                                            <Image
                                                fill
                                                alt={ item }
                                                style={{ objectFit: 'contain' }}
                                                src={ `/assets/images/media/${ item }` }
                                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                unoptimized
                                            />
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AsideMediaOptionComponent;
