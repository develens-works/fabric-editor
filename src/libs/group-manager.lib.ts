import { MutableRefObject } from 'react';
import { fabric } from 'fabric';

import { UndoRedoManager } from '@/libs/undo-redo-manager.lib';

export class GroupManager
{
    /**
     * Groups multiple selected objects into a single collective object.
     *
     * This method checks for an active selection of multiple objects on the canvas
     * and combines them into a single group, enabling unified manipulation. After
     * grouping, the canvas state is updated and saved to support undo/redo actions,
     * ensuring a seamless user experience.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param {MutableRefObject<{ undo: any[], redo: any[] }>} historyRef - A reference to the history state for undo/redo functionality.
     */
    public static handleGroup(canvasRef: MutableRefObject<fabric.Canvas | null>, historyRef: MutableRefObject<{ undo: any[], redo: any[] }>)
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;

        // Check if the canvas reference exists to ensure the canvas has been initialized.
        if (canvas)
        {
            // Get the currently active object or group of objects on the canvas.
            const activeObject = canvas.getActiveObject();

            // Check if there is an active selection (multiple objects selected) on the canvas.
            if (activeObject && activeObject.type === 'activeSelection')
            {
                // Perform a type assertion to fabric.ActiveSelection to access toGroup
                const activeSelection = activeObject as fabric.ActiveSelection;

                // Group the selected objects into a single group object.
                activeSelection.toGroup();

                // Re-render the canvas to display changes after grouping.
                canvas.requestRenderAll();

                // Save the current state of the canvas for undo/redo functionality.
                // Assuming UndoRedoManager.saveState is a method you have implemented
                // that correctly handles saving the state for undo/redo functionality.
                UndoRedoManager.saveState(canvas, historyRef);
            }
        }
    }

    /**
     * Ungroups a previously grouped set of objects back into individual elements.
     *
     * This method targets a group object currently active on the canvas, separating
     * it back into its constituent objects. It facilitates the individual manipulation
     * of previously grouped objects and updates the canvas state to reflect these changes.
     * Similar to grouping, it saves the state post-ungrouping to allow for undo/redo actions,
     * maintaining the integrity of the user's design workflow.
     *
     * @param {MutableRefObject<fabric.Canvas | null>} canvasRef - A reference to the fabric canvas instance.
     * @param {MutableRefObject<{ undo: any[], redo: any[] }>} historyRef - A reference to the history state for undo/redo functionality.
     */
    public static handleUngroup(canvasRef: MutableRefObject<fabric.Canvas | null>, historyRef: MutableRefObject<{ undo: any[], redo: any[] }>)
    {
        // Access the current canvas object
        const canvas: fabric.Canvas | null = canvasRef.current;

        // Check if the canvas reference exists to ensure the canvas has been initialized.
        if (canvas)
        {
            // Get the currently active object on the canvas, which is expected to be a group.
            const activeObject = canvas.getActiveObject();

            // Check if the active object is a group that can be ungrouped.
            if (activeObject && activeObject.type === 'group')
            {
                // Perform a type assertion to fabric.Group to access toActiveSelection
                const activeGroup = activeObject as fabric.Group;

                // Ungroup the active group into individual objects.
                activeGroup.toActiveSelection();

                // Re-render the canvas to display changes after ungrouping.
                canvas.requestRenderAll();

                // Save the current state of the canvas for undo/redo functionality.
                // Assuming UndoRedoManager.saveState is a method you have implemented
                // that correctly handles saving the state for undo/redo functionality.
                UndoRedoManager.saveState(canvas, historyRef);
            }
        }
    }
}
