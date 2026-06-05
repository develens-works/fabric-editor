import React from 'react';

import { BiArrowFromTop } from 'react-icons/bi';

function AsideWorldSelectComponent()
{
    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <button
                className={' flex w-full items-center justify-between rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent '}
            >
                <p className='text-sm'>Street-Slide-Bk.zip</p>
                <BiArrowFromTop size={18} />
            </button>
            <ul className='my-5 space-y-4 text-sm'>
                <li>
                    Slider Name: <span className='ml-1 inline-block'>Street</span>
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
        </div>
    );
}

export default AsideWorldSelectComponent;
