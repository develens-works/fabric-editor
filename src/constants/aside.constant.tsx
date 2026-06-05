import { FaFileImage, FaFont, FaCirclePlay, FaShapes, FaSliders, FaRegWindowMaximize } from 'react-icons/fa6';

export const MenuAside =
[
    { value: 'media', label: 'Media', link: 'media', icon: <FaFileImage size={ 18 } /> },
    { value: 'text', label: 'Text', link: 'texts', icon: <FaFont size={ 18 } /> },
    { value: 'button', label: 'Button', link: 'button', icon: <FaCirclePlay size={ 18 } /> },
    { value: 'shapes', label: 'Shapes', link: 'shapes', icon: <FaShapes size={ 18 } /> },
    { value: 'nav', label: 'Nav', link: 'nav', icon: <FaRegWindowMaximize size={ 18 } /> },
    { value: 'world', label: 'World', link: 'world', icon: <FaSliders size={ 18 } /> }
];
