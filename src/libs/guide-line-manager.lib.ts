import { fabric } from 'fabric';

type VerticalLineCoords =
{
    x: number;
    y1: number;
    y2: number;
};

type HorizontalLineCoords =
{
    y: number;
    x1: number;
    x2: number;
};

type IgnoreObjTypes = { key: string; value: any }[];

type ACoordsAppendCenter = NonNullable<fabric.Object['aCoords']> & { c: fabric.Point; };

/**
 * Manages and displays guide lines on a fabric.js canvas to aid in aligning objects.
 *
 * The GuideLineManager is designed to enhance the user experience by providing visual guidelines
 * that help in accurately positioning and aligning objects within a fabric.js canvas. It dynamically
 * calculates and displays horizontal and vertical lines based on object positions, facilitating precise layout control.
 * The manager supports customization options such as line color, margin, and width, allowing for a tailored alignment experience.
 * Furthermore, it includes functionality to ignore or specifically target objects based on their properties, enabling versatile usage scenarios.
 */
export class GuideLineManager
{
    aligningLineMargin = 4;
    aligningLineWidth = 0.75;
    aligningLineColor = '#F68066';
    ignoreObjTypes: IgnoreObjTypes = [];
    pickObjTypes: IgnoreObjTypes = [];

    canvas: fabric.Canvas;
    ctx: CanvasRenderingContext2D;
    viewportTransform: any;
    verticalLines: VerticalLineCoords[] = [];
    horizontalLines: HorizontalLineCoords[] = [];
    activeObj: fabric.Object = new fabric.Object();

    /**
     * Initializes a new instance of the GuideLineManager class.
     *
     * @param {object} params - The parameters for initializing the GuideLineManager.
     * @param {fabric.Canvas} params.canvas - The fabric.js canvas instance to attach the guide lines.
     * @param {IgnoreObjTypes} params.ignoreObjTypes - Optional. Object types to ignore when drawing guide lines.
     * @param {IgnoreObjTypes} params.pickObjTypes - Optional. Specific object types to target for guide line drawing.
     * @param {object} params.aligningOptions - Optional. Customization options for the guide lines, including margin, width, and color.
     */
    constructor({ canvas, aligningOptions, ignoreObjTypes, pickObjTypes }:
    {
        canvas: fabric.Canvas;
        ignoreObjTypes?: IgnoreObjTypes;
        pickObjTypes?: IgnoreObjTypes;
        aligningOptions?:
        {
            lineMargin?: number;
            lineWidth?: number;
            lineColor?: string;
        };
    })
    {
        this.canvas = canvas;
        this.ctx = canvas.getSelectionContext();
        this.ignoreObjTypes = ignoreObjTypes || [];
        this.pickObjTypes = pickObjTypes || [];

        if (aligningOptions)
        {
            this.aligningLineMargin = aligningOptions.lineMargin || this.aligningLineMargin;
            this.aligningLineWidth = aligningOptions.lineWidth || this.aligningLineWidth;
            this.aligningLineColor = aligningOptions.lineColor || this.aligningLineColor;
        }
    }

    /**
     * Draws a 'X' sign at the specified canvas coordinates, serving as a visual marker.
     * This is typically used at the endpoints of guide lines for better visibility.
     *
     * @param {number} x - The x-coordinate of the sign's center.
     * @param {number} y - The y-coordinate of the sign's center.
     */
    private drawSign(x: number, y: number)
    {
        const ctx = this.ctx;

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = this.aligningLineColor;
        ctx.beginPath();

        const size = 2;
        ctx.moveTo(x - size, y - size);
        ctx.lineTo(x + size, y + size);
        ctx.moveTo(x + size, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.stroke();
    }

    /**
     * Draws a straight line between two points on the canvas, optionally drawing 'X' signs
     * at both ends to mark the line ends clearly.
     *
     * @param {number} x1 - The starting x-coordinate of the line.
     * @param {number} y1 - The starting y-coordinate of the line.
     * @param {number} x2 - The ending x-coordinate of the line.
     * @param {number} y2 - The ending y-coordinate of the line.
     */
    private drawLine(x1: number, y1: number, x2: number, y2: number)
    {
        const ctx = this.ctx;
        const point1 = fabric.util.transformPoint(new fabric.Point(x1, y1), this.canvas.viewportTransform as any);
        const point2 = fabric.util.transformPoint(new fabric.Point(x2, y2), this.canvas.viewportTransform as any);

        // use origin canvas api to draw guideline
        ctx.save();
        ctx.lineWidth = this.aligningLineWidth;
        ctx.strokeStyle = this.aligningLineColor;
        ctx.beginPath();

        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);

        ctx.stroke();

        this.drawSign(point1.x, point1.y);
        this.drawSign(point2.x, point2.y);

        ctx.restore();
    }

