import { ImageProperty } from 'src/types/image';

import sticker_01_1 from './sticker-01.1 [transp-1].png';
import sticker_01_2 from './sticker-01.2 [transp-1].png';
import sticker_01_3 from './sticker-01.3 [transp-1].png';
import sticker_01_4 from './sticker-01.4 [transp-1].png';
import sticker_02_1 from './sticker-02.1 [transp-1].png';
import sticker_02_4 from './sticker-02.4 [transp-1].png';

function createImageProperties(props: ImageProperty[]): Record<string, ImageProperty> {
    return Object.fromEntries(props.map((prop) => [prop.name, prop]));
}

export enum ImageAssetName {
    STICKER_01_1 = 'sticker_01_1',
    STICKER_01_2 = 'sticker_01_2',
    STICKER_01_3 = 'sticker_01_3',
    STICKER_01_4 = 'sticker_01_4',
    STICKER_02_1 = 'sticker_02_1',
    STICKER_02_4 = 'sticker_02_4',
}

export const ImageAssets = createImageProperties([
    {
        name: ImageAssetName.STICKER_01_1,
        url: sticker_01_1,

        size: { x: 800, y: 800 },
        innerPosition: { x: 68, y: 60 },
        innerSize: { x: 678, y: 683 },

        defaultCanvasScale: { x: 0.3, y: 0.3 },
    },

    {
        name: ImageAssetName.STICKER_01_2,
        url: sticker_01_2,

        size: { x: 800, y: 800 },
        innerPosition: { x: 64, y: 67 },
        innerSize: { x: 680, y: 671 },

        defaultCanvasScale: { x: 0.3, y: 0.3 },
    },

    {
        name: ImageAssetName.STICKER_01_3,
        url: sticker_01_3,

        size: { x: 800, y: 800 },
        innerPosition: { x: 45, y: 60 },
        innerSize: { x: 711, y: 775 },

        defaultCanvasScale: { x: 0.3, y: 0.3 },
    },

    {
        name: ImageAssetName.STICKER_01_4,
        url: sticker_01_4,

        size: { x: 800, y: 800 },
        innerPosition: { x: 65, y: 54 },
        innerSize: { x: 674, y: 690 },

        defaultCanvasScale: { x: 0.3, y: 0.3 },
    },

    {
        name: ImageAssetName.STICKER_02_1,
        url: sticker_02_1,

        size: { x: 800, y: 800 },
        innerPosition: { x: 45, y: 62 },
        innerSize: { x: 711, y: 694 },

        defaultCanvasScale: { x: 0.3, y: 0.3 },
    },

    {
        name: ImageAssetName.STICKER_02_4,
        url: sticker_02_4,

        size: { x: 800, y: 800 },
        innerPosition: { x: 45, y: 59 },
        innerSize: { x: 710, y: 696 },

        defaultCanvasScale: { x: 0.3, y: 0.3 },
    },
]);
