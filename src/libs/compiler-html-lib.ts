import { fabric } from 'fabric';

// Define an interface for partial nodes which contains an object and its situation (front or back)
interface PartialNode
{
    object: fabric.Object;
    situation: 'front' | 'back';
}

// Define an interface for object nodes which contains an object, its children, parent, position (top, left), and partial nodes
interface ObjectNode
{
    object: fabric.Object;
    children: ObjectNode[];
    parent: ObjectNode | fabric.Object | undefined;
    top: number;
    left: number;
    partial: PartialNode[];
}

// Class that manages the compilation of the object tree
export class CompilerManager
{
    // Static method to create a tree structure from a canvas and a root object
    public static treeMaker(canvas: fabric.Canvas, root: fabric.Object, typeOfContainer: 'zone' | 'slider'): ObjectNode | undefined
    {
        let container: fabric.Object | undefined;

        // Determine the container based on the type
        if (typeOfContainer === 'zone')
            container = canvas.getObjects().find(obj => obj.name === 'zone' && obj.zoneClassNumber === root.zoneClassNumber);
        else if (typeOfContainer === 'slider')
            container = canvas.getObjects().find(obj => obj.name === 'slider' && obj.sliderClassNumber === root.sliderClassNumber);

        // Return undefined if container is not found
        if (!container) return;

        // Check if there are objects contained within the root object
        if (canvas.getObjects().some(obj => obj.isContainedWithinObject(root)))
        {
            const objects = canvas.getObjects().filter(obj => obj.isContainedWithinObject(root));

            // Create the root node with its properties
            const rootNode: ObjectNode = {
                object: root,
                children: [],
                parent: container,
                top: (root.top || 0) - (container.top || 0),
                left: (root.left || 0) - (container.left || 0),
                partial: CompilerManager.partialMaker(canvas, root)
            };

            // Determine the layer number for each object
            const counterArray = objects.map(obj => objects.filter(o => o.isContainedWithinObject(obj)).length);
            const layerNumber = Math.max(...counterArray);
            const layers: ObjectNode[][] = Array.from({ length: layerNumber + 1 }, () => []);

            // Populate layers based on depth
            objects.forEach((obj) =>
            {
                const depth = objects.filter(o => obj.isContainedWithinObject(o)).length;
                layers[depth].push({
                    object: obj,
                    children: [],
                    parent: undefined,
                    left: 0,
                    top: 0,
                    partial: CompilerManager.partialMaker(canvas, obj)
                });
            });

            // Organize the tree structure
            layers.forEach((layer, i) =>
            {
                if (i === 0)
                {
                    layer.forEach(objNode =>
                    {
                        rootNode.children.push(objNode);
                        objNode.parent = rootNode;
                        objNode.left = (objNode.object.left || 0) - (rootNode.object.left || 0);
                        objNode.top = (objNode.object.top || 0) - (rootNode.object.top || 0);
                    });
                }
                else
                {
                    layer.forEach(objNode =>
                    {
                        layers[i - 1].forEach(parentNode =>
                        {
                            if (objNode.object.isContainedWithinObject(parentNode.object))
                            {
                                parentNode.children.push(objNode);
                                objNode.parent = parentNode;
                                objNode.left = (objNode.object.left || 0) - (parentNode.object.left || 0);
                                objNode.top = (objNode.object.top || 0) - (parentNode.object.top || 0);
                            }
                        });
                    });
                }
            });

            return rootNode;
        }
        else
        {
            return {
                object: root,
                children: [],
                parent: container,
                top: (root.top || 0) - (container.top || 0),
                left: (root.left || 0) - (container.left || 0),
                partial: CompilerManager.partialMaker(canvas, root)
            };
        }
    }

    // Static method to get the first level children of a zone
    public static firstChildrenOfZoneGetter(canvas: fabric.Canvas, object: fabric.Object)
    {
        if (object.name !== 'zone') return;
        const zone = object;

        // Get all children of the zone that are not the zone itself or its label
        const zoneChildren = canvas.getObjects().filter(obj => obj.zoneClassNumber === zone.zoneClassNumber && obj.name !== 'zone' && obj.name !== 'zoneLabel');

        // Filter the first level children (those not contained within other zone children)
        const firstZoneChildren = zoneChildren.filter(objFilter => zoneChildren.every(objFind => !objFilter.isContainedWithinObject(objFind)));
        return firstZoneChildren;
    }

    // Static method to create partial nodes for a target object
    public static partialMaker(canvas: fabric.Canvas, targetObject: fabric.Object)
    {
        // Get objects that intersect with the target object but are not contained within or containing it
        const partialObjectsWithTargetObject = canvas.getObjects().filter(obj => !obj.isContainedWithinObject(targetObject) && !targetObject.isContainedWithinObject(obj) && obj.intersectsWithObject(targetObject) && obj !== targetObject);

        // Map these objects to partial nodes with their situation (front or back)
        const partialObjectsNodes: PartialNode[] = partialObjectsWithTargetObject.map(obj => ({
            object: obj,
            situation: canvas.getObjects().indexOf(obj) > canvas.getObjects().indexOf(targetObject) ? 'front' : 'back'
        }));
        return partialObjectsNodes;
    }
}
