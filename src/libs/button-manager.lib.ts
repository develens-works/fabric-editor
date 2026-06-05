import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

export class ButtonManager
{
    /**
     * Adds a new buttongroup object consisting of a text and a rectangle to the fabric canvas at the
     * mouse click position. This function sets up event listeners for mouse movement and clicks to handle
     * interaction dynamics and placing the new group object.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance. This ensures that the canvas can be dynamically accessed and modified within a React component's lifecycle.
     * @param {string} description - The text content to be displayed by the text object. This is the initial text that will appear on the canvas.
     */
    public static handleAdd(canvasRef: MutableRefObject<fabric.Canvas | null>, description: string)
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;
        let isMouseDown: boolean = true;

        if (canvas)
        {
            // Sets cursor to 'crosshair' on mouse move when mouse is down
            canvas.on('mouse:move', () =>
            {
                if (!isMouseDown)
                    return;
                
                canvas.setCursor('crosshair');
            });
            
            // Adds a newSlider to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    // Create a new group consisting of a rectangle and text based on the description
                    const text = new fabric.IText(description, { top: 5, left: 25, fontSize: 18, fill: 'white' });
                    const Rect = new fabric.Rect({ fill: 'blue', width: 100, height: 30, top: 0, left: 0 });
                    const buttongroup = new fabric.Group([Rect, text], { left: x, top: y });
                    
                    canvas.add(buttongroup);

                    // Reset mouse down flag after adding the group
                    isMouseDown = false;
                }
            });

            // Convert group back to active selection to allow for component editing
            canvas.on('mouse:dblclick', (event) =>
            {
                const target = event.target;
                if (target && target.type === 'group')
                {
                    const activeGroup = target as fabric.Group;
                    activeGroup.toActiveSelection();
                    canvas.requestRenderAll();
                }
            });
        }
    }

    /**
     * Changes the border radius of the currently active shape object in the fabric canvas.
     *
     * Modifies the border radius of a selected rectangle object on the fabric canvas. This method checks
     * if the currently active object is a rectangle and applies the specified border radius, updating the
     * canvas to reflect changes immediately.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {number} radius - The new border radius value to apply to the active rectangle object. It should be a number
     *        that represents the radius for the corners of the rectangle.
     */
    public static handleChangeBorderRadius(canvasRef: MutableRefObject<fabric.Canvas | null>, radius: number): void
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // Get the currently active object on the canvas
            const activeObject: fabric.Object | null = canvas.getActiveObject();

            // Check if the active object is a rectangle
            if (activeObject && activeObject.type === 'rect')
            {
                // Directly update the corner radius of the rectangle
                (activeObject as fabric.Rect).set({ rx: radius, ry: radius });

                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }
}
