'use client';

import { MutableRefObject, RefObject, useEffect, useRef, useState, useContext } from 'react';
import { fabric } from 'fabric';

import { ZoneManager } from '@/libs/zone-manager.lib';
import { ObjectManager } from '@/libs/object-manager.lib';
import { UndoRedoManager } from '@/libs/undo-redo-manager.lib';
import { ClipboardManager } from '@/libs/clipboard-manager.lib';
import { GuideLineManager } from '@/libs/guide-line-manager.lib';
import { CompilerManager } from '@/libs/compiler-html-lib';

import useClickOutside from '@/hooks/use-click-out-side.hook';

import { RefContext } from '@/app/context';

import NavbarComponent from '@/components/shared/navbar';
import AsideParentComponent from '@/components/shared/aside';
import NavbarToolComponent from '@/components/shared/navbar/navbar-tool.component';
import ModalRightClickComponent from '@/components/modals/modal-right-click.component';

interface basicConceptType
{
    movingObject: fabric.Object | null,
    count: number,
    constantPosition:
    {
        x: Array<number | null>,
        y: Array<number | null>
    }
}

export interface zoneConceptType extends basicConceptType
{
    movingZoneObject: fabric.Object | null
}

export interface sliderConceptType extends basicConceptType
{
    movingSliderObject: fabric.Object | null,
    oneZoneGoesOut: fabric.Object | null
}

interface containerConceptType
{
    zoneConcept: zoneConceptType,
    sliderConcept: sliderConceptType
}

