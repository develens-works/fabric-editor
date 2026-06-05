import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { UndoRedoManager } from '@/libs/undo-redo-manager.lib';
import { ObjectManager } from './object-manager.lib';
import { textStyleMoodRef } from '@/components/shared/navbar/texts';

export class TextManager
{
    /**
     * Toggles text styling options (bold, italic, underline, linethrough) for the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox'). If it is,
     * it allows toggling of text styling options based on the provided style parameter. This includes changing the font weight
     * between normal and bold, toggling the font style between normal and italic, and toggling the underline and linethrough properties.
     * The method ensures that any changes to the text styling are immediately reflected on the canvas by requesting a re-render.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     * @param {'bold' | 'italic' | 'underline' | 'linethrough'} style - The text style to toggle on the active text object.
     */
    public static handleToggleStyle(canvasRef: MutableRefObject<fabric.Canvas | null>, style: 'bold' | 'italic' | 'underline' | 'linethrough', mood: MutableRefObject<textStyleMoodRef>, element: HTMLElement): void
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;

        // Check if the canvas is not null
        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            // Get the currently active object on the canvas
            const activeObject: fabric.Object | null = canvas.getActiveObject();

            // Check if there is an active object and it is of type 'textbox'
            if (activeObject && activeObject.type === 'textbox')
            {
                // Cast the active object to fabric.Textbox to access text-specific properties
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                // Toggle functionality based on the style parameter
                switch (style)
                {
                    case 'bold':
                    {
                        ObjectManager.clickButtonText(mood, 'boldMood', textBoxObject, canvas, 'fontWeight', 'bold', element);
                        break;
                    }
                    case 'italic':
                    {
                        ObjectManager.clickButtonText(mood, 'italicMood', textBoxObject, canvas, 'fontStyle', 'italic', element);

                        break;
                    }
                    case 'underline':
                    {
                        // Determine the current underline state of the object
                        const isUnderlined: boolean | undefined = textBoxObject.underline;

                        ObjectManager.clickButtonText(mood, 'underlineMood', textBoxObject, canvas, 'underline', String(!isUnderlined), element);

                        break;
                    }
                    case 'linethrough':
                    {
                        // Determine the current strike-through state of the object
                        const isStrikethrough: boolean | undefined = textBoxObject.linethrough;

                        ObjectManager.clickButtonText(mood, 'strikeThroughMood', textBoxObject, canvas, 'linethrough', String(!isStrikethrough), element);

                        break;
                    }
                }

                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }

    public static handleBoldRange(canvas: fabric.Canvas | null, mood: MutableRefObject<textStyleMoodRef>, value: number | string)
    {
        if (!canvas) return;
        const activeObject: fabric.Object | null = canvas.getActiveObject();

        // Check if there is an active object and it is of type 'textbox'
        if (activeObject && activeObject.type === 'textbox')
        {
            // Cast the active object to fabric.Textbox to access text-specific properties
            const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

            if (textBoxObject.isEditing)
                textBoxObject.setSelectionStyles({ fontWeight: value }, textBoxObject.selectionStart, textBoxObject.selectionEnd);
            else
                textBoxObject.setSelectionStyles({ fontWeight: value }, 0, textBoxObject.text?.length);
            canvas.renderAll();
        }
    }

