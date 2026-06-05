import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { ObjectManager } from './object-manager.lib';

// Defines an enum for identifying scaling direction, enhancing code readability and maintainability.
enum ScalingDirection
{
    LEFT = 'ml', // Represents scaling from the left side
    RIGHT = 'mr' // Represents scaling from the right side
}

export class ZoneManager
{
    /**
     * Adds a new zone, represented as a rectangle, to the fabric canvas.
     *
     * This function initializes a rectangle and a label to represent the zone, configuring their properties
     * such as position, dimensions, and visual characteristics. It utilizes the canvasRef to directly manipulate
     * the canvas, adding these new objects to it. The function also integrates with other components of the ZoneManager,
     * like `getSettings` for additional configuration, and `makeSelectableAndUnselectableSlider` to manage object interactions.
     * It effectively manages z-index among zones and sliders to ensure proper layering. The function incrementally adjusts
     * the number of zones, enhancing user interaction within a dynamic canvas environment.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object pointing to the fabric canvas instance.
     * @param numberOfZone - Tracks the current count of zone objects.
     * @param numberOfSlider - Tracks the current count of slider objects.
     * @param findLastSliderClassNumberZIndex - Function to manage z-index for newly added zones in relation to existing sliders.
     */
    public static handleAdd(
        canvasRef: MutableRefObject<fabric.Canvas | null>,
        numberOfZone: MutableRefObject<number>,
        numberOfSlider: MutableRefObject<number>,
        findLastSliderClassNumberZIndex: (canvas: fabric.Canvas, newContainer: fabric.Object, newLabel: fabric.Object, numberOfSlider: MutableRefObject<number>) => void
    )
    {
        const canvas: fabric.Canvas | null = canvasRef.current;
        let isMouseDown: boolean = true;

        if (canvas)
        {
            // Sets cursor to 'crosshair' on mouse move when mouse is down
            canvas.on('mouse:move', () =>
            {
                if (!isMouseDown) return;
                canvas.setCursor('crosshair');
            });
            // Adds a newZone to the canvas on mouse down
            canvas.on('mouse:up', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    // Initialize a new rectangle object to represent the zone.
                    const newZone = new fabric.Rect
                    ({
                        left: x - 125,
                        top: y - 125,
                        fill: 'transparent',
                        strokeWidth: 2,
                        stroke: 'red',
                        width: 250,
                        height: 250,
                        name: 'zone',
                        noScaleCache: false,
                        zoneClassNumber: 'zone' + numberOfZone.current,
                        selectable: false,
                        hoverCursor: 'normal',
                        lockRotation: true
                    });

                    // Create a label for the new zone, positioned at the right edge of the zone.
                    const label = new fabric.IText('zone' + numberOfZone.current, {
                        left: (newZone.left || 0) + newZone.getScaledWidth() + 2,
                        top: newZone.top,
                        fill: 'black',
                        fontSize: 20,
                        zoneClassNumber: 'zone' + numberOfZone.current,
                        name: 'zoneLabel'
                    });

                    // Dynamically set the label's width based on its text content.
                    label.set('width', (label.text?.length || 0) * ((label.fontSize || 0) / 2));
                    label.on('changed', () =>
                    {
                        label.set('width', (label.text?.length || 0) * ((label.fontSize || 0) / 2));
                        canvas.renderAll();
                    });

                    // Enable zone selection upon label interaction.
                    label.on('mousedown', () =>
                    {
                        if (!newZone.selectable)
                            newZone.set('selectable', true);
                    });

                    // Toggle selectability of related sliders on label and zone hover events.
                    label.on('mouseover', () => ZoneManager.makeSelectableAndUnselectableSlider(canvas, label, false));
                    newZone.on('mouseover', () => ZoneManager.makeSelectableAndUnselectableSlider(canvas, newZone, false));
                    label.on('mouseout', () => ZoneManager.makeSelectableAndUnselectableSlider(canvas, label, true));
                    newZone.on('mouseout', () => ZoneManager.makeSelectableAndUnselectableSlider(canvas, newZone, true));

                    // Apply additional configurations to both the zone and its label.
                    ZoneManager.getSettings(newZone);
                    ZoneManager.getSettings(label);
                    newZone.setControlVisible('mtr', true);
                    label.setControlVisible('mb', false);

                    // Add the new zone and its label to the canvas.
                    canvas.add(newZone);
                    canvas.add(label);
                    canvas.discardActiveObject().renderAll();

                    // Manage z-index for proper layering of zones and sliders.
                    if (event.target?.name !== 'slider' && !event.target?.sliderClassNumber)
                    {
                        if (numberOfZone.current === 1)
                        {
                            if (numberOfSlider.current > 1)
                                findLastSliderClassNumberZIndex(canvas, newZone, label, numberOfSlider);
                            else
                            {
                                newZone.moveTo(0);
                                label.moveTo(1);
                            }
                        }
                        else
                        {
                            const lastZoneObjects = canvas.getObjects().filter(obj =>
                            {
                                return obj.zoneClassNumber && !obj.sliderClassNumber && obj !== newZone && obj !== label;
                            });

                            if (lastZoneObjects.length > 0)
                            {
                                const lastObject = lastZoneObjects[lastZoneObjects.length - 1];
                                const lastObjectIndex = canvas.getObjects().indexOf(lastObject);

                                if (lastObjectIndex !== -1)
                                {
                                    newZone.moveTo(lastObjectIndex + 1);
                                    label.moveTo(lastObjectIndex + 2);
                                }
                            }
                            else
                                findLastSliderClassNumberZIndex(canvas, newZone, label, numberOfSlider);
                        }
                    }
                    else if (event.target.name === 'slider')
                        ObjectManager.makeExactZIndexForObjectOfSlider(canvas, event.target, [newZone, label]);
                    else if (event.target?.sliderClassNumber)
                    {
                        const exactSlider = canvas.getObjects().find(obj => obj.sliderClassNumber === event.target?.sliderClassNumber && obj.name === 'slider');
                        if (!exactSlider) return;
                        ObjectManager.makeExactZIndexForObjectOfSlider(canvas, exactSlider, [newZone, label]);
                    }

                    // Increment the zone counter.
                    numberOfZone.current++;
                    isMouseDown = false;
                }
            });
        }
    }

    private static makeSelectableAndUnselectableSlider(canvas: fabric.Canvas, object: fabric.Object, boolean: boolean)
    {
        // If the zone or its label are member of an slider
        if (object.sliderClassNumber)
        {
            // Find the  exact slider
            const relatedSlider: fabric.Object | undefined = canvas.getObjects().find((obj) =>
            {
                return (obj.name === 'slider' && object.sliderClassNumber === obj.sliderClassNumber);
            });

            if (relatedSlider)
            {
                // Change the selectable property of the slider depend on situation
                relatedSlider.selectable = boolean;
                canvas.renderAll();
            }
        }
    }

    /**
     * Disables specific control corners for a fabric object to limit its resizing directions.
     *
     * Targets control corners of a fabric object, disabling them to prevent resizing
     * from those corners. Useful for controlling how objects can be manipulated on
     * the canvas, such as restricting resizing to horizontal directions only.
     *
     * @param {fabric.Object} object - The fabric object to modify control visibility for.
     */
    public static getSettings(object: fabric.Object)
    {
        object.setControlVisible('tl', false); // Disable the top-left corner for scaling.
        object.setControlVisible('bl', false); // Disable the bottom-left corner for scaling.
        object.setControlVisible('tr', false); // Disable the top-right corner for scaling.
        object.setControlVisible('br', false); // Disable the bottom-right corner for scaling.
        object.setControlVisible('mr', false); // Disable the middle-right corner for scaling.
        object.setControlVisible('ml', false); // Disable the middle-left corner for scaling.
        object.setControlVisible('br', false); // Disable the bottom-right corner for scaling.
        object.setControlVisible('mt', false); // Disable the middle-top corner for scaling.
        object.setControlVisible('mtr', false); // Disable the corner rotating.
    }

    /**
     * Dynamically adjusts the width of a designated 'zone' rectangle on a fabric canvas.
     *
     * Responds to user resize actions to adjust the width of fabric rectangle objects named
     * 'zone', accounting for the direction of scaling. It ensures the object's position
     * is maintained relative to its scaling direction, supporting dynamic zone adjustments
     * without altering the object's layout or position unnecessarily.
     *
     * @param {fabric.IEvent<Event>} opt - Event object with resize action details.
     * @param {fabric.Canvas} canvas - The fabric canvas to apply resizing on.
     */
    public static resizeWidth(opt: fabric.IEvent<Event>, canvas: fabric.Canvas)
    {
        // Casts the event target to a fabric.Rect for specific operations.
        const object = opt.target as fabric.Rect;

        // Retrieves the corner identifier to determine scaling direction.
        const scalingDirection = opt.transform?.corner;

        // Checks if the object is appropriately named 'zone' and is of the rectangle type.
        if (object && object.name === 'zone' && object.type === 'rect')
        {
            // Verifies the object has a defined width and scaleX properties to compute new width.
            if (object.width && object.scaleX)
            {
                // Calculates the new width by applying the scale factor.
                const newWidth = object.width * object.scaleX;

                // Iterates over all canvas objects to adjust 'zone' objects uniformly.
                canvas.forEachObject((obj) =>
                {
                    // Filters for objects named 'zone'.
                    if (obj.name === 'zone')
                    {
                        // Checks if scaling is from the left.
                        if (scalingDirection === ScalingDirection.LEFT)
                        {
                            // Ensures necessary properties are present for adjustment.
                            if (obj.left && obj.width && obj.scaleX)
                            {
                                // Computes the original left position before scaling.
                                const originalLeft = obj.left + obj.width * obj.scaleX;

                                // Sets new width and adjusts left position to maintain edge alignment.
                                obj.set({ width: newWidth, scaleX: 1, left: originalLeft - newWidth });
                            }
                        }
                        else
                        {
                            // For scaling from the right, only width is updated.
                            // Resets scaleX to 1 and applies new width.
                            obj.set({ scaleX: 1, width: newWidth });
                        }

                        // Updates the object's coordinates to reflect the changes.
                        obj.setCoords();
                    }
                });

                // Triggers a re-render of the canvas to display updated object dimensions.
                canvas.requestRenderAll();
            }
        }
    }

    /**
     * Adjusts the width and central positioning of 'zone' rectangles on a fabric canvas.
     *
     * This method ensures dynamic and visually balanced resizing of zones by programmatically
     * setting new widths while maintaining their central alignment. It iterates over canvas objects,
     * identifying those named 'zone' and of rectangle type, to apply width adjustments. The method
     * calculates the necessary left position shift to preserve the zone's central positioning,
     * regardless of the new width. This allows for a seamless and intuitive adjustment experience,
     * keeping the visual integrity of the canvas layout intact. It's an essential function for
     * applications requiring responsive and adaptable visual content management.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref to the fabric canvas for dynamic access.
     * @param {number} width - The new width to apply to the 'zone' objects.
     */
    public static handleResizeZone(canvasRef: MutableRefObject<fabric.Canvas | null>, width: number)
    {
        // Access the current fabric.Canvas instance from the reference
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // Iterate over all objects in the canvas
            canvas.forEachObject((obj) =>
            {
                // Check if the object is a rectangle named 'zone'
                if (obj.type === 'rect' && obj.name === 'zone')
                {
                    if (obj.width && obj.scaleX)
                    {
                        // Calculate the change in width
                        const changeInWidth = width - obj.width * obj.scaleX;

                        // Update the width of the rectangle and reset scaling
                        obj.set({ width, scaleX: 1 });

                        // Adjust the left position to expand/contract equally from both sides
                        if (obj.left)
                            obj.set({ left: obj.left - changeInWidth / 2 });

                        // Find related label
                        const exactLabel = canvas.getObjects().find(label => label.name === 'zoneLabel' && label.zoneClassNumber === obj.zoneClassNumber);
                        exactLabel?.set('left', obj.left! + obj.width);

                        // Update zone and its label coordinates
                        exactLabel?.setCoords();
                        obj.setCoords();

                        // If zone was in a slider the slider resize
                        if (obj.sliderClassNumber)
                        {
                            const relatedSlider = canvas.getObjects().find(slider => slider.name === 'slider' && slider.sliderClassNumber === obj.sliderClassNumber);
                            ObjectManager.resizeSlider(relatedSlider!, canvas.getObjects());
                        }
                    }
                }
            });

            // Re-render the canvas to apply changes and deselect all objects
            canvas.discardActiveObject().renderAll();
        }
    }
}
