'use client';

import React, { useState, useEffect } from 'react';

import { FaSun, FaMoon } from 'react-icons/fa6';

const AsideThemeComponent: React.FC = () =>
{
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() =>
    {
        const isDarkMode = localStorage.getItem('darkMode');

        if (isDarkMode)
            setDarkMode(JSON.parse(isDarkMode));
    }, []);

    const toggleDarkMode = () =>
    {
        const newDarkMode = !darkMode;

        setDarkMode(newDarkMode);

        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
        document.documentElement.classList.toggle('dark', newDarkMode);
    };

    return (
        <button
            onClick={ toggleDarkMode }
            className='tooltip-main-sidebar flex size-11 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 dark:hover:bg-navy-300/20'
        >
            {
                darkMode
                    ?
                    <FaMoon size={ 20 }/>
                    :
                    <FaSun size={ 20 }/>
            }
        </button>
    );
};

export default AsideThemeComponent;
