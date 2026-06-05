'use client';

import React, { MutableRefObject, useRef, useState } from 'react';

import { PiGearSixDuotone, PiUserCircleDuotone, PiChatCircleTextDuotone, PiUsersDuotone, PiChartBarDuotone, PiSignOutFill } from 'react-icons/pi';

import Link from 'next/link';
import Image from 'next/image';

import useClickOutside from '@/hooks/use-click-out-side.hook';

const AsideProfileComponent: React.FC = () =>
{
    const profileBoxRef: MutableRefObject<any> = useRef<HTMLCanvasElement | any>(null);

    const [openProfile, setOpenProfile] = useState<boolean>(false);

    useClickOutside(openProfile, profileBoxRef, () =>
    {
        setOpenProfile(false);
    });

    return (
        <div className='flex'>
            <button onClick={() => setOpenProfile(!openProfile)} className={ `avatar size-12 ${ openProfile && 'is-active relative' }` }>
                <Image
                    width={ 48 }
                    height={ 48 }
                    alt='avatar'
                    className='rounded-full'
                    style={{ objectFit: 'contain' }}
                    src='/assets/images/200x200.png'
                    unoptimized
                />
                <span className='absolute right-0 size-3.5 rounded-full border-2 border-white bg-success dark:border-navy-700'></span>
            </button>

            <div ref={ profileBoxRef } className={ `popper-root fixed bottom-2 ${ openProfile && 'show' }` }>
                <div className='popper-box w-64 rounded-lg border border-slate-150 bg-white shadow-soft dark:border-navy-600 dark:bg-navy-700'>
                    <div className='flex items-center space-x-4 rounded-t-lg bg-slate-100 px-4 py-5 dark:bg-navy-800'>
                        <div className='avatar relative size-14'>
                            <Image
                                width={ 56 }
                                height={ 56 }
                                alt='avatar'
                                priority={false}
                                className='rounded-full'
                                src='/assets/images/200x200.png'
                                unoptimized
                            />
                        </div>
                        <div>
                            <Link href='#' className='text-base font-medium text-slate-700 transition-all hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light'>
                                Parsa Firoozi
                            </Link>
                            <p className='text-xs text-slate-400 dark:text-navy-300'>
                                Product Designer
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col pb-5 pt-2'>
                        <Link href='#' className='group flex items-center space-x-3 px-4 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600'>
                            <div className='flex size-8 items-center justify-center rounded-lg bg-warning text-white'>
                                <PiUserCircleDuotone size={ 18 } />
                            </div>

                            <div>
                                <h2 className='font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light'>
                                    Profile
                                </h2>
                                <div className='line-clamp-1 text-xs text-slate-400 dark:text-navy-300'>
                                    Your profile setting
                                </div>
                            </div>
                        </Link>
                        <Link href='#' className='group flex items-center space-x-3 px-4 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600'>
                            <div className='flex size-8 items-center justify-center rounded-lg bg-info text-white'>
                                <PiChatCircleTextDuotone size={ 18 } />
                            </div>

                            <div>
                                <h2 className='font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light'>
                                    Messages
                                </h2>
                                <div className='line-clamp-1 text-xs text-slate-400 dark:text-navy-300'>
                                    Your messages and tasks
                                </div>
                            </div>
                        </Link>
                        <Link href='#' className='group flex items-center space-x-3 px-4 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600'>
                            <div className='flex size-8 items-center justify-center rounded-lg bg-secondary text-white'>
                                <PiUsersDuotone size={ 18 } />
                            </div>

                            <div>
                                <h2 className='font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light'>
                                    Team
                                </h2>
                                <div className='line-clamp-1 text-xs text-slate-400 dark:text-navy-300'>
                                    Your team activity
                                </div>
                            </div>
                        </Link>
                        <Link href='#' className='group flex items-center space-x-3 px-4 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600'>
                            <div className='flex size-8 items-center justify-center rounded-lg bg-error text-white'>
                                <PiChartBarDuotone size={ 18 } />
                            </div>

                            <div>
                                <h2 className='font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light'>
                                    Activity
                                </h2>
                                <div className='line-clamp-1 text-xs text-slate-400 dark:text-navy-300'>
                                    Your activity and events
                                </div>
                            </div>
                        </Link>
                        <Link href='#' className='group flex items-center space-x-3 px-4 py-2 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600'>
                            <div className='flex size-8 items-center justify-center rounded-lg bg-success text-white'>
                                <PiGearSixDuotone size={ 18 } />
                            </div>

                            <div>
                                <h2 className='font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light'>
                                    Settings
                                </h2>
                                <div className='line-clamp-1 text-xs text-slate-400 dark:text-navy-300'>
                                    Webapp settings
                                </div>
                            </div>
                        </Link>

                        <div className='mt-3 px-4'>
                            <button className='btn h-9 w-full space-x-2 bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90'>
                                <PiSignOutFill size={ 18 } />
                                <span>
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsideProfileComponent;
