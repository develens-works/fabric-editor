import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

export class SliderManager
{
    /**
     * Creates and adds a slider object to the fabric canvas.
     *
     * This function constructs a slider-like rectangle and an accompanying label with predefined aesthetic and positional properties.
     * It demonstrates how to extend fabric.js objects to create custom interactive elements within a canvas. The process involves
     * specifying attributes like position, size, and visual style, and setting up interactivity, such as making the slider selectable
     * upon label interaction. The function leverages a React ref to the canvas, enabling dynamic manipulation within a React environment.
     * It also includes logic to manage the layering of multiple sliders through a custom z-index management function.
     * This approach provides a foundational structure for developing more complex slider behaviors and integrations.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - React ref to the fabric canvas instance for dynamic manipulation.
     * @param numberOfSlider - Mutable reference to track the current count of slider objects.
     * @param findLastSliderClassNumberZIndex - Function to adjust the z-index of the slider and its label, ensuring proper layering.
     */
    public static handleAdd(
        canvasRef: MutableRefObject<fabric.Canvas | null>,
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
            // Adds a newSlider to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;
                    // Create the slider rectangle with custom styling and properties.
                    const newSlider = new fabric.Rect
                    ({
                        left: x - 200,
                        top: y - 200,
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'transparent',
                        width: 400,
                        height: 400,
                        name: 'slider',
                        strokeDashArray: [5, 5],
                        sliderClassNumber: 'slider' + numberOfSlider.current,
                        lockRotation: true
                    });

                    // Disable all control points for the slider to prevent resizing or rotation.
                    newSlider.setControlsVisibility({ mt: false, mb: false, mr: false, ml: false, bl: false, br: false, tl: false, tr: false });

                    // Initialize the label for the slider with dynamic width based on its text.
                    const label = new fabric.IText('slider' + numberOfSlider.current, {
                        left: (newSlider.left || 0) + newSlider.getScaledWidth() + 2,
                        top: newSlider.top,
                        fill: 'black',
                        fontSize: 20,
                        sliderClassNumber: 'slider' + numberOfSlider.current,
                        name: 'sliderLabel'
                    });

                    label.set('width', (label.text?.length || 0) * ((label.fontSize || 0) / 2));
                    label.on('changed', () =>
                    {
                        label.set('width', (label.text?.length || 0) * ((label.fontSize || 0) / 2));
                        canvas.renderAll();
                    });

                    // Disable all controls for the label to maintain its simplicity and focus user interactions on the slider itself.
                    label.setControlsVisibility({ mt: false, mb: false, ml: false, mr: false, bl: false, br: false, tl: false, tr: false, mtr: false });

                    // Enable slider selection when its label is interacted with, providing a clear entry point for user engagement.
                    label.on('mousedown', () =>
                    {
                        if (!newSlider.selectable)
                            newSlider.set('selectable', true);
                    });

                    // Add both the slider and its label to the canvas, making them visible to the user.
                    canvas.add(label);
                    canvas.add(newSlider);
                    canvas.discardActiveObject().renderAll();

                    // Manage z-index for the slider and label, ensuring they are properly layered on the canvas.
                    if (numberOfSlider.current === 1)
                    {
                        newSlider.moveTo(0);
                        label.moveTo(1);
                    }
                    else
                        findLastSliderClassNumberZIndex(canvas, newSlider, label, numberOfSlider);

                    // Increment the count of slider objects to track how many have been added.
                    numberOfSlider.current++;
                    isMouseDown = false;
                }
            });
        }
    }
}
