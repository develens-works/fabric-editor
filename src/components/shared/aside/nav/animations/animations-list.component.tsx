'use client';

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';

import { motion } from 'framer-motion';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import data from '@/components/shared/aside/nav/animations/data';

import InputComponent from '@/components/ui/input.component';
import AnimationsItemComponent from '@/components/shared/aside/nav/animations/animations-item.component';

interface AsideNavAnimationsListOptionProps
{
    id: string;
}

const AsideNavAnimationsListOptionComponent: React.FC<AsideNavAnimationsListOptionProps> = ({ id }) =>
{
    const dispatch = useAppDispatch();

    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='mx-auto -mt-2 mb-2 flex w-[calc(100%-2rem)] gap-2'>
                <button
                    className='tooltip-main-sidebar relative flex size-8 min-w-8 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25'
                    onClick={ () => dispatch(setAsideOption('NAV_ANIMATIONS')) }
                >
                    <FaArrowLeft/>
                </button>

                <p className='text-md my-auto font-semibold dark:text-gray-300'>
                    { data.find((item) => item.id === id)?.title }
                </p>
            </div>

            <div className='mx-auto flex w-[calc(100%-2rem)]'>
                <InputComponent
                    type='search'
                    placeholder='Search text animations...'
                />
            </div>

            <div className='custom-scrollbar mt-6 size-full max-h-[calc(100vh-12rem)] overflow-y-auto'>
                <ul className='grid grid-cols-3 px-4'>
                    {
                        data.find((item) => item.id === id)?.items.map((item, index) =>
                            (
                                <li key={ `${ item }_all_texts_list_${ index }` } className='relative flex max-h-[calc(269px/3)] min-h-[calc(269px/3)] items-center justify-center align-middle'>
                                    <div className='relative flex size-full max-h-[calc(268px/3)] min-h-[calc(268px/3)] cursor-pointer justify-center align-middle'>
                                        <AnimationsItemComponent />
                                    </div>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </motion.div>
    );
};

export default AsideNavAnimationsListOptionComponent;
