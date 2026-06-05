import React, { useState } from 'react';

import InputComponent from '@/components/ui/input.component';

function AsideWorldThemesOptionComponent()
{
    const [tabActive, setTabActive] = useState<'all' | 'lands' | 'stands' | 'carousel'>('all');

    const [headerActive, setHeaderActive] = useState<number>(1);

    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <InputComponent type='search' placeholder='Search ...' />

            <div className=' my-5 flex items-center space-x-1 '>
                <button
                    onClick={() =>
                    {
                        setHeaderActive(1);
                    }}
                    className={
                        headerActive === 1
                            ? 'btn flex w-full content-center items-center justify-center rounded-md bg-primary-focus  px-2 py-1 text-center align-middle text-xs font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            : 'btn flex w-full content-center items-center justify-center rounded-md bg-primary px-2 py-1 text-center align-middle text-xs font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>Slider</p>
                </button>
                <button
                    onClick={() =>
                    {
                        setHeaderActive(2);
                    }}
                    className={
                        headerActive === 2
                            ? 'btn flex w-full content-center items-center justify-center rounded-md bg-primary-focus  px-2 py-1 text-center align-middle text-xs font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            : 'btn flex w-full content-center items-center justify-center rounded-md bg-primary px-2 py-1 text-center align-middle text-xs font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>Carousel</p>
                </button>
                <button
                    onClick={() =>
                    {
                        setHeaderActive(3);
                    }}
                    className={
                        headerActive === 3
                            ? 'btn flex w-full content-center items-center justify-center rounded-md bg-primary-focus  px-2 py-1 text-center align-middle text-xs font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            : 'btn flex w-full content-center items-center justify-center rounded-md bg-primary px-2 py-1 text-center align-middle text-xs font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>Vertical</p>
                </button>
                <button
                    onClick={() =>
                    {
                        setHeaderActive(4);
                    }}
                    className={
                        headerActive === 4
                            ? 'btn flex w-full content-center items-center justify-center rounded-md bg-primary-focus  px-2 py-1 text-center align-middle text-xs font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            : 'btn flex w-full content-center items-center justify-center rounded-md bg-primary px-2 py-1 text-center align-middle text-xs font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>Page</p>
                </button>

                <button
                    onClick={() =>
                    {
                        setHeaderActive(4);
                    }}
                    className={
                        headerActive === 5
                            ? 'btn flex w-full content-center items-center justify-center rounded-md bg-primary-focus  px-2 py-1 text-center align-middle text-xs font-medium text-white active:bg-primary-focus/90 dark:bg-accent-focus dark:active:bg-accent/90'
                            : 'btn flex w-full content-center items-center justify-center rounded-md bg-primary px-2 py-1 text-center align-middle text-xs font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'
                    }
                >
                    <p className='m-auto flex'>Scene</p>
                </button>
            </div>

            <div className='tabs mt-6 flex h-fit w-full flex-col'>
                <div className='-ml-1 w-full'>
                    <div className='tabs-list flex w-full'>
                        <button
                            onClick={() => setTabActive('all')}
                            className={`tab btn w-1/4 rounded-none border-b-2 py-2 font-medium ${
                                tabActive === 'all'
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent-light'
                                    : 'border-transparent text-slate-800 hover:text-slate-800 dark:text-navy-100'
                            }`}
                        >
                            All
                        </button>

                        <button
                            onClick={() => setTabActive('lands')}
                            className={`tab btn w-1/4 rounded-none border-b-2 py-2 font-medium ${
                                tabActive === 'lands'
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent-light'
                                    : 'border-transparent text-slate-800 hover:text-slate-800 dark:text-navy-100'
                            }`}
                        >
                            Lands
                        </button>

                        <button
                            onClick={() => setTabActive('stands')}
                            className={`tab btn w-1/4 rounded-none border-b-2 py-2 font-medium ${
                                tabActive === 'stands'
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent-light'
                                    : 'border-transparent text-slate-800 hover:text-slate-800 dark:text-navy-100'
                            }`}
                        >
                            Stands
                        </button>

                        <button
                            onClick={() => setTabActive('carousel')}
                            className={`tab btn ml-3 w-1/4 rounded-none border-b-2 py-2 font-medium ${
                                tabActive === 'carousel'
                                    ? 'border-primary text-primary dark:border-accent dark:text-accent-light'
                                    : 'border-transparent text-slate-800 hover:text-slate-800 dark:text-navy-100'
                            }`}
                        >
                            Carousel
                        </button>
                    </div>
                </div>
                <div className='visible mt-3 block'>
                    { tabActive === 'all' && <p>All Tab Content Here</p> }
                    { tabActive === 'lands' && <p>Lands Tab Content Here</p> }
                    { tabActive === 'stands' && <p>Stands Tab Content Here</p> }
                    { tabActive === 'carousel' && <p>Carousel Tab Content Here</p> }
                </div>
            </div>
        </div>
    );
}

export default AsideWorldThemesOptionComponent;
