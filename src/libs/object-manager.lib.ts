import { MutableRefObject } from 'react';
import { fabric } from 'fabric';
import { IText } from 'fabric/fabric-impl';

import { sliderConceptType, zoneConceptType } from '@/app/page';

import { textStyleMoodRef } from '@/components/shared/navbar/texts';

interface DimensionAndPositionType
{
    x: string;
    y: string;
    width: string;
    height: string;
    label: string;
    container: string;
}

export class ObjectManager
{
    /**
     * Removes the currently active object or group of objects from the fabric canvas.
     *
     * This method identifies the currently selected object or group on the canvas and
     * removes it. If a group of objects is selected (activeSelection), it iterates through
     * each object within the group to remove them individually. This ensures that both
     * single objects and groups can be removed with a single method call, streamlining
     * object management on the canvas.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance from which to remove the active object(s).
     */
    public static remove(canvas: fabric.Canvas)
    {
        // Retrieves the currently active object or group of objects on the canvas.
        const activeObject = canvas.getActiveObject();

        // Checks if there is an active object or group selected for removal.
        if (activeObject)
        {
            // Determines if the active object is a group of selected objects.
            if (activeObject.type === 'activeSelection')
            {
                // Casts the active object to a fabric.Group to utilize group-specific methods.
                const group = activeObject as fabric.Group;

                // Iterates over each object in the group.
                group.forEachObject((obj: fabric.Object) =>
                {
                    // Removes the individual object from the canvas.
                    canvas.remove(obj);
                });

                // Clears the active selection from the canvas, effectively removing the group.
                canvas.discardActiveObject();
            }
            else
            {
                // Directly removes the single active object from the canvas when not part of a group.
                canvas.remove(activeObject);
            }
        }

        // Triggers a re-render of the canvas to reflect the removal of objects.
        canvas.requestRenderAll();
    }

    /**
     * Brings the currently active object to the front of the canvas.
     *
     * If there is an object currently selected (active) on the canvas, this method
     * will bring it to the front, ensuring it is rendered on top of other objects.
     * This is useful for managing the layering of objects on the canvas, allowing
     * users to control which objects appear in front of others.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     */
    public static moveToFront(canvasRef: MutableRefObject<fabric.Canvas | null>)
    {
        // Get the current canvas instance from the reference
        const canvas = canvasRef.current;

        // Check if the canvas instance exists
        if (canvas)
        {
            // Get the currently active object on the canvas
            const activeObject = canvas?.getActiveObject();

            // Check if there is an active object
            if (activeObject)
            {
                // Conditions to bring the active object forward
                if (activeObject.name !== 'zone' &&
                    activeObject.name !== 'slider' &&
                    activeObject.name !== 'sliderLabel' &&
                    activeObject.name !== 'zoneLabel' &&
                    !activeObject.zoneClassNumber &&
                    !activeObject.sliderClassNumber
                )
                    activeObject.bringForward();

                // Special handling for objects with a zoneClassNumber but not named 'zone' or 'zoneLabel'
                else if (
                    activeObject.zoneClassNumber &&
                    activeObject.name !== 'zone' &&
                    activeObject.name !== 'zoneLabel'
                )
                {
                    // Get all objects with the same zoneClassNumber as the active object
                    const lastZoneObjects = canvas.getObjects().filter(obj =>
                    {
                        return obj.zoneClassNumber === activeObject.zoneClassNumber;
                    });

                    // Check if there are objects with the same zoneClassNumber
                    if (lastZoneObjects.length > 0)
                    {
                        // Get the last object in the filtered list
                        const lastObject = lastZoneObjects[lastZoneObjects.length - 1];
                        // Find the index of the last object and the active object in the canvas object list
                        const lastObjectIndex = canvas.getObjects().indexOf(lastObject);
                        const activeObjectIndex = canvas.getObjects().indexOf(activeObject);

                        // Move the active object to the position after the last object if needed
                        if (lastObjectIndex > activeObjectIndex)
                            activeObject.moveTo(activeObjectIndex + 1);
                    }
                }
                // Re-render the canvas to reflect the changes in object layering
                canvas.renderAll();
            }
        }
    }

    /**
     * Sends the currently active object to the back of the canvas.
     *
     * This method is used when there is an active (selected) object on the canvas
     * and the user wants it to be rendered behind all other objects. It effectively
     * changes the layering of the objects on the canvas, allowing for detailed control
     * over the visual arrangement of elements.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     */
    public static moveToBack(canvasRef: MutableRefObject<fabric.Canvas | null>)
    {
        // Get the current canvas instance from the reference
        const canvas = canvasRef.current;

        // Check if the canvas instance exists
        if (canvas)
        {
            // Get the currently active object on the canvas
            const activeObject = canvas?.getActiveObject();

            // Check if there is an active object
            if (activeObject)
            {
                // Conditions to send the active object backward
                if (activeObject.name !== 'zone' &&
                    activeObject.name !== 'slider' &&
                    activeObject.name !== 'sliderLabel' &&
                    activeObject.name !== 'zoneLabel' &&
                    !activeObject.zoneClassNumber &&
                    !activeObject.sliderClassNumber
                )
                {
                    // Get all objects with a zoneClassNumber
                    const allObjectsThatHaveZoneClassNumber = canvas.getObjects().filter(obj =>
                    {
                        return obj.zoneClassNumber;
                    });

                    // Find the last object in the filtered list
                    const lastObjectThatHasZoneClassNumber = allObjectsThatHaveZoneClassNumber[allObjectsThatHaveZoneClassNumber.length - 1];
                    const lastObjectThatHasZoneClassNumberIndex = canvas.getObjects().indexOf(lastObjectThatHasZoneClassNumber);
                    const activeObjectIndex = canvas.getObjects().indexOf(activeObject);

                    // Send the active object backward if it is positioned after the last zoneClassNumber object
                    if ((activeObjectIndex - 1) > lastObjectThatHasZoneClassNumberIndex)
                        activeObject.sendBackwards();
                }
                // Special handling for objects with a zoneClassNumber but not named 'zone' or 'zoneLabel'
                else if (
                    activeObject.zoneClassNumber &&
                    activeObject.name !== 'zone' &&
                    activeObject.name !== 'zoneLabel'
                )
                {
                    // Find the exact label zone object with the same zoneClassNumber
                    const exactLabelZone = canvas.getObjects().find(obj => obj.zoneClassNumber === activeObject.zoneClassNumber && obj.name === 'zoneLabel');

                    // If the exact label zone does not exist, exit the function
                    if (!exactLabelZone)
                        return;

                    const exactLabelZoneIndex = canvas.getObjects().indexOf(exactLabelZone);
                    const activeObjectIndex = canvas.getObjects().indexOf(activeObject);

                    // Move the active object backward if it is positioned after the exact label zone
                    if (exactLabelZoneIndex < activeObjectIndex - 1)
                        activeObject.moveTo(activeObjectIndex - 1);
                }

                // Re-render the canvas to reflect the new object layering
                canvas.renderAll();
            }
        }
    }

    /**
     * Manages the movement of zone-related objects within the canvas, ensuring proper behavior
     * when these objects intersect with other zones or move out of their current zones.
     * It handles the dynamic relationships between zones and objects, including the application
     * of custom logic for grouping, extracting, and reassigning objects based on their movement.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the Fabric.js canvas instance.
     * @param {zoneConceptType} zoneConcept - Object representing the state and behavior of zone-related interactions.
     * @param {fabric.IEvent<Event>} opt - Fabric.js event object containing details about the ongoing interaction.
     */
    public static zoneConceptByMoving(canvasRef: MutableRefObject<fabric.Canvas | null>, zoneConcept: zoneConceptType, opt: fabric.IEvent<Event>)
    {
        const canvas = canvasRef.current;

        // Check if canvas and necessary properties are available
        if (canvas && opt.target && opt.pointer)
        {
            // Check the target doesn't have zoneClassNumber property
            if (!(opt.target.zoneClassNumber))
            {
                // Check if the target is a group containing zone objects
                if (opt.target instanceof fabric.Group && opt.target.getObjects().every((obj) => ((obj.zoneClassNumber && (obj.name !== 'zone' && obj.name !== 'zoneLabel')))))
                {
                    // Extract objects from zone if they are not intersecting with their zone
                    const groupObjectsFromZone: Array<fabric.Object> = opt.target.getObjects();

                    const zoneObjects: Array<fabric.Object> = canvas.getObjects().filter((obj) =>
                    {
                        return obj.zoneClassNumber === groupObjectsFromZone[0].zoneClassNumber;
                    });

                    const exactZone = zoneObjects.find(obj => obj.name === 'zone');

                    if (!(exactZone?.intersectsWithObject(opt.target)))
                    {
                        const groupObjects = opt.target.getObjects();
                        groupObjects.forEach((groupObj) =>
                        {
                            ObjectManager.extractObjectFromZone(canvas, groupObj);
                        });
                    }
                    else
                        zoneConcept.movingObject = opt.target;
                }
                else
                    zoneConcept.movingObject = opt.target;
            }
            // Check the target has zoneClassNumber property
            else if (opt.target.zoneClassNumber)
            {
                // Get all object that have the same zone class number with target
                const zoneObjects: Array<fabric.Object> = canvas.getObjects().filter((obj) =>
                {
                    return obj.zoneClassNumber === opt.target?.zoneClassNumber;
                });

                const exactZone = zoneObjects.find(obj => obj.name === 'zone');

                const exactLabel = zoneObjects.find(obj => obj.name === 'zoneLabel');

                if (!exactZone || !exactLabel)
                    return;

                // Extract object from zone if it's not in its zone and not intersecting with the zone
                if (opt.target !== exactZone && opt.target !== exactLabel && !(exactZone?.intersectsWithObject(opt.target)))
                    ObjectManager.extractObjectFromZone(canvas, opt.target);
                else
                {
                    // if target if zone and label and one of them are moving
                    if (opt.target === exactZone || opt.target === exactLabel)
                    {
                        // Get all zones excepted our zone
                        const allZones = canvas.getObjects().filter((obj) =>
                        {
                            return (obj.name === 'zone' && obj.zoneClassNumber !== exactZone.zoneClassNumber);
                        });

                        // Get all zones' label excepted our zone's label
                        const allLabelZone = canvas.getObjects().filter((obj) =>
                        {
                            return (obj.name === 'zoneLabel' && obj.zoneClassNumber !== exactLabel.zoneClassNumber);
                        });

                        // Moving other object with distance that got
                        ObjectManager.transition(canvas, zoneObjects, opt, zoneConcept);

                        if (allZones.length > 0 && allLabelZone.length > 0)
                        {
                            // use setCoords method for the object that is target
                            if (opt.target === exactZone)
                                exactZone.setCoords();
                            else
                                exactLabel.setCoords();

                            allZones.forEach((obj: fabric.Object, index: number) =>
                            {
                                // If current target zone interacts with other zone
                                if (exactZone.intersectsWithObject(obj) || exactLabel?.intersectsWithObject(obj) || exactZone.intersectsWithObject(allLabelZone[index]))
                                {
                                    // Run this method and prevent from coming over other zone
                                    ObjectManager.intersectionStopper(zoneObjects, obj, opt, allLabelZone, index, canvas, zoneConcept);
                                }
                            });
                        }
                    }

                    // put target on movingZoneObject if the object has zone class number
                    // for handling extracting from the zone if the condition is true in mouse up
                    zoneConcept.movingZoneObject = opt.target;
                }
            }
        }
    }

