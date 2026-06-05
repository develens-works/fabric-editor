import React, { useState } from 'react';

import NavbarItemComponent from '@/components/shared/navbar/navbar-item.component';

import { LuLayoutTemplate } from 'react-icons/lu';

const NavbarLayoutComponent: React.FC = () =>
{
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleOptionClick = (value: string) =>
    {
        if (selectedItems.includes(value))
            setSelectedItems(selectedItems.filter(item => item !== value));
        else
            setSelectedItems([...selectedItems, value]);
    };

    return (
        <NavbarItemComponent
            arrow
            label='Layout'
            icon={<LuLayoutTemplate size={27} />}

            dropdown={
                <ul className='flex w-52 flex-col gap-1.5 py-1'>
                    <li
                        onClick={() => handleOptionClick('ruler')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItems.includes('ruler') ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Type</span>
                        </p>
                    </li>
                    <li
                        onClick={() => handleOptionClick('land')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItems.includes('land') ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Land</span>
                        </p>
                    </li>
                    <li
                        onClick={() => handleOptionClick('carousel')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItems.includes('carousel') ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Carousel</span>
                        </p>
                    </li>
                    <li
                        onClick={() => handleOptionClick('stand')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItems.includes('stand') ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Stand</span>
                        </p>
                    </li>
                </ul>
            }
        />
    );
};

export default NavbarLayoutComponent;
