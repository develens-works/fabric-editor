'use client';

import { useState } from 'react';

import { FaChevronRight } from 'react-icons/fa6';

const TimelineComponent = () =>
{
    const [timelineOpen, setTimelineOpen] = useState<boolean>(true);

    return (
        <div className={ `timeline ${ timelineOpen ? 'bottom-0' : '-bottom-60' }` }>
            <button className='absolute inset-x-0 -top-6 m-auto flex size-16 justify-center rounded-full bg-navy-75 align-middle dark:bg-navy-700' onClick={ () => setTimelineOpen(!timelineOpen) }>
                <i className={ `relative m-auto mt-3 flex text-navy-750 transition-all dark:text-white ${ timelineOpen ? 'rotate-90' : '-rotate-90' }` }>
                    <FaChevronRight size={ 9 }/>
                </i>
            </button>
        </div>
    );
};

export default TimelineComponent;
