import React, { MutableRefObject, useState, useEffect, useRef } from 'react';

import { FaGear } from 'react-icons/fa6';
import { FaDesktop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';

import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import { fabric } from 'fabric';

import { ZoneManager } from '@/libs/zone-manager.lib';
import { ObjectManager } from '@/libs/object-manager.lib';

import { useAppDispatch } from '@/redux/app/hooks';
import { setAsideOption } from '@/redux/features/aside/aside-slice';

import CustomTooltip from '@/components/ui/custom-tooltip.component';

interface NavbarDeviceProps
{
    canvasRef: MutableRefObject<fabric.Canvas | null>,
    navbarDeviceComponentInputsRef: MutableRefObject<
    {
        width: HTMLInputElement | null,
        height: HTMLInputElement | null,
        x: HTMLInputElement | null,
        y: HTMLInputElement | null,
        label: HTMLInputElement | null
    }>
}

interface DimensionAndPositionType
{
    x: string;
    y: string;
    width: string;
    height: string;
    label: string;
    container: string;
}

const initialize = ObjectManager.dimensionAndPositionGetter(null);

const NavbarDeviceComponent = ({ canvasRef, navbarDeviceComponentInputsRef }: NavbarDeviceProps) =>
{
    const dispatch = useAppDispatch();
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    const [dimensionAndPosition, setDimensionAndPosition] = useState<DimensionAndPositionType | undefined>(initialize);
    const widthRef = useRef(null);
    const heightRef = useRef(null);
    const xRef = useRef(null);
    const yRef = useRef(null);
    const labelRef = useRef(null);
    const inputChangedBeforeFocus: MutableRefObject<boolean> = useRef<boolean>(false);

    const typeOfObjects: MutableRefObject<string | null | undefined> = useRef(null);


    // Set input element refs
    const setInputElementsRefs = () =>
    {
        navbarDeviceComponentInputsRef.current.width = widthRef.current;
        navbarDeviceComponentInputsRef.current.height = heightRef.current;
        navbarDeviceComponentInputsRef.current.x = xRef.current;
        navbarDeviceComponentInputsRef.current.y = yRef.current;
        navbarDeviceComponentInputsRef.current.label = labelRef.current;
    };

    const handleSetDimensionAndPosition = (functionThatPassesToSetDimensionAndPosition: (valueState: DimensionAndPositionType | undefined) => DimensionAndPositionType | undefined) =>
    {
        setDimensionAndPosition(functionThatPassesToSetDimensionAndPosition);
    };

    useEffect(() =>
    {
        if (canvasRef.current instanceof fabric.Canvas)
        {
            const canvas: fabric.Canvas = canvasRef.current;

            setDimensionAndPosition(ObjectManager.dimensionAndPositionGetter());

            canvas.on('object:moving', (opt: fabric.IEvent<Event>) =>
            {
                setDimensionAndPosition(ObjectManager.dimensionAndPositionGetter(canvas, opt.target));
            });

            canvas.on('object:scaling', (opt: fabric.IEvent<Event>) =>
            {
                setDimensionAndPosition(ObjectManager.dimensionAndPositionGetter(canvas, opt.target));
            });

            canvas.on('selection:cleared', () =>
            {
                setDimensionAndPosition(ObjectManager.dimensionAndPositionGetter());
                typeOfObjects.current = undefined
            });

            canvas.on('mouse:down', () =>
            {
                if (canvas.getActiveObject())
                {
                    const selectedObject = canvas.getActiveObject();
                    setDimensionAndPosition(ObjectManager.dimensionAndPositionGetter(canvas, selectedObject));

                    // Set value of typeOfObjects ref to perform on exact place
                    if (selectedObject?.name === 'shape')
                        typeOfObjects.current = selectedObject.type;
                    else if (selectedObject?.name === 'zone' || selectedObject?.name === 'zoneLabel')
                        typeOfObjects.current = 'zone';
                    else if (selectedObject?.name === 'slider' || selectedObject?.name === 'sliderLabel')
                        typeOfObjects.current = 'slider';
                }
            });
        }
    }, [canvasRef.current]);

    // Set input element refs on component mount
    useEffect(() =>
    {
        setInputElementsRefs();
    }, []);

    return (
        <CustomTooltip placement='bottom' content={ 'Devices' }>
            <Tippy
                allowHTML
                interactive
                trigger='click'
                appendTo='parent'
                arrow={ roundArrow }
                placement={ 'bottom' }
                animation={ 'shift-away' }
                className='bg-gray-50'
                content={
                    <div className="flex size-fit w-40 flex-col gap-4 overflow-hidden rounded py-1">
                        <ul className="flex w-full flex-col gap-2">
                            <li className="flex items-center justify-between">
                                <button onClick={ () => ZoneManager.handleResizeZone(canvasRef, 1280) } className="flex items-center justify-start gap-2 text-lg">
                                    <i>
                                        <FaDesktop size={ 18 }/>
                                    </i>
                                    <span>
                                        Desktop
                                    </span>
                                </button>

                                <input
                                    className="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white"
                                    type="checkbox"
                                    defaultChecked
                                />
                            </li>
                            <li className="flex items-center justify-between">
                                <button onClick={ () => ZoneManager.handleResizeZone(canvasRef, 768) } className="flex items-center justify-start gap-2 text-lg">
                                    <i>
                                        <FaTabletAlt size={ 18 }/>
                                    </i>
                                    <span>
                                        Tablet
                                    </span>
                                </button>

                                <input
                                    className="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white"
                                    type="checkbox"
                                    defaultChecked
                                />
                            </li>
                            <li className="flex items-center justify-between">
                                <button onClick={ () => ZoneManager.handleResizeZone(canvasRef, 414) } className="flex items-center justify-start gap-2 text-lg">
                                    <i>
                                        <FaMobileAlt size={ 18 }/>
                                    </i>
                                    <span>
                                        Mobile
                                    </span>
                                </button>

                                <input
                                    className="form-switch h-5 w-10 rounded-full bg-slate-300 before:rounded-full before:bg-slate-50 checked:bg-primary checked:before:bg-white dark:bg-navy-900 dark:before:bg-navy-300 dark:checked:bg-accent dark:checked:before:bg-white"
                                    type="checkbox"
                                    defaultChecked
                                />
                            </li>
                        </ul>

                        <div
                            onClick={ () =>
                            {
                                dispatch(setAsideOption('DEVICE'));
                                document.body.classList.add('is-sidebar-open');
                            }}
                            className='flex cursor-pointer items-center justify-start gap-2 text-lg'
                        >
                            <i>
                                <FaGear size={ 18 }/>
                            </i>
                            <p>
                                Settings
                            </p>
                        </div>
                    </div>
                }
            >
                <button
                    onClick={ () => setOpenDropdown(!openDropdown) }
                    className="flex size-9 w-fit items-center justify-start gap-2.5 rounded-lg outline-none transition-colors duration-200"
                >
                    <i>
                        <FaDesktop size={ 24 }/>
                    </i>

                    <div className="flex items-center justify-start gap-1.5">
                        <ul className="flex flex-col items-start justify-center gap-0.5 text-sm">
                            <li className="flex gap-0.5">
                                <span className="w-6 font-semibold">
                            W:
                                </span>
                                <input
                                    type='number'
                                    value={ dimensionAndPosition?.width }
                                    ref={ widthRef }
                                    onChange={ (e) =>
                                    {
                                        ObjectManager.onChangeDimension(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'width', dimensionAndPosition);

                                        if (inputChangedBeforeFocus.current === false)
                                            inputChangedBeforeFocus.current = true;
                                    }
                                    }

                                    onBlur={ (e) =>
                                    {
                                        if (inputChangedBeforeFocus.current === true)
                                        {
                                            ObjectManager.onBlurDimension(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'width');

                                            inputChangedBeforeFocus.current = false;
                                        }
                                    }
                                    }
                                />
                            </li>
                            <li className='flex gap-0.5'>
                                <span className='w-6 font-semibold'>
                                    H:
                                </span>
                                <input
                                    type="number"
                                    value={ dimensionAndPosition?.height }
                                    ref={ heightRef }
                                    onChange={(e) =>
                                    {
                                        ObjectManager.onChangeDimension(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'height', dimensionAndPosition);

                                        if (inputChangedBeforeFocus.current === false)
                                            inputChangedBeforeFocus.current = true;
                                    }
                                    }
                                    onBlur={ (e) =>
                                    {
                                        if (inputChangedBeforeFocus.current === true)
                                        {
                                            ObjectManager.onBlurDimension(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'height');

                                            inputChangedBeforeFocus.current = false;
                                        }
                                    }
                                    }
                                />
                            </li>
                        </ul>
                        <ul className='flex flex-col items-start justify-center gap-0.5 text-sm'>
                            <li className='flex gap-0.5'>
                                <span className='w-6 font-semibold'>
                                    X:
                                </span>
                                <input
                                    type='number'
                                    ref={ xRef }
                                    value={ dimensionAndPosition?.x }
                                    onChange={ (e) =>
                                    {
                                        ObjectManager.onChangePosition(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'left', dimensionAndPosition, 'x');

                                        if (inputChangedBeforeFocus.current === false)
                                            inputChangedBeforeFocus.current = true;
                                    }

                                    }
                                    onBlur={ (e) =>
                                    {
                                        if (inputChangedBeforeFocus.current === true)
                                        {
                                            ObjectManager.onBlurPosition(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'left', 'x');

                                            inputChangedBeforeFocus.current = false;
                                        }
                                    }
                                    }
                                />
                            </li>
                            <li className='flex gap-0.5'>
                                <span className='w-6 font-semibold'>
                                    Y:
                                </span>
                                <input
                                    type='number'
                                    value={ dimensionAndPosition?.y }
                                    ref={ yRef }
                                    onChange={ (e) =>
                                    {
                                        ObjectManager.onChangePosition(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'top', dimensionAndPosition, 'y');

                                        if (inputChangedBeforeFocus.current === false)
                                            inputChangedBeforeFocus.current = true;
                                    }
                                    }
                                    onBlur={ (e) =>
                                    {
                                        if (inputChangedBeforeFocus.current === true)
                                        {
                                            ObjectManager.onBlurPosition(canvasRef.current, e.target.value, handleSetDimensionAndPosition, 'top', 'y');

                                            inputChangedBeforeFocus.current = false;
                                        }
                                    }

                                    }
                                />
                            </li>
                        </ul>
                        <ul className='flex flex-col items-start justify-center gap-0.5 text-sm'>
                            <li className='flex gap-0.5'>
                                <span className='w-6 font-semibold'>
                                    {typeOfObjects.current || 'none'}
                                </span>
                                <input
                                    type="text"
                                    ref={ labelRef }
                                    value={dimensionAndPosition?.label}
                                    onChange={(e) =>
                                    {
                                        handleSetDimensionAndPosition((valueState: DimensionAndPositionType | undefined) =>
                                        {
                                            // If the valueState is defined, update the specified property
                                            if (valueState)
                                                // Return a new object with the updated property
                                                return { ...valueState, label: e.target.value };
                                        });
                                    }
                                    }
                                    onBlur={(e) =>
                                    {
                                        const selectedObject = canvasRef.current?.getActiveObject();
                                        // If it's related to zone
                                        if (selectedObject?.name === 'zone' || selectedObject?.name === 'zoneLabel')
                                        {
                                            const exactZone = canvasRef.current?.getObjects().find(obj =>
                                                obj.get('zoneClassNumber') === selectedObject?.get('zoneClassNumber') && obj.name === 'zone'
                                            );
                                            const exactLabel = canvasRef.current?.getObjects().find(obj =>
                                                obj.get('zoneClassNumber') === selectedObject?.get('zoneClassNumber') && obj.name === 'zoneLabel'
                                            );
                                            exactZone?.set('label', e.target.value);
                                            exactLabel?.set('text', e.target.value);
                                        }
                                        // If it's related to slider
                                        else if (selectedObject?.name === 'slider' || selectedObject?.name === 'sliderLabel')
                                        {
                                            const exactSlider = canvasRef.current?.getObjects().find(obj =>
                                                obj.get('sliderClassNumber') === selectedObject?.get('sliderClassNumber') && obj.name === 'slider'
                                            );
                                            const exactLabel = canvasRef.current?.getObjects().find(obj =>
                                                obj.get('sliderClassNumber') === selectedObject?.get('sliderClassNumber') && obj.name === 'sliderLabel'
                                            );
                                            exactSlider?.set('label', e.target.value);
                                            exactLabel?.set('text', e.target.value);
                                        }
                                        else
                                            selectedObject?.set('label', e.target.value);
                                        canvasRef.current?.renderAll();
                                    }
                                    }
                                />
                            </li>
                            <li className='flex gap-0.5'>
                                <span className='w-6 font-semibold'>
                        con:
                                </span>
                                <p>
                                    { dimensionAndPosition?.container }
                                </p>
                            </li>
                        </ul>
                    </div>
                </button>
            </Tippy>
        </CustomTooltip>
    );
};

export default NavbarDeviceComponent;
