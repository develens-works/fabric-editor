import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { ZoneManager } from '@/libs/zone-manager.lib';

export class UndoRedoManager
{
    /**
     * Saves the current state of the canvas to the undo history stack and clears the redo history stack.
     * This method captures the canvas's current state, including any specified properties, and adds it
     * to the undo stack for future undo operations. It also resets the redo stack to ensure that redo actions
     * can only apply to states undone after the current action. This is crucial for implementing an undo/redo
     * feature that accurately reflects the user's history of actions.
     *
     * @param {fabric.Canvas} canvas - The fabric.js canvas instance whose current state is to be saved.
     * @param {MutableRefObject<{ undo: any[]; redo: any[] }>} historyRef - A React ref object that holds
     *        references to the undo and redo history stacks. The `undo` stack is used to store past states
     *        of the canvas, while the `redo` stack is used to store states that have been undone and can be
     *        redone.
     */
    public static saveState(canvas: fabric.Canvas, historyRef: MutableRefObject<{ undo: any[]; redo: any[] }>)
    {
        // Check if the canvas object is defined to prevent errors on undefined canvas references.
        if (canvas)
        {
            // Convert the current canvas state to a JSON object, including custom 'name' properties for objects.
            const canvasState = JSON.stringify(canvas);

            // Push the serialized canvas state onto the undo stack for future undo operations.
            historyRef.current.undo.push(canvasState);

            // Clear the redo stack to enforce the rule that redo actions can only follow an undo action.
            // This ensures the redo stack is always relevant to the most recent undo action.
            historyRef.current.redo = [];
        }
    }

    /**
     * Undoes the last action taken on the canvas, reverting it to the previous state.
     *
     * This method checks the undo history stack for any previous states. If available,
     * it pops the most recent state from the undo stack, pushes it onto the redo stack
     * for potential future redos, and then loads the canvas from the next most recent
     * state in the undo stack. It ensures that 'zone' objects have the correct settings
     * reapplied after loading the state.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance to operate on.
     * @param {MutableRefObject<{ undo: any[]; redo: any[] }>} historyRef - A React ref object maintaining undo and redo history stacks.
     */
    public static undo(canvas: fabric.Canvas, historyRef: MutableRefObject<{ undo: any[]; redo: any[] }>)
    {
        // Checks if there is more than one state in the undo history to ensure a previous state exists.
        if (historyRef.current.undo.length > 1)
        {
            // Moves the current state to the redo stack before reverting to a previous state.
            historyRef.current.redo.push(historyRef.current.undo.pop());

            // Retrieves the last state from the undo stack as the previous state to revert to.
            const prevState = historyRef.current.undo[historyRef.current.undo.length - 1];

            // Loads the canvas from the previous state and applies necessary settings to 'zone' objects.
            canvas.loadFromJSON(prevState, () =>
            {
                canvas.forEachObject((obj: any) =>
                {
                    // Apply Zone settings
                    if (obj.name === 'zone')
                        ZoneManager.getSettings(obj);

                    if (obj.type === 'text' && typeof obj.text === 'undefined')
                        obj.text = '';
                });

                // Re-renders the canvas to reflect the reverted state.
                canvas.renderAll();
            });
        }
    }

    /**
     * Redoes the last undone action on the canvas, advancing it to a previously undone state.
     *
     * If actions have been undone and placed in the redo stack, this method allows
     * them to be redone. It pops the state from the redo stack, pushes it back onto
     * the undo stack, and then loads the canvas from that state. Similar to undo,
     * it also ensures that 'zone' objects have the correct settings applied after
     * loading the state.
     *
     * @param {fabric.Canvas} canvas - The fabric canvas instance to operate on.
     * @param {MutableRefObject<{ undo: any[]; redo: any[] }>} historyRef - A React ref object maintaining undo and redo history stacks.
     */
    public static redo(canvas: fabric.Canvas, historyRef: MutableRefObject<{ undo: any[]; redo: any[] }>)
    {
        // Checks if there are states available in the redo stack to be reapplied.
        if (historyRef.current.redo.length)
        {
            // Retrieves the next state from the redo stack to be reapplied to the canvas.
            const nextState = historyRef.current.redo.pop();
            historyRef.current.undo.push(nextState); // Moves this state back to the undo stack.

            // Loads the canvas from the next state and applies necessary settings to 'Zone' objects.
            canvas.loadFromJSON(nextState, () =>
            {
                canvas.forEachObject((obj) =>
                {
                    // Apply Zone settings
                    if (obj.name === 'zone')
                        ZoneManager.getSettings(obj);
                });

                // Re-renders the canvas to reflect the redone state.
                canvas.renderAll();
            });
        }
    }
}
