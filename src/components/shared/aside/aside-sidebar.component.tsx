'use client';

import React from 'react';

import { MenuAside } from '@/constants/aside.constant';

import AsideLinkComponent from '@/components/shared/aside/aside-link.component';
import AsideThemeComponent from '@/components/shared/aside/aside-theme.component';
import AsideProfileComponent from '@/components/shared/aside/aside-profile.component';
import AsideNotificationComponent from '@/components/shared/aside/aside-notification.component';

const AsideSidebarComponent = () =>
{
    return (
        <div className='main-sidebar'>
            <div className='flex size-full flex-col items-center bg-navy-50 pt-[3.5rem] dark:bg-navy-750'>
                <div className='is-scrollbar-hidden flex w-full grow flex-col overflow-y-auto'>
                    {
                        MenuAside.map((menuAside) =>
                            (
                                <AsideLinkComponent
                                    link={ menuAside.link }
                                    icon={ menuAside.icon }
                                    label={ menuAside.label }
                                    key={ `aside_link_component_${ menuAside.value }` }
                                />
                            ))
                    }
                </div>

                <div className='flex flex-col items-center space-y-3 py-3'>
                    <AsideThemeComponent />

                    <AsideNotificationComponent />

                    <AsideProfileComponent />
                </div>
            </div>
        </div>
    );
};

export default AsideSidebarComponent;
