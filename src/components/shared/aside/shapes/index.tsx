'use client';

import React, { MutableRefObject } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';

import data from '@/components/shared/aside/shapes/data';

import InputComponent from '@/components/ui/input.component';
import ShapesSwiperJsComponent from '@/components/shared/aside/shapes/shapes-swiperjs.component';

interface AsideShapeOption
{
    canvasRef: MutableRefObject<fabric.Canvas | null>;
    shapeNumberCounterObjectRef: MutableRefObject<{
        triangle: number,
        circle: number,
        rectangle: number,
        square: number
    }>
}

const AsideShapeOptionComponent = ({ canvasRef, shapeNumberCounterObjectRef }: AsideShapeOption) =>
{
    return (
        <motion.div initial={ { opacity: 0 } } animate={ { opacity: 1 } } className='nav-wrapper custom-scrollbar h-full overflow-y-auto overflow-x-hidden px-4 py-6'>
            <InputComponent
                type='search'
                placeholder='Search shapes...'
            />

            {
                data.map((item, index) =>
                    (
                        <ShapesSwiperJsComponent
                            key={ item.title.split(' ').join('_').toUpperCase() + `_${ index }` }
                            id={ item.id }
                            title={ item.title }
                            items={ item.items }
                            canvasRef={ canvasRef }
                            shapeNumberCounterObjectRef= {shapeNumberCounterObjectRef}
                        />
                    ))
            }
        </motion.div>
    );
};

export default AsideShapeOptionComponent;
