'use client';

import React, { MutableRefObject, useState } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/redux/app/hooks';

import { FaChevronRight } from 'react-icons/fa6';

import AsideNavOptionComponent from '@/components/shared/aside/nav';
import AsideTextsOptionComponent from '@/components/shared/aside/texts';
import AsideMediaOptionComponent from '@/components/shared/aside/media';
import AsideShapeOptionComponent from '@/components/shared/aside/shapes';
import AsideButtonOptionComponent from '@/components/shared/aside/button';
import AsideDeviceOptionComponent from '@/components/shared/aside/device';
import AsideNavMouseOptionComponent from '@/components/shared/aside/nav/mouse';
import AsideNavArrowsOptionComponent from '@/components/shared/aside/nav/arrows';
import AsideTextsFontOptionComponent from '@/components/shared/aside/texts/font';
import AsideTextsColorOptionComponent from '@/components/shared/aside/texts/color';
import AsideNavProgressOptionComponent from '@/components/shared/aside/nav/progress';
import AsideShapesColorOptionComponent from '@/components/shared/aside/shapes/color';
import AsideMediaEffectsOptionComponent from '@/components/shared/aside/media/effects';
import AsideTextsEffectsOptionComponent from '@/components/shared/aside/texts/effects';
import AsideNavAnimationsOptionComponent from '@/components/shared/aside/nav/animations';
import AsideNavPaginationOptionComponent from '@/components/shared/aside/nav/pagination';
import AsideTextsAnimationsOptionComponent from '@/components/shared/aside/texts/animations';
import AsideMediaAnimationsOptionComponent from '@/components/shared/aside/media/animations';
import AsideTextsListOptionComponent from '@/components/shared/aside/texts/texts-list.components';
import AsideNavAnimationsItemOptionComponent from '@/components/shared/aside/nav/animations/modify';
import AsideShapesListOptionComponent from '@/components/shared/aside/shapes/shapes-list.components';
import AsideButtonColorOptionComponent from '@/components/shared/aside/button/button-color.components';
import AsideTextsAnimationsItemOptionComponent from '@/components/shared/aside/texts/animations/modify';
import AsideMediaAnimationsItemOptionComponent from '@/components/shared/aside/media/animations/modify';
import AsideNavAnimationsListOptionComponent from '@/components/shared/aside/nav/animations/animations-list.component';
import AsideTextsAnimationsListOptionComponent from '@/components/shared/aside/texts/animations/animations-list.component';
import AsideMediaAnimationsListOptionComponent from '@/components/shared/aside/media/animations/animations-list.component';
import ModalReplaceAnimationComponent from '@/components/ui/modal/replace-animation.component';
import AsideWorlsOptionComponent from '@/components/shared/aside/world';
import AsideWorldThemesOptionComponent from './world/themes/index';
import AsideWorldUploadComponent from './world/upload';
import AsideWorldSelectComponent from './world/selectFile';
import AsideWorldSurveyComponent from './world/survey';
import AsideWorldShortcutComponent from './world/shortcut';
import AsideWorldPowerComponent from './world/power';
import AsideWorldOperationComponent from './world/operation';

interface AsideOptionProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    historyRef: MutableRefObject<{ undo: any[]; redo: any[] }>;
    shapeNumberCounterObjectRef: MutableRefObject<{
        triangle: number,
        circle: number,
        rectangle: number,
        square: number
    }>;
}

