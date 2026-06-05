// fabric.d.ts
import { IObjectOptions } from 'fabric/fabric-impl';

declare module 'fabric'
{
    namespace fabric
    {
        interface IObjectOptions
        {
            zoneClassNumber?: string;
            sliderClassNumber?: string;
            label?: string;
            completeParent?: fabric.Object;
            completeChildren?: fabric.Object[]
        }
    }
}
