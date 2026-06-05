'use client';

import React, { MutableRefObject, useRef, useState } from 'react';

import Image from 'next/image';

import { PiAlienDuotone } from 'react-icons/pi';
import { FaBell, FaGear } from 'react-icons/fa6';

import useClickOutside from '@/hooks/use-click-out-side.hook';

const AsideNotificationComponent: React.FC = () =>
{
    const notificationBoxRef: MutableRefObject<any> = useRef<HTMLCanvasElement | any>(null);

    const [openNotifications, setOpenNotifications] = useState<boolean>(false);
    const [categoryNotifications, setCategoryNotifications] = useState<string>('all');

    useClickOutside(openNotifications, notificationBoxRef, () =>
    {
        setOpenNotifications(false);
    });

    return (
        <div className='flex'>
            <button onClick={ () => setOpenNotifications(!openNotifications) } className={ `tooltip-main-sidebar avatar flex size-11 items-center justify-center justify-items-center justify-self-center rounded-lg align-middle outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 ${ openNotifications && 'is-active' }` }>
                <FaBell className='m-auto flex' size={ 20 }/>
                <span className="absolute right-2 top-2 flex size-3 items-center justify-center">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-80"></span>
                    <span className="inline-flex size-2 rounded-full bg-secondary"></span>
                </span>
            </button>

            <div ref={ notificationBoxRef } className={ `popper-root fixed bottom-2 ${ openNotifications && 'show' }` }>
                <div className="notification-tab-wrapper popper-box mx-4 mt-1 flex h-full max-h-[380px] min-h-[380px] w-[calc(100vw-2rem)] flex-col justify-center rounded-lg border border-slate-150 bg-white align-middle shadow-soft dark:border-navy-800 dark:bg-navy-700 dark:shadow-soft-dark sm:m-0 sm:w-80">
                    <div className="rounded-t-lg bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-navy-200">
                        <div className="flex items-center justify-between px-4 pt-2">
                            <div className="flex items-center space-x-2">
                                <h3 className="font-medium text-slate-700 dark:text-navy-100">
                                    Notifications
                                </h3>
                                <div className="badge h-5 rounded-full bg-primary/10 px-1.5 text-primary dark:bg-accent-light/15 dark:text-accent-light">
                                    26
                                </div>
                            </div>

                            <button className="btn -mr-1.5 size-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                                <FaGear />
                            </button>
                        </div>

                        <div className="tabs is-scrollbar-hidden flex shrink-0 overflow-x-auto px-3">
                            <button
                                className={ `tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 ${ categoryNotifications === 'all' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                                onClick={() => setCategoryNotifications('all')}
                            >
                                <span>
                                    All
                                </span>
                            </button>
                            <button
                                className={ `tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 ${ categoryNotifications === 'alerts' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                                onClick={() => setCategoryNotifications('alerts')}
                            >
                                <span>
                                    Alerts
                                </span>
                            </button>
                            <button
                                className={ `tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 ${ categoryNotifications === 'events' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                                onClick={() => setCategoryNotifications('events')}

                            >
                                <span>
                                    Events
                                </span>
                            </button>
                            <button
                                className={ `tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5 ${ categoryNotifications === 'logs' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                                onClick={() => setCategoryNotifications('logs')}
                            >
                                <span>
                                    Logs
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-[1px] flex h-full max-h-[300px] min-h-[300px] flex-col overflow-hidden">
                        <div className={`tab-content tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto p-4 ${ categoryNotifications === 'all' && 'is-active' }`}>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 dark:bg-secondary-light/15">
                                    <i className="fa fa-user-edit text-secondary dark:text-secondary-light"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                        User Photo Changed
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                        John Doe changed his avatar photo
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-info/10 dark:bg-info/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                        Mon, June 14, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">08:00 - 09:00</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">Frontend Conf</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-accent-light/15">
                                    <i className="fa-solid fa-image text-primary dark:text-accent-light"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Images Added
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            Mores Clarke added new image gallery
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10 dark:bg-success/15">
                                    <i className="fa fa-leaf text-success"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Design Completed
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            Robert Nolan completed the design of the CRM
                                            application
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-info/10 dark:bg-info/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Wed, June 21, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">16:00 - 20:00</span>
                                        <div
                                            className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"
                                        ></div>

                                        <span className="line-clamp-1">UI/UX Conf</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 dark:bg-warning/15">
                                    <i className="fa fa-project-diagram text-warning"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            ER Diagram
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            Team completed the ER diagram app
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 dark:bg-warning/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            THU, May 11, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">10:00 - 11:30</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">Interview, Konnor Guzman</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-error/10 dark:bg-error/15">
                                    <i className="fa fa-history text-error"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Weekly Report
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            The weekly report was uploaded
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`tab-content tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto p-4 ${ categoryNotifications === 'alerts' && 'is-active' }`}>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 dark:bg-secondary-light/15">
                                    <i className="fa fa-user-edit text-secondary dark:text-secondary-light"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            User Photo Changed
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            John Doe changed his avatar photo
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-accent-light/15">
                                    <i className="fa-solid fa-image text-primary dark:text-accent-light"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Images Added
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            Mores Clarke added new image gallery
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10 dark:bg-success/15">
                                    <i className="fa fa-leaf text-success"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Design Completed
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            Robert Nolan completed the design of the CRM
                                            application
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 dark:bg-warning/15">
                                    <i className="fa fa-project-diagram text-warning"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            ER Diagram
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            Team completed the ER diagram app
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-error/10 dark:bg-error/15">
                                    <i className="fa fa-history text-error"></i>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Weekly Report
                                    </p>
                                    <div className="mt-1 line-clamp-1 text-xs text-slate-400 dark:text-navy-300">
                                            The weekly report was uploaded
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`tab-content tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto p-4 ${ categoryNotifications === 'events' && 'is-active' }`}>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-info/10 dark:bg-info/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Mon, June 14, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">08:00 - 09:00</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">Frontend Conf</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-info/10 dark:bg-info/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Wed, June 21, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">16:00 - 20:00</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">UI/UX Conf</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 dark:bg-warning/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            THU, May 11, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">10:00 - 11:30</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">Interview, Konnor Guzman</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-info/10 dark:bg-info/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Mon, Jul 16, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">06:00 - 16:00</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">Laravel Conf</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10 dark:bg-warning/15">
                                    <PiAlienDuotone />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-600 dark:text-navy-100">
                                            Wed, Jun 16, 2021
                                    </p>
                                    <div className="mt-1 flex text-xs text-slate-400 dark:text-navy-300">
                                        <span className="shrink-0">15:30 - 11:30</span>
                                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-navy-500"></div>
                                        <span className="line-clamp-1">Interview, Jonh Doe</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`tab-content tab-shift-left is-scrollbar-hidden h-full overflow-y-auto px-4 ${ categoryNotifications === 'logs' && 'is-active' }`}>
                            <div className="flex h-full max-h-[300px] min-h-[300px] flex-col justify-center pb-8 text-center align-middle">
                                <span className='relative mx-auto inline-flex size-10 shrink-0'>
                                    <Image
                                        fill
                                        alt='Empty Girl Box'
                                        src='/assets/images/illustrations/empty-girl-box.svg'
                                        className='rounded-full'
                                        unoptimized
                                    />
                                </span>

                                <div className="mt-5">
                                    <p className="text-base font-semibold text-slate-700 dark:text-navy-100">
                                        No any logs
                                    </p>
                                    <p className="text-slate-400 dark:text-navy-300">
                                        There are no unread logs yet
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsideNotificationComponent;
