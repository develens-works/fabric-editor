import { useEffect, RefObject } from 'react';

const useClickOutside = <T extends HTMLElement>(open: boolean, ref: RefObject<T>, callback: () => void, select?: boolean) =>
{
    useEffect(() =>
    {
        const isNode = (target: EventTarget | null): target is Node =>
        {
            return target instanceof Node;
        };

        const handleClickOutside = (event: MouseEvent) =>
        {
            if (open && ref.current && isNode(event.target))
            {
                if (!ref.current.contains(event.target))
                    callback();
            }
        };

        document.addEventListener('click', handleClickOutside, select);

        return () =>
        {
            document.removeEventListener('click', handleClickOutside, select);
        };
    }, [open, ref, callback]);
};

export default useClickOutside;