const AsideOptionComponent = ({ canvasRef, historyRef, shapeNumberCounterObjectRef }: AsideOptionProps) =>
{
    const asideState = useAppSelector((state) => state.aside);

    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            {openModal && <ModalReplaceAnimationComponent setOpenModal={setOpenModal} />}

            <div className='sidebar-panel'>
                <button className='absolute inset-y-0 -right-3 my-auto flex h-fit' onClick={() => document.body.classList.toggle('is-sidebar-open')}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 96' width='13' height='96' className='fill-navy-50 dark:fill-navy-750'>
                        <path d='M0,0 h1 c0,20,12,12,12,32 v32 c0,20,-12,12,-12,32 H0 z'></path>
                        <path d='M0.5,0 c0,20,12,12,12,32 v32 c0,20,-12,12,-12,32'></path>
                    </svg>

                    <i className='sidebar-panel-icon absolute inset-x-0 left-1/2 top-1/2 m-auto flex -translate-x-1/2 -translate-y-1/2 text-navy-750 transition-all dark:text-white'>
                        <FaChevronRight size={9} />
                    </i>
                </button>

                <div className='flex h-full grow flex-col bg-navy-50 pl-[var(--main-sidebar-width)] pt-14 dark:bg-navy-750'>
                    { /* MEDIA ASIDE OPTION */ }
                    { asideState.asideOption === 'MEDIA' && <AsideMediaOptionComponent canvasRef={canvasRef} /> }
                    { asideState.asideOption === 'MEDIA_EFFECTS' && <AsideMediaEffectsOptionComponent /> }
                    { asideState.asideOption === 'MEDIA_ANIMATIONS' && <AsideMediaAnimationsOptionComponent /> }
                    { asideState.asideOption === 'MEDIA_ANIMATIONS_RISE' && <AsideMediaAnimationsItemOptionComponent id='MEDIA_ANIMATIONS_RISE' /> }
                    { asideState.asideOption === 'MEDIA_ANIMATIONS_RECENT_USED' && <AsideMediaAnimationsListOptionComponent id='MEDIA_ANIMATIONS_RECENT_USED' /> }

                    { /* TEXT ASIDE OPTION */ }
                    { asideState.asideOption === 'TEXTS' && <AsideTextsOptionComponent canvasRef={canvasRef} historyRef={historyRef} /> }
                    { asideState.asideOption === 'TEXTS_EFFECTS' && <AsideTextsEffectsOptionComponent canvasRef={canvasRef}/> }
                    { asideState.asideOption === 'TEXTS_ANIMATIONS' && <AsideTextsAnimationsOptionComponent /> }
                    { asideState.asideOption === 'TEXTS_ANIMATIONS_RISE' && <AsideTextsAnimationsItemOptionComponent id='TEXTS_ANIMATIONS_RISE' /> }
                    { asideState.asideOption === 'TEXTS_ANIMATIONS_RECENT_USED' && <AsideTextsAnimationsListOptionComponent id='TEXTS_ANIMATIONS_RECENT_USED' /> }
                    { asideState.asideOption === 'TEXTS_COLOR' && <AsideTextsColorOptionComponent canvasRef={canvasRef} /> }
                    { asideState.asideOption === 'TEXTS_FONT' && <AsideTextsFontOptionComponent canvasRef={canvasRef} /> }
                    { asideState.asideOption === 'TEXTS_DEFAULT' && <AsideTextsListOptionComponent id='TEXTS_DEFAULT' /> }

                    { /* BUTTON ASIDE OPTION */ }
                    { asideState.asideOption === 'BUTTON' && <AsideButtonOptionComponent canvasRef={canvasRef}/> }
                    { asideState.asideOption === 'BUTTON_COLOR' && <AsideButtonColorOptionComponent canvasRef={canvasRef} /> }

                    { /* NAV ASIDE OPTION */ }
                    { asideState.asideOption === 'NAV' && <AsideNavOptionComponent/>}
                    { asideState.asideOption === 'NAV_MOUSE' && <AsideNavMouseOptionComponent /> }
                    { asideState.asideOption === 'NAV_PROGRESS' && <AsideNavProgressOptionComponent canvasRef={canvasRef} /> }
                    { asideState.asideOption === 'NAV_ARROWS' && <AsideNavArrowsOptionComponent canvasRef={canvasRef} /> }
                    { asideState.asideOption === 'NAV_PAGINATION' && <AsideNavPaginationOptionComponent /> }
                    { asideState.asideOption === 'NAV_ANIMATIONS' && <AsideNavAnimationsOptionComponent setOpenModal={setOpenModal} /> }
                    { asideState.asideOption === 'NAV_ANIMATIONS_RISE' && <AsideNavAnimationsItemOptionComponent id='NAV_ANIMATIONS_RISE' /> }
                    { asideState.asideOption === 'NAV_ANIMATIONS_RECENT_USED' && <AsideNavAnimationsListOptionComponent id='NAV_ANIMATIONS_RECENT_USED' /> }

                    { /* SHAPES ASIDE OPTION */ }
                    { asideState.asideOption === 'SHAPES' && <AsideShapeOptionComponent canvasRef={canvasRef} shapeNumberCounterObjectRef={ shapeNumberCounterObjectRef }/> }
                    { asideState.asideOption === 'SHAPES_COLOR' && <AsideShapesColorOptionComponent id='SHAPES_DEFAULT' canvasRef={canvasRef} shapeNumberCounterObjectRef={ shapeNumberCounterObjectRef }/> }
                    { asideState.asideOption === 'SHAPES_DEFAULT' && <AsideShapesListOptionComponent id='SHAPES_DEFAULT' canvasRef={canvasRef} shapeNumberCounterObjectRef={ shapeNumberCounterObjectRef }/> }

                    { /* SLIDER ASIDE OPTION */ }
                    { asideState.asideOption === 'SLIDERS' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='nav-wrapper h-full overflow-x-hidden pb-6'>
                            this is a test for SLIDERS aside option
                        </motion.div>
                    ) }

                    { /* DEVICE ASIDE OPTION */ }
                    { asideState.asideOption.startsWith('DEVICE') && <AsideDeviceOptionComponent /> }

                    { /* World ASIDE OPTION */}
                    { asideState.asideOption === 'WORLD' && <AsideWorlsOptionComponent /> }
                    { asideState.asideOption === 'WORLD_THEMES' && <AsideWorldThemesOptionComponent /> }
                    { asideState.asideOption === 'WORLD_UPLOAD' && <AsideWorldUploadComponent /> }
                    { asideState.asideOption === 'WORLD_SELECT' && <AsideWorldSelectComponent /> }
                    { asideState.asideOption === 'WORLD_SURVEY' && <AsideWorldSurveyComponent /> }
                    { asideState.asideOption === 'WORLD_SHORTCUT' && <AsideWorldShortcutComponent /> }
                    { asideState.asideOption === 'WORLD_POWER' && <AsideWorldPowerComponent /> }
                    { asideState.asideOption === 'WORLD_FOLDER' && <AsideWorldOperationComponent /> }
                </div>
            </div>
        </>
    );
};

export default AsideOptionComponent;
