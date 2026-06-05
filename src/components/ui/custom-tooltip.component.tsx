import React from 'react';

import Tippy from '@tippyjs/react';
import { Placement, roundArrow } from 'tippy.js';

interface CustomTooltipProps
{
    content: string | React.ReactElement;
    disabled?: boolean;
    children: React.ReactElement;
    placement?: Placement
}

const CustomTooltipComponent: React.FC<CustomTooltipProps> = ({ disabled = false, content, children, placement = 'right' }) =>
{
    return (
        <Tippy disabled={ disabled } content={ content } placement={ placement } theme='secondary' arrow={ roundArrow } animation={ 'shift-away' }>
            { children }
        </Tippy>
    );
};

export default CustomTooltipComponent;