export default function Home()
{
    // Get the ref elements
    const {
        fontSizeInput,
        rangeOffsetXRef,
        inputOffsetXRef,
        rangeOffsetYRef,
        inputOffsetYRef,
        rangeBlurRef,
        inputBlurRef,
        shadowColorBtn,
        strokeColorBtn,
        rangeStrokeWidthRef,
        inputStrokeWidthRef
    } = useContext(RefContext);

    // Create a ref for the canvas element
    const canvasEl: MutableRefObject<any> = useRef<HTMLCanvasElement | any>(null);

    // Create a ref for the container element
    const containerRef: MutableRefObject<any> = useRef<HTMLDivElement | any>(null);

    // Ref to store the fabric.Canvas instance
    const canvasRef: MutableRefObject<fabric.Canvas | null> = useRef<fabric.Canvas | null>(null);

    // Ref to store the copied object
    const copiedObjectRef: MutableRefObject<fabric.Object[] | fabric.Object | null> = useRef<fabric.Object[] | fabric.Object | null>(null);

    // Ref to store the history of canvas actions
    const historyRef: MutableRefObject<{ undo: any[], redo: any[] }> = useRef({ undo: [], redo: [] });

    // Right Click Modal
    const modalRightClickRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const [isModalRightClickOpen, setIsModalRightClickOpen] = useState<boolean>(false);
    useClickOutside(isModalRightClickOpen, modalRightClickRef, () => setIsModalRightClickOpen(false));

    // Right Click Modal Position
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

    const navbarDeviceComponentInputsRef: MutableRefObject<{
        width: HTMLInputElement | null,
        height: HTMLInputElement | null,
        x: HTMLInputElement | null,
        y: HTMLInputElement | null,
        label: HTMLInputElement | null,
        zoom: HTMLInputElement | null,
        fontSize: HTMLInputElement | null}> = useRef
        ({
            width: null,
            height: null,
            x: null,
            y: null,
            label: null,
            zoom: null,
            fontSize: null
        });

    const shapeNumberCounterObjectRef: MutableRefObject<{triangle: number, circle: number, rectangle: number, square: number}> = useRef({
        triangle: 1,
        circle: 1,
        rectangle: 1,
        square: 1
    });

    useEffect(() =>
    {
        // Check if the canvas element is available
        if (!canvasEl.current)
            return;

        const containerConcept: containerConceptType =
        {
            zoneConcept:
            {
                movingObject: null,
                count: 0,
                movingZoneObject: null,
                constantPosition: { x: [], y: [] }
            },
            sliderConcept:
            {
                movingObject: null,
                count: 0,
                movingSliderObject: null,
                constantPosition: { x: [], y: [] },
                oneZoneGoesOut: null
            }
        };

        // Initialize a fabric.js canvas using the canvas element
        canvasRef.current = new fabric.Canvas(canvasEl.current, { fireRightClick: true, fireMiddleClick: true, stopContextMenu: true, preserveObjectStacking: true });
        const canvas: fabric.Canvas = canvasRef.current;

        new GuideLineManager({ canvas }).init();

        // Flag to check if panning is active
        let isPanning: boolean = false;

        // Stores the last X position of the mouse
        let lastPosX: number | null = null;

        // Stores the last Y position of the mouse
        let lastPosY: number | null = null;

        // Save initial state
        UndoRedoManager.saveState(canvas, historyRef);

        const handleMouseDown = (opt: fabric.IEvent<Event>) =>
        {
            // Cast the event to a MouseEvent
            const mouseEvent: MouseEvent = opt.e as MouseEvent;

            // Check if Ctrl key is pressed and the mouse button is left (0)
            if (mouseEvent.ctrlKey && mouseEvent.button === 0)
            {
                isPanning = true;

                // Set the current mouse X position
                lastPosX = mouseEvent.clientX;

                // Set the current mouse Y position
                lastPosY = mouseEvent.clientY;

                // Disable selection on the canvas during panning
                canvas.selection = false;
            }

            // Right Click
            if (mouseEvent.button === 2)
            {
                // Save the mouse position
                setModalPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });

                // Toggle the modal visibility
                setIsModalRightClickOpen(!isModalRightClickOpen);
            }
        };

        const handleMouseMove = (opt: fabric.IEvent<Event>) =>
        {
            if (isPanning && lastPosX !== null && lastPosY !== null)
            {
                // Cast the event to a MouseEvent
                const mouseEvent: MouseEvent = opt.e as MouseEvent;

                // Access the viewport transformation of the canvas
                const vpt = canvas.viewportTransform;

                if (vpt)
                {
                    // Calculate the new X transform based on mouse movement
                    vpt[4] += mouseEvent.clientX - lastPosX;

                    // Calculate the new Y transform based on mouse movement
                    vpt[5] += mouseEvent.clientY - lastPosY;

                    // Re-render the canvas to update the view
                    canvas.requestRenderAll();

                    // Update the last X position of the mouse
                    lastPosX = mouseEvent.clientX;

                    // Update the last Y position of the mouse
                    lastPosY = mouseEvent.clientY;
                }
            }
        };

        const handleMouseUp = (opt: fabric.IEvent<Event>) =>
        {
            if (isPanning)
            {
                // Disable panning
                isPanning = false;

                // Reset the last X position
                lastPosX = null;

                // Reset the last Y position
                lastPosY = null;

                // Re-enable selection on the canvas after panning
                canvas.selection = true;

                // Update the coordinates of each object
                canvas.forEachObject((obj) =>
                {
                    obj.setCoords();
                });

                // Trigger a redraw of the canvas
                canvas.renderAll();
            }

            ObjectManager.zoneConceptByMouseUp(canvasRef, opt, containerConcept.zoneConcept);
            ObjectManager.sliderConceptByMouseUp(canvasRef, opt, containerConcept.sliderConcept);
        };

        const handleObjectScaling = (opt: fabric.IEvent<Event>) =>
        {
            ZoneManager.resizeWidth(opt, canvas);
            ObjectManager.setCompleteParent(canvas, opt);
            ObjectManager.setCompleteChildren(canvas, opt);
        };

        const handleObjectModified = () =>
        {
            UndoRedoManager.saveState(canvas, historyRef);
        };

        const handleObjectMoving = (opt: fabric.IEvent<Event>) =>
        {
            ObjectManager.zoneConceptByMoving(canvasRef, containerConcept.zoneConcept, opt);
            ObjectManager.sliderConceptByMoving(canvasRef, containerConcept.sliderConcept, opt);
            ObjectManager.setCompleteParent(canvas, opt);
            ObjectManager.setCompleteChildren(canvas, opt);
        };

        const handleObjectRotating = (opt: fabric.IEvent<Event>) =>
        {
            ObjectManager.setCompleteParent(canvas, opt);
            ObjectManager.setCompleteChildren(canvas, opt);
        };

        const handleAfterRender = () =>
        {
        };

        const handleBeforeRender = () =>
        {

        };

        const handleKeyDown = (event: KeyboardEvent) =>
        {
            if (canvas)
            {
                if (event.ctrlKey)
                {
                    switch (event.key)
                    {
                        case 'c':
                            ClipboardManager.copy(canvas, copiedObjectRef);
                            break;
                        case 'v':
                            ClipboardManager.paste(canvas, copiedObjectRef);
                            break;
                        case 'x':
                            ClipboardManager.cut(canvas, copiedObjectRef);
                            break;
                        case 'd':
                            ClipboardManager.duplicate(canvas);
                            break;
                        case 'z':
                            UndoRedoManager.undo(canvas, historyRef);
                            break;
                        case 'y':
                            UndoRedoManager.redo(canvas, historyRef);
                            break;
                        default:
                            break;
                    }
                }
                else if (event.key === 'Delete')
                {
                    // If one input is active return
                    if (Object.values(navbarDeviceComponentInputsRef.current).some(input => input === document.activeElement))
                        return;

                    // Ensure Delete key works without Ctrl for removing objects
                    ObjectManager.remove(canvas);
                }
                else if (event.key === 'Enter')
                {
                    // If label of container is on editing mood and we key down enter call preventDefault
                    if ((canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel') && (canvas.getActiveObject() as fabric.IText).get('isEditing'))
                        event.preventDefault();
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) =>
        {
            // Blur the focused input when the Enter key is pressed
            if (event.key === 'Enter')
            {
                Object.values(navbarDeviceComponentInputsRef.current).forEach(input =>
                {
                    if (input instanceof HTMLInputElement && document.activeElement === input)
                        input.blur();
                });

                // If label of container is on editing mood and we key up enter the label de select
                if ((canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel') && (canvas.getActiveObject() as fabric.IText).get('isEditing'))
                    canvas.discardActiveObject().renderAll();

                if (fontSizeInput?.current)
                    fontSizeInput.current.blur();
            }
        };

        /**
         * Handle selection created event.
         */
        const handleSelectionCreated = () =>
        {
            const selectedObjects = canvas.getActiveObject();
            // Check if selected object is a group
            if (!selectedObjects) 
                return;
            
            if (selectedObjects instanceof fabric.Group)
            {
                // Check if the group contains any zone, zoneLabel, slider, or sliderLabel objects
                const selectionResultForContainer = selectedObjects.getObjects().some((obj) =>
                {
                    return (obj.name === 'zone' || obj.name === 'zoneLabel' || obj.name === 'slider' || obj.name === 'sliderLabel');
                });

                // Check if the group contains objects with different zoneClassNumber
                const selectionResultForObjectsContainer = selectedObjects.getObjects().some((obj) =>
                {
                    return (obj.zoneClassNumber !== selectedObjects.getObjects()[0].zoneClassNumber);
                });

                // If the group contains any inappropriate objects or objects with different zoneClassNumber, discard the selection
                if (selectionResultForContainer || selectionResultForObjectsContainer)
                    canvas.discardActiveObject().renderAll();
            }
            // Update the distance of the object
            setDistanceOfObject();

            // Set value for text effect elements
            if (
                !rangeOffsetXRef?.current ||
                !inputOffsetXRef?.current ||
                !rangeOffsetYRef?.current ||
                !inputOffsetYRef?.current ||
                !rangeBlurRef?.current ||
                !inputBlurRef?.current ||
                !shadowColorBtn?.current ||
                !strokeColorBtn?.current ||
                !rangeStrokeWidthRef?.current ||
                !inputStrokeWidthRef?.current) return;

            rangeOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
            inputOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
            rangeOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
            inputOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
            rangeBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
            inputBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
            rangeStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
            inputStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
            shadowColorBtn.current.style.backgroundColor = ObjectManager.shadowGetter(canvas, 'color');
            strokeColorBtn.current.style.backgroundColor = ObjectManager.strokeGetter(canvas, 'stroke');
        };

        const handleSelectionUpdated = () =>
        {
            setDistanceOfObject();

            // Set value for text effect elements
            if (
                !rangeOffsetXRef?.current ||
                !inputOffsetXRef?.current ||
                !rangeOffsetYRef?.current ||
                !inputOffsetYRef?.current ||
                !rangeBlurRef?.current ||
                !inputBlurRef?.current ||
                !shadowColorBtn?.current ||
                !strokeColorBtn?.current ||
                !rangeStrokeWidthRef?.current ||
                !inputStrokeWidthRef?.current) return;

            rangeOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
            inputOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
            rangeOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
            inputOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
            rangeBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
            inputBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
            rangeStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
            inputStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
            shadowColorBtn.current.style.backgroundColor = ObjectManager.shadowGetter(canvas, 'color');
            strokeColorBtn.current.style.backgroundColor = ObjectManager.strokeGetter(canvas, 'stroke');
        };

        const handleSelectionCleared = () =>
        {
            // Set value for text effect elements
            if (
                !rangeOffsetXRef?.current ||
                !inputOffsetXRef?.current ||
                !rangeOffsetYRef?.current ||
                !inputOffsetYRef?.current ||
                !rangeBlurRef?.current ||
                !inputBlurRef?.current ||
                !shadowColorBtn?.current ||
                !strokeColorBtn?.current ||
                !rangeStrokeWidthRef?.current ||
                !inputStrokeWidthRef?.current) return;

            rangeOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
            inputOffsetXRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetX');
            rangeOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
            inputOffsetYRef.current.value = ObjectManager.shadowGetter(canvas, 'offsetY');
            rangeBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
            inputBlurRef.current.value = ObjectManager.shadowGetter(canvas, 'blur');
            rangeStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
            inputStrokeWidthRef.current.value = ObjectManager.strokeGetter(canvas, 'strokeWidth');
            shadowColorBtn.current.style.backgroundColor = ObjectManager.shadowGetter(canvas, 'color');
            strokeColorBtn.current.style.backgroundColor = ObjectManager.strokeGetter(canvas, 'stroke');
        };
        // Function to update canvas size based on container size
        const updateCanvasSize = () =>
        {
            const container = containerRef.current;
            if (container)
            {
                // Get the current size of the container
                const width = container.clientWidth;
                const height = container.clientHeight;

                // Set the canvas element size
                canvasEl.current.width = width;
                canvasEl.current.height = height;

                // Set the canvas dimensions
                canvas.setWidth(width);
                canvas.setHeight(height);

                // Trigger a redraw of the canvas
                canvas.renderAll();
            }
        };

        // Create a ResizeObserver to watch for changes in the container size
        const resizeObserver: ResizeObserver = new ResizeObserver(updateCanvasSize);

        // Check if the container element is available and start observing it
        if (containerRef.current)
        {
            resizeObserver.observe(containerRef.current);

            // Initial call to updateCanvasSize to set the initial canvas size
            updateCanvasSize();
        }

        /**
         * Set the distance of the selected object.
         */
        const setDistanceOfObject = () =>
        {
            const selectedObject = canvas.getActiveObject();
            // Check if the selected object is a zone or zoneLabel
            if (selectedObject?.name === 'zone' || selectedObject?.name === 'zoneLabel')
            {
                // Get related zone objects with the same zoneClassNumber
                const relatedZoneObjects = canvas.getObjects().filter(obj =>
                {
                    return obj.zoneClassNumber === selectedObject.zoneClassNumber;
                });
                // Set the distance of transition for zone concept
                ObjectManager.setDistanceOfTransition(containerConcept.zoneConcept, relatedZoneObjects, selectedObject);
            }
            // Check if the selected object is a slider or sliderLabel
            else if (selectedObject?.name === 'slider' || selectedObject?.name === 'sliderLabel')
            {
                // Get related slider objects with the same sliderClassNumber
                const relatedSliderObjects = canvas.getObjects().filter(obj =>
                {
                    return obj.sliderClassNumber === selectedObject.sliderClassNumber;
                });
                // Set the distance of transition for slider concept
                ObjectManager.setDistanceOfTransition(containerConcept.sliderConcept, relatedSliderObjects, selectedObject);
            }
        };

        // FabricJS EventListener
        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);
        canvas.on('mouse:down', handleMouseDown);
        canvas.on('object:scaling', handleObjectScaling);
        canvas.on('object:modified', handleObjectModified);
        canvas.on('object:moving', handleObjectMoving);
        canvas.on('object:rotating', handleObjectRotating);
        canvas.on('after:render', handleAfterRender);
        canvas.on('before:render', handleBeforeRender);
        canvas.on('selection:created', handleSelectionCreated);
        canvas.on('selection:updated', handleSelectionUpdated);
        canvas.on('selection:cleared', handleSelectionCleared);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Cleanup: remove the ResizeObserver when the component is unmounted
        return () =>
        {
            if (containerRef.current)
                resizeObserver.unobserve(containerRef.current);

            if (canvas)
            {
                // Dispose of the Fabric.js canvas instance
                canvas.dispose();

                // Optional: Remove all event listeners attached to the canvas
                canvas.off('mouse:down', handleMouseDown);
                canvas.off('mouse:move', handleMouseMove);
                canvas.off('mouse:up', handleMouseUp);
                canvas.off('mouse:down', handleMouseDown);
                canvas.off('object:scaling', handleObjectScaling);
                canvas.off('object:modified', handleObjectModified);
                canvas.off('object:moving', handleObjectMoving);
                canvas.off('object:rotating', handleObjectRotating);
                canvas.off('after:render', handleAfterRender);
                canvas.off('before:render', handleBeforeRender);
                canvas.off('selection:created', handleSelectionCreated);
                canvas.off('selection:updated', handleSelectionUpdated);
                canvas.off('selection:cleared', handleSelectionCleared);
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);
            }
        };
    }, []);

    useEffect(() =>
    {
        const logCanvasRef = setInterval(() =>
        {
            console.log(canvasRef.current);
        }, 10000);

        return () =>
        {
            clearInterval(logCanvasRef);
        };
    }, []);

    const saveCanvasAsJSON = () =>
    {
        if (canvasRef.current)
        {
            const canvasJSON = canvasRef.current.toJSON();
            const jsonString = JSON.stringify(canvasJSON);

            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');

            anchor.href = url;
            anchor.download = 'canvasState.json';
            document.body.appendChild(anchor);
            anchor.click();

            document.body.removeChild(anchor);
            URL.revokeObjectURL(url);
        }
    };

    const loadCanvasFromJSON = (event: any) =>
    {
        const file = event.target.files[0];
        if (file && canvasRef.current)
        {
            const reader = new FileReader();

            reader.onload = function(fileEvent)
            {
                const json = fileEvent?.target?.result;
                canvasRef?.current?.loadFromJSON(json, () =>
                {
                    canvasRef?.current?.renderAll();

                    canvasRef?.current?.forEachObject((obj) =>
                    {
                        obj.setCoords();
                    });
                });
            };

            reader.readAsText(file);
        }
    };

    return (
        <>
            <AsideParentComponent canvasRef={ canvasRef } historyRef={ historyRef } shapeNumberCounterObjectRef={ shapeNumberCounterObjectRef }/>

            <div ref={ containerRef } style={{ width: '100%', height: '100%' }}>
                <NavbarComponent canvasRef={ canvasRef } navbarDeviceComponentInputsRef={ navbarDeviceComponentInputsRef } />
                <NavbarToolComponent canvasRef={ canvasRef } navbarDeviceComponentInputsRef={ navbarDeviceComponentInputsRef }/>

                <canvas ref={canvasEl}/>

                {
                    isModalRightClickOpen
                    &&
                    <ModalRightClickComponent innerRef={modalRightClickRef} position={modalPosition} canvasRef={canvasRef} historyRef={historyRef}/>
                }

                <div className={'absolute left-[200px] top-[200px]'}>
                    <button onClick={() => document?.getElementById('loadCanvasInput')?.click()} className={'bg-red-400 p-4 text-black'}>
                        Load Canvas
                    </button>

                    <input type='file' id='loadCanvasInput' style={{ display: 'none' }} onChange={loadCanvasFromJSON}/>

                    <button onClick={saveCanvasAsJSON} className={'bg-red-400 p-4 text-black'}>
                        Save Canvas
                    </button>
                </div>
            </div>
        </>
    );
}
