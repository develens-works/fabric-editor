import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

export class MediaManager
{
    /**
     * Adds an image to the fabric canvas.
     *
     * This method loads an image from a given URL and adds it to the canvas with specified
     * properties such as position (top, left), and scale. It demonstrates how to integrate
     * raster graphics into a fabric.js canvas, enhancing the application's visual capabilities
     * by combining vector shapes with bitmap images.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param {string} imageURL - The URL of the image to add to the canvas.
     */
    public static handleAddImage(canvasRef: MutableRefObject<fabric.Canvas | null>, imageURL: string)
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
            // Adds a img to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    fabric.Image.fromURL(imageURL, (img) =>
                    {
                        img.set
                        ({
                            scaleX: 1,
                            scaleY: 1,
                            left: x - 50,
                            top: y - 50
                        });
                        canvas.add(img);
                        isMouseDown = false;
                    });
                }
            });
        }
    }

    /**
     * Applies a border radius to an image object on a Fabric.js canvas.
     *
     * This function modifies only image objects on the Fabric.js canvas, adding rounded corners
     * via a clip path to enhance their visual appearance. It's specifically designed for use
     * within applications leveraging Fabric.js for image manipulation.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the Fabric.js canvas instance.
     * @param {number} borderRadius - The desired radius for rounding the image corners, in pixels.
     */
    public static handleApplyBorderRadius(canvasRef: MutableRefObject<fabric.Canvas | null>, borderRadius: number)
    {
        // @TODO THIS FUNCTION DOES NOT WORK WELL WHEN YOU APPLY NEW RADIUS SIZE IT SHOULD RENDER THE CANVAS
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            const obj = canvas.getActiveObject();

            if (obj && obj.type === 'image' && obj.scaleY && obj.scaleX && obj.width && obj.height)
            {
                // Recalculate the clip path with the new border radius
                const clipPath = new fabric.Rect
                ({
                    width: obj.width,
                    height: obj.height,
                    rx: borderRadius / obj.scaleX,
                    ry: borderRadius / obj.scaleY,
                    left: -obj.width / 2,
                    top: -obj.height / 2
                });

                obj.clipPath = clipPath;
                obj.dirty = true;

                // Request a render to update the canvas
                canvas.requestRenderAll();
            }
        }
    }
}
