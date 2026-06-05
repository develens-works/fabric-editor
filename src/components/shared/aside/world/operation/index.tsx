import React from 'react';

import { BsFolder2 } from 'react-icons/bs';

function AsideWorldOperationComponent()
{
    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <h3 className='font-medium'>Create - Delete - Rename -</h3>

            <div className='my-6'>
                <div className='flex items-center'>
                    <BsFolder2 size={38} />
                    <p className='ml-5 text-sm'>Cat 1 (11)</p>
                </div>
                <div className='mt-2'>
                    <div className='ml-8 flex items-center'>
                        <BsFolder2 size={38} />
                        <p className='ml-2 text-sm'>Cat 2 (3)</p>
                    </div>
                </div>
            </div>
            <div className='my-6'>
                <div className='flex items-center'>
                    <BsFolder2 size={38} />
                    <p className='ml-5 text-sm'>Cat 3 (5)</p>
                </div>
                <div className='mt-2'>
                    <div className='ml-8 flex items-center'>
                        <BsFolder2 size={38} />
                        <p className='ml-2 text-sm'>Cat 4 (6)</p>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='ml-8 flex items-center'>
                        <BsFolder2 size={38} />
                        <p className='ml-2 text-sm'>Cat 5 (9)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AsideWorldOperationComponent;
