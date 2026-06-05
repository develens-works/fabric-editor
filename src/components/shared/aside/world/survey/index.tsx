import React from 'react';

import { MdOutlineContentPasteSearch } from 'react-icons/md';

function AsideWorldSurveyComponent()
{
    return (
        <div className='nav-wrapper custom-scrollbar h-full overflow-x-hidden px-4 py-6'>
            <div>
                <h3 className='font-medium'>Survey again:</h3>
                <MdOutlineContentPasteSearch size={50} className='my-5 flex w-full items-center justify-center' />
            </div>
            <div>
                <h3 className='mb-4 font-medium'>Visible On:</h3>
                <div className='mb-5'>
                    <h4 className='my-4 font-medium'>Page</h4>
                    <ul className='ml-5 space-y-3'>
                        <li className='flex items-center justify-between'>
                            Home Page
                            <div className='flex'>
                                <span className='mr-2 inline-block cursor-pointer text-xs'>View - </span>
                                <span className='cursor-pointer text-xs'>Edit </span>
                            </div>
                        </li>
                        <li className='flex items-center justify-between'>
                            About Us
                            <div className='flex'>
                                <span className='mr-2 inline-block cursor-pointer text-xs'>View - </span>
                                <span className='cursor-pointer text-xs'>Edit </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className='mb-3 font-medium'>Post</h4>
                    <ul className='mb-4 ml-5'>
                        <li className='flex items-center justify-between'>
                            Street Article
                            <div className='flex'>
                                <span className='mr-2 inline-block cursor-pointer text-xs'>View - </span>
                                <span className='cursor-pointer text-xs'>Edit </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className=''>
                    <h4 className='mb-3 font-medium'>Shop</h4>
                    <ul className='ml-5'>
                        <li className='flex items-center justify-between'>
                            Traffic light modle 1
                            <div className='flex'>
                                <span className='mr-2 inline-block cursor-pointer text-xs'>View - </span>
                                <span className='cursor-pointer text-xs'>Edit </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AsideWorldSurveyComponent;
