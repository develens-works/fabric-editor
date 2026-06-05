'use client';

import React, { useState } from 'react';

interface SideSelectorProps
{
    label: string
}

const SideSelectorComponent: React.FC<SideSelectorProps> = ({ label }) =>
{
    const [activeSide, setActiveSide] = useState<number>(5);

    return (
        <div>
            <p>
                { label }
            </p>

            <ul className='mt-2 grid h-18 w-full grid-cols-3 grid-rows-2 gap-2'>
                <li onClick={ () => setActiveSide(0) } className={ `cursor-pointer rounded-tl ${ activeSide === 0 ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-300 dark:bg-gray-800' }` }/>
                <li onClick={ () => setActiveSide(1) } className={ `cursor-pointer ${ activeSide === 1 ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-300 dark:bg-gray-800' }` }/>
                <li onClick={ () => setActiveSide(2) } className={ `cursor-pointer rounded-tr ${ activeSide === 2 ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-300 dark:bg-gray-800' }` }/>

                <li onClick={ () => setActiveSide(3) } className={ `cursor-pointer rounded-bl ${ activeSide === 3 ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-300 dark:bg-gray-800' }` }/>
                <li onClick={ () => setActiveSide(4) } className={ `cursor-pointer ${ activeSide === 4 ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-300 dark:bg-gray-800' }` }/>
                <li onClick={ () => setActiveSide(5) } className={ `cursor-pointer rounded-br ${ activeSide === 5 ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-300 dark:bg-gray-800' }` }/>
            </ul>
        </div>
    );
};

export default SideSelectorComponent;
