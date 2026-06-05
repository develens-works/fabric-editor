'use client';

import React from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import InputComponent from '@/components/ui/input.component';

import data from '@/components/shared/aside/nav/data';

const AsideNavOptionComponent: React.FC = () =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper h-full overflow-hidden py-6'>
            <ul className='custom-scrollbar flex max-h-[calc(100vh-10.5rem)] flex-col gap-10 overflow-y-auto'>
                {
                    data.themes.map((imageSrc, index) =>
                        (
                            <li
                                key={ `themes_image_${ index }` }
                                className='relative flex h-full max-h-40 min-h-40 justify-center align-middle'
                            >
                                <Image
                                    fill
                                    alt={ `Theme Image ${ index + 1 }` }
                                    style={ { objectFit: 'contain' } }
                                    src={ `/assets/images/nav/themes/${ imageSrc }` }
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    unoptimized
                                />

                                <p className='absolute -bottom-7 mx-auto flex items-center justify-center text-center font-semibold'>
                                    { imageSrc }
                                </p>
                            </li>
                        ))
                }
            </ul>

            <div className='mx-auto mt-6 flex max-w-[calc(100%-2rem)] items-center justify-center'>
                <InputComponent
                    buttonContent='Add'
                    type='withButton'
                    placeholder='New theme name...'
                />
            </div>
        </motion.div>
    );
};

export default AsideNavOptionComponent;
