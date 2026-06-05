import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';

import InputComponent from '@/components/ui/input.component';

import toFixedUtil from '@/utils/to-fixed.util';

interface CustomRangeInputProps
{
    unit?: string;
    label?: string;
    id?: string;
    min?: number;
    max?: number;
    step?: number
    rangeSlideDisabled?: boolean;
    className?: string;
    parentClassName?: string;
    thumbsDisabled?: boolean[]
    defaultValue?: number[];
}

const CustomRangeInputComponent: React.FC<CustomRangeInputProps> = ({ step = 1, id, parentClassName, thumbsDisabled = [true, false], rangeSlideDisabled = true, className, label, max = 100, min = 0, defaultValue = [0, 50] }) =>
{
    const [rangeValues, setRangeValues] = useState<number[]>([0, 0]);
    const [thumbDisabled, setThumbDisabled] = useState<boolean[]>([false, false]);

    useEffect(() =>
    {
        setRangeValues(defaultValue);
        setThumbDisabled(thumbsDisabled);
    }, []);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (Number(event.target.value) > 0)
        {
            setRangeValues([0, Number(event.target.value)]);
            setThumbDisabled([true, false]);
        }
        else if (Number(event.target.value) < 0)
        {
            setRangeValues([Number(event.target.value), 0]);
            setThumbDisabled([false, true]);
        }
        else if (Number(event.target.value) === 0)
        {
            setRangeValues([0, 0]);
            setThumbDisabled([false, false]);
        }
    };

    return (
        <div className={ `flex w-full flex-col items-center gap-2 py-2 ${ parentClassName }` }>
            <div className='flex w-full items-center justify-between gap-1 align-middle'>
                <label>
                    { label }
                </label>

                <InputComponent
                    inputType='number'
                    value={ toFixedUtil(!thumbsDisabled[0] ? (rangeValues[1] !== 0 ? rangeValues[1] : (rangeValues[0] !== 0 ? rangeValues[0] : 0)) : rangeValues[1]) }
                    onChange={ handleRangeChange }
                    className='w-full max-w-12 rounded-md px-[2px] py-[2.5px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                />
            </div>

            <RangeSlider
                onInput={(values: any) =>
                {
                    if (!thumbsDisabled[0])
                    {
                        if (values[0] < 0)
                            setThumbDisabled([false, true]);

                        if (values[1] > 0)
                            setThumbDisabled([true, false]);

                        if (values[0] === 0 && values[1] === 0)
                        {
                            setThumbDisabled([false, false]);
                            setRangeValues([0, 0]);
                        }
                        else
                            setRangeValues(values);
                    }

                    if (thumbsDisabled[0])
                        setRangeValues(values);
                }}
                step={ step }
                id={ id }
                min={ min }
                max={ max }
                value={ rangeValues }
                className={ className }
                defaultValue={ defaultValue }
                thumbsDisabled={ thumbDisabled }
                rangeSlideDisabled={ rangeSlideDisabled }
            />
        </div>
    );
};

export default CustomRangeInputComponent;
