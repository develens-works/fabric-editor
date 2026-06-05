import React, { useState } from 'react';

import { LuFrame } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa6';
import { TbArrowGuide } from 'react-icons/tb';
import { RxRulerSquare } from 'react-icons/rx';
import { MdOutlineGrid4X4 } from 'react-icons/md';

import NavbarItemComponent from '@/components/shared/navbar/navbar-item.component';

const NavbarFrameComponent: React.FC = () =>
{
    const [activeFrames, setActiveFrames] = useState<string[]>(['ruler']);

    const handleOptionClick = (value: string) =>
    {
        const index = activeFrames.indexOf(value);

        if (index !== -1)
            setActiveFrames(activeFrames.filter((item: string) => item !== value));
        else
            setActiveFrames([...activeFrames, value]);
    };

    return (
        <NavbarItemComponent
            arrow
            label='Frame Options'
            icon={ <LuFrame size={ 21 }/> }
            dropdown={
                <ul className='flex w-52 flex-col gap-1.5 py-1'>
                    <li onClick={() => handleOptionClick('ruler')} className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeFrames.includes('ruler') ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                        <p className='flex items-center justify-start gap-2'>
                            <i className='w-6'>
                                {
                                    activeFrames.includes('ruler')
                                    &&
                                    <FaCheck/>
                                }
                            </i>
                            <i>
                                <RxRulerSquare size={ 20 }/>
                            </i>
                            <span>
                                Ruler
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                    <li onClick={() => handleOptionClick('grid-line')} className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeFrames.includes('grid-line') ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                        <p className='flex items-center justify-start gap-2'>
                            <i className='w-6'>
                                {
                                    activeFrames.includes('grid-line')
                                    &&
                                    <FaCheck/>
                                }
                            </i>
                            <i>
                                <MdOutlineGrid4X4 size={ 20 }/>
                            </i>
                            <span>
                                Grid line
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                    <li onClick={() => handleOptionClick('guide-line')} className={ 'flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all ' + (activeFrames.includes('guide-line') ? 'bg-slate-200 dark:bg-slate-800' : 'hover:bg-slate-100 dark:hover:bg-slate-700') }>
                        <p className='flex items-center justify-start gap-2'>
                            <i className='w-6'>
                                {
                                    activeFrames.includes('guide-line')
                                    &&
                                    <FaCheck/>
                                }
                            </i>
                            <i>
                                <TbArrowGuide size={ 20 }/>
                            </i>
                            <span>
                                Guide line
                            </span>
                        </p>

                        <span className='opacity-80'>
                            Ctrl + S
                        </span>
                    </li>
                </ul>
            }
        />
    );
};

export default NavbarFrameComponent;
