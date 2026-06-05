'use client';

import React, { MutableRefObject, useRef, useEffect, useContext } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import { TextManager } from '@/libs/text-manager.lib';

import { RefContext } from '@/app/context';

import CounterComponent from '@/components/ui/counter.component';
import RangeInputComponent from '@/components/ui/range-input.component';
import NavbarToolBrComponent from '@/components/shared/navbar/navbar-tool-br.component';
import NavbarToolItemComponent from '@/components/shared/navbar/navbar-tool-item.component';
import NavbarToolTransformComponent from '@/components/shared/navbar/texts/navbar-transform-text.component';

import {
    FaAlignCenter,
    FaAlignJustify,
    FaAlignLeft,
    FaAlignRight,
    FaBold,
    FaCode,
    FaEllipsisVertical, FaFont,
    FaItalic,
    FaLink,
    FaList,
    FaPersonSkiing,
    FaStrikethrough, FaUnderline,
    FaWordpressSimple
} from 'react-icons/fa6';
import { RiLineHeight } from 'react-icons/ri';

import { ObjectManager } from '@/libs/object-manager.lib';

interface NavbarToolTextProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    navbarDeviceComponentInputsRef: MutableRefObject<{
        width: HTMLInputElement | null,
        height: HTMLInputElement | null,
        x: HTMLInputElement | null,
        y: HTMLInputElement | null,
        label: HTMLInputElement | null,
        zoom: HTMLInputElement | null,
        fontSize: HTMLInputElement | null}>
}

export interface textStyleMoodRef
{
    boldMood: boolean,
    italicMood: boolean,
    upperMood: boolean,
    lowerMood: boolean,
    underlineMood: boolean,
    strikeThroughMood: boolean,
    boldRangeMood: boolean
}