    /**
     * Draws a vertical guide line based on specified coordinates. The line extends
     * between two y-coordinates at a fixed x-coordinate.
     *
     * @param {VerticalLineCoords} coords - The coordinates defining the vertical line.
     */
    private drawVerticalLine(coords: VerticalLineCoords)
    {
        const movingCoords = this.getObjDraggingObjCoords(this.activeObj);

        if (!this.Keys(movingCoords).some((key) => Math.abs(movingCoords[key].x - coords.x) < 0.0001))
            return;

        this.drawLine(coords.x, Math.min(coords.y1, coords.y2), coords.x, Math.max(coords.y1, coords.y2));
    }

    /**
     * Draws a horizontal guide line based on specified coordinates. The line extends
     * between two x-coordinates at a fixed y-coordinate.
     *
     * @param {HorizontalLineCoords} coords - The coordinates defining the horizontal line.
     */
    private drawHorizontalLine(coords: HorizontalLineCoords)
    {
        const movingCoords = this.getObjDraggingObjCoords(this.activeObj);
        if (!this.Keys(movingCoords).some((key) => Math.abs(movingCoords[key].y - coords.y) < 0.0001)) return;
        this.drawLine(Math.min(coords.x1, coords.x2), coords.y, Math.max(coords.x1, coords.x2), coords.y);
    }

    private isInRange(value1: number, value2: number)
    {
        return Math.abs(Math.round(value1) - Math.round(value2)) <= this.aligningLineMargin / this.canvas.getZoom();
    }

    private watchMouseDown()
    {
        this.canvas.on('mouse:down', () =>
        {
            this.clearLinesMeta();
            this.viewportTransform = this.canvas.viewportTransform as number[];
        });
    }

    private watchMouseUp()
    {
        this.canvas.on('mouse:up', () =>
        {
            this.clearLinesMeta();
            this.canvas.renderAll();
        });
    }

    private watchMouseWheel()
    {
        this.canvas.on('mouse:wheel', () =>
        {
            this.clearLinesMeta();
        });
    }

    private clearLinesMeta()
    {
        this.verticalLines.length = this.horizontalLines.length = 0;
    }

    private watchObjectMoving()
    {
        this.canvas.on('object:moving', (e) =>
        {
            this.clearLinesMeta();
            const activeObject = e.target as fabric.Object;
            this.activeObj = activeObject;

            const canvasObjects = this.canvas.getObjects().filter((obj) =>
            {
                if (this.ignoreObjTypes.length)
                    return !this.ignoreObjTypes.some((item) => (obj as any)[item.key] === item.value);

                if (this.pickObjTypes.length)
                    return this.pickObjTypes.some((item) => (obj as any)[item.key] === item.value);

                return true;
            });

            // @ts-ignore
            const transform = this.canvas._currentTransform;
            if (!transform)
                return;

            this.traversAllObjects(activeObject, canvasObjects);
        });
    }

    private getObjDraggingObjCoords(activeObject: fabric.Object)
    {
        const aCoords = activeObject.aCoords as NonNullable<fabric.Object['aCoords']>;
        const centerPoint = new fabric.Point((aCoords.tl.x + aCoords.br.x) / 2, (aCoords.tl.y + aCoords.br.y) / 2);

        const offsetX = centerPoint.x - activeObject.getCenterPoint().x;
        const offsetY = centerPoint.y - activeObject.getCenterPoint().y;

        return this.Keys(aCoords).reduce((acc, key) =>
        {
            return { ...acc, [key]: { x: aCoords[key].x - offsetX, y: aCoords[key].y - offsetY } };
        },
        {
            c: activeObject.getCenterPoint()
        } as ACoordsAppendCenter);
    }