    /**
     * Adds a new text object to the fabric canvas with specified properties and manages undo/redo state.
     *
     * This method creates a new text object using the Fabric.js `Textbox` class, setting initial properties such as position, font family, font size, and color. It then adds this text object to the canvas and sets it as the active object for immediate interaction. After adding the text object, the method updates the undo/redo history to include this action, allowing for state-based undo/redo operations.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance. This ensures that the canvas can be dynamically accessed and modified within a React component's lifecycle.
     * @param {MutableRefObject<{ undo: any[], redo: any[] }>} historyRef - A React ref object containing the undo/redo history stacks. This parameter allows the method to record the current state of the canvas after adding the text object, facilitating undo/redo operations.
     * @param {string} name - A unique identifier for the text object. This can be used for referencing and manipulating the object in future operations.
     * @param {number} fontSize - The font size to be applied to the text object. This determines how large the text appears on the canvas.
     * @param {string} description - The text content to be displayed by the text object. This is the initial text that will appear on the canvas.
     */
    public static handleAdd(
        canvasRef: MutableRefObject<fabric.Canvas | null>,
        historyRef: MutableRefObject<{ undo: any[], redo: any[] }>,
        name: string,
        fontSize: number,
        description: string
    )
    {
        const canvas = canvasRef.current;
        let isMouseDown: boolean = true;

        if (canvas)
        {
            // Sets cursor to 'crosshair' on mouse move when mouse is down
            canvas.on('mouse:move', () =>
            {
                if (!isMouseDown) return;
                canvas.setCursor('crosshair');
            });
            // Adds a text to the canvas on mouse down
            canvas.on('mouse:down', (event) =>
            {
                if (isMouseDown)
                {
                    const pointer = canvas.getPointer(event.e);
                    const x = pointer.x;
                    const y = pointer.y;

                    const shadow = new fabric.Shadow({
                        color: 'black',
                        blur: 0,
                        offsetX: 0,
                        offsetY: 0
                    });

                    const text = new fabric.Textbox(
                        description,
                        {
                            left: x,
                            top: y,
                            fontFamily: 'Arial',
                            fill: 'red',
                            fontSize,
                            name,
                            shadow,
                            stroke: 'black',
                            strokeWidth: 0
                            // list: 'none'
                        });

                    text.setControlsVisibility({
                        mt: false,
                        mb: false,
                        bl: false,
                        br: false,
                        tl: false,
                        tr: false
                    });
                    // Add the newly created text object to the canvas.
                    canvas.add(text);

                    // Set the text object as the active object on the canvas for immediate interaction.
                    canvas.setActiveObject(text);

                    // Re-render the canvas to display the changes.
                    canvas.requestRenderAll();

                    // Save the initial state for undo/redo functionality. Assumes UndoRedo.saveState is implemented elsewhere.
                    // historyRef should also be defined elsewhere, likely as a reference to the undo/redo history.
                    UndoRedoManager.saveState(canvas, historyRef);
                    isMouseDown = false;

                    if (event.target?.name === 'zone')
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, event.target, text);
                    else if (event.target?.zoneClassNumber)
                    {
                        const exactZone = canvas.getObjects().find(obj => obj.zoneClassNumber === event.target?.zoneClassNumber && obj.name === 'zone');
                        if (!exactZone) return;
                        ObjectManager.makeExactZIndexForObjectOfZone(canvas, exactZone, text);
                    }
                }
            });
        }
    }

    /**
     * Changes the text alignment of the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox'). If it is,
     * it allows changing the text alignment based on the provided alignment parameter. Supported alignments are 'left', 'center',
     * 'right', and 'justify'. The method ensures that any changes to the text alignment are immediately reflected on the canvas
     * by requesting a re-render.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     * @param {'left' | 'center' | 'right' | 'justify'} alignment - The text alignment to apply to the active text object.
     */
    public static handleTextAlign(canvasRef: MutableRefObject<fabric.Canvas | null>, alignment: 'left' | 'center' | 'right' | 'justify'): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                // Set the text alignment
                textBoxObject.set('textAlign', alignment);

                // if (textBoxObject.selectionStart !== textBoxObject.selectionEnd)
                // {
                //     textBoxObject.setSelectionStyles({ textAlign: alignment }, textBoxObject.selectionStart, textBoxObject.selectionEnd);
                //     textBoxObject.enterEditing();
                //     textBoxObject.hiddenTextarea?.focus();
                //     canvas.renderAll();
                // }
                // console.log(textBoxObject.getSelectionStyles(textBoxObject.selectionStart, textBoxObject.selectionEnd));
            }
            // Request the canvas to re-render to display the changes
            canvas.requestRenderAll();
        }
    }

    /**
     * Changes the text color of the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox').
     * If it is, the method will change the text color based on the provided color parameter. The method ensures that
     * any changes to the text color are immediately reflected on the canvas by requesting a re-render. This allows
     * for dynamic customization of text color in response to user input, such as from a color picker component.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {string} color - The new color value to apply to the active text object. It should be a string that represents
     *        a CSS color value (e.g., '#ff0000', 'rgb(255, 0, 0)', or 'red').
     */
    public static handleTextColor(canvasRef: MutableRefObject<fabric.Canvas | null>, color: string): void
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            // Get the currently active object on the canvas
            const activeObject: fabric.Object | null = canvas.getActiveObject();

            // Check if there is an active object and it is of type 'textbox'
            if (activeObject && activeObject.type === 'textbox')
            {
                // Cast the active object to fabric.Textbox to access text-specific properties
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                if (!textBoxObject.isEditing)
                {
                    // Cast the active object to fabric.Textbox to access text-specific properties
                    const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                    // Change the text color to the specified color
                    textBoxObject.setSelectionStyles({ fill: color }, 0, textBoxObject.text?.length);
                    canvas.renderAll();
                }
                else
                {
                    textBoxObject.setSelectionStyles({ fill: color }, textBoxObject.selectionStart, textBoxObject.selectionEnd);
                    textBoxObject.enterEditing();
                    textBoxObject.hiddenTextarea?.focus();
                    canvas.renderAll();
                }
            }
        }
    }

    /**
     * Changes the font size of the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox').
     * If it is, the method will change the font size based on the provided fontSize parameter. The method ensures that
     * any changes to the font size are immediately reflected on the canvas by requesting a re-render. This allows
     * for dynamic customization of font size in response to user input.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {number} fontSize - The new font size to apply to the active text object. It should be a positive number
     *        representing the size of the font in pixels.
     */
    public static handleFontSizeChange(canvasRef: MutableRefObject<fabric.Canvas | null>, fontSize: number): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                if (!textBoxObject.isEditing)
                {
                    // Change the font size to the specified size
                    textBoxObject.set('fontSize', fontSize);
                }
                else
                {
                    textBoxObject.setSelectionStyles({ fontSize }, textBoxObject.selectionStart, textBoxObject.selectionEnd);
                    textBoxObject.enterEditing();
                    textBoxObject.hiddenTextarea?.focus();
                }
                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }

    /**
     * Changes the letter spacing of the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox').
     * If it is, the method will change the letter spacing based on the provided letterSpacing parameter. The `charSpacing`
     * property of a Fabric.js `Textbox` object is used to adjust the spacing between characters, measured in thousandths of
     * an em. A positive value increases the spacing, while a negative value decreases it. This allows for dynamic
     * customization of letter spacing in response to user input, enhancing the text styling capabilities of the canvas.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {number} letterSpacing - The new letter spacing value to apply to the active text object. It should be a
     *        number representing the spacing between characters in thousandths of an em. For example, 0 for normal
     *        spacing, 200 for wider spacing, and -100 for tighter spacing.
     */
    public static handleLetterSpacingChange(canvasRef: MutableRefObject<fabric.Canvas | null>, letterSpacing: number): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                // Change the letter spacing to the specified value
                textBoxObject.set('charSpacing', letterSpacing * 25);
                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }

    // public static handleWordSpacingChange(canvasRef: MutableRefObject<fabric.Canvas | null>, sizeSpacing: number): void
    // {
    //     // const canvas: fabric.Canvas | null = canvasRef.current;

    //     // if (canvas)
    //     // {
    //     //     const activeObject: fabric.Object | null = canvas.getActiveObject();

    //     //     if (activeObject && activeObject.type === 'textbox')
    //     //     {
    //     //         const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

    //     //         const text: string | undefined = textBoxObject.text;
    //     //         if (typeof text !== 'string') return;

    //     //         const chars: string[] | undefined = text.split('');

    //     //         chars?.forEach((char, index) =>
    //     //         {
    //     //             if (char === ' ')
    //     //             {
    //     //                 // for (let i = 1; i < sizeSpacing; i++)
    //     //                 textBoxObject.setSelectionStyles({ width }, index, index + 1);
    //     //             }
    //     //         });
    //     //         // const modifiedText: string = chars.join('');
    //     //         // textBoxObject.set('text', modifiedText);
    //     //         // Request the canvas to re-render to display the changes
    //     //         canvas.requestRenderAll();
    //     //     }
    //     // }
    // }

    /**
     * Changes the line spacing of the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox').
     * If it is, the method will change the line spacing based on the provided lineSpacing parameter. The `lineHeight`
     * property of a Fabric.js `Textbox` object is used to adjust the spacing between lines of text, where a value of 1
     * represents normal spacing, values greater than 1 increase the spacing, and values less than 1 decrease it.
     * This allows for dynamic customization of line spacing in response to user input, enhancing the readability
     * and aesthetic appeal of the text on the canvas.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {number} lineSpacing - The new line spacing value to apply to the active text object. It should be a number
     *        representing the multiplier to the default line height. For example, 1 for normal spacing, 1.5 for increased
     *        spacing, and 0.8 for decreased spacing.
     */
    public static handleLineSpacingChange(canvasRef: MutableRefObject<fabric.Canvas | null>, lineSpacing: number): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                // Change the line spacing to the specified value
                textBoxObject.set('lineHeight', lineSpacing / 25);
                // Request the canvas to re-render to display the changes
                canvas.requestRenderAll();
            }
        }
    }

    /**
     * Changes the font family of the currently active text object in the fabric canvas.
     *
     * This method checks if the currently active object on the canvas is a text object (specifically of type 'textbox').
     * If it is, the method will change the font family based on the provided fontFamily parameter. This allows for dynamic
     * customization of font family in response to user input, such as selecting a font from a dropdown menu.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance.
     *        This allows dynamic access and modification of the canvas within a React component's lifecycle.
     * @param {string} fontFamily - The new font family to apply to the active text object. It should be a string
     *        representing the font family (e.g., 'Arial', 'Times New Roman', 'Helvetica').
     */
    public static handleFontFamilyChange(canvasRef: MutableRefObject<fabric.Canvas | null>, fontFamily: string): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                if (!textBoxObject.isEditing)
                {
                    // Change the font size to the specified size
                    textBoxObject.set('fontFamily', fontFamily);
                }
                else
                {
                    textBoxObject.setSelectionStyles({ fontFamily }, textBoxObject.selectionStart, textBoxObject.selectionEnd);
                    textBoxObject.enterEditing();
                    textBoxObject.hiddenTextarea?.focus();
                }
            }
            // Request the canvas to re-render to display the changes
            canvas.requestRenderAll();
        }
    }

    /**
     * Transforms the text of the currently active text object on the fabric canvas to uppercase.
     *
     * This method checks for an active object on the canvas and confirms it is a text object of type 'textbox'.
     * To safely handle the potential for `textBoxObject.text` being `undefined`, it employs a conditional check
     * to ensure the text property is a string before attempting the transformation. This ensures that the operation
     * is performed only on valid text content, thereby preventing runtime errors. The uppercase transformation is
     * applied immediately, and the canvas is requested to re-render, reflecting the changes and enhancing the
     * text styling capabilities available to the user.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance,
     *        enabling dynamic access and manipulation of the canvas within the lifecycle of a React component.
     */
    public static handleTextUppercase(canvasRef: MutableRefObject<fabric.Canvas | null>): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                if (typeof textBoxObject.text === 'string')
                {
                    if (!textBoxObject.isEditing)
                    {
                        const uppercaseText: string = textBoxObject.text.toUpperCase();
                        textBoxObject.set('text', uppercaseText);
                        // Request the canvas to re-render to display the changes
                        canvas.requestRenderAll();
                    }
                    else
                    {
                        if (textBoxObject.selectionEnd !== textBoxObject.selectionStart)
                        {
                            const text: string = textBoxObject.text;
                            const chars: string[] = text.split('');

                            for (let i: number = textBoxObject.selectionStart || 0; i < textBoxObject.selectionEnd!; i++)
                                chars[i] = chars[i].toUpperCase();

                            const modifiedText: string = chars.join('');
                            textBoxObject.set('text', modifiedText);
                            // Request the canvas to re-render to display the changes
                            canvas.requestRenderAll();
                        }
                    }
                }
            }
        }
    }

    /**
     * Transforms the text of the currently active text object on the fabric canvas to lowercase.
     *
     * This method ensures safety by checking for the presence of an active text object and verifying
     * its type as 'textbox'. It then safely addresses potential undefined values for the text property
     * by using conditional logic. If the text content exists, it is transformed to lowercase; otherwise,
     * the operation is skipped. This cautious approach prevents runtime errors and ensures that the
     * canvas re-renders to reflect any changes made to the text, enhancing user interaction with text customization.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A React ref object containing the fabric canvas instance,
     *        enabling dynamic canvas manipulation within a React component's lifecycle.
     */
    public static handleTextLowercase(canvasRef: MutableRefObject<fabric.Canvas | null>): void
    {
        const canvas: fabric.Canvas | null = canvasRef.current;

        if (canvas)
        {
            // If selected object is label of containers return
            if (canvas.getActiveObject()?.name === 'zoneLabel' || canvas.getActiveObject()?.name === 'sliderLabel')
                return;

            const activeObject: fabric.Object | null = canvas.getActiveObject();

            if (activeObject && activeObject.type === 'textbox')
            {
                const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

                // Safely handle potential undefined values for textBoxObject.text
                if (typeof textBoxObject.text === 'string')
                {
                    if (!textBoxObject.isEditing)
                    {
                        const lowercaseText: string = textBoxObject.text.toLowerCase();
                        textBoxObject.set('text', lowercaseText);
                        // Request the canvas to re-render to display the changes
                        canvas.requestRenderAll();
                    }
                    else
                    {
                        if (textBoxObject.selectionEnd !== textBoxObject.selectionStart)
                        {
                            const text: string = textBoxObject.text;
                            const chars: string[] = text.split('');

                            for (let i: number = textBoxObject.selectionStart || 0; i < textBoxObject.selectionEnd!; i++)
                                chars[i] = chars[i].toLowerCase();

                            const modifiedText: string = chars.join('');
                            textBoxObject.set('text', modifiedText);
                            // Request the canvas to re-render to display the changes
                            canvas.requestRenderAll();
                        }
                    }
                }
            }
        }
    }

    // Define a static method named 'handleTextList' which belongs to a class
    // This method takes one parameter 'canvas' of type fabric.Canvas and returns void
    public static handleTextList(canvas: fabric.Canvas): void
    {
        // Get the currently active object from the canvas
        const activeObject = canvas.getActiveObject();

        // Check if the active object exists and its type is 'textbox'
        if (activeObject && activeObject.type === 'textbox')
        {
            // Cast the active object to a fabric.Textbox type and assign it to the variable 'textBoxObject'
            const textBoxObject: fabric.Textbox = activeObject as fabric.Textbox;

            // Get the 'list' property of the textBoxObject
            const listSituation: string | undefined = textBoxObject.get('list');

            // If 'listSituation' is undefined, exit the function
            if (!listSituation) return;

            // Handle different list situations
            switch (listSituation)
            {
                case 'none':
                    // If the list situation is 'none', add a numbered list style and set the list property to 'ordered'
                    ObjectManager.addListStyle(canvas, textBoxObject, 'number');
                    textBoxObject.set('list', 'ordered');
                    break;

                case 'ordered':
                    // If the list situation is 'ordered', remove the current list style
                    // Add a bullet list style and set the list property to 'unordered'
                    ObjectManager.removeListStyle(canvas, textBoxObject);
                    ObjectManager.addListStyle(canvas, textBoxObject, 'bullet');
                    textBoxObject.set('list', 'unordered');
                    break;

                case 'unordered':
                    // If the list situation is 'unordered', remove the current list style
                    // Set the list property to 'none'
                    ObjectManager.removeListStyle(canvas, textBoxObject);
                    textBoxObject.set('list', 'none');
                    break;
            }

            textBoxObject.enterEditing();
            textBoxObject.hiddenTextarea?.focus();
            textBoxObject.setSelectionStart(0);
            textBoxObject.setSelectionEnd(0);
        }
    }
}
