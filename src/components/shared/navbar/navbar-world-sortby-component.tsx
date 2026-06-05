import React, { useState } from 'react';

import NavbarItemComponent from '@/components/shared/navbar/navbar-item.component';

import { TiArrowUnsorted } from 'react-icons/ti';

const NavbarLayoutComponent: React.FC = () =>
{
    const [selectedItem, setSelectedItem] = useState<string>('');

    const handleOptionClick = (value: string) =>
    {
        setSelectedItem(value);
    };

    return (
        <NavbarItemComponent
            arrow
            label='Sort By'
            icon={ <TiArrowUnsorted size={ 27 } /> }
            dropdown={
                <ul className='flex w-52 flex-col gap-1.5 py-1'>
                    <li
                        onClick={() => handleOptionClick('ruler')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItem === 'ruler' ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Type</span>
                        </p>
                    </li>
                    <li
                        onClick={() => handleOptionClick('land')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItem === 'land' ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Favorite</span>
                        </p>
                    </li>
                    <li
                        onClick={() => handleOptionClick('carousel')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItem === 'carousel' ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Name</span>
                        </p>
                    </li>
                    <li
                        onClick={() => handleOptionClick('stand')}
                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 px-3 transition-all hover:bg-slate-200 dark:hover:bg-slate-800 ${ selectedItem === 'stand' ? 'bg-slate-300 dark:bg-slate-800' : '' }`}
                    >
                        <p className='flex justify-start gap-2'>
                            <span>Last Edited</span>
                        </p>
                    </li>
                </ul>
            }
        />
    );
};

export default NavbarLayoutComponent;
