import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { ZoneManager } from '@/libs/zone-manager.lib';

export class ClipboardManager
{
    /**
     * Copies the currently active object on the fabric canvas.
     *
     * This method clones the active object (if any) and stores the clone
     * in a React ref for later use, such as pasting. This approach allows
     * the copied object to persist across component re-renders without
     * triggering unnecessary updates, leveraging React's useRef hook.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance from which to copy the active object.
     * @param {MutableRefObject<fabric.Object[] | fabric.Object | null>} copiedObjectRef - A React ref used to store the cloned object.
     */
    public static copy(canvas: fabric.Canvas, copiedObjectRef: MutableRefObject<fabric.Object[] | fabric.Object | null>)
    {
        // Attempt to get the currently active object on the canvas
        const activeObject = canvas.getActiveObject();

        // Check if there is an active object selected
        if (activeObject)
        {
            // If an active object exists, clone it
            activeObject.clone((cloned: fabric.Object | fabric.Object[] | null) =>
            {
                // Once cloned, store the clone in the provided ref
                copiedObjectRef.current = cloned;
            });
        }
        else
        {
            // If no active object is selected, set the ref's current value to null
            // This might be useful to indicate that there's no object to paste
            copiedObjectRef.current = null;
        }
    }

    /**
     * Pastes the copied object onto the fabric canvas.
     *
     * This method checks if there's a copied object available and, if so,
     * attempts to clone it onto the canvas. The position of the pasted object
     * is offset slightly to visually distinguish it from the original. If the
     * cloned object is an 'activeSelection', it iterates over its constituent
     * objects to add them individually to the canvas.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance onto which the object is pasted.
     * @param {MutableRefObject<fabric.Object | fabric.Object[] | null>} copiedObjectRef - A React ref containing the object(s) to paste.
     */
    public static paste(canvas: fabric.Canvas, copiedObjectRef: MutableRefObject<fabric.Object | fabric.Object[] | null>)
    {
        // Return early if there's no copied object
        if (!copiedObjectRef.current)
            return;

        // Check if the copied object supports cloning (i.e., is a fabric.Object)
        if ('clone' in copiedObjectRef.current)
        {
            // Clone the copied object to create a new instance on the canvas
            copiedObjectRef.current.clone((clonedObj: fabric.Object) =>
            {
                // Deselect any currently active object
                canvas.discardActiveObject();

                // Ensure the cloned object has left and top properties before setting its position
                if (clonedObj.left && clonedObj.top)
                {
                    // Offset the cloned object to avoid directly overlaying the original
                    clonedObj.set({ left: clonedObj.left + 10, top: clonedObj.top + 10, evented: true });
                }

                // Check if the cloned object is an 'activeSelection'
                if (clonedObj.type === 'activeSelection')
                {
                    // Cast to ActiveSelection to access its forEachObject method
                    const activeSelection = clonedObj as fabric.ActiveSelection;

                    // Assign the canvas to the active selection to ensure it's added correctly
                    activeSelection.canvas = canvas;

                    // Add each object in the active selection to the canvas individually
                    activeSelection.forEachObject((obj: fabric.Object) =>
                    {
                        // Apply Zone settings
                        if (obj.name === 'zone')
                            ZoneManager.getSettings(obj);

                        canvas.add(obj);
                    });

                    // Update the coordinates of the active selection to ensure it's placed correctly
                    activeSelection.setCoords();
                }
                else
                {
                    // Apply zone settings
                    if (clonedObj.name === 'zone')
                        ZoneManager.getSettings(clonedObj);

                    // If not an activeSelection, simply add the cloned object to the canvas
                    canvas.add(clonedObj);
                }

                // Make the cloned object the new active object on the canvas
                canvas.setActiveObject(clonedObj);

                // Request a re-render of the canvas to display the pasted object
                canvas.requestRenderAll();
            });
        }
    }

