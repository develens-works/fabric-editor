'use client';

import React, { MutableRefObject } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { fabric } from 'fabric';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ShapeManager } from '@/libs/shape-manager.lib';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

interface ShapesSwiperJsProps
{
    id: string;
    title: string;
    items: string[];
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    shapeNumberCounterObjectRef: MutableRefObject<{
        triangle: number,
        circle: number,
        rectangle: number,
        square: number
    }>;
}

const ShapesSwiperJsComponent: React.FC<ShapesSwiperJsProps> = ({ id, title, items, canvasRef, shapeNumberCounterObjectRef }) =>
{
    const dispatch = useAppDispatch();

    const navigateToList = () =>
    {
        dispatch(setAsideOption(id));
        document.body.classList.add('is-sidebar-open');
    };

    return (
        <div className='mt-6 flex h-fit w-full flex-col gap-2'>
            <div className='flex justify-between gap-1 align-middle'>
                <p className='text-md font-semibold text-gray-900 dark:text-gray-50'>
                    { title }
                </p>
                <button
                    onClick={ navigateToList }
                    className='cursor-pointer text-sm font-semibold text-gray-700 transition-all hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100'
                >
                    See all
                </button>
            </div>

            <Swiper
                spaceBetween={ 8 }
                slidesPerView={ 4 }
                slidesPerGroup={ 3 }
                allowTouchMove={ false }
                navigation={{
                    nextEl: '.arrow-right',
                    prevEl: '.arrow-left'
                }}
                modules={ [Navigation] }
                className='relative size-full max-h-[calc(269px/4)] min-h-[calc(269px/4)]'
            >
                {
                    items.map((item) =>
                        (
                            <SwiperSlide key={ item + `_${ title.split(' ').join('_').toUpperCase() }` }>
                                <div
                                    className='relative flex size-full max-h-[calc(269px/4)] min-h-[calc(269px/4)] cursor-pointer justify-center align-middle'
                                    onClick={ () => ShapeManager.handleAddShape(item, canvasRef, shapeNumberCounterObjectRef) }
                                >
                                    <Image
                                        fill
                                        alt={item}
                                        src={ `/assets/images/shapes/${ item }` }
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        unoptimized
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                }

                <SwiperSlide className='flex size-full max-h-[calc(268px/4)] min-h-[calc(268px/4)] items-center justify-center align-middle'>
                    <button
                        onClick={ navigateToList }
                        className='m-auto flex size-11 cursor-pointer items-center justify-center rounded-full border border-gray-400 align-middle text-gray-900 transition-all hover:border-gray-600 dark:border-gray-400 dark:text-gray-50 dark:hover:border-gray-300'
                    >
                        <FaArrowRight size={ 18 }/>
                    </button>
                </SwiperSlide>

                <button
                    className='arrow-left absolute left-0 top-0 z-50 h-full w-6 min-w-6 cursor-pointer bg-gradient-to-r from-navy-50 text-gray-800 transition-all hover:text-gray-900 disabled:opacity-0 dark:from-navy-750 dark:text-gray-100 dark:hover:text-gray-50'>
                    <i className='m-auto -ml-0.5 flex h-full w-fit items-center justify-center align-middle'>
                        <FaChevronLeft/>
                    </i>
                </button>

                <button
                    className='arrow-right absolute right-0 top-0 z-50 h-full w-6 min-w-6 cursor-pointer bg-gradient-to-l from-navy-50 text-gray-800 transition-all hover:text-gray-900 disabled:opacity-0 dark:from-navy-750 dark:text-gray-100 dark:hover:text-gray-50'>
                    <i className='m-auto -mr-0.5 flex h-full w-fit items-center justify-center align-middle'>
                        <FaChevronRight/>
                    </i>
                </button>
            </Swiper>
        </div>
    );
};

export default ShapesSwiperJsComponent;
