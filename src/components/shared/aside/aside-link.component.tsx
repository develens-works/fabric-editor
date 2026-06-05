'use client';

import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';
import { setToolsOption } from '@/redux/features/tools/tools-slice';

interface AsideLinkProps
{
    link: string;
    label: string;
    icon: React.ReactElement;
}

const AsideLinkComponent: React.FC<AsideLinkProps> = ({ icon, link, label }) =>
{
    const dispatch = useAppDispatch();

    const asideState = useAppSelector((state) => state.aside);

    return (
        <button
            onClick={ () =>
            {
                dispatch(setToolsOption(link.toUpperCase()));
                dispatch(setAsideOption(link.toUpperCase()));
                document.body.classList.add('is-sidebar-open');
            }}
            className={
                (asideState.asideOption === link.toUpperCase()) || (asideState.asideOption.split('_')[0] === link.toUpperCase().split('_')[0])
                    ?
                    'tooltip-main-sidebar text- flex h-fit w-full flex-col items-center justify-center gap-1.5 bg-primary/10 py-4 text-xs text-primary outline-none transition-colors duration-200 hover:text-accent dark:bg-accent-light/10 dark:text-accent-light'
                    :
                    'tooltip-main-sidebar flex h-fit w-full flex-col items-center justify-center gap-1.5 py-4 text-xs outline-none transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-50'
            }
        >
            { icon }
            <span>
                { label }
            </span>
        </button>
    );
};

export default AsideLinkComponent;
