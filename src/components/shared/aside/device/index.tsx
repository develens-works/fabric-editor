'use client';

import React, { useState } from 'react';
import { FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import { FaCheck, FaGreaterThan, FaLaptop, FaLock, FaLockOpen } from 'react-icons/fa6';

import { motion } from 'framer-motion';

import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import InputComponent from '@/components/ui/input.component';

const AsideDeviceOptionComponent: React.FC = () =>
{
    const [lockSize, setLockSize] = useState<boolean>(true);
    const [lockPlace, setLockPlace] = useState<boolean>(true);
    const [tabActive, setTabActive] = useState<'global' | 'object'>('object');
    const [activeDevice, setActiveDevice] = useState<string>('desktop');

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='tabs flex h-fit w-full flex-col'>
                <div className='w-full px-4'>
                    <div className='tabs-list flex w-full'>
                        <button
                            onClick={ () => setTabActive('global') }
                            className={ `tab btn w-[50%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'global' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                            Global
                        </button>
                        <button
                            onClick={ () => setTabActive('object') }
                            className={ `tab btn w-[50%] shrink-0 rounded-none border-b-2 px-3 py-2 font-medium ${ tabActive === 'object' ? 'border-primary text-primary dark:border-accent dark:text-accent-light' : 'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100' }` }
                        >
                            Object
                        </button>
                    </div>
                </div>

                <div className='h-full max-h-[calc(100vh-7.5rem)] overflow-hidden'>
                    <div className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-y-auto overflow-x-hidden overscroll-y-auto ${ tabActive === 'global' && 'is-active' }` }>
                        <div className='tabs flex flex-col pt-4'>
                            <ul className='flex flex-col gap-2 p-4'>
                                <li>
                                    <label className='inline-flex items-center space-x-2'>
                                        <p className='flex w-18'>Full width</p>
                                        <input
                                            className='form-radio is-basic size-5 rounded-full border-slate-400/70 checked:border-slate-500 checked:bg-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:checked:bg-navy-400'
                                            name='basic'
                                            type='radio'
                                        />
                                    </label>
                                </li>
                                <li>
                                    <label className='inline-flex items-center space-x-2'>
                                        <p className='flex w-18'>Auto</p>
                                        <input
                                            className='form-radio is-basic size-5 rounded-full border-slate-400/70 checked:border-slate-500 checked:bg-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:checked:bg-navy-400'
                                            name='basic'
                                            type='radio'
                                        />
                                    </label>
                                </li>
                                <li className='py-4'>
                                    <label className='inline-flex items-center space-x-2'>
                                        <p>Auto responsive for all sizes</p>
                                        <input
                                            className='form-checkbox is-basic size-5 rounded border-slate-400/70 checked:border-slate-500 checked:bg-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:checked:bg-navy-400'
                                            type='checkbox'
                                        />
                                    </label>
                                </li>
                            </ul>
                            <ul className='flex flex-col gap-4 px-4'>
                                <li className='flex items-center justify-start gap-2'>
                                    <div className='flex w-40 items-center justify-start gap-2'>
                                        <span className='-mb-1 flex items-center justify-start gap-1'>
                                            <i>
                                                <FaDesktop size={ 24 }/>
                                            </i>
                                            <p className='w-14'>
                                                Desktop
                                            </p>
                                        </span>
                                        <p className='-mb-1 flex'>
                                            <FaGreaterThan/>
                                        </p>
                                    </div>
                                    <InputComponent placeholder='Size' type='pixel'/>
                                </li>
                                <li className='flex items-center justify-start gap-2'>
                                    <div className='flex w-40 items-center justify-start gap-2'>
                                        <span className='-mb-1 flex items-center justify-start gap-1'>
                                            <i>
                                                <FaLaptop size={ 24 }/>
                                            </i>
                                            <p className='w-14'>
                                                Laptop
                                            </p>
                                        </span>
                                        <p className='-mb-1 flex'>
                                            <FaGreaterThan/>
                                        </p>
                                    </div>
                                    <InputComponent placeholder='Size' type='pixel'/>
                                </li>
                                <li className='flex items-center justify-start gap-2'>
                                    <div className='flex w-40 items-center justify-start gap-2'>
                                        <span className='-mb-1 flex items-center justify-start gap-1'>
                                            <i>
                                                <FaTabletAlt size={ 24 }/>
                                            </i>
                                            <p className='w-14'>
                                                Tablet
                                            </p>
                                        </span>
                                        <p className='-mb-1 flex'>
                                            <FaGreaterThan/>
                                        </p>
                                    </div>
                                    <InputComponent placeholder='Size' type='pixel'/>
                                </li>
                                <li className='flex items-center justify-start gap-2'>
                                    <div className='flex w-40 items-center justify-start gap-2'>
                                        <span className='-mb-1 flex items-center justify-start gap-1'>
                                            <i>
                                                <FaMobileAlt size={ 24 }/>
                                            </i>
                                            <p className='w-14'>
                                                Mobile
                                            </p>
                                        </span>
                                        <p className='-mb-1 flex'>
                                            <FaGreaterThan/>
                                        </p>
                                    </div>
                                    <InputComponent placeholder='Size' type='pixel'/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={ `tab-content custom-scrollbar tab-shift-left max-h-[calc(100vh-7.5rem)] w-full overflow-y-auto overflow-x-hidden overscroll-y-auto ${ tabActive === 'object' && 'is-active' }` }>
                        <div className="tabs flex flex-col pt-4">
                            <div className="flex items-center justify-between p-4">
                                <span className="flex items-center justify-start gap-4">
                                    <Tippy
                                        allowHTML
                                        interactive
                                        trigger="click"
                                        appendTo="parent"
                                        arrow={ roundArrow }
                                        placement={ 'right-start' }
                                        animation={ 'shift-away' }
                                        className="bg-gray-50"
                                        content={
                                            <ul className="flex w-40 flex-col gap-1.5 py-1">
                                                <li onClick={ () => setActiveDevice('desktop') }
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeDevice === 'desktop' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                                                    <p className="flex items-center justify-start gap-2">
                                                        <i className="w-6">
                                                            {
                                                                activeDevice === 'desktop'
                                                                    &&
                                                                    <FaCheck/>
                                                            }
                                                        </i>
                                                        <i>
                                                            <FaDesktop size={ 20 }/>
                                                        </i>
                                                        <span>
                                                            Desktop
                                                        </span>
                                                    </p>
                                                </li>
                                                <li onClick={ () => setActiveDevice('laptop') }
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeDevice === 'laptop' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                                                    <p className="flex items-center justify-start gap-2">
                                                        <i className="w-6">
                                                            {
                                                                activeDevice === 'laptop'
                                                                    &&
                                                                    <FaCheck/>
                                                            }
                                                        </i>
                                                        <i>
                                                            <FaLaptop size={ 20 }/>
                                                        </i>
                                                        <span>
                                                                Laptop
                                                        </span>
                                                    </p>
                                                </li>
                                                <li onClick={ () => setActiveDevice('tablet') }
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeDevice === 'tablet' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                                                    <p className="flex items-center justify-start gap-2">
                                                        <i className="w-6">
                                                            {
                                                                activeDevice === 'tablet'
                                                                    &&
                                                                    <FaCheck/>
                                                            }
                                                        </i>
                                                        <i>
                                                            <FaTabletAlt size={ 20 }/>
                                                        </i>
                                                        <span>
                                                                Tablet
                                                        </span>
                                                    </p>
                                                </li>
                                                <li onClick={ () => setActiveDevice('mobile') }
                                                    className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeDevice === 'mobile' ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                                                    <p className="flex items-center justify-start gap-2">
                                                        <i className="w-6">
                                                            {
                                                                activeDevice === 'mobile'
                                                                    &&
                                                                    <FaCheck/>
                                                            }
                                                        </i>
                                                        <i>
                                                            <FaMobileAlt size={ 20 }/>
                                                        </i>
                                                        <span>
                                                                Mobile
                                                        </span>
                                                    </p>
                                                </li>
                                            </ul>
                                        }
                                    >
                                        <i className="cursor-pointer">
                                            <FaDesktop size={ 36 }/>
                                        </i>
                                    </Tippy>

                                    <p className="text-lg font-semibold">
                                        Desktop
                                    </p>
                                </span>

                                <input
                                    className="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white"
                                    type="checkbox"
                                />
                            </div>
                            <div className="flex items-center justify-start gap-6 p-4">
                                <p className="text-lg font-semibold">
                                    Sizes:
                                </p>
                                <div>
                                    <ul className="flex flex-col gap-2">
                                        <li className="flex items-center justify-start gap-2 ">
                                            <p className="text-md">
                                                W:
                                            </p>
                                            <InputComponent placeholder="Width" type="pixel"/>
                                        </li>
                                        <li className="flex items-center justify-start gap-2 ">
                                            <p className="text-md">
                                                H:
                                            </p>
                                            <InputComponent placeholder="Height" type="pixel"/>
                                        </li>
                                    </ul>
                                </div>
                                <i className="cursor-pointer" onClick={ () => setLockSize(!lockSize) }>
                                    {
                                        lockSize
                                            ?
                                            <FaLock/>
                                            :
                                            <FaLockOpen/>
                                    }
                                </i>
                            </div>
                            <div className="flex items-center justify-start gap-6 p-4">
                                <p className="text-lg font-semibold">
                                    Place:
                                </p>
                                <div>
                                    <ul className="flex flex-col gap-2">
                                        <li className="flex items-center justify-start gap-2 ">
                                            <p className="text-md">
                                                X:
                                            </p>
                                            <InputComponent placeholder='x position' type='pixel'/>
                                        </li>
                                        <li className='flex items-center justify-start gap-2 '>
                                            <p className='text-md'>
                                                Y:
                                            </p>
                                            <InputComponent placeholder='y position' type='pixel'/>
                                        </li>
                                    </ul>
                                </div>
                                <i className='cursor-pointer' onClick={ () => setLockPlace(!lockPlace) }>
                                    {
                                        lockPlace
                                            ?
                                            <FaLock/>
                                            :
                                            <FaLockOpen/>
                                    }
                                </i>
                            </div>
                            <div className='flex items-center justify-start gap-2 p-4'>
                                <p>
                                    Position:
                                </p>
                                <label className='block w-28'>
                                    <select
                                        className='form-select mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-600 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent'
                                    >
                                        <option>relative</option>
                                        <option>absolute</option>
                                        <option>fixed</option>
                                        <option>sticky</option>
                                        <option>static</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AsideDeviceOptionComponent;
