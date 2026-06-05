'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { RefProvider } from './context';

import { store } from '@/redux/app/store';

export function Providers({ children }: { children: ReactNode })
{
    return (
        <Provider store={ store }>
            <RefProvider>
                { children }
            </RefProvider>
        </Provider>
    );
}