    private omitCoords(objCoords: ACoordsAppendCenter, type: 'vertical' | 'horizontal')
    {
        let newCoords;
        type PointArr = [keyof ACoordsAppendCenter, fabric.Point];

        if (type === 'vertical')
        {
            let l: PointArr = ['tl', objCoords.tl];
            let r: PointArr = ['tl', objCoords.tl];

            this.Keys(objCoords).forEach((key) =>
            {
                if (objCoords[key].x < l[1].x)
                    l = [key, objCoords[key]];

                if (objCoords[key].x > r[1].x)
                    r = [key, objCoords[key]];
            });

            newCoords =
            {
                [l[0]]: l[1],
                [r[0]]: r[1],
                c: objCoords.c
            } as ACoordsAppendCenter;
        }
        else
        {
            let t: PointArr = ['tl', objCoords.tl];
            let b: PointArr = ['tl', objCoords.tl];

            this.Keys(objCoords).forEach((key) =>
            {
                if (objCoords[key].y < t[1].y)
                    t = [key, objCoords[key]];

                if (objCoords[key].y > b[1].y)
                    b = [key, objCoords[key]];
            });

            newCoords =
            {
                [t[0]]: t[1],
                [b[0]]: b[1],
                c: objCoords.c
            } as ACoordsAppendCenter;
        }
        return newCoords;
    }

    private getObjMaxWidthHeightByCoords(coords: ACoordsAppendCenter)
    {
        const objHeight = Math.max(Math.abs(coords.c.y - coords.tl.y), Math.abs(coords.c.y - coords.tr.y)) * 2;
        const objWidth = Math.max(Math.abs(coords.c.x - coords.tl.x), Math.abs(coords.c.x - coords.tr.x)) * 2;

        return { objHeight, objWidth };
    }

    private calcCenterPointByACoords(coords: NonNullable<fabric.Object['aCoords']>): fabric.Point
    {
        return new fabric.Point((coords.tl.x + coords.br.x) / 2, (coords.tl.y + coords.br.y) / 2);
    }

    private traversAllObjects(activeObject: fabric.Object, canvasObjects: fabric.Object[])
    {
        const objCoordsByMovingDistance = this.getObjDraggingObjCoords(activeObject);

        const snapXPoints: number[] = [];
        const snapYPoints: number[] = [];

        for (let i = canvasObjects.length; i--;)
        {
            if (canvasObjects[i] === activeObject)
                continue;

            const objCoords =
            {
                ...canvasObjects[i].aCoords,
                c: canvasObjects[i].getCenterPoint()
            } as ACoordsAppendCenter;

            const { objHeight, objWidth } = this.getObjMaxWidthHeightByCoords(objCoords);

            this.Keys(objCoordsByMovingDistance).forEach((activeObjPoint) =>
            {
                const newCoords = canvasObjects[i].angle !== 0 ? this.omitCoords(objCoords, 'horizontal') : objCoords;

                function calcHorizontalLineCoords(objPoint: keyof ACoordsAppendCenter, activeObjCoords: ACoordsAppendCenter)
                {
                    let x1: number, x2: number;

                    if (objPoint === 'c')
                    {
                        x1 = Math.min(objCoords.c.x - objWidth / 2, activeObjCoords[activeObjPoint].x);
                        x2 = Math.max(objCoords.c.x + objWidth / 2, activeObjCoords[activeObjPoint].x);
                    }
                    else
                    {
                        x1 = Math.min(objCoords[objPoint].x, activeObjCoords[activeObjPoint].x);
                        x2 = Math.max(objCoords[objPoint].x, activeObjCoords[activeObjPoint].x);
                    }

                    return { x1, x2 };
                }

                this.Keys(newCoords).forEach((objPoint) =>
                {
                    if (this.isInRange(objCoordsByMovingDistance[activeObjPoint].y, objCoords[objPoint].y))
                    {
                        const y = objCoords[objPoint].y;
                        const { x1, x2 } = calcHorizontalLineCoords(objPoint, objCoordsByMovingDistance);

                        const offset = objCoordsByMovingDistance[activeObjPoint].y - y;
                        snapYPoints.push(objCoordsByMovingDistance.c.y - offset);

                        if (activeObject.aCoords)
                        {
                            const { x1, x2 } = calcHorizontalLineCoords(objPoint,
                            {
                                ...activeObject.aCoords,
                                c: this.calcCenterPointByACoords(activeObject.aCoords)
                            } as ACoordsAppendCenter);

                            this.horizontalLines.push({ y, x1, x2 });
                        }
                        else
                            this.horizontalLines.push({ y, x1, x2 });
                    }
                });
            });

            this.Keys(objCoordsByMovingDistance).forEach((activeObjPoint) =>
            {
                const newCoords = canvasObjects[i].angle !== 0 ? this.omitCoords(objCoords, 'vertical') : objCoords;

                function calcVerticalLineCoords(objPoint: keyof ACoordsAppendCenter, activeObjCoords: ACoordsAppendCenter)
                {
                    let y1: number, y2: number;

                    if (objPoint === 'c')
                    {
                        y1 = Math.min(newCoords.c.y - objHeight / 2, activeObjCoords[activeObjPoint].y);
                        y2 = Math.max(newCoords.c.y + objHeight / 2, activeObjCoords[activeObjPoint].y);
                    }
                    else
                    {
                        y1 = Math.min(objCoords[objPoint].y, activeObjCoords[activeObjPoint].y);
                        y2 = Math.max(objCoords[objPoint].y, activeObjCoords[activeObjPoint].y);
                    }

                    return { y1, y2 };
                }

                this.Keys(newCoords).forEach((objPoint) =>
                {
                    if (this.isInRange(objCoordsByMovingDistance[activeObjPoint].x, objCoords[objPoint].x))
                    {
                        const x = objCoords[objPoint].x;
                        const { y1, y2 } = calcVerticalLineCoords(objPoint, objCoordsByMovingDistance);

                        const offset = objCoordsByMovingDistance[activeObjPoint].x - x;
                        snapXPoints.push(objCoordsByMovingDistance.c.x - offset);

                        if (activeObject.aCoords)
                        {
                            const { y1, y2 } = calcVerticalLineCoords(objPoint,
                            {
                                ...activeObject.aCoords,
                                c: this.calcCenterPointByACoords(activeObject.aCoords)
                            } as ACoordsAppendCenter);

                            this.verticalLines.push({ x, y1, y2 });
                        }
                        else
                            this.verticalLines.push({ x, y1, y2 });
                    }
                });
            });

            this.snap({ activeObject, draggingObjCoords: objCoordsByMovingDistance, snapXPoints, snapYPoints });
        }
    }