const NavbarToolTextsComponent = ({ canvasRef }: NavbarToolTextProps) =>
{
    const dispatch = useAppDispatch();

    const {
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
        customColorBtn
    } = useContext(RefContext);

    const textStyleMoodRef: MutableRefObject<textStyleMoodRef> = useRef
    ({
        boldMood: false,
        italicMood: false,
        upperMood: false,
        lowerMood: false,
        underlineMood: false,
        strikeThroughMood: false,
        boldRangeMood: false
    });

    // Use the useEffect hook to add event listeners to the canvas when the component mounts
    useEffect(() =>
    {
        // Check if the canvas reference is an instance of fabric.Canvas
        if (canvasRef.current instanceof fabric.Canvas)
        {
            const canvas: fabric.Canvas = canvasRef.current;

            // Add event listener for text selection change
            canvas.on('text:selection:changed', (opt: fabric.IEvent<Event>) =>
            {
                // Check if all required references are available
                if (!italicBtn?.current ||
                    !underlineBtn?.current ||
                    !strikeThroughBtn?.current ||
                    !boldInput?.current ||
                    !fontSizeInput?.current ||
                    !boldInputRange?.current ||
                    !boldInputText?.current ||
                    !letterSpaceInputRange?.current ||
                    !lineSpaceInputRange?.current ||
                    !letterSpaceInputText?.current ||
                    !lineSpaceInputText?.current) return;

                const textBox = opt.target as fabric.Textbox;

                // Select text styles and update the mood states
                ObjectManager.selectText(textStyleMoodRef, 'boldMood', textBox, 'fontWeight', 'bold', boldInput.current);
                ObjectManager.selectText(textStyleMoodRef, 'italicMood', textBox, 'fontStyle', 'italic', italicBtn?.current);
                ObjectManager.selectText(textStyleMoodRef, 'underlineMood', textBox, 'underline', 'true', underlineBtn.current);
                ObjectManager.selectText(textStyleMoodRef, 'strikeThroughMood', textBox, 'linethrough', 'true', strikeThroughBtn.current);
                ObjectManager.selectTextFont(textBox, fontSizeInput.current);
                ObjectManager.selectTextBoldForBoldRange(textBox, boldInputRange.current, boldInputText.current);
                ObjectManager.lineAndLetterSpacingGetter(textBox, letterSpaceInputRange.current, letterSpaceInputText.current, 'charSpacing');
                ObjectManager.lineAndLetterSpacingGetter(textBox, lineSpaceInputRange.current, lineSpaceInputText.current, 'lineHeight');
            });

            // Add event listener for selection cleared
            canvas.on('selection:cleared', () =>
            {
                // Check if all required references are available
                if (!italicBtn?.current ||
                    !underlineBtn?.current ||
                    !strikeThroughBtn?.current ||
                    !boldInput?.current ||
                    !fontSizeInput?.current ||
                    !boldInputRange?.current ||
                    !boldInputText?.current ||
                    !letterSpaceInputRange?.current ||
                    !lineSpaceInputRange?.current ||
                    !letterSpaceInputText?.current ||
                    !lineSpaceInputText?.current) return;

                // Reset styles and inputs to default values
                italicBtn.current.style.backgroundColor = '#e5e7eb';
                underlineBtn.current.style.backgroundColor = '#e5e7eb';
                strikeThroughBtn.current.style.backgroundColor = '#e5e7eb';
                fontSizeInput.current.value = '0';
                boldInput.current.checked = false;
                letterSpaceInputRange.current.value = '0';
                letterSpaceInputText.current.value = '0';
                lineSpaceInputRange.current.value = '1';
                lineSpaceInputText.current.value = '1';
            });

            // Add event listener for selection updated
            canvas.on('selection:updated', () =>
            {
                // Check if all required references are available
                if (!italicBtn?.current ||
                    !underlineBtn?.current ||
                    !strikeThroughBtn?.current ||
                    !boldInput?.current ||
                    !fontSizeInput?.current ||
                    !boldInputRange?.current ||
                    !boldInputText?.current ||
                    !letterSpaceInputRange?.current ||
                    !lineSpaceInputRange?.current ||
                    !letterSpaceInputText?.current ||
                    !lineSpaceInputText?.current) return;

                const activeObject = canvas.getActiveObject();

                if (activeObject instanceof fabric.Text)
                {
                    const textBox = activeObject as fabric.Textbox;
                    // Select text styles and update the mood states
                    ObjectManager.selectText(textStyleMoodRef, 'boldMood', textBox, 'fontWeight', 'bold', boldInput.current);
                    ObjectManager.selectText(textStyleMoodRef, 'italicMood', textBox, 'fontStyle', 'italic', italicBtn?.current);
                    ObjectManager.selectText(textStyleMoodRef, 'underlineMood', textBox, 'underline', 'true', underlineBtn.current);
                    ObjectManager.selectText(textStyleMoodRef, 'strikeThroughMood', textBox, 'linethrough', 'true', strikeThroughBtn.current);
                    ObjectManager.selectTextFont(textBox, fontSizeInput.current);
                    ObjectManager.selectTextBoldForBoldRange(textBox, boldInputRange.current, boldInputText.current);
                    ObjectManager.lineAndLetterSpacingGetter(textBox, letterSpaceInputRange.current, letterSpaceInputText.current, 'charSpacing');
                    ObjectManager.lineAndLetterSpacingGetter(textBox, lineSpaceInputRange.current, lineSpaceInputText.current, 'lineHeight');
                }
            });

            // Add event listener for selection created
            canvas.on('selection:created', () =>
            {
                // Check if all required references are available
                if (!italicBtn?.current ||
                    !underlineBtn?.current ||
                    !strikeThroughBtn?.current ||
                    !boldInput?.current ||
                    !fontSizeInput?.current ||
                    !boldInputRange?.current ||
                    !boldInputText?.current ||
                    !letterSpaceInputRange?.current ||
                    !lineSpaceInputRange?.current ||
                    !letterSpaceInputText?.current ||
                    !lineSpaceInputText?.current) return;

                const activeObject = canvas.getActiveObject();

                if (activeObject instanceof fabric.Text)
                {
                    const textBox = activeObject as fabric.Textbox;
                    // Select text styles and update the mood states
                    ObjectManager.selectText(textStyleMoodRef, 'boldMood', textBox, 'fontWeight', 'bold', boldInput.current);
                    ObjectManager.selectText(textStyleMoodRef, 'italicMood', textBox, 'fontStyle', 'italic', italicBtn?.current);
                    ObjectManager.selectText(textStyleMoodRef, 'underlineMood', textBox, 'underline', 'true', underlineBtn.current);
                    ObjectManager.selectText(textStyleMoodRef, 'strikeThroughMood', textBox, 'linethrough', 'true', strikeThroughBtn.current);
                    ObjectManager.selectTextFont(textBox, fontSizeInput.current);
                    ObjectManager.selectTextBoldForBoldRange(textBox, boldInputRange.current, boldInputText.current);
                    ObjectManager.lineAndLetterSpacingGetter(textBox, letterSpaceInputRange.current, letterSpaceInputText.current, 'charSpacing');
                    ObjectManager.lineAndLetterSpacingGetter(textBox, lineSpaceInputRange.current, lineSpaceInputText.current, 'lineHeight');
                }
            });
        }
    }, [canvasRef.current]);

    return (
        <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            className=' m-auto mr-0 flex size-fit w-full flex-row-reverse justify-items-end gap-1.5 justify-self-end text-base tracking-wider text-slate-800 dark:text-navy-100'
        >
            <NavbarToolItemComponent
                label='FaEllipsisVertical'
                icon={ <FaEllipsisVertical size={ 16 }/> }
            />
            <NavbarToolItemComponent
                label='FaCode'
                icon={ <FaCode size={ 16 }/> }
            />
            <NavbarToolItemComponent
                label='FaLink'
                icon={ <FaLink size={ 16 }/> }
            />
            <NavbarToolItemComponent
                label='FaPersonSkiing'
                icon={ <FaPersonSkiing size={ 16 }/> }
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                label='FaWordpressSimple'
                icon={ <FaWordpressSimple size={ 16 }/> }
            />
            <NavbarToolItemComponent
                label='FaList'
                icon={ <FaList size={ 16 }/> }
            />
            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('TEXTS_ANIMATIONS'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='FaPersonSkiing'
                content='Anime'
                icon={ <FaPersonSkiing size={ 16 }/> }
            />
            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('TEXTS_EFFECTS'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='Font Effects'
                content='Effects'
            />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                label='Spacing'
                icon={ <RiLineHeight size={ 20 }/> }
                dropdown={
                    <div className='flex h-fit w-full flex-col px-1 py-2'>
                        <RangeInputComponent
                            className='mb-2 gap-0 py-0'
                            label='Letter spacing'
                            step={ 1 }
                            min={ 0 }
                            max={ 100 }
                            defaultValue={ 0 }
                            elementRefOfRangeInput= { letterSpaceInputRange }
                            elementRefOfTextInput={ letterSpaceInputText }
                            setValue={ (value: number) => TextManager.handleLetterSpacingChange(canvasRef, value) }
                        />
                        <RangeInputComponent
                            className='mb-2 gap-0 py-0'
                            label='Line spacing'
                            step={ 1 }
                            min={ 1 }
                            max={ 100 }
                            defaultValue={ 1 }
                            elementRefOfRangeInput={ lineSpaceInputRange }
                            elementRefOfTextInput={ lineSpaceInputText }
                            setValue={ (value: number) => TextManager.handleLineSpacingChange(canvasRef, value) }
                        />
                    </div>
                }
            />

            <NavbarToolItemComponent
                label='Aligment'
                icon={ <FaAlignLeft size={ 18 }/> }
                dropdown={
                    <div className="flex flex-col gap-2 px-1 py-2">
                        <div className="flex h-fit w-full gap-2">
                            <NavbarToolItemComponent
                                label="FaAlignLeft"
                                icon={ <FaAlignLeft size={ 18 }/> }
                                onClick={ () => TextManager.handleTextAlign(canvasRef, 'left') }
                            />
                            <NavbarToolItemComponent
                                label="FaAlignCenter"
                                icon={ <FaAlignCenter size={ 18 }/> }
                                onClick={ () => TextManager.handleTextAlign(canvasRef, 'center') }
                            />
                            <NavbarToolItemComponent
                                label="FaAlignRight"
                                icon={ <FaAlignRight size={ 18 }/> }
                                onClick={ () => TextManager.handleTextAlign(canvasRef, 'right') }
                            />
                            <NavbarToolItemComponent
                                label="FaAlignJustify"
                                icon={ <FaAlignJustify size={ 18 }/> }
                                onClick={ () => TextManager.handleTextAlign(canvasRef, 'justify') }
                            />
                        </div>
                    </div>
                }
            />

            <NavbarToolItemComponent
                label="Strike through"
                icon={ <FaStrikethrough size={ 18 }/> }
                onClick={ () =>
                {
                    if (strikeThroughBtn?.current)
                        TextManager.handleToggleStyle(canvasRef, 'linethrough', textStyleMoodRef, strikeThroughBtn.current);
                }
                }
                elementRef={ strikeThroughBtn }
            />

            <NavbarToolItemComponent
                label="Underline"
                icon={ <FaUnderline size={ 18 }/> }
                onClick={ () =>
                {
                    if (underlineBtn?.current)
                        TextManager.handleToggleStyle(canvasRef, 'underline', textStyleMoodRef, underlineBtn.current);
                }
                }
                elementRef={ underlineBtn }

            />

            <NavbarToolTransformComponent canvasRef={ canvasRef } />

            <NavbarToolItemComponent
                label="Italic"
                icon={ <FaItalic size={ 18 }/> }
                onClick={ () =>
                {
                    if (italicBtn?.current)
                        TextManager.handleToggleStyle(canvasRef, 'italic', textStyleMoodRef, italicBtn.current);
                }
                }
                elementRef={ italicBtn }
            />

            <NavbarToolItemComponent
                label='Font Weight'
                icon={ <FaBold size={ 18 }/> }
                dropdown={
                    <div className="flex h-fit w-full flex-col px-1 py-2">
                        <RangeInputComponent
                            className="mb-2 gap-0 py-0"
                            label="Font Weight"
                            min={ 100 }
                            max={ 900 }
                            step={ 100 }
                            defaultValue={ 100 }
                            elementRefOfRangeInput={ boldInputRange }
                            elementRefOfTextInput={ boldInputText }
                            setValue={ (value: number) => TextManager.handleBoldRange(canvasRef.current, textStyleMoodRef, value) }
                        />

                        <div className="flex items-center justify-between gap-1">
                            <p>
                                Strong
                            </p>
                            <input
                                className="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white"
                                type="checkbox"
                                onChange={ () =>
                                {
                                    if (boldInput?.current)
                                        TextManager.handleToggleStyle(canvasRef, 'bold', textStyleMoodRef, boldInput?.current);
                                }
                                }
                                ref={ boldInput }

                            />
                        </div>
                    </div>
                }
            />

            <CounterComponent canvasRef={ canvasRef } />

            <NavbarToolBrComponent/>

            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('TEXTS_FONT'));
                    document.body.classList.add('is-sidebar-open');
                } }
                type='primary'
                label='FaFont'
                content='Arial / H2'
                icon={ <FaFont size={ 18 }/> }
            />
            <NavbarToolItemComponent
                onClick={ () =>
                {
                    dispatch(setAsideOption('TEXTS_COLOR'));
                    document.body.classList.add('is-sidebar-open');

                    if (customColorBtn?.current)
                        customColorBtn.current.click();
                } }
                type='image'
                src='/assets/images/rgb.png'
                label='Font Color'
            />
        </motion.div>
    );
};

export default NavbarToolTextsComponent;
