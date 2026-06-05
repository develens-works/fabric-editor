import React from 'react';

import { MdContentCopy } from 'react-icons/md';

const data =
[
    { title: 'For the pages and posts insert the Shortcode:', shortcut: "[is-slider alias='slider-7][/is_slider]']", icon: <MdContentCopy size={18} /> },
    { title: 'To use is as Modal on pages and posts editor insert the Shortcode:', shortcut: "[is-slider alias='slider-7][/is_slider]']", icon: <MdContentCopy size={18} /> },
    { title: 'For the theme html use:', shortcut: "[is-slider alias='slider-7][/is_slider]']", icon: <MdContentCopy size={18} /> },
    { title: 'To add the slider only to the homepage , use:', shortcut: "[is-slider alias='slider-7][/is_slider]']", icon: <MdContentCopy size={18} /> },
    { title: 'To add the slider only to the homepage , use:', shortcut: "[is-slider alias='slider-7][/is_slider]']", icon: <MdContentCopy size={18} /> }
];

function AsideWorldShortcutComponent()
{
    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            {
                data.map((short) => (
                    <div key={short.title}>
                        <h3 className='mb-1  text-xs font-medium'>{short.title}</h3>
                        <div className='mb-7 flex w-full items-center justify-between rounded-lg border border-slate-300 bg-transparent px-3 py-1 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-600 dark:hover:border-navy-400 dark:focus:border-accent'>
                            <p>{short.shortcut}</p>
                            <p className='cursor-pointer'>{short.icon}</p>

                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default AsideWorldShortcutComponent;
