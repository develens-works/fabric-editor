import React, { useState, Ref, MutableRefObject } from 'react';

import InputComponent from '@/components/ui/input.component';

interface CustomRangeInputProps
{
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    inputValue?: boolean;
    className?: string;
    sliderClassname?: string;
    value?: number;
    infinityAt21?: boolean;
    defaultValue?: number;
    setValue?: any;
    counterStateOfZoomComponent?: number | boolean ;
    elementRefOfRangeInput?: Ref<HTMLInputElement>
    elementRefOfTextInput?: Ref<HTMLInputElement>
}

const RangeInputComponent: React.FC<CustomRangeInputProps> = ({ value = undefined, infinityAt21 = false, inputValue = true, setValue, step = 1, className, sliderClassname, label, max = 100, min = 0, defaultValue = 0, counterStateOfZoomComponent = false, elementRefOfRangeInput, elementRefOfTextInput }) =>
{
    const [rangeValue, setRangeValue] = useState<number>(defaultValue);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (setValue)
            setValue(Number(event.target.value));

        setRangeValue(Number(event.target.value));
    };

    return (
        <div className={ `flex w-full flex-col items-center py-1 ${ className }` }>
            <div className='flex w-full items-center justify-between gap-1 align-middle'>
                <label>
                    { label }
                </label>

                {
                    inputValue
                    &&
                    <InputComponent
                        inputType='text'
                        pattern='([0-9]|&#8734;)+'
                        elementRef = { elementRefOfTextInput }
                        value={
                            (infinityAt21 && rangeValue === 21)
                                ?
                                '∞'
                                :
                                (value || rangeValue)
                        }
                        onChange={ handleRangeChange }
                        className='w-full max-w-12 rounded-md px-[2px] py-[2.5px] text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                    />
                }
            </div>

            <input
                type='range'
                min={ min }
                max={ max }
                step={ step }
                ref={ elementRefOfRangeInput }
                value={ value || rangeValue }
                onChange={ handleRangeChange }
                className={ `form-range w-full text-slate-500 [--range-thumb-size:10px] [--range-track-h:3px] dark:text-navy-300 ${ sliderClassname }` }
            />
        </div>
    );
};

export default RangeInputComponent;
