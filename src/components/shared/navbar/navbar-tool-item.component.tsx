'use client';

import React, { MutableRefObject, Ref, useState } from 'react';
import Image from 'next/image';

import Tippy from '@tippyjs/react';
import { Placement, roundArrow } from 'tippy.js';

import CustomTooltip from '@/components/ui/custom-tooltip.component';

interface NavbarToolItemProps
{
    type?: 'primary' | 'image';
    label: string;
    content?: string;
    src?: string;
    onClick?(): void;
    className?: string;
    dropdownPlacement?: Placement;
    icon?: React.ReactElement;
    dropdown?: React.ReactElement;
    id?: string | undefined;
    elementRef?: Ref<HTMLButtonElement>
}

const NavbarToolItemComponent: React.FC<NavbarToolItemProps> = ({ dropdownPlacement = 'bottom', dropdown, icon, className, label, type, content, onClick, src, id, elementRef }) =>
{
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    // console.log(elementRef);

    return (
        <CustomTooltip disabled={openDropdown} placement="bottom" content={label}>
            <Tippy
                disabled={!dropdown}
                allowHTML
                interactive
                trigger="click"
                appendTo="parent"
                arrow={roundArrow}
                placement={dropdownPlacement}
                animation={'shift-away'}
                className="bg-gray-50"
                content={<div className="flex size-fit gap-1 overflow-hidden rounded">{dropdown}</div>}
            >
                <button
                    id={ id }
                    ref={ elementRef }
                    onClick={() =>
                    {
                        if (onClick) onClick();

                        setOpenDropdown(!openDropdown);
                    }}
                    className={
                        (type === 'primary'
                            ? 'tooltip-main-sidebar text-sm+ relative align-middle my-auto flex h-8 w-fit whitespace-nowrap cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-navy-200/40 px-3 outline-none transition-colors duration-200 hover:bg-navy-200/50 dark:bg-navy-300/20 dark:hover:bg-navy-300/30'
                            : '') +
                        (type === 'image'
                            ? 'tooltip-main-sidebar relative my-auto flex size-[1.825rem] min-w-[1.825rem] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/20 outline-none transition-colors duration-200 hover:bg-primary/30 dark:bg-navy-300/20 dark:hover:bg-navy-300/30'
                            : '') +
                        (!type
                            ? 'tooltip-main-sidebar relative my-auto min-w-8  flex size-8 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-navy-200/50 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25'
                            : '') +
                        ` ${ className }`
                    }
                >
                    {type === 'image' && src
                        ? (
                            <Image fill src={src} alt={label} style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" unoptimized />
                        )
                        : (
                            <div className="flex flex-row-reverse items-center">
                                {icon}
                                {content && <span className="mr-1 inline-block">{content}</span>}
                            </div>
                        )}
                </button>
            </Tippy>
        </CustomTooltip>
    );
};

export default NavbarToolItemComponent;
