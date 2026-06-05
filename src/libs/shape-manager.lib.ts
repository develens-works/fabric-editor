import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { ObjectManager } from './object-manager.lib';

export class ShapeManager
{
    /**
     * Adds a triangle shape to the fabric canvas.
     *
     * This method creates a new triangle shape with predefined properties such as
     * position (top, left), dimensions (width, height), stroke color, and stroke width.
     * It then adds the created triangle to the canvas. This function demonstrates how
     * to add basic geometric shapes to a fabric.js canvas, enhancing the visual
     * interactivity of the application.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param shapeNumberCounterObjectRef
     */
    public static handleTriangle(canvasRef: MutableRefObject<fabric.Canvas | null>, shapeNumberCounterObjectRef: MutableRefObject<{triangle: number, circle: number, rectangle: number, square: number}>)
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
            // Adds a newTriangle to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    const newTriangle = new fabric.Triangle({
                        width: 100,
                        height: 100,
                        fill: 'green',
                        stroke: 'blue',
                        name: 'shape',
                        strokeWidth: 1,
                        left: x - 50,
                        top: y - 50,
                        completeChildren: []
                    });
                    canvas.add(newTriangle);
                    newTriangle.set('label', 'triangle' + shapeNumberCounterObjectRef.current.triangle);
                    shapeNumberCounterObjectRef.current.triangle++;
                    isMouseDown = false;

                    ObjectManager.setCompleteParent(canvas, newTriangle);
                    ObjectManager.setCompleteChildren(canvas, newTriangle);

                    if (event.target?.name === 'zone')
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, event.target, newTriangle);
                    else if (event.target?.zoneClassNumber)
                    {
                        const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === event.target?.zoneClassNumber && obj.name === 'zone');
                        if (!exactZone) 
                            return;
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, exactZone, newTriangle);
                    }
                }
            });
        }
    }

    /**
     * Adds a circle shape to the fabric canvas.
     *
     * This method creates a new circle shape with specified properties including
     * radius, position, fill color, stroke color, and stroke width. The new circle is
     * then added to the canvas, showcasing the ability to incorporate various basic
     * shapes into the fabric.js canvas for dynamic and interactive graphical
     * representations.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param shapeNumberCounterObjectRef
     */
    public static handleCircle(canvasRef: MutableRefObject<fabric.Canvas | null>, shapeNumberCounterObjectRef: MutableRefObject<{triangle: number, circle: number, rectangle: number, square: number}>)
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

            // Adds a newCircle to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    const newCircle = new fabric.Circle({
                        radius: 50,
                        fill: 'red',
                        stroke: 'yellow',
                        name: 'shape',
                        strokeWidth: 1,
                        left: x - 50,
                        top: y - 50,
                        completeChildren: []
                    });
                    canvas.add(newCircle);
                    newCircle.set('label', 'circle' + shapeNumberCounterObjectRef.current.circle);
                    shapeNumberCounterObjectRef.current.circle++;
                    isMouseDown = false;

                    ObjectManager.setCompleteParent(canvas, newCircle);
                    ObjectManager.setCompleteChildren(canvas, newCircle);

                    if (event.target?.name === 'zone')
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, event.target, newCircle);
                    else if (event.target?.zoneClassNumber)
                    {
                        const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === event.target?.zoneClassNumber && obj.name === 'zone');
                        if (!exactZone) return;
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, exactZone, newCircle);
                    }
                }
            });
        }
    }

    /**
     * Adds a rectangle shape to the fabric canvas.
     *
     * Utilizing fabric.js's Rectangle class, this method creates a rectangle with
     * customizable properties such as fill color, position, and dimensions. The method
     * illustrates how to add rectangles, which can represent a wide range of visual
     * elements, to the canvas. It enhances the application's graphical capabilities by
     * allowing for the inclusion of diverse geometric forms.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param shapeNumberCounterObjectRef
     */
    public static handleRectangle(canvasRef: MutableRefObject<fabric.Canvas | null>, shapeNumberCounterObjectRef: MutableRefObject<{triangle: number, circle: number, rectangle: number, square: number}>)
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
            // Adds a newRect to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    const newRect = new fabric.Rect({
                        fill: 'orange',
                        width: 150,
                        height: 100,
                        stroke: 'green',
                        name: 'shape',
                        strokeWidth: 1,
                        left: x - 75,
                        top: y - 50,
                        completeChildren: []
                    });
                    newRect.set('label', 'rectangle' + shapeNumberCounterObjectRef.current.rectangle);
                    shapeNumberCounterObjectRef.current.rectangle++;
                    canvas.add(newRect);
                    isMouseDown = false;

                    ObjectManager.setCompleteParent(canvas, newRect);
                    ObjectManager.setCompleteChildren(canvas, newRect);

                    if (event.target?.name === 'zone')
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, event.target, newRect);
                    else if (event.target?.zoneClassNumber)
                    {
                        const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === event.target?.zoneClassNumber && obj.name === 'zone');
                        if (!exactZone) return;
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, exactZone, newRect);
                    }
                }
            });
        }
    }

    /**
     * Adds a square shape to the fabric canvas.
     *
     * This method leverages the fabric.Rect class to create a square by setting equal
     * width and height. It demonstrates the versatility of fabric.js shapes, allowing
     * for the easy integration of squares into the canvas. This addition enriches the
     * graphical interface, providing users with a broader range of shapes to interact
     * with or represent data visually.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param shapeNumberCounterObjectRef
     */
    public static handleSquare(canvasRef: MutableRefObject<fabric.Canvas | null>, shapeNumberCounterObjectRef: MutableRefObject<{triangle: number, circle: number, rectangle: number, square: number}>)
    {
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
            // Adds a newSquare to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    const newSquare = new fabric.Rect
                    ({
                        fill: 'purple',
                        width: 100,
                        height: 100,
                        stroke: 'black',
                        name: 'shape',
                        strokeWidth: 1,
                        left: x - 50,
                        top: y - 50,
                        completeChildren: []
                    });

                    newSquare.set('label', 'square' + shapeNumberCounterObjectRef.current.square);
                    shapeNumberCounterObjectRef.current.square++;
                    canvas.add(newSquare);
                    isMouseDown = false;

                    ObjectManager.setCompleteParent(canvas, newSquare);
                    ObjectManager.setCompleteChildren(canvas, newSquare);

                    if (event.target?.name === 'zone')
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, event.target, newSquare);
                    else if (event.target?.zoneClassNumber)
                    {
                        const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === event.target?.zoneClassNumber && obj.name === 'zone');
                        if (!exactZone) return;
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, exactZone, newSquare);
                    }
                }
            });
        }
    }

    /**
     * Changes the fill color of the currently active shape object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a shape object (e.g., 'rect', 'circle').
     * If it is, the method will change the fill color based on the provided color parameter. The method ensures that
     * any changes to the fill color are immediately reflected on the canvas by requesting a re-render. This allows
     * for dynamic customization of shape color in response to user input, such as from a color picker component.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {string} color - The new color value to apply to the active shape object. It should be a string that represents
     *        a CSS color value (e.g., '#ff0000', 'rgb(255, 0, 0)', or 'red').
     */
    public static handleChangeShapeColor(canvasRef: MutableRefObject<fabric.Canvas | null>, color: string): void
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel') return;
            // Get the currently active object on the canvas
            const activeObject: fabric.Object | null = canvas.getActiveObject();

            // Here, you might want to check for specific shape types or use a more general approach
            // For this example, we'll assume any object might have its color changed
            if (activeObject && activeObject.name !== 'zone')
            {
                // Change the fill color of the active object to the specified color
                activeObject.set('fill', color);

                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }

    /**
     * Changes the border radius of the currently active rectangle shape object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a rectangle object. If it is,
     * the method will change the border radius (rounded corners) based on the provided radius parameter.
     * The method ensures that any changes to the border radius are immediately reflected on the canvas
     * by requesting a re-render. This allows for dynamic customization of rectangle corner rounding in response
     * to user input, such as from a slider component.
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
                // Change the border radius of the active rectangle object to the specified radius
                // Cast the activeObject to fabric.Rect to access and modify the rx and ry properties
                (activeObject as fabric.Rect).set({ rx: radius, ry: radius });

                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }

    /**
     * Dynamically adds a specified shape to the fabric canvas.
     *
     * This versatile method allows for the dynamic addition of various geometric shapes
     * to a fabric.js canvas by accepting a shape type as an argument. Supported shapes include
     * triangles, circles, rectangles, and squares, each created with distinct properties
     * such as dimensions, colors, and positions. The method uses a switch statement to
     * determine the type of shape to add, invoking specific handler methods for each shape type.
     * This approach enhances the interactivity and visual diversity of the canvas, enabling
     * developers and users to enrich their graphical presentations with a variety of basic
     * geometric forms. It exemplifies the power of fabric.js in creating dynamic, interactive
     * graphical user interfaces and visualizations.
     *
     * @param {string} shapeType - The type of shape to add, identified by a unique string.
     * Supported types are 'triangle.webp', 'circle.webp', 'rectangle.webp', and 'square.webp'.
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     */
    public static handleAddShape(shapeType: string, canvasRef: MutableRefObject<fabric.Canvas | null>, shapeNumberCounterObjectRef: MutableRefObject<{triangle: number, circle: number, rectangle: number, square: number}>)
    {
        switch (shapeType)
        {
            case 'triangle.webp':
                ShapeManager.handleTriangle(canvasRef, shapeNumberCounterObjectRef);
                break;
            case 'circle.webp':
                ShapeManager.handleCircle(canvasRef, shapeNumberCounterObjectRef);
                break;
            case 'rectangle.webp':
                ShapeManager.handleRectangle(canvasRef, shapeNumberCounterObjectRef);
                break;
            case 'square.webp':
                ShapeManager.handleSquare(canvasRef, shapeNumberCounterObjectRef);
                break;
            default:
                break;
        }
    }
}
