'use client';

import { MutableRefObject, ReactNode, createContext, useRef } from 'react';

const obj:
{
    italicBtn: MutableRefObject<HTMLButtonElement | null> | null,
    underlineBtn: MutableRefObject<HTMLButtonElement | null> | null,
    strikeThroughBtn: MutableRefObject<HTMLButtonElement | null> | null,
    boldInput: MutableRefObject<HTMLInputElement | null> | null,
    fontSizeInput: MutableRefObject<HTMLInputElement | null> | null,
    boldInputRange: MutableRefObject<HTMLInputElement | null> | null,
    letterSpaceInputRange: MutableRefObject<HTMLInputElement | null> | null,
    lineSpaceInputRange: MutableRefObject<HTMLInputElement | null> | null,
    boldInputText: MutableRefObject<HTMLInputElement | null> | null,
    letterSpaceInputText: MutableRefObject<HTMLInputElement | null> | null,
    lineSpaceInputText: MutableRefObject<HTMLInputElement | null> | null,
    rangeOffsetXRef: MutableRefObject<HTMLInputElement | null> | null,
    inputOffsetXRef: MutableRefObject<HTMLInputElement | null> | null,
    rangeOffsetYRef: MutableRefObject<HTMLInputElement | null> | null,
    inputOffsetYRef: MutableRefObject<HTMLInputElement | null> | null,
    rangeBlurRef: MutableRefObject<HTMLInputElement | null> | null,
    inputBlurRef: MutableRefObject<HTMLInputElement | null> | null,
    shadowColorBtn: MutableRefObject<HTMLButtonElement | null> | null,
    strokeColorBtn: MutableRefObject<HTMLButtonElement | null> | null,
    rangeStrokeWidthRef: MutableRefObject<HTMLInputElement | null> | null,
    inputStrokeWidthRef: MutableRefObject<HTMLInputElement | null> | null,
    customColorBtn: MutableRefObject<HTMLButtonElement | null> | null
} =
{
    italicBtn: null,
    underlineBtn: null,
    strikeThroughBtn: null,
    boldInput: null,
    fontSizeInput: null,
    boldInputRange: null,
    letterSpaceInputRange: null,
    lineSpaceInputRange: null,
    boldInputText: null,
    letterSpaceInputText: null,
    lineSpaceInputText: null,
    rangeOffsetXRef: null,
    inputOffsetXRef: null,
    rangeOffsetYRef: null,
    inputOffsetYRef: null,
    rangeBlurRef: null,
    inputBlurRef: null,
    shadowColorBtn: null,
    strokeColorBtn: null,
    rangeStrokeWidthRef: null,
    inputStrokeWidthRef: null,
    customColorBtn: null
};

export const RefContext = createContext(obj);

export const RefProvider = ({ children }: { children: ReactNode }) =>
{
    const italicBtn: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);
    const underlineBtn: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);
    const strikeThroughBtn: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);
    const boldInput: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const fontSizeInput: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const boldInputRange: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const letterSpaceInputRange: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const lineSpaceInputRange: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const boldInputText: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const letterSpaceInputText: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const lineSpaceInputText: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const rangeOffsetXRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const inputOffsetXRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const rangeOffsetYRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const inputOffsetYRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const rangeBlurRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const inputBlurRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const rangeStrokeWidthRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const inputStrokeWidthRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const shadowColorBtn: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);
    const strokeColorBtn: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);
    const customColorBtn: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);

    return (
        <RefContext.Provider value={{
            italicBtn,
            underlineBtn,
            strikeThroughBtn,
            boldInput,
            fontSizeInput,
            boldInputRange,
            letterSpaceInputRange,
            lineSpaceInputRange,
            boldInputText,
            letterSpaceInputText,
            lineSpaceInputText,
            rangeOffsetXRef,
            inputOffsetXRef,
            rangeOffsetYRef,
            inputOffsetYRef,
            rangeBlurRef,
            inputBlurRef,
            shadowColorBtn,
            strokeColorBtn,
            rangeStrokeWidthRef,
            inputStrokeWidthRef,
            customColorBtn
        }}>
            { children }
        </RefContext.Provider>
    );
};
