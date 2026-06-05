'use client';

import React, { useEffect } from 'react';

const AppPreloaderComponent: React.FC = () =>
{
    useEffect(() =>
    {
        const isDarkMode = localStorage.getItem('darkMode');

        if (isDarkMode && JSON.parse(isDarkMode))
            document.documentElement.classList.add('dark');

        const preloader = document.querySelector('.app-preloader');

        if (!preloader)
            return;

        preloader.classList.add('animate-[var(--ease-in-out)_fade-out_500ms_forwards]');
        preloader.remove();

        // setTimeout(() => preloader.remove(), 1000);
    }, []);

    return (
        <div className='app-preloader fixed z-50 grid size-full place-content-center bg-slate-50 dark:bg-navy-900'>
            <div className='app-preloader-inner relative inline-block size-48'/>
        </div>
    );
};

export default AppPreloaderComponent;
