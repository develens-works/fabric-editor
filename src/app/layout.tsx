import { ReactNode, useRef, createContext } from 'react';

import type { Metadata } from 'next';

import { Providers } from '@/app/providers';

import '@/styles/globals.css';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import 'react-range-slider-input/dist/style.css';

import AppPreloaderComponent from '@/components/ui/app-preloader.component';
import TimelineComponent from '@/components/shared/main/timeline.component';

export const metadata: Metadata =
{
    title: 'MotionAll',
    description: 'MotionAll next app directory base'
};

// export const RefContext = createContext(null);

// // Custom hook to access the context
// // export const useRefContext = () => useContext(RefContext);

// const RefProvider = ({ children }: { children: ReactNode }) =>
// {
//     const ref1 = useRef(null);
//     const ref2 = useRef(null);
//     const ref3 = useRef(null);

//     return (
//         <RefContext.Provider value={{ ref1, ref2, ref3 }}>
//             {children}
//         </RefContext.Provider>
//     );
// };

export default function RootLayout({ children }: { children: ReactNode })
{
    return (
        <html lang='en' dir='ltr'>
            <body className={ 'flex' }>
                <Providers>
                    <AppPreloaderComponent />

                    <main className={ 'main-content flex w-full flex-1 flex-col bg-gray-200 dark:bg-navy-900' }>
                        {children}
                        <TimelineComponent />
                    </main>
                </Providers>
            </body>
        </html>
    );
}
