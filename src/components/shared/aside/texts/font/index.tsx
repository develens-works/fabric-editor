import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { fabric } from 'fabric';

import { TextManager } from '@/libs/text-manager.lib';

import InputComponent from '@/components/ui/input.component';

interface Font {
    family: string;
}

interface AsideTextTextOptionProps {
    canvasRef: React.MutableRefObject<fabric.Canvas | null>;
}

const AsideTextsFontOptionComponent = ({ canvasRef }: AsideTextTextOptionProps) =>
{
    const [fonts, setFonts] = useState<Font[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [visibleFonts, setVisibleFonts] = useState<number>(20);
    const loadMoreRef = useRef<HTMLLIElement | null>(null);

    useEffect(() =>
    {
        const fetchFonts = async() =>
        {
            const response = await axios.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCq0ZMFc86QQi4q4LZi8VH6E68c247tM_w');
            setFonts(response.data.items);
        };

        fetchFonts();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setSearchQuery(event.target.value);
        setVisibleFonts(20);
    };

    useEffect(() =>
    {
        const observer = new IntersectionObserver(
            (entries) =>
            {
                if (entries[0].isIntersecting)

                    loadMoreFonts();
            },
            { threshold: 1.0 }
        );

        const currentLoadMoreRef = loadMoreRef.current;
        if (currentLoadMoreRef) observer.observe(currentLoadMoreRef);

        return () =>
        {
            if (currentLoadMoreRef) observer.unobserve(currentLoadMoreRef);
        };
    }, [visibleFonts]);

    const loadMoreFonts = () =>
    {
        setVisibleFonts((prevVisibleFonts) => prevVisibleFonts + 20);
    };

    const loadFont = (fontName: string) =>
    {
        if (!document.querySelector(`link[href*="${ fontName.replace(/\s+/g, '+') }"]`))
        {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css?family=${ fontName.replace(/\s+/g, '+') }:400,700`;
            link.rel = 'stylesheet';

            document.head.appendChild(link);
        }
    };

    const filteredFonts = fonts.filter((font) => font.family.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, visibleFonts);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='nav-wrapper h-full overflow-hidden py-6'>
            <div className='mx-auto flex w-[calc(100%-2rem)]'>
                <InputComponent
                    type='search'
                    placeholder='Search fonts...'
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className='custom-scrollbar mt-6 size-full max-h-[calc(100vh-11rem)] overflow-y-auto'>
                <ul className='space-y-2 font-inter font-medium'>
                    {filteredFonts.map((font, index) =>
                    {
                        loadFont(font.family);

                        return (
                            <li key={index} className='px-4' onClick={() => TextManager.handleFontFamilyChange(canvasRef, font.family)}>
                                <div className='flex cursor-pointer flex-col rounded-lg bg-slate-150 bg-gradient-to-r from-primary to-primary-focus px-4 py-2.5 tracking-wide text-white outline-none transition-all'>
                                    <p className='text-lg' style={{ fontFamily: font.family }}>
                                        Example Text Content
                                    </p>
                                    <span className='mt-1.5 font-light'>
                                        {font.family}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                    <li ref={loadMoreRef} className="text-center">Loading more...</li>
                </ul>
            </div>
        </motion.div>
    );
};

export default AsideTextsFontOptionComponent;
