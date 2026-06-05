import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

export class ZoomManager
{
    /**
     * Handles zooming in and out on a fabric canvas based on mouse wheel scroll events.
     *
     * This method calculates a new zoom level for the canvas based on the delta value
     * of the mouse wheel event, allowing users to zoom in and out. It ensures that the
     * zoom level stays within predefined maximum and minimum limits and applies the
     * zoom effect relative to the mouse pointer's position on the canvas, offering a
     * more intuitive zooming experience.
     *
     * @param {fabric.IEvent<Event>} opt - The fabric event object, used to prevent default event actions.
     * @param {fabric.Canvas} canvas - The fabric canvas instance to apply zoom operations on.
     * @param {WheelEvent} wheelEvent - The native JavaScript wheel event triggered by mouse scrolling.
     */
    public static zoomOutIn(opt: fabric.IEvent<Event>, canvas: fabric.Canvas, wheelEvent: WheelEvent)
    {
        // Extracts the vertical scroll amount from the wheel event.
        const delta = wheelEvent.deltaY;

        // Retrieves the current zoom level of the canvas.
        let zoom = canvas.getZoom();

        // Modifies the zoom level based on the scroll direction and speed.
        // The factor 0.1 is raised to the power of delta, providing a smooth zoom scaling.
        zoom += delta > 0 ? -0.1 : 0.1;

        // Ensures the new zoom level does not exceed a maximum of 10.
        if (zoom >= 10)
            zoom = 10;

        // Ensures the new zoom level does not fall below a minimum of 0.1.
        if (zoom < 0.1)
            zoom = 0.1;

        // Calculates the mouse's current position on the canvas, taking into account viewport transformations.
        const pointer = canvas.getPointer(wheelEvent, true);

        // Applies the new zoom level to the canvas, centered around the mouse's position.
        canvas.zoomToPoint(new fabric.Point(pointer.x, pointer.y), Math.round(zoom * 10) / 10);

        // Prevents the wheel event's default action (e.g., page scrolling).
        opt.e.preventDefault();

        // Stops the wheel event from propagating further, preventing potential unintended interactions.
        opt.e.stopPropagation();
    }

    /**
     * Sets the zoom level of the fabric canvas directly based on a percentage input,
     * supporting a zoom range from 0% to 1000%, where 100% is the normal zoom level (1x).
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param {number} zoomPercent - The new zoom level to set, expressed as a percentage (0% to 1000%).
     */
    public static setZoom(canvasRef: MutableRefObject<fabric.Canvas | null>, zoomPercent: number)
    {
        const canvas: fabric.Canvas | null = canvasRef.current;
        if (!canvas)
            return;

        // Convert zoomPercent to exact scale of canvas
        const zoom = zoomPercent / 100;

        if (canvas.width && canvas.height)
        {
            // Apply the zoom level, focusing on the center of the canvas.
            const centerPoint = new fabric.Point(canvas.width / 2, canvas.height / 2);
            canvas.zoomToPoint(centerPoint, zoom);
        }
    }
}
