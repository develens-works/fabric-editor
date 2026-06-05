'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import InputComponent from '@/components/ui/input.component';

import { MdOutlineFileUpload } from 'react-icons/md';

const AsideWorlsOptionComponent: React.FC = () =>
{
    const [uploadedFile, setUploadedFile] = useState<string[]>([]);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.files)
        {
            const files = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
            setUploadedFile([...uploadedFile, ...files]);
        }
    };

    const handleUrlSubmit = () =>
    {
        if (fileUrl)
        {
            setUploadedFile([...uploadedFile, fileUrl]);
            setFileUrl('');
        }
    };

    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <p className='mb-1'>Upload Back Up File</p>
            <div className='flex w-full items-center justify-center'>
                <label
                    form='backup-upload'
                    className='flex  w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-navy-750 dark:hover:border-gray-500 dark:hover:bg-navy-700'
                >
                    <div className='flex flex-col items-center justify-center py-2'>
                        <MdOutlineFileUpload size={22} />
                    </div>
                    <input id='backup-upload' accept='.zip' type='file' multiple className='hidden' onChange={handleFileChange} />
                </label>
            </div>

            <p className='mb-1 mt-4'>Get File from a URL</p>
            <InputComponent type='iconWithButton' placeholder='URL' onChange={(e) => setFileUrl(e.target.value)} onClick={handleUrlSubmit} />

            <ul className='my-5 space-y-4 text-sm'>
                <li>Buldings-Bk.zip</li>
                <li>
                    Slider Name: <span className='ml-1 inline-block'>Buldings</span>
                </li>
                <li>
                    File Size: <span className='ml-1 inline-block'>1.5 MB</span>
                </li>
                <li>
                    Slides : <span className='ml-1 inline-block'>3</span>
                </li>
                <li>
                    Layers: <span className='ml-1 inline-block'>22</span>
                </li>
                <li>
                    Images: <span className='ml-1 inline-block'>11</span>
                </li>
                <li>
                    Texts: <span className='ml-1 inline-block'>8</span>
                </li>
                <li>
                    Shaps: <span className='ml-1 inline-block'>3</span>
                </li>
            </ul>

            <div className='flex items-center justify-center'>
                <button className='btn border border-primary bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'>
                    Add to Sliders
                </button>
            </div>

            <div className='my-5 flex items-center justify-between gap-2'>
                <Image src='/assets/images/media/huntsman-elite.jpg' width={80} height={80} alt='picture world' />
                <Image src='/assets/images/media/huntsman-elite.jpg' width={80} height={80} alt='picture world' />
                <Image src='/assets/images/media/huntsman-elite.jpg' width={80} height={80} alt='picture world' />
            </div>
        </div>
    );
};

export default AsideWorlsOptionComponent;
