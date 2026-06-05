import React from 'react';
import Image from 'next/image';

import PercentRangeInputComponent from '@/components/ui/percent-range-input.component';

import { PiTextTThin } from 'react-icons/pi';
import { IoMdCode } from 'react-icons/io';

const optimazeData =
[
    { img: '/assets/images/media/huntsman-elite.jpg', title: 'Street' },
    { img: '/assets/images/media/huntsman-elite.jpg', title: 'Bottle' },
    { img: '/assets/images/media/huntsman-elite.jpg', title: 'Products' }
];

const infoOptimize =
[
    { icon: <PiTextTThin size={28} />, text: 'Hello Guys' },
    { icon: <PiTextTThin size={28} />, text: 'This is How' },
    { icon: <IoMdCode size={28} />, text: 'Core Tools GreenSock & Co' },
    { icon: <IoMdCode size={28} />, text: 'Core Javascript' },
    { icon: <IoMdCode size={28} />, text: 'Core Css' }
];
function AsideWorldPowerComponent()
{
    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <div>
                <PercentRangeInputComponent label='Optimize All' className='font-medium' />
            </div>

            <div className='my-3 flex flex-col' style={{ width: '230px' }}>
                {optimazeData.map((item) => (
                    <div key={item.title} className='mb-4 flex'>
                        <Image src={item.img} width={50} height={20} alt='picture world' />

                        <div className='pl-2'>
                            <div className='flex items-center justify-between'>
                                <p>{item.title}</p>
                                <p>{'250kb - 50kb'}</p>
                            </div>
                            <div style={{ width: '230px' }}>
                                <input type='range' min='0' max='100' style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ul className='my-5'>
                {infoOptimize.map((info) => (
                    <li key={info.text} className=' mb-3 flex items-center'>
                        <p className='mr-3'>{info.icon}</p>
                        <p className='text-xs'>{info.text}</p>
                    </li>
                ))}
            </ul>

            <div className='flex rounded-md border border-gray-200 '>
                <div className='flex w-full flex-col py-1 pl-2'>
                    <span>1.5mb - 867kb</span>
                    <span>633 ~ 42% Decressed</span>
                </div>
                <button className='btn gap-2 bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'>
                    APPLY
                </button>
            </div>
        </div>
    );
}

export default AsideWorldPowerComponent;