    /**
     * Handles the mouse-up event for zone objects within the canvas. It is primarily
     * concerned with finalizing the movement of zone objects, adjusting their z-index
     * based on their final positions, and ensuring that they are correctly placed within
     * or removed from zones as required. This method complements the zoneConceptByMoving
     * method by finalizing the interactions started during the mouse-down and mouse-move events.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the Fabric.js canvas instance.
     * @param {fabric.IEvent<Event>} opt - Fabric.js event object containing details about the interaction.
     * @param {zoneConceptType} zoneConcept - Object representing the state and behavior of zone-related interactions.
     */
    static zoneConceptByMouseUp(canvasRef: MutableRefObject<fabric.Canvas | null>, opt: fabric.IEvent<Event>, zoneConcept: zoneConceptType)
    {
        // Access the current canvas instance from the reference.
        const canvas = canvasRef.current;

        // Proceed only if the canvas is available and the event target and pointer are defined.
        if (canvas && opt.target && opt.pointer)
        {
            // Retrieve all objects present on the canvas.
            const objects = canvas.getObjects();

            // Checks if a moving object exists and if it's not classified as a slider or its label.
            // This distinction ensures we're handling a zone-related object.
            if (zoneConcept.movingObject && (zoneConcept.movingObject.name !== 'slider' && zoneConcept.movingObject.name !== 'sliderLabel'))
            {
                // Attempt to find a zone that intersects with the moving object.
                // This step is crucial for determining if the object has been moved to a new zone.
                const zoneThatIsTarget = objects.find((exactZone) =>
                {
                    return exactZone.get('name') === 'zone' && exactZone.intersectsWithObject(zoneConcept.movingObject!);
                });

                // If an intersecting zone is found, we proceed to adjust the z-index of the moving object.
                // This ensures that the object is visually placed within the correct layer relative to other objects in the zone.
                if (zoneThatIsTarget)
                {
                    // Special handling for when the moving object is a group.
                    // We need to adjust the z-index of each object in the group individually.
                    if (zoneConcept.movingObject instanceof fabric.ActiveSelection)
                    {
                        const groupObjects = zoneConcept.movingObject.getObjects();
                        groupObjects.forEach((groupObj) =>
                        {
                            ObjectManager.makeExactZIndexForObjectOfZone(canvas, zoneThatIsTarget, groupObj);
                        });
                    }
                    else
                    {
                        // For individual objects, we directly adjust their z-index.
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, zoneThatIsTarget, zoneConcept.movingObject);
                    }
                }
            }

            // Once handling is complete, we reset the moving object to null to prepare for the next interaction.
            zoneConcept.movingObject = null;
        }
    }

    /**
     * Adjusts the z-index of an object within a zone to ensure correct visual layering.
     * It locates the object's position within its designated zone, then moves it to an appropriate
     * z-index based on the existing objects in the zone. This ensures that the object is displayed
     * correctly relative to other objects in the same zone. Additionally, it updates the object's
     * properties to reflect its current zone association, ensuring consistency in object metadata.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance where objects are manipulated.
     * @param {fabric.Object} zoneThatIsTarget - The zone object that the current object is associated with.
     * @param {fabric.Object} object - The object being adjusted for correct z-index placement.
     */
    static makeExactZIndexForObjectOfZone(canvas: fabric.Canvas, zoneThatIsTarget: fabric.Object, object: fabric.Object)
    {
        // Find all objects within the same zone as the target object.
        // This includes filtering the canvas objects based on their 'zoneClassNumber' property.
        const lastZoneObjects = canvas.getObjects().filter(obj =>
        {
            return obj.zoneClassNumber === zoneThatIsTarget.zoneClassNumber;
        });

        // If there are other objects within the zone, determine the correct z-index for the target object.
        if (lastZoneObjects.length > 0)
        {
            // Identify the last object in the zone to use as a reference for z-index adjustment.
            const lastObject = lastZoneObjects[lastZoneObjects.length - 1];
            // Find the index of this last object within the canvas's total object array.
            const lastObjectIndex = canvas.getObjects().indexOf(lastObject);

            if (lastObjectIndex !== -1)
            {
                // Move the target object to a position immediately above the last object in the zone.
                // This effectively adjusts its z-index to ensure it's layered correctly within the zone.
                object.moveTo(lastObjectIndex + 1);
            }
        }

        // Update the object's 'zoneClassNumber' property to match that of the target zone.
        // This step ensures the object's metadata correctly reflects its zone association.
        object.set('zoneClassNumber', zoneThatIsTarget.zoneClassNumber);

        // Special handling if the zone also has an associated 'sliderClassNumber'.
        // This might be relevant for scenarios where zones and sliders are interrelated.
        if (zoneThatIsTarget.sliderClassNumber)
        {
            // Assign the same 'sliderClassNumber' to the object, maintaining consistency in object associations.
            object.set('sliderClassNumber', zoneThatIsTarget.sliderClassNumber);
        }

        // After adjusting the object's position and updating its properties, explicitly trigger the 'mouseup' event.
        // This can be used to finalize any additional adjustments or trigger further logic based on the object's new state.
        object.on('mouseup', () =>
        {
            // For example, make the zone non-selectable after dropping an object into it.
            // This is a placeholder for any post-placement logic required.
            zoneThatIsTarget.selectable = false;
        });
    }

    /**
     * Extracts an object from its current zone, resetting its zone-related properties and
     * adjusting its z-index to ensure it's no longer visually associated with the original zone.
     * This method is crucial for maintaining the integrity of zones and their associated objects,
     * allowing for dynamic interactions and reassignments within the canvas environment.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance where objects are manipulated.
     * @param {fabric.Object} object - The object being extracted from its zone.
     */
    private static extractObjectFromZone(canvas: fabric.Canvas, object: fabric.Object)
    {
        // Reset the 'zoneClassNumber' property of the object.
        // This disassociates the object from its current zone, effectively "extracting" it.
        object.set('zoneClassNumber', undefined);

        // If the object was in a slider remove the sliderClassNumber
        if (object.sliderClassNumber)
            object.set('sliderClassNumber', undefined);

        // Move the extracted object to the top layer of the canvas.
        // This visual adjustment ensures that the object is no longer intertwined or obscured
        // by the zone it was previously associated with, making it clearly independent.
        object.moveTo(canvas.getObjects().length);

        // Trigger a re-render of the canvas to apply and display the changes made to the object.
        // This ensures that the visual state of the canvas accurately reflects the current
        // arrangement and properties of all objects, including the newly extracted object.
        canvas.requestRenderAll();
    }

    /**
     * Manages slider object movements within the canvas, ensuring appropriate behavior
     * for sliders and their associated objects during interactions. This involves adjusting
     * the positions and properties of slider objects in response to movement, managing intersections
     * with other sliders or zones, and dynamically updating object associations as needed.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - Reference to the fabric canvas instance.
     * @param {sliderConceptType} sliderConcept - Object representing the state and behavior of slider-related interactions.
     * @param {fabric.IEvent<Event>} opt - Fabric.js event object containing details about the ongoing interaction.
     */
    static sliderConceptByMoving(canvasRef: MutableRefObject<fabric.Canvas | null>, sliderConcept: sliderConceptType, opt: fabric.IEvent<Event>)
    {
        const canvas = canvasRef.current;

        // Proceed only if canvas, target, and pointer are available
        if (canvas && opt.target && opt.pointer)
        {
            // Reset count if the moving slider object changes
            if (sliderConcept.movingSliderObject !== opt.target)
                sliderConcept.count = 0;

            // If the target does not have a sliderClassNumber, set it as the moving object
            if (!(opt.target.sliderClassNumber))
                sliderConcept.movingObject = opt.target;
            // If the target has a sliderClassNumber
            else if (opt.target && opt.target.sliderClassNumber)
            {
                // Get all objects with the same slider class number as target
                const sliderObjects: Array<fabric.Object> = canvas.getObjects().filter((obj) =>
                {
                    return obj.sliderClassNumber === opt.target?.sliderClassNumber;
                });

                const exactSlider = sliderObjects.find(obj => obj.name === 'slider');

                const exactLabel = sliderObjects.find(obj => obj.name === 'sliderLabel');

                if (!exactSlider || !exactLabel)
                    return;

                // If the target is not slider and label of slider
                if (opt.target !== exactSlider && opt.target !== exactLabel)
                {
                    // Find zone objects related to the target slider
                    const zoneObjects = canvas.getObjects().filter((obj) =>
                    {
                        return obj.zoneClassNumber === opt.target?.zoneClassNumber;
                    });

                    // Check if the slider does not intersect with any zone objects
                    if (zoneObjects.every((obj) => (!(exactSlider.intersectsWithObject(obj)))))
                    {
                        // Reset sliderClassNumber for zone objects
                        zoneObjects.forEach((obj) => obj.set('sliderClassNumber', ''));

                        // Find the last object that has zone class number and has highest z-index
                        const lastZoneObjects = canvas.getObjects().filter((obj) => obj.zoneClassNumber && !obj.sliderClassNumber);

                        // If lastZoneObject is not empty
                        if (lastZoneObjects.length > 0)
                        {
                            // Put our zone and its object on highest z-index
                            const lastObjectIndex: number = canvas.getObjects().indexOf(lastZoneObjects[lastZoneObjects.length - 1]);

                            if (lastObjectIndex !== -1)
                                zoneObjects.forEach((obj) => obj.moveTo(lastObjectIndex));

                            // Set oneZoneGoesOut as the first slider object for notice one zone was removed from the slider
                            sliderConcept.oneZoneGoesOut = exactSlider;
                        }
                    }
                }
                // If the target slider object is selectable
                else
                {
                    // If target is slider or number of slider
                    if (opt.target === exactSlider || opt.target === exactLabel)
                    {
                        // Get all sliders expect target slider
                        const allSlider = canvas.getObjects().filter((obj) =>
                        {
                            return (obj.name === 'slider' && obj.sliderClassNumber !== exactSlider.sliderClassNumber);
                        });

                        // Get all sliders' label expect target slider's label
                        const allLabelSlider = canvas.getObjects().filter((obj) =>
                        {
                            return (obj.name === 'sliderLabel' && obj.sliderClassNumber !== exactLabel.sliderClassNumber);
                        });

                        // Perform transition for slider objects
                        ObjectManager.transition(canvas, sliderObjects, opt, sliderConcept);

                        if (opt.target === exactSlider)
                            exactSlider.setCoords();
                        else
                            exactLabel.setCoords();

                        allSlider.forEach((obj: fabric.Object, index: number) =>
                        {
                            // If current target zone interacts with other zone
                            if (
                                exactSlider.intersectsWithObject(obj) ||
                                exactLabel.intersectsWithObject(obj) ||
                                exactSlider.intersectsWithObject(allLabelSlider[index])
                            )
                            {
                                // Run this method and prevent from coming over other zone
                                ObjectManager.intersectionStopper(sliderObjects, obj, opt, allLabelSlider, index, canvas, sliderConcept);
                            }
                        });
                    }

                    // Set movingSliderObject as the target slider
                    sliderConcept.movingSliderObject = opt.target;
                }
            }
        }
    }

    /**
     * Finalizes the movement of slider objects within the canvas on mouse up events. It adjusts the z-index of the object,
     * checks for intersections with other sliders or zones, and updates the associations between sliders and their
     * corresponding objects. This method ensures that slider objects are correctly positioned and associated after being moved,
     * maintaining the integrity of the layout and interactions within the canvas environment.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - Reference to the fabric canvas instance.
     * @param {fabric.IEvent<Event>} opt - Fabric.js event object containing details about the interaction.
     * @param {sliderConceptType} sliderConcept - Object representing the state and behavior of slider-related interactions.
     */
    static sliderConceptByMouseUp(canvasRef: MutableRefObject<fabric.Canvas | null>, opt: fabric.IEvent<Event>, sliderConcept: sliderConceptType)
    {
        const canvas = canvasRef.current;

        // Proceed only if canvas, target, and pointer are available
        if (canvas && opt.target && opt.pointer)
        {
            const objects = canvas.getObjects();
            // If the moving object is a zone or zoneLabel
            if (sliderConcept.movingObject && (sliderConcept.movingObject.name === 'zone' || sliderConcept.movingObject.name === 'zoneLabel'))
            {
                // Find zone objects related to the moving object
                const zoneObjects = canvas.getObjects().filter((obj) =>
                {
                    return obj.zoneClassNumber === sliderConcept.movingObject?.zoneClassNumber;
                });

                // Find the slider object that intersects with the zone objects
                const sliderObjectThatIsTarget = objects.find((exactSlider) =>
                {
                    return (exactSlider.name === 'slider' && zoneObjects.some((obj) => (exactSlider.intersectsWithObject(obj))));
                });

                if (sliderObjectThatIsTarget)
                    ObjectManager.makeExactZIndexForObjectOfSlider(canvas, sliderObjectThatIsTarget, zoneObjects);
            }
            sliderConcept.movingObject = null;

            // If the target is a zone or zoneLabel and has a sliderClassNumber
            if ((opt.target.name === 'zone' || opt.target.name === 'zoneLabel') && opt.target.sliderClassNumber && !(canvas.getActiveObject() instanceof fabric.Group))
            {
                // Find exact slider, zone, and zoneLabel objects
                const exactSlider: fabric.Object | undefined = objects.find((slide) =>
                {
                    return opt.target?.sliderClassNumber === slide.sliderClassNumber;
                });

                const exactZone: fabric.Object | undefined = objects.find((zone) =>
                {
                    return (opt.target?.zoneClassNumber === zone.zoneClassNumber) && (zone.name === 'zone');
                });

                const exactLabelZone: fabric.Object | undefined = objects.find((label) =>
                {
                    return (opt.target?.zoneClassNumber === label.zoneClassNumber) && (label.name === 'zoneLabel');
                });

                if (exactSlider && exactZone && exactLabelZone)
                {
                    // Resize slider based on contained objects
                    if (!(exactZone.isContainedWithinObject(exactSlider)))
                        ObjectManager.resizeSlider(exactSlider, objects);
                    else if (!(exactLabelZone.isContainedWithinObject(exactSlider)))
                        ObjectManager.resizeSlider(exactSlider, objects);
                    else if (exactZone.isContainedWithinObject(exactSlider) && exactLabelZone.isContainedWithinObject(exactSlider))
                        ObjectManager.resizeSlider(exactSlider, objects);
                }
            }
            else if (sliderConcept.oneZoneGoesOut)
            {
                const exactZone: fabric.Object | undefined = objects.find((zone) =>
                {
                    return (opt.target?.zoneClassNumber === zone.zoneClassNumber) && (zone.name === 'zone');
                });
                if (!exactZone) return;
                ObjectManager.resizeSlider(sliderConcept.oneZoneGoesOut, objects);
                sliderConcept.oneZoneGoesOut = null;
            }
        }
    }

    public static makeExactZIndexForObjectOfSlider(canvas: fabric.Canvas, sliderThatIsTarget: fabric.Object, zoneObjects: fabric.Object[])
    {
        // Find the last slider objects with the same sliderClassNumber as the target slider
        const lastSliderObjects = canvas.getObjects().filter((obj) =>
        {
            return obj.sliderClassNumber === sliderThatIsTarget.sliderClassNumber;
        });

        // If there are any slider objects found
        if (lastSliderObjects.length > 0)
        {
            // Get the last object in the filtered list
            const lastObject = lastSliderObjects[lastSliderObjects.length - 1];
            // Find the index of the last object in the canvas object list
            let lastObjectIndex: number = canvas.getObjects().indexOf(lastObject);

            // If the last object index is valid
            if (lastObjectIndex !== -1)
            {
                // Move each zone object to a position after the last slider object
                zoneObjects.forEach((obj) => obj.moveTo(++lastObjectIndex));
            }
        }

        // Set sliderClassNumber for each zone object to match the target slider
        zoneObjects.forEach((obj) =>
        {
            obj.set('sliderClassNumber', sliderThatIsTarget.sliderClassNumber);
        });

        // Discard the active object and re-render the canvas
        canvas.discardActiveObject().renderAll();
    }

    /**
     * Dynamically adjusts the size of a slider to fit around its associated objects. This method
     * is called after moving objects within or near a slider to ensure the slider accurately reflects
     * the spatial requirements of its contents. It calculates the minimum bounding box needed to
     * encompass all associated objects and then resizes the slider accordingly.
     *
     * @param {fabric.Object} slider - The slider object to be resized.
     * @param {Array<fabric.Object>} objects - An array of all objects on the canvas.
     * @param {fabric.Canvas} canvas - The fabric canvas instance.
     */
    public static resizeSlider(slider: fabric.Object, objects: Array<fabric.Object>)
    {
        // Filter slider-related objects excluding the slider and its label
        const sliderObjects: Array<fabric.Object> = objects.filter((obj) =>
        {
            return (obj.sliderClassNumber === slider.sliderClassNumber) && (obj.name === 'zone' || obj.name === 'zoneLabel');
        });

        // Proceed if there are slider-related objects
        if (sliderObjects.length > 0)
        {
            // Initialize arrays to store dimensions
            const leftNumberArray: Array<number> = [];
            const leftPlusWidthNumberArray: Array<number> = [];
            const topNumberArray: Array<number> = [];
            const topPlusHeightNumberArray: Array<number> = [];

            // Iterate through slider-related objects to calculate dimensions
            sliderObjects.forEach((obj) =>
            {
                leftNumberArray.push(obj.left || 0);
                leftPlusWidthNumberArray.push(((obj.left || 0) + (obj.getScaledWidth() || 0)));
                topNumberArray.push(obj.top || 0);
                topPlusHeightNumberArray.push(((obj.top || 0) + (obj.getScaledHeight() || 0)));
            });

            // Calculate new dimensions for the slider and its label
            const sliderLeft = (Math.min(...leftNumberArray) - 50);
            const sliderWidth = ((Math.max(...leftPlusWidthNumberArray) - sliderLeft) + 50);
            const sliderTop = (Math.min(...topNumberArray) - 50);
            const sliderHeight = ((Math.max(...topPlusHeightNumberArray) - sliderTop) + 50);

            // Find the exact slider label object
            const exactSliderLabel: fabric.Object | undefined = objects.find((label) =>
            {
                return (label.sliderClassNumber === slider.sliderClassNumber && label.name === 'sliderLabel');
            });

            // Set new dimensions and positions for the slider and its label, then render the canvas
            slider.set('left', sliderLeft);
            slider.set('width', sliderWidth);
            slider.set('top', sliderTop);
            slider.set('height', sliderHeight);
            exactSliderLabel?.set('left', (sliderLeft + sliderWidth));
            exactSliderLabel?.set('top', sliderTop);
            slider.setCoords();
            exactSliderLabel?.setCoords();
        }

        if (!slider.get('selectable'))
            slider.selectable = true;
    }

    /**
     * Set the distance of transition for a container concept.
     * @param containerConcept The container concept (zoneConcept or sliderConcept).
     * @param containerObjects Array of related objects belonging to the container.
     * @param exactContainer The exact container object.
     */
    public static setDistanceOfTransition(containerConcept: zoneConceptType | sliderConceptType, containerObjects: Array<fabric.Object>, exactContainer: fabric.Object)
    {
        // Initialize constantPosition properties for x and y coordinates
        containerConcept.constantPosition.x = [];
        containerConcept.constantPosition.y = [];

        // Iterate over container objects to calculate distances
        containerObjects.forEach((e: fabric.Object) =>
        {
            // Calculate distance from container object to exact container for x coordinate
            const left = (e?.left || 0) - (exactContainer.left || 0);
            containerConcept.constantPosition.x.push(left);

            // Calculate distance from container object to exact container for y coordinate
            const top = (e?.top || 0) - (exactContainer.top || 0);
            containerConcept.constantPosition.y.push(top);
        });
    }

    /**
     * Updates the positions of associated objects based on pre-calculated distances of transition.
     * This method ensures that when a reference object within a container (like a zone or slider) is moved,
     * all related objects transition smoothly while maintaining their relative spatial relationships to the reference object.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance where objects are being manipulated.
     * @param {Array<fabric.Object>} containerObjects - The array of objects contained within the same container,
     *        including the object being moved. This ensures all objects move in a coordinated manner.
     * @param {fabric.IEvent<Event>} opt - The Fabric.js event object containing details about the ongoing interaction,
     *        including the target object being moved.
     * @param {zoneConceptType | sliderConceptType} containerConcept - The container concept object, capturing the state
     *        and behavior of the container (zone or slider) and its associated objects.
     */
    private static transition(canvas: fabric.Canvas, containerObjects: Array<fabric.Object>, opt: fabric.IEvent<Event>, containerConcept: zoneConceptType | sliderConceptType)
    {
        // Iterate through container objects to transition their positions
        containerObjects.forEach((e: fabric.Object, index: number) =>
        {
            e.set('left', (opt.target?.left || 0) + (containerConcept.constantPosition.x[index] || 0));
            e.set('top', (opt.target?.top || 0) + (containerConcept.constantPosition.y[index] || 0));

            // Update coordinates and render the canvas
            e.setCoords();
            canvas.renderAll();
        });
    }

    /**
     * Prevents intersections between objects by dynamically adjusting their positions on the canvas.
     * When a draggable object (like a zone or slider) is moved and comes into potential overlap with
     * another object, this method calculates the necessary adjustments to prevent the overlap, ensuring
     * that objects maintain their designated spaces without unintended intersections.
     *
     * @param {Array<fabric.Object>} containerObjects - The array of objects being manipulated, typically within a zone or slider.
     * @param {fabric.Object} conflictedContainer - The object with which the container objects might intersect.
     * @param {fabric.IEvent<Event>} opt - The Fabric.js event object containing details about the interaction.
     * @param {Array<fabric.Object>} allLabelContainer - An array of label objects associated with the container, used for position adjustments.
     * @param {number} index - The index of the conflicted object, aiding in identifying and adjusting the correct objects.
     * @param {fabric.Canvas} canvas - The fabric canvas instance.
     * @param {zoneConceptType | sliderConceptType} containerConcept - The container concept capturing the state and behavior of the container and its objects.
     */
    private static intersectionStopper(
        containerObjects: Array<fabric.Object>,
        conflictedContainer: fabric.Object,
        opt: fabric.IEvent<Event>,
        allLabelContainer: Array<fabric.Object>,
        index: number,
        canvas: fabric.Canvas,
        containerConcept: zoneConceptType | sliderConceptType
    )
    {
        const exactContainer = containerObjects.find(obj => obj.name === 'zone' || obj.name === 'slider');
        const exactLabel = containerObjects.find(obj => obj.name === 'zoneLabel' || obj.name === 'sliderLabel');

        if (!exactContainer || !exactLabel) return;

        // Calculate distances between the container and the conflicted container.
        const distX: number = (((conflictedContainer.left || 0) + conflictedContainer.getScaledWidth())) - (((exactContainer.left || 0) + exactContainer.getScaledWidth()) + (exactLabel.getScaledWidth()));
        const distY: number = (((conflictedContainer.top || 0) + conflictedContainer.getScaledHeight())) - (((exactContainer.top || 0) + exactContainer.getScaledHeight()));

        // Handle intersection based on the position of the target label
        if (opt.target === exactLabel)
        {
            if (Math.abs(distX) > Math.abs(distY))
            {
                if (distX > 0)
                    exactLabel.set('left', ((conflictedContainer.left || 0) - exactLabel.getScaledWidth()));
                else
                {
                    if (exactContainer.intersectsWithObject(allLabelContainer[index]))
                        exactLabel.set('left', ((conflictedContainer.left || 0) + conflictedContainer.getScaledWidth() + allLabelContainer[index].getScaledWidth()) + exactContainer.getScaledWidth());
                    else
                        exactLabel.set('left', ((conflictedContainer.left || 0) + conflictedContainer.getScaledWidth()) + exactContainer.getScaledWidth());
                }
            }
            else
            {
                if (distY > 0)
                    exactLabel.set('top', (conflictedContainer.top || 0) - exactContainer.getScaledHeight());
                else
                    exactLabel.set('top', (conflictedContainer.top || 0) + conflictedContainer.getScaledHeight());
            }
        }
        // Handle intersection based on the position of the target.
        else if (opt.target === exactContainer)
        {
            if (Math.abs(distX) > Math.abs(distY))
            {
                if (distX > 0)
                    exactContainer.set('left', (conflictedContainer.left || 0) - exactContainer.getScaledWidth() - exactLabel.getScaledWidth());
                else
                    if (exactContainer.intersectsWithObject(allLabelContainer[index]))
                        exactContainer.set('left', ((conflictedContainer.left || 0) + conflictedContainer.getScaledWidth()) + allLabelContainer[index].getScaledWidth());
                    else
                        exactContainer.set('left', ((conflictedContainer.left || 0) + conflictedContainer.getScaledWidth()));
            }
            else
            {
                if (distY > 0)
                    exactContainer.set('top', (conflictedContainer.top || 0) - exactContainer.getScaledHeight());
                else
                    exactContainer.set('top', (conflictedContainer.top || 0) + conflictedContainer.getScaledHeight());
            }
        }

        // Transition the container objects after resolving intersection
        ObjectManager.transition(canvas, containerObjects, opt, containerConcept);
    }

    /**
     * Finds the highest z-index among objects with a specific slider class number and
     * adjusts the z-index of a newly added container and its label to follow this order.
     * This ensures that newly added sliders or zones are correctly layered in relation to
     * existing ones, maintaining a coherent visual structure on the canvas.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance where objects are being manipulated.
     * @param {fabric.Object} newContainer - The new container object being added to the canvas.
     * @param {fabric.Object} newLabel - The label object associated with the new container.
     * @param {MutableRefObject<number>} numberOfSlider - A reference to the current count of sliders,
     *        used to identify the last slider class number for z-index adjustments.
     */
    static findLastSliderClassNumberZIndex(
        canvas: fabric.Canvas,
        newContainer: fabric.Object,
        newLabel: fabric.Object,
        numberOfSlider: MutableRefObject<number>
    )
    {
        // Find objects with the last slider class number
        const lastSliderObjects = canvas.getObjects().filter((obj) =>
        {
            return obj.sliderClassNumber === 'slider' + (numberOfSlider.current - 1);
        });

        if (lastSliderObjects.length > 0)
        {
            // Get the index of the last object with the last slider class number
            const lastObject = lastSliderObjects[lastSliderObjects.length - 1];
            const lastObjectIndex = canvas.getObjects().indexOf(lastObject);

            if (lastObjectIndex !== -1)
            {
                // Move new container and label to the z-index after the last slider object
                newContainer.moveTo(lastObjectIndex + 1);
                newLabel.moveTo(lastObjectIndex + 2);
            }
        }
    }

    /**
     * This function retrieves the dimensions and position of a fabric object on a canvas for putting the returned value in inputs state.
     * @param canvas The fabric canvas.
     * @param fabricObj The fabric object.
     * @returns An object containing the dimensions and position (x, y, width, height) of the fabric object.
     */
    public static dimensionAndPositionGetter(canvas: fabric.Canvas | undefined | null = undefined, fabricObj: fabric.Object | null | undefined = undefined)
    {
        if (canvas)
        {
            if (fabricObj)
            {
                // If the fabric object is a zone label
                if (fabricObj.name === 'zoneLabel')
                {
                    // Find the exact zone corresponding to the zone label
                    const exactZone = canvas.getObjects().find((obj) => obj.zoneClassNumber === fabricObj.zoneClassNumber && obj.name === 'zone');

                    const relatedSlider = canvas.getObjects().find(obj => obj.sliderClassNumber === fabricObj.sliderClassNumber && obj.name === 'slider');
                    if (exactZone)
                    {
                        // Return dimensions and position of the exact zone
                        return {
                            x: String(Math.round(exactZone.left || 0)),
                            y: String(Math.round(exactZone.top || 0)),
                            width: String(Math.round(exactZone.getScaledWidth() - exactZone.strokeWidth!)),
                            height: String(Math.round(exactZone.getScaledHeight() - exactZone.strokeWidth!)),
                            label: exactZone.label,
                            container: relatedSlider?.label || '--'
                        };
                    }
                }
                // If the fabric object is a slider label
                else if (fabricObj.name === 'sliderLabel')
                {
                    // Find the exact slider corresponding to the slider label
                    const exactSlider = canvas.getObjects().find((obj) => obj.sliderClassNumber === fabricObj.sliderClassNumber && obj.name === 'slider');

                    if (exactSlider)
                    {
                        // Return dimensions and position of the exact slider
                        return {
                            x: String(Math.round(exactSlider.left || 0)),
                            y: String(Math.round(exactSlider.top || 0)),
                            width: String(Math.round(exactSlider.getScaledWidth() - exactSlider.strokeWidth!)),
                            height: String(Math.round(exactSlider.getScaledHeight() - exactSlider.strokeWidth!)),
                            label: exactSlider.label,
                            container: '--'
                        };
                    }
                }
                else
                {
                    // If the fabric object has a zoneClassNumber property
                    if (fabricObj.zoneClassNumber)
                    {
                        const exactZone = canvas.getObjects().find((obj) => obj.zoneClassNumber === fabricObj.zoneClassNumber && obj.name === 'zone');

                        if (exactZone !== fabricObj)
                        {
                            // Return dimensions and position relative to the exact zone
                            return {
                                x: String(Math.round(fabricObj.left! - (exactZone?.left || 0))),
                                y: String(Math.round(fabricObj.top! - (exactZone?.top || 0))),
                                width: String(Math.round(fabricObj.getScaledWidth() - fabricObj.strokeWidth!)),
                                height: String(Math.round(fabricObj.getScaledHeight() - fabricObj.strokeWidth!)),
                                label: fabricObj.label,
                                container: exactZone?.label
                            };
                        }
                        else
                        {
                            const relatedSlider = canvas.getObjects().find(obj => obj.sliderClassNumber === fabricObj.sliderClassNumber && obj.name === 'slider');
                            return {
                                x: String(Math.round(exactZone?.left || 0)),
                                y: String(Math.round(exactZone?.top || 0)),
                                width: String(Math.round(fabricObj.getScaledWidth() - fabricObj.strokeWidth!)),
                                height: String(Math.round(fabricObj.getScaledHeight() - fabricObj.strokeWidth!)),
                                label: fabricObj.label,
                                container: relatedSlider?.label || '--'
                            };
                        }
                    }
                    // If the fabric object is a group and all its objects have a zoneClassNumber property
                    else if (fabricObj instanceof fabric.Group && fabricObj.getObjects().every(obj => obj.zoneClassNumber))
                    {
                        const exactZone = canvas.getObjects().find((obj) => obj.zoneClassNumber === fabricObj.getObjects()[0].zoneClassNumber && obj.name === 'zone');

                        if (exactZone)
                        {
                            // Return dimensions and position relative to the exact zone
                            return {
                                x: String(Math.round(fabricObj.left! - (exactZone?.left || 0))),
                                y: String(Math.round(fabricObj.top! - (exactZone?.top || 0))),
                                width: String(Math.round(fabricObj.getScaledWidth() - fabricObj.strokeWidth!)),
                                height: String(Math.round(fabricObj.getScaledHeight() - fabricObj.strokeWidth!)),
                                label: fabricObj.label,
                                container: exactZone.label
                            };
                        }
                    }

                    // Return dimensions and position of the fabric object
                    return {
                        x: String(Math.round(fabricObj.left || 0)),
                        y: String(Math.round(fabricObj.top || 0)),
                        width: String(Math.round(fabricObj.getScaledWidth() - fabricObj.strokeWidth!)),
                        height: String(Math.round(fabricObj.getScaledHeight() - fabricObj.strokeWidth!)),
                        label: fabricObj.label,
                        container: '--'
                    };
                }
            }
        }
        // If either canvas or fabricObj is undefined or null, return default dimensions and position
        return { x: '0', y: '0', width: '0', height: '0', label: 'canvas', container: '--' };
    }

    /**
     * This function sets a specific property of the dimension and position state
     * using the provided handleSetDimensionAndPosition function.
     * @param valueOfInput The new value for the specified property.
     * @param handleSetDimensionAndPosition A function to update the dimension and position state.
     * @param property The property to update.
     */
    private static dimensionSetter(
        valueOfInput: string,
        handleSetDimensionAndPosition: (functionThatPassesToSetDimensionAndPosition: (valueState: DimensionAndPositionType | undefined) => DimensionAndPositionType | undefined) => void,
        property: string)
    {
        // Call the handleSetDimensionAndPosition function to update the dimension and position state
        handleSetDimensionAndPosition((valueState: DimensionAndPositionType | undefined) =>
        {
            // If the valueState is defined, update the specified property
            if (valueState)
                // Return a new object with the updated property
                return { ...valueState, [property]: valueOfInput };
        });
    }

    /**
     * This function handles the change in dimension of an object on the canvas.
     * @param canvas The fabric canvas.
     * @param valueOfInput The new value for the specified property.
     * @param handleSetDimensionAndPosition A function to update the dimension and position state.
     * @param property The property to update.
     * @param dimensionAndPosition The current dimension and position state.
     */
    public static onChangeDimension(
        canvas: fabric.Canvas | null,
        valueOfInput: string,
        handleSetDimensionAndPosition: (functionThatPassesToSetDimensionAndPosition: (valueState: DimensionAndPositionType | undefined) => DimensionAndPositionType | undefined) => void,
        property: string,
        dimensionAndPosition: DimensionAndPositionType | undefined)
    {
        // Check if there is an active object on the canvas or if dimensionAndPosition is undefined
        if (
            !(canvas?.getActiveObject()) ||
            canvas?.getActiveObject()?.name === 'slider' ||
            canvas?.getActiveObject()?.name === 'sliderLabel' ||
            (canvas?.getActiveObject()?.name === 'zoneLabel' && property === 'width') ||
            (canvas?.getActiveObject()?.name === 'zone' && property === 'width') ||
            !dimensionAndPosition
        )
            return; // Exit the function if conditions are not met

        // Check if the difference between the new value and the current value is 1
        // and both the current value and the new value are not empty strings
        if (
            Math.abs(Number(valueOfInput) - Number(dimensionAndPosition[property as keyof typeof dimensionAndPosition])) === 1 &&
            dimensionAndPosition[property as keyof typeof dimensionAndPosition] !== '' &&
            valueOfInput !== ''
        )
        {
            // Get the selected object on the canvas
            const selectedObject: fabric.Object | null = canvas.getActiveObject();
            if (!(selectedObject))
                return; // Exit the function if selectedObject is null

            if (selectedObject.name === 'zoneLabel')
            {
                // Find related zone
                const relatedZone = canvas.getObjects().find(obj =>
                {
                    return obj.name === 'zone' && obj.zoneClassNumber === selectedObject.zoneClassNumber;
                });
                // Set the specified property of the selected object to the new value
                relatedZone?.set(property as keyof typeof selectedObject, Number(valueOfInput));
            }
            else
            {
                // Set the specified property of the selected object to the new value
                selectedObject.set(property as keyof typeof selectedObject, Number(valueOfInput));
            }
            canvas.renderAll(); // Render the canvas to reflect the changes
        }

        // Call the dimensionSetter function to update the dimension and position state
        ObjectManager.dimensionSetter(valueOfInput, handleSetDimensionAndPosition, property);
    }

    /**
     * This function handles the onBlur event for changing the dimension of an object on the canvas.
     * @param canvas The fabric canvas.
     * @param valueOfInput The new value for the specified property.
     * @param handleSetDimensionAndPosition A function to update the dimension and position state.
     * @param property The property to update.
     */
    public static onBlurDimension(
        canvas: fabric.Canvas | null,
        valueOfInput: string,
        handleSetDimensionAndPosition: (functionThatPassesToSetDimensionAndPosition: (valueState: DimensionAndPositionType | undefined) => DimensionAndPositionType | undefined) => void,
        property: string)
    {
        // Check if there is an active object on the canvas and if it's not a slider or zone object
        if (
            !(canvas?.getActiveObject()) ||
            canvas?.getActiveObject()?.name === 'slider' ||
            canvas?.getActiveObject()?.name === 'sliderLabel' ||
            (canvas?.getActiveObject()?.name === 'zoneLabel' && property === 'width') ||
            (canvas?.getActiveObject()?.name === 'zone' && property === 'width')
        )
            return; // Exit the function if conditions are not met

        // Get the selected object on the canvas
        const selectedObject: fabric.Object | null = canvas.getActiveObject();
        if (!(selectedObject)) return; // Exit the function if selectedObject is null

        // If the value of input is empty
        if (valueOfInput === '')
        {
            // Update the dimension and position state with the rounded value of the selected object's property
            if (selectedObject.name === 'zoneLabel')
            {
                // Find related zone
                const relatedZone = canvas.getObjects().find(obj =>
                {
                    return obj.name === 'zone' && obj.zoneClassNumber === selectedObject.zoneClassNumber;
                });
                handleSetDimensionAndPosition(valueState =>
                {
                    if (valueState)
                        return ({ ...valueState, [property]: String(Math.round(relatedZone?.get(property as keyof typeof relatedZone))) });
                });
            }
            else
            {
                handleSetDimensionAndPosition(valueState =>
                {
                    if (valueState)
                        return ({ ...valueState, [property]: String(Math.round(selectedObject.get(property as keyof typeof selectedObject))) });
                });
            }
        }
        else
        {
            if (selectedObject.name === 'zoneLabel')
            {
                // Find related zone
                const relatedZone = canvas.getObjects().find(obj =>
                {
                    return obj.name === 'zone' && obj.zoneClassNumber === selectedObject.zoneClassNumber;
                });
                // Set the specified property of the selected object to the new value
                relatedZone?.set(property as keyof typeof relatedZone, Number(valueOfInput));
            }
            else
            {
                // Set the specified property of the selected object to the new value
                selectedObject.set(property as keyof typeof selectedObject, Number(valueOfInput));
            }
            canvas.renderAll(); // Render the canvas to reflect the changes
        }
    }

    /**
     * Handles onChange event for changing the position of an object on the canvas.
     * @param canvas The fabric canvas.
     * @param valueOfInput The new value for the specified property.
     * @param handleSetDimensionAndPosition A function to update the dimension and position state.
     * @param propertyOfFabric The property of the fabric object to update.
     * @param dimensionAndPosition The current dimension and position state.
     * @param propertyOfState The property of the state to update.
     */
    public static onChangePosition(
        canvas: fabric.Canvas | null,
        valueOfInput: string,
        handleSetDimensionAndPosition: (functionThatPassesToSetDimensionAndPosition: (valueState: DimensionAndPositionType | undefined) => DimensionAndPositionType | undefined) => void,
        propertyOfFabric: string,
        dimensionAndPosition: DimensionAndPositionType | undefined,
        propertyOfState: string
    )
    {
        // Check if there is an active object on the canvas or if it's a slider or zone object
        if (
            !(canvas?.getActiveObject()) ||
            canvas?.getActiveObject()?.name === 'slider' ||
            canvas?.getActiveObject()?.name === 'sliderLabel' ||
            !dimensionAndPosition
        )
            return; // Exit the function if conditions are not met

        // If the difference between the new value and the current value is 1 and both values are not empty
        if (
            Math.abs(Number(valueOfInput) - Number(dimensionAndPosition[propertyOfState as keyof DimensionAndPositionType])) === 1 &&
            dimensionAndPosition[propertyOfState as keyof DimensionAndPositionType] !== '' &&
            valueOfInput !== ''
        )
        {
            // Get the selected object on the canvas
            const selectedObject: fabric.Object | null = canvas.getActiveObject();
            if (!(selectedObject)) return; // Exit the function if selectedObject is null

            // If the selected object has a zoneClassNumber property or is a group with all objects having a zoneClassNumber property
            if (
                selectedObject.zoneClassNumber ||
                (selectedObject instanceof fabric.Group && selectedObject.getObjects().every(obj => obj.zoneClassNumber))
            )
            {
                // If the selected object is a zone or zoneLabel
                if (selectedObject.name === 'zone' || selectedObject.name === 'zoneLabel')
                {
                    // Find the exact zone and label corresponding to the selected object
                    const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === selectedObject.zoneClassNumber && obj.name === 'zone');

                    const exactLabel = canvas.getObjects().find(obj => obj.zoneClassNumber === selectedObject.zoneClassNumber && obj.name === 'zoneLabel');

                    if (!exactZone && !exactLabel)
                        return; // Exit the function if exactZone or exactLabel is not found

                    // Find other zones and labels
                    const otherZones = canvas.getObjects().filter(obj => obj.name === 'zone' && obj.zoneClassNumber !== exactZone?.zoneClassNumber);

                    const otherZonesLabels = canvas.getObjects().filter(obj => obj.name === 'zoneLabel' && obj.zoneClassNumber !== exactLabel?.zoneClassNumber);

                    // Find objects belonging to the exact zone
                    const exactZoneObjects = canvas.getObjects().filter(obj => obj.zoneClassNumber === exactZone?.zoneClassNumber);

                    // Calculate distances between objects in the exact zone
                    const distanceArray: Array<number | null> = [];
                    exactZoneObjects.forEach(obj => distanceArray.push((obj.get(propertyOfFabric as keyof typeof exactZone)) - (exactZone?.get(propertyOfFabric as keyof typeof exactZone))));

                    // Update position of objects in the exact zone
                    exactZoneObjects.forEach((obj, index) =>
                    {
                        obj.set(propertyOfFabric as keyof typeof obj, Number(valueOfInput) + (distanceArray[index] || 0));
                        obj.setCoords();
                    });

                    canvas.renderAll(); // Render the canvas to reflect the changes

                    // Check for intersection with other zones and labels
                    const intersectionResult = otherZones.some((zone, index) =>
                        exactZone?.intersectsWithObject(zone) || exactZone?.intersectsWithObject(otherZonesLabels[index]) ||
                        exactLabel?.intersectsWithObject(zone)
                    );

                    if (intersectionResult)
                    {
                        alert('cross'); // Display alert for intersection

                        // Reset position of objects in the exact zone
                        exactZoneObjects.forEach((obj, index) =>
                        {
                            obj.set(propertyOfFabric as keyof typeof obj, (exactZone?.get(propertyOfFabric as keyof typeof exactZone)) + (distanceArray[index]));
                            obj.setCoords();
                        });

                        // Render the canvas to reflect the changes
                        canvas.renderAll();

                        valueOfInput = String(Math.round(exactZone?.get(propertyOfFabric as keyof typeof exactZone)));
                    }
                }
                else
                {
                    // If the selected object is not a zone or zoneLabel
                    const exactZone = canvas.getObjects().find(obj =>
                        (obj.zoneClassNumber === selectedObject.zoneClassNumber ||
                        (selectedObject instanceof fabric.Group && obj.zoneClassNumber === selectedObject.getObjects()[0].zoneClassNumber)) &&
                        (obj.name === 'zone')
                    );

                    // Update position of the selected object
                    selectedObject.set(propertyOfFabric as keyof typeof selectedObject, Number(valueOfInput) + (exactZone?.get(propertyOfFabric as keyof typeof exactZone)));

                    // Render the canvas to reflect the changes
                    canvas.renderAll();

                    // If the selected object does not intersect with the exact zone
                    if (!(exactZone?.intersectsWithObject(selectedObject)))
                    {
                        // Reset zoneClassNumber property and move the selected object to the top
                        if (selectedObject instanceof fabric.Group)
                        {
                            selectedObject.getObjects().forEach(obj =>
                            {
                                obj.set('zoneClassNumber', undefined);
                                obj.moveTo(canvas!.getObjects().length);
                            });
                        }
                        else
                        {
                            selectedObject.set('zoneClassNumber', undefined);
                            selectedObject.moveTo(canvas!.getObjects().length);
                        }

                        valueOfInput = String(Math.round(selectedObject.get(propertyOfFabric as keyof typeof selectedObject)));
                        canvas.renderAll(); // Render the canvas to reflect the changes
                    }
                }
            }
            else
            {
                // If the selected object does not have a zoneClassNumber property
                // Update position of the selected object
                selectedObject.set(propertyOfFabric as keyof typeof selectedObject, Number(valueOfInput));

                // Render the canvas to reflect the changes
                canvas.renderAll();
            }
        }

        // Call the dimensionSetter function to update the dimension and position state
        ObjectManager.dimensionSetter(valueOfInput, handleSetDimensionAndPosition, propertyOfState);
    }

    /**
     * Handles onBlur event for changing the position of an object on the canvas.
     * @param canvas The fabric canvas.
     * @param valueOfInput The new value for the specified property.
     * @param handleSetDimensionAndPosition A function to update the dimension and position state.
     * @param propertyOfFabric The property of the fabric object to update.
     * @param propertyOfState The property of the state to update.
     */
    public static onBlurPosition(
        canvas: fabric.Canvas | null,
        valueOfInput: string,
        handleSetDimensionAndPosition: (functionThatPassesToSetDimensionAndPosition: (valueState: DimensionAndPositionType | undefined) => DimensionAndPositionType | undefined) => void,
        propertyOfFabric: string,
        propertyOfState: string
    )
    {
        // Check if there is an active object on the canvas or if it's a slider or sliderLabel
        if (
            !(canvas?.getActiveObject()) ||
            canvas?.getActiveObject()?.name === 'slider' ||
            canvas?.getActiveObject()?.name === 'sliderLabel'
        )
            return; // Exit the function if conditions are not met

        // Get the selected object on the canvas
        const selectedObject: fabric.Object | null = canvas.getActiveObject();
        if (!(selectedObject))
            return; // Exit the function if selectedObject is null

        // If the value of input is empty
        if (valueOfInput === '')
        {
            // Calculate the value of input based on the properties of the selected object
            if (selectedObject.zoneClassNumber)
            {
                const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === selectedObject.zoneClassNumber && obj.name === 'zone');
                if (!exactZone)
                    return; // Exit the function if exactZone is not found

                if (selectedObject.name === 'zoneLabel' || selectedObject.name === 'zone')
                    valueOfInput = String(Math.round(exactZone.get(propertyOfFabric as keyof typeof selectedObject)));
                else
                    valueOfInput = String(Math.round(((selectedObject.get(propertyOfFabric as keyof typeof selectedObject)) - (exactZone.get(propertyOfFabric as keyof typeof selectedObject)))));
            }
            else
                valueOfInput = String(Math.round(selectedObject.get(propertyOfFabric as keyof typeof selectedObject)));
        }
        else
        {
            // If the selected object has a zoneClassNumber property or is a group with all objects having a zoneClassNumber property
            if (
                selectedObject.zoneClassNumber ||
                (selectedObject instanceof fabric.Group && selectedObject.getObjects().every(obj => obj.zoneClassNumber))
            )
            {
                // If the selected object is a zone or zoneLabel
                if (selectedObject.name === 'zone' || selectedObject.name === 'zoneLabel')
                {
                    // Find the exact zone and label corresponding to the selected object
                    const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === selectedObject.zoneClassNumber && obj.name === 'zone');

                    const exactLabel = canvas.getObjects().find(obj => obj.zoneClassNumber === selectedObject.zoneClassNumber && obj.name === 'zoneLabel');
                    if (!exactZone && !exactLabel)
                        return; // Exit the function if exactZone or exactLabel is not found

                    // Find other zones and labels
                    const otherZones = canvas.getObjects().filter(obj => obj.name === 'zone' && obj.zoneClassNumber !== exactZone?.zoneClassNumber);
                    const otherZonesLabels = canvas.getObjects().filter(obj => obj.name === 'zoneLabel' && obj.zoneClassNumber !== exactLabel?.zoneClassNumber);

                    // Find objects belonging to the exact zone
                    const exactZoneObjects = canvas.getObjects().filter(obj => obj.zoneClassNumber === exactZone?.zoneClassNumber);

                    // Calculate distances between objects in the exact zone
                    const xArray: Array<number | null> = [];
                    const previousZoneX = exactZone?.get(propertyOfFabric as keyof typeof selectedObject);

                    exactZoneObjects.forEach(obj => xArray.push(((obj.get(propertyOfFabric as keyof typeof selectedObject)) - (exactZone?.get(propertyOfFabric as keyof typeof selectedObject)))));

                    // Update position of objects in the exact zone
                    exactZoneObjects.forEach((obj, index) =>
                    {
                        obj.set(propertyOfFabric as keyof typeof selectedObject, Number(valueOfInput) + (xArray[index] || 0));
                        obj.setCoords();
                    });

                    // Check if the exact zone has a sliderClassNumber property
                    if (exactZone?.sliderClassNumber)
                    {
                        // Find the exact slider corresponding to the exact zone
                        const exactSlider = canvas.getObjects().find(obj => obj.sliderClassNumber === exactZone.sliderClassNumber && obj.name === 'slider');

                        // Resize the exact slider
                        ObjectManager.resizeSlider(exactSlider!, canvas.getObjects());
                    }

                    canvas.renderAll(); // Render the canvas to reflect the changes

                    // Check for intersection with other zones and labels
                    const intersectionResult = otherZones.some((zone, index) =>
                        exactZone?.intersectsWithObject(zone) || exactZone?.intersectsWithObject(otherZonesLabels[index]) ||
                        exactLabel?.intersectsWithObject(zone)
                    );
                    if (intersectionResult)
                    {
                        alert('cross');

                        // Restore previous positions if there's an intersection
                        exactZoneObjects.forEach((obj, index) =>
                        {
                            obj.set(propertyOfFabric as keyof typeof selectedObject, (previousZoneX || 0) + (xArray[index] || 0));
                            obj.setCoords();
                        });

                        canvas.renderAll();
                        valueOfInput = String(Math.round(previousZoneX || 0));
                    }
                }
                else
                {
                    // If the selected object is not a zone or zoneLabel
                    const exactZone = canvas.getObjects().find(obj =>
                        ((obj.zoneClassNumber === selectedObject.zoneClassNumber ||
                        (selectedObject instanceof fabric.Group && obj.zoneClassNumber === selectedObject.getObjects()[0].zoneClassNumber)) &&
                        (obj.name === 'zone'))
                    );

                    // Update position of the selected object
                    selectedObject.set(propertyOfFabric as keyof typeof selectedObject, Number(valueOfInput) + (exactZone?.get(propertyOfFabric as keyof typeof selectedObject)));

                    canvas.renderAll(); // Render the canvas to reflect the changes

                    // If the selected object does not intersect with the exact zone
                    if (!(exactZone?.intersectsWithObject(selectedObject)))
                    {
                        // Reset zoneClassNumber property and move the selected object to the top
                        if (selectedObject instanceof fabric.Group)
                        {
                            selectedObject.getObjects().forEach(obj =>
                            {
                                obj.set('zoneClassNumber', undefined);
                                obj.moveTo(canvas!.getObjects().length);
                            });
                        }
                        else
                        {
                            selectedObject.set('zoneClassNumber', undefined);
                            selectedObject.moveTo(canvas!.getObjects().length);
                        }

                        // Render the canvas to reflect the changes
                        canvas.renderAll();
                        valueOfInput = String(Math.round(selectedObject.get(propertyOfFabric as keyof typeof selectedObject)));
                    }
                }
            }
            else
            {
                // If the selected object does not have a zoneClassNumber property
                // Update position of the selected object
                selectedObject.set(propertyOfFabric as keyof typeof selectedObject, Number(valueOfInput));
                canvas.renderAll(); // Render the canvas to reflect the changes
            }
        }

        // Call the dimensionSetter function to update the dimension and position state
        ObjectManager.dimensionSetter(valueOfInput, handleSetDimensionAndPosition, propertyOfState);
    }

    // Define a static method named 'clickButtonText' which belongs to a class
    // This method takes six parameters:
    // 'mood' of type MutableRefObject<textStyleMoodRef>,
    // 'moodProperty' of type string,
    // 'textBox' of type fabric.Textbox,
    // 'canvas' of type fabric.Canvas,
    // 'keyStyle' of type string,
    // 'valueStyle' of type string,
    // and 'element' of type HTMLElement
    public static clickButtonText(mood: MutableRefObject<textStyleMoodRef>, moodProperty: string, textBox: fabric.Textbox, canvas: fabric.Canvas, keyStyle: string, valueStyle: string, element: HTMLElement)
    {
        // Check the mood of textStyle and if it is false and the button pressed the below code run
        if (!mood.current[moodProperty as keyof textStyleMoodRef])
        {
            // Set the style for the selected characters
            if (textBox.isEditing)
                textBox.setSelectionStyles({ [keyStyle]: valueStyle }, textBox.selectionStart, textBox.selectionEnd);
            else
                textBox.setSelectionStyles({ [keyStyle]: valueStyle }, 0, textBox.text?.length);

            canvas.renderAll();

            // Make the mood true
            mood.current[moodProperty as keyof textStyleMoodRef] = true;

            // If the style is bold
            if (moodProperty === 'boldMood')
            {
                const checkBox: HTMLInputElement = element as HTMLInputElement;
                checkBox.checked = true;
            }
            // If the style is not bold change the button background
            else
                element.style.backgroundColor = 'rgb(79 70 229 / 0.2)';
        }
        // If the mood of the button is true meant the button is on and the selected characters has the exact style
        else
        {
            // Set the normal style for selected characters
            if (textBox.isEditing)
                textBox.setSelectionStyles({ [keyStyle]: textBox.get(keyStyle as keyof typeof textBox) }, textBox.selectionStart, textBox.selectionEnd);
            else
                textBox.setSelectionStyles({ [keyStyle]: textBox.get(keyStyle as keyof typeof textBox) }, 0, textBox.text?.length);

            canvas.renderAll();

            // Make the mood false
            mood.current[moodProperty as keyof textStyleMoodRef] = false;

            // If the style is bold
            if (moodProperty === 'boldMood')
            {
                const checkBox: HTMLInputElement = element as HTMLInputElement;
                checkBox.checked = false;
            }
            // If the style is not bold change the button background
            else
                element.style.backgroundColor = '#e5e7eb';
        }
    }

    // Define a static method named 'selectText' which belongs to a class
    // This method takes six parameters:
    // 'mood' of type MutableRefObject<textStyleMoodRef>,
    // 'moodProperty' of type string,
    // 'textBox' of type fabric.Textbox,
    // 'keyStyle' of type string,
    // 'valueStyle' of type string,
    // and 'element' of type HTMLElement
    public static selectText(mood: MutableRefObject<textStyleMoodRef>, moodProperty: string, textBox: fabric.Textbox, keyStyle: string, valueStyle: string, element: HTMLElement)
    {
        if (textBox.isEditing)
        {
            // Find all styles that the selected characters have
            const styleOfCharacters = textBox?.getSelectionStyles(textBox.selectionStart, textBox.selectionEnd, true);

            // The result will be stored here
            let result;

            // If any style exist
            if (styleOfCharacters.length !== 0)
            {
                // If all characters have the style that we want make the result true
                result = styleOfCharacters.every(char =>
                {
                    return char[keyStyle] === valueStyle;
                });
            }

            // If all characters have the exact style or nothing is selected but the last char has style
            if (result || (textBox.selectionEnd === textBox.selectionStart &&
                textBox.getSelectionStyles((textBox.selectionStart || 0) - 1, textBox.selectionEnd, true)[0][keyStyle] === valueStyle))
            {
                // Set the mood true
                mood.current[moodProperty as keyof textStyleMoodRef] = true;

                // If the style is bold
                if (moodProperty === 'boldMood')
                {
                    const checkBox: HTMLInputElement = element as HTMLInputElement;
                    checkBox.checked = true;
                }
                // If the style is not bold change the button background
                else
                    element.style.backgroundColor = 'rgb(79 70 229 / 0.2)';
            }
            else
            {
                // Set the mood true
                mood.current[moodProperty as keyof textStyleMoodRef] = false;

                // If the style is bold
                if (moodProperty === 'boldMood')
                {
                    const checkBox: HTMLInputElement = element as HTMLInputElement;
                    checkBox.checked = false;
                }
                // If the style is not bold change the button background
                else
                    element.style.backgroundColor = '#e5e7eb';
            }
        }
        else
        {
            // Find all styles that the selected characters have
            const styleOfCharacters = textBox.getSelectionStyles(0, textBox.text?.length, true);

            // The result will be stored here
            let result;

            // If any style exist
            if (styleOfCharacters.length !== 0)
            {
                // If all characters have the style that we want make the result true
                result = styleOfCharacters.every(char =>
                {
                    return char[keyStyle] === valueStyle;
                });
            }

            if (result)
            {
                // Set the mood true
                mood.current[moodProperty as keyof textStyleMoodRef] = true;

                // If the style is bold
                if (moodProperty === 'boldMood')
                {
                    const checkBox: HTMLInputElement = element as HTMLInputElement;
                    checkBox.checked = true;
                }
                // If the style is not bold change the button background
                else
                    element.style.backgroundColor = 'rgb(79 70 229 / 0.2)';
            }
            else
            {
                // Set the mood true
                mood.current[moodProperty as keyof textStyleMoodRef] = false;

                // If the style is bold
                if (moodProperty === 'boldMood')
                {
                    const checkBox: HTMLInputElement = element as HTMLInputElement;
                    checkBox.checked = false;
                }
                // If the style is not bold change the button background
                else
                    element.style.backgroundColor = '#e5e7eb';
            }
        }
    }

    // Define a static method named 'selectTextFont' which belongs to a class
    // This method takes one parameter 'textBox' of type fabric.IText and returns a number (font size)
    public static selectTextFont(textBox: fabric.IText, element: HTMLInputElement)
    {
        if (textBox.isEditing)
        {
            if (textBox.selectionStart !== textBox.selectionEnd)
            {
                // Get size of selected characters
                element.value = textBox.getSelectionStyles(textBox.selectionStart, textBox.selectionEnd, true)[0].fontSize;
            }
            else
                element.value = textBox.getSelectionStyles((textBox.selectionStart || 0) - 1, textBox.selectionEnd, true)[0].fontSize;
        }
        else
            element.value = textBox.getSelectionStyles(0, textBox.text?.length, true)[0].fontSize;
    }

    public static selectTextBoldForBoldRange(textBox: fabric.IText, rangeElement: HTMLInputElement, textElement: HTMLInputElement)
    {
        let exactFontWeight;
        if (textBox.isEditing)
        {
            if (textBox.selectionStart !== textBox.selectionEnd)
            {
                // Get size of selected characters
                exactFontWeight = textBox.getSelectionStyles(textBox.selectionStart, textBox.selectionEnd, true)[0].fontWeight;
            }
            else
                exactFontWeight = textBox.getSelectionStyles((textBox.selectionStart || 0) - 1, textBox.selectionEnd, true)[0].fontWeight;
        }
        else
            exactFontWeight = textBox.getSelectionStyles(0, textBox.text?.length, true)[0].fontWeight;

        if (Number(exactFontWeight))
        {
            rangeElement.value = String(exactFontWeight);
            textElement.value = String(exactFontWeight);
        }
        else if (exactFontWeight === 'normal')
        {
            rangeElement.value = '400';
            textElement.value = '400';
        }
        else if (exactFontWeight === 'bold')
        {
            rangeElement.value = '700';
            textElement.value = '700';
        }
    }

    public static lineAndLetterSpacingGetter(textBox: IText, rangeElement: HTMLInputElement, textElement: HTMLInputElement, valueSpacing: string)
    {
        const exactSpacing = textBox.get(valueSpacing as keyof typeof textBox);
        if (typeof exactSpacing !== 'number') return;

        if (valueSpacing === 'charSpacing')
        {
            rangeElement.value = String(Math.round(exactSpacing / 25));
            textElement.value = String(Math.round(exactSpacing / 25));
        }
        else if (valueSpacing === 'lineHeight')
        {
            rangeElement.value = String(Math.round(exactSpacing * 25));
            textElement.value = String(Math.round(exactSpacing * 25));
        }
    }

    // Define a static method named 'addListStyle' which belongs to a class
    // This method takes three parameters:
    // 'canvas' of type fabric.Canvas,
    // 'textBox' of type fabric.Textbox,
    // and 'typeOfList' which can be either 'number' or 'bullet'
    // public static addListStyle(canvas: fabric.Canvas, textBox: fabric.Textbox, typeOfList: 'number' | 'bullet')
    // {
    //     if (!canvas) return;

    //     // text constant contains text of textBox
    //     const text = textBox.text as string;

    //     // Make an array by te text and split it by \n
    //     const textArray = text.split('\n');

    //     // Make an array for the converted array that will be made later
    //     let resultTextArray;

    //     // If type of list is number
    //     if (typeOfList === 'number')
    //     {
    //         // the number that will be increased based on number of line in the text
    //         let number = 1;

    //         // Convert each line and return them to new array
    //         resultTextArray = textArray.map(line => (number++) + '-' + line);
    //     }
    //     // If type of list is bullet
    //     else
    //         resultTextArray = textArray.map(line => '\u2022 ' + line);

    //     // Convert the array to string
    //     const textResult = resultTextArray.join('\n');

    //     // Set the converted text
    //     textBox.set('text', textResult);

    //     // textBox.enterEditing();
    //     // textBox.hiddenTextarea?.focus();
    //     // textBox.setSelectionStart(textBox.selectionEnd || 0);
    //     // textBox.enterEditing();
    //     // // textBox.hiddenTextarea?.focus();
    //     // textBox.setSelectionStart(0);
    //     // textBox.setSelectionEnd(0);

    //     canvas.renderAll();
    // }

    // Define a static method named 'removeListStyle' which belongs to a class
    // This method takes two parameters:
    // 'canvas' of type fabric.Canvas and
    // 'textBox' of type fabric.Textbox
    // public static removeListStyle(canvas: fabric.Canvas, textBox: fabric.Textbox)
    // {
    //     if (!canvas) return;

    //     // text constant contains text of textBox
    //     const text = textBox.text as string;

    //     // Make an array by te text and split it by \n
    //     const textArray = text.split('\n');

    //     // Remove two characters of exist at the first of each line and in other word they are list characters
    //     const resultTextArray = textArray.map(line => line.substring(2));

    //     // Convert the array to string
    //     const textResult = resultTextArray.join('\n');

    //     // Set the converted text
    //     textBox.set('text', textResult);

    //     // textBox.enterEditing();
    //     // textBox.hiddenTextarea?.focus();
    //     // textBox.setSelectionStart(0);
    //     // textBox.setSelectionEnd(0);

    //     canvas.renderAll();
    // }

    // Define a static method named 'shadowSetter' which belongs to a class
    // This method takes three parameters:
    // 'canvas' of type fabric.Canvas,
    // 'keyStyle' of type string, and
    // 'valueStyle' of type string
    public static shadowSetter(canvas: fabric.Canvas, keyStyle: string, valueStyle: string)
    {
        // Get active object
        const activeObject = canvas.getActiveObject() as fabric.Textbox;

        // If active object dose'nt exist return
        if (!activeObject) return;

        // Make new shadow object
        const shadow = new fabric.Shadow(activeObject.shadow);

        // Change the related property with the wanted value
        (shadow as any)[keyStyle] = valueStyle;

        // Set new shadow
        activeObject.set('shadow', shadow);
        canvas.renderAll();
    }

    // Define a static method named 'shadowGetter' which belongs to a class
    // This method takes two parameters:
    // 'canvas' of type fabric.Canvas and
    // 'keyStyle' of type string, and returns a string
    public static shadowGetter(canvas: fabric.Canvas, keyStyle: string): string
    {
        // Get active object
        const activeObject: fabric.Object | null = canvas.getActiveObject();

        // If the active object is instance of fabric.Textbox
        if (activeObject instanceof fabric.Textbox)
        {
            // Cast the active object to a fabric.Textbox type and assign it to the variable 'textBox'
            const textBox: fabric.Textbox = activeObject as fabric.Textbox;

            // Cast the shadow property of the textBox to a fabric.Shadow type and assign it to the variable 'shadow'
            const shadow: fabric.Shadow = textBox.shadow as fabric.Shadow;

            // Check if the shadow object has a property corresponding to the keyStyle
            if ((shadow as any)[keyStyle])
            {
                // If the property exists, return its value
                return (shadow as any)[keyStyle];
            }
        }
        else if (keyStyle === 'color')
            return 'black';

        return '0';
    }

    // Define a static method named 'strokeSetter' which belongs to a class
    // This method takes three parameters:
    // 'canvas' of type fabric.Canvas,
    // 'keyStyle' which can either be 'stroke' or 'strokeWidth',
    // and 'valueStyle' of type string
    public static strokeSetter(canvas: fabric.Canvas, keyStyle: 'stroke' | 'strokeWidth', valueStyle: string)
    {
        // Get the currently active object from the canvas and cast it to a fabric.Textbox type
        const activeObject = canvas.getActiveObject() as fabric.Textbox;

        // If there is no active object, exit the function
        if (!activeObject) return;

        // Set the specified style (either 'stroke' or 'strokeWidth') of the active object to the provided value
        if (keyStyle === 'strokeWidth')
        {
            if (activeObject.isEditing)
                activeObject.setSelectionStyles({ [keyStyle]: Number(valueStyle) }, activeObject.selectionStart, activeObject.selectionEnd);
            else
                activeObject.setSelectionStyles({ [keyStyle]: Number(valueStyle) }, 0, activeObject.text?.length);
        }
        else
        {
            if (activeObject.isEditing)
                activeObject.setSelectionStyles({ [keyStyle]: valueStyle }, activeObject.selectionStart, activeObject.selectionEnd);
            else
                activeObject.setSelectionStyles({ [keyStyle]: valueStyle }, 0, activeObject.text?.length);
        }

        // Re-render the canvas to apply the changes
        canvas.renderAll();
    }

    // Define a static method named 'strokeGetter' which belongs to a class
    // This method takes two parameters:
    // 'canvas' of type fabric.Canvas,
    // and 'keyStyle' which can either be 'stroke' or 'strokeWidth'
    public static strokeGetter(canvas: fabric.Canvas, keyStyle: 'stroke' | 'strokeWidth')
    {
        // Get the currently active object from the canvas and assign it to the variable 'activeObject'
        // The type of 'activeObject' can be fabric.Object or null
        const activeObject: fabric.Object | null = canvas.getActiveObject();

        // Check if the active object is an instance of fabric.Textbox
        if (activeObject instanceof fabric.Textbox)
        {
            // If it is, return the value of the specified style ('stroke' or 'strokeWidth')
            // return activeObject.get(keyStyle as keyof typeof activeObject);
            if (activeObject.isEditing)
            {
                if (activeObject.selectionStart !== activeObject.selectionEnd)
                {
                    // Get size of selected characters
                    return activeObject.getSelectionStyles(activeObject.selectionStart, activeObject.selectionEnd, true)[0][keyStyle];
                }
                else
                    return activeObject.getSelectionStyles((activeObject.selectionStart || 0) - 1, activeObject.selectionEnd, true)[0][keyStyle];
            }
            else
                return activeObject.getSelectionStyles(0, activeObject.text?.length, true)[0][keyStyle];
        }

        // If the active object is not a fabric.Textbox and the keyStyle is 'stroke',
        // return the default value 'black'
        if (keyStyle === 'stroke')
            return 'black';

        // If the active object is not a fabric.Textbox and the keyStyle is 'strokeWidth',
        // return the default value '0'
        return '0';
    }

    // Define a static method named 'transformTextResult' which belongs to a class
    // This method takes one parameter 'canvas' of type fabric.Canvas and returns a string
    public static transformTextResult(canvas: fabric.Canvas): string
    {
        // Get the currently active object from the canvas and assign it to the variable 'activeObject'
        // The type of 'activeObject' can be fabric.Object or null
        const activeObject: fabric.Object | null = canvas.getActiveObject();

        // Check if the active object exists and its type is 'textbox'
        if (activeObject && activeObject.type === 'textbox')
        {
            // Cast the active object to a fabric.Textbox type and assign it to the variable 'textBoxObject'
            const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

            // Check if the text property of the textBoxObject is a string
            if (typeof textBoxObject.text === 'string')
            {
                // Get the text from the textBoxObject and assign it to the variable 'text'
                const text: string = textBoxObject.text;

                // Check if the textBoxObject is not in editing mode
                if (!textBoxObject.isEditing)
                {
                    // Check if the text is in upper-case, return 'upper-case' if true
                    if (text === text.toUpperCase())
                        return 'upper-case';
                    // Check if the text is in lower-case, return 'lower-case' if true
                    else if (text === text.toLocaleLowerCase())
                        return 'lower-case';
                    // If the text is neither in upper-case nor lower-case, return 'none'
                    else
                        return 'none';
                }
                else
                {
                    // Split the text into an array of characters
                    const chars: string[] = text.split('');

                    // Check if there is a text selection
                    if (textBoxObject.selectionEnd !== textBoxObject.selectionStart)
                    {
                        // Get the selected characters from the text
                        const selectedChar = chars.slice(textBoxObject.selectionStart, textBoxObject.selectionEnd!);
                        // Join the selected characters into a string
                        const selectedText = selectedChar.join('');

                        // Check if the selected text is in upper-case, return 'upper-case' if true
                        if (selectedText === selectedText.toUpperCase())
                            return 'upper-case';
                        // Check if the selected text is in lower-case, return 'lower-case' if true
                        else if (selectedText === selectedText.toLocaleLowerCase())
                            return 'lower-case';
                        // If the selected text is neither in upper-case nor lower-case, return 'none'
                        else
                            return 'none';
                    }
                    // If there is no text selection, return 'none'
                    return 'none';
                }
            }
        }

        // If there is no active object or the active object is not a textbox, return 'none'
        return 'none';
    }

    // Define a static method named 'colorPickerSelectedObject' which belongs to a class
    // This method takes one parameter 'canvas' of type fabric.Canvas and returns a string
    public static colorPickerSelectedObject(canvas: fabric.Canvas): string
    {
        // Get the currently active object from the canvas and assign it to the variable 'activeObject'
        // The type of 'activeObject' can be fabric.Object or null
        const activeObject: fabric.Object | null = canvas.getActiveObject();

        // Check if the active object exists and its type is 'textbox'
        if (activeObject && activeObject.type === 'textbox')
        {
            // Cast the active object to a fabric.Textbox type and assign it to the variable 'textBoxObject'
            const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

            // Check if the textBoxObject is in editing mode, there is a text selection, and the selection has a fill style
            if (textBoxObject.isEditing && textBoxObject.selectionStart !== textBoxObject.selectionEnd && textBoxObject.getSelectionStyles(textBoxObject.selectionStart, textBoxObject.selectionEnd)[0].fill)
            {
                // Return the fill style of the selected text
                return textBoxObject.getSelectionStyles(textBoxObject.selectionStart, textBoxObject.selectionEnd)[0].fill;
            }
            // If the textBoxObject is not in editing mode
            else if (!textBoxObject.isEditing)
            {
                // Check if the text property of the textBoxObject is a string
                if (typeof textBoxObject.text === 'string')
                {
                    // Check if all characters in the text have a fill style
                    if (textBoxObject.getSelectionStyles(0, textBoxObject.text.length - 1).every(style => style.fill))
                    {
                        // Get the text from the textBoxObject and assign it to the variable 'text'
                        const text: string = textBoxObject.text;
                        // Get the fill styles of each character in the text and store them in an array
                        const charStylesArray: string[] = textBoxObject.getSelectionStyles(0, text.length - 1).map(value => value.fill);

                        // Create a map to count the occurrences of each unique style
                        const styleCounterMap = new Map<string, number>();

                        // Count the occurrences of each fill style
                        charStylesArray.forEach(style =>
                        {
                            styleCounterMap.set(style, (styleCounterMap.get(style) || 0) + 1);
                        });

                        // Find the most frequently used style
                        // Return the most frequently used style
                        return Array.from(styleCounterMap.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0];
                    }
                    else
                    {
                        // If not all characters have a fill style, return the default fill style of the textBoxObject
                        return String(textBoxObject.get('fill'));
                    }
                }
            }
        }

        // If there is no active object or the active object is not a textbox, return the fill style of the active object
        return String(activeObject?.get('fill'));
    }

    public static setCompleteParent(canvas: fabric.Canvas, opt: fabric.IEvent<Event> | fabric.Object)
    {
        let target: fabric.Object;

        if (opt instanceof fabric.Object)
            target = opt as fabric.Object;
        else
            target = opt.target as fabric.Object;

        const result = canvas.getObjects().filter(obj =>
        {
            return target.isContainedWithinObject(obj) && canvas.getObjects().indexOf(obj) < canvas.getObjects().indexOf(target);
        });

        target.completeParent = result[result.length - 1];
        if (result.length > 0 && result[result.length - 1].completeChildren?.every(obj => obj !== target))
            result[result.length - 1].completeChildren?.push(target);

        canvas.getObjects().forEach(obj =>
        {
            if (obj.completeChildren?.some(objChild => objChild === target) && !target.isContainedWithinObject(obj))
                obj.completeChildren.splice(obj.completeChildren.indexOf(target), 1);
        });
    }

    public static setCompleteChildren(canvas: fabric.Canvas, opt: fabric.IEvent<Event> | fabric.Object)
    {
        let target: fabric.Object;

        if (opt instanceof fabric.Object)
            target = opt as fabric.Object;
        else
            target = opt.target as fabric.Object;

        const result = canvas.getObjects().filter(obj =>
        {
            return obj.isContainedWithinObject(target);
        });

        result.forEach(resultObj =>
        {
            if (target.completeChildren?.every(obj => obj !== resultObj))
                target.completeChildren.push(resultObj);
        });

        target.completeChildren?.forEach(obj =>
        {
            if (!obj.isContainedWithinObject(target))
                target.completeChildren?.splice(target.completeChildren.indexOf(obj), 1);
        });
    }
}
