import React, { useState } from 'react';

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
}

const PercentRangeInputComponent: React.FC<CustomRangeInputProps> = ({ value = undefined, infinityAt21 = false, inputValue = true, setValue, step = 1, className, sliderClassname, label, max = 100, min = 0, defaultValue = 0 }) =>
{
    const [percentage, setPercentage] = useState(35);

    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setPercentage(Number(event.target.value));
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
                        value={
                            (infinityAt21 && percentage === 21)
                                ?
                                '∞'
                                :
                                (value || `${ percentage }% `)
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
                value={ value || percentage }
                onChange={ handleRangeChange }
                className={ `form-range w-[85%] text-slate-500 [--range-thumb-size:10px] [--range-track-h:3px] dark:text-navy-300 ${ sliderClassname }` }
            />
        </div>
    );
};

export default PercentRangeInputComponent;