    /**
     * Cuts the currently active object or group from the fabric canvas.
     *
     * This function clones the active object or group (if any) and stores the clone
     * in a React ref for later use, such as pasting. It then removes the active object
     * or each object in the group from the canvas, effectively 'cutting' them. This
     * supports both individual fabric.Object instances and groups (fabric.Group or
     * fabric.ActiveSelection).
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance from which to cut the active object or group.
     * @param {MutableRefObject<fabric.Object | fabric.Object[] | null>} copiedObjectRef - A React ref used to store the cloned object or group for later pasting.
     */
    public static cut(canvas: fabric.Canvas, copiedObjectRef: MutableRefObject<fabric.Object | fabric.Object[] | null>)
    {
        const activeObject = canvas.getActiveObject();

        if (activeObject)
        {
            // Clone the active object or group
            activeObject.clone((cloned: fabric.Object) =>
            {
                // Store the cloned object or group for later use
                copiedObjectRef.current = cloned;

                // Check if the active object is a group (fabric.ActiveSelection)
                if (activeObject.type === 'activeSelection')
                {
                    // Cast the active object to fabric.ActiveSelection to access forEachObject method
                    const group = activeObject as fabric.ActiveSelection;

                    group.forEachObject((obj: fabric.Object) =>
                    {
                        canvas.remove(obj);
                    });

                    // Deselect and remove the group from the canvas
                    canvas.discardActiveObject();
                }
                else
                {
                    // Directly remove the object if it's not a group
                    canvas.remove(activeObject);
                }
                // Request a re-render of the canvas to update the display
                canvas.requestRenderAll();
            });
        }
        else
        {
            // If no active object is selected, set the ref's current value to null
            copiedObjectRef.current = null;
        }
    }

    /**
     * Duplicates the currently active object or group on the fabric canvas.
     *
     * This function checks if there is an active object or group selected on the canvas.
     * If so, it clones the active object or each object in the group. For groups, it handles
     * each object individually within the clone callback. It then offsets the position of the
     * cloned object or group slightly to distinguish it from the original. This function also
     * includes specific handling for objects with the name 'zone', where it retrieves settings
     * for such objects through a custom `Zone.getSettings` method.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance on which to duplicate the active object or group.
     */
    public static duplicate(canvas: fabric.Canvas)
    {
        // Duplicate the currently active object or group
        const activeObject = canvas.getActiveObject();

        if (activeObject)
        {
            // Check if the active object is a group (fabric.ActiveSelection)
            if (activeObject.type === 'activeSelection')
            {
                activeObject.clone((cloned: fabric.Group) =>
                {
                    // Ensure cloned has valid top and left values before proceeding
                    if (cloned.top && cloned.left)
                    {
                        // Iterate through each object in the cloned group
                        cloned.forEachObject((obj: fabric.Object) =>
                        {
                            // Apply zone settings
                            if (obj.name === 'zone')
                                ZoneManager.getSettings(obj);

                            // Add the cloned object to the canvas
                            canvas.add(obj);
                        });

                        // Offset the position of the cloned group to distinguish it from the original
                        cloned.set({ left: cloned.left + 10, top: cloned.top + 10 });

                        // Update the canvas: deselect the current group and select the cloned group
                        canvas.discardActiveObject();
                        cloned.canvas = canvas;
                        canvas.setActiveObject(cloned);
                    }
                }, ['name']); // Ensure 'name' property is included in the clone
            }
            else
            {
                // Duplicate a single object
                activeObject.clone((cloned: fabric.Object) =>
                {
                    // Apply zone settings
                    if (cloned.name === 'zone')
                        ZoneManager.getSettings(cloned);

                    // Ensure cloned has valid top and left values before proceeding
                    if (cloned.left && cloned.top)
                    {
                        // Offset the cloned object's position to distinguish it from the original
                        cloned.set({ left: cloned.left + 10, top: cloned.top + 10 });

                        // Add the cloned object to the canvas
                        canvas.add(cloned);

                        // Set the cloned object as the active object
                        canvas.setActiveObject(cloned);
                    }
                }, ['name']); // Ensure 'name' property is included in the clone
            }

            // Request rendering of the canvas to reflect the changes
            canvas.requestRenderAll();
        }
    }
}