    private snap({
        activeObject,
        snapXPoints,
        draggingObjCoords,
        snapYPoints
    }: {
        activeObject: fabric.Object;
        snapXPoints: number[];
        draggingObjCoords: ACoordsAppendCenter;
        snapYPoints: number[];
    })
    {
        const sortPoints = (list: number[], originPoint: number) =>
        {
            if (!list.length)
                return originPoint;

            return list.map((val) => ({ abs: Math.abs(originPoint - val), val })).sort((a, b) => a.abs - b.abs)[0].val;
        };

        activeObject.setPositionByOrigin(new fabric.Point(sortPoints(snapXPoints, draggingObjCoords.c.x), sortPoints(snapYPoints, draggingObjCoords.c.y)), 'center', 'center');
    }

    clearGuideline()
    {
        this.canvas.clearContext(this.ctx);
    }

    watchRender()
    {
        this.canvas.on('before:render', () =>
        {
            this.clearGuideline();
        });

        this.canvas.on('after:render', () =>
        {
            for (let i = this.verticalLines.length; i--;)
                this.drawVerticalLine(this.verticalLines[i]);

            for (let i = this.horizontalLines.length; i--;)
                this.drawHorizontalLine(this.horizontalLines[i]);

            this.canvas.calcOffset();
        });
    }

    private Keys: <T = Record<string, any>>(obj: T) => (keyof T)[] = obj =>
    {
        return Object.keys(obj as any) as any;
    };

    /**
     * Initializes event listeners to manage the lifecycle of guide lines.
     *
     * Sets up the fabric.js canvas event handlers for mouse and object movements,
     * ensuring that guide lines are drawn and cleared appropriately in response to user interactions.
     * This method encapsulates the setup logic, making it simple to start the guide line management
     * by calling `init` after creating an instance of the GuideLineManager.
     */
    init()
    {
        this.watchObjectMoving();
        this.watchRender();
        this.watchMouseDown();
        this.watchMouseUp();
        this.watchMouseWheel();
    }
}
