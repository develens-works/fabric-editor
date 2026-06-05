'use client';

import React, { useState } from 'react';

import Tippy from '@tippyjs/react';
import { Placement, roundArrow } from 'tippy.js';

import CustomTooltip from '@/components/ui/custom-tooltip.component';

import { FaChevronDown } from 'react-icons/fa6';

interface NavbarItemProps
{
    type?: 'primary' | 'image';
    label: string;
    content?: string;
    arrow?: boolean;
    src?: string;
    onClick?(): void;
    className?: string;
    dropdownPlacement?: Placement;
    icon?: React.ReactElement;
    dropdown?: React.ReactElement;
}

const NavbarItemComponent: React.FC<NavbarItemProps> = ({ dropdown, arrow = false, dropdownPlacement, onClick, icon, content, label }) =>
{
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [isBackgroundHighlighted, setBackgroundHighlighted] = useState<boolean>(false);

    return (
        <CustomTooltip placement='bottom' content={label}>
            <Tippy
                disabled={!dropdown}
                allowHTML
                interactive
                trigger='click'
                appendTo='parent'
                arrow={roundArrow}
                placement={dropdownPlacement}
                animation={'shift-away'}
                className='bg-gray-50'
                content={<div className='flex size-fit gap-1 overflow-hidden rounded'>{dropdown}</div>}
            >
                <button
                    onClick={() =>
                    {
                        if (onClick) onClick();

                        setOpenDropdown(!openDropdown);
                        setBackgroundHighlighted(!isBackgroundHighlighted);
                    }}
                    className={`${ isBackgroundHighlighted ? 'bg-navy-200/50' : '' } flex min-h-9 min-w-9 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-navy-200/50 dark:hover:bg-navy-300/20
                      ${ arrow && 'px-2 '
        }`}
                >
                    {icon}
                    {arrow && (
                        <i className={`ml-1.5 transition-all ${ openDropdown && '-rotate-90' }`}>
                            <FaChevronDown size={10} />
                        </i>
                    )}
                    {content && <span>{content}</span>}
                </button>
            </Tippy>
        </CustomTooltip>
    );
};

export default NavbarItemComponent;
