import React from 'react';

interface NavbarIcon
{
    className?: string;
}

const NavbarToolBrComponent: React.FC<NavbarIcon> = ({ className }) =>
{
    return <i className={ 'relative mx-3 my-auto flex h-8 w-[1px] min-w-[1px] bg-slate-300 opacity-70 dark:bg-navy-800 ' + className }/>;
};

export default NavbarToolBrComponent;
