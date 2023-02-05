import { Vector2 } from 'js-vectors';
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

        size: new Vector2(800, 800),
        innerPosition: new Vector2(68, 60),
        innerSize: new Vector2(678, 683),

        defaultCanvasScale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_01_2,
        url: sticker_01_2,

        size: new Vector2(800, 800),
        innerPosition: new Vector2(64, 67),
        innerSize: new Vector2(680, 671),

        defaultCanvasScale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_01_3,
        url: sticker_01_3,

        size: new Vector2(800, 800),
        innerPosition: new Vector2(45, 60),
        innerSize: new Vector2(711, 775),

        defaultCanvasScale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_01_4,
        url: sticker_01_4,

        size: new Vector2(800, 800),
        innerPosition: new Vector2(65, 54),
        innerSize: new Vector2(674, 690),

        defaultCanvasScale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_02_1,
        url: sticker_02_1,

        size: new Vector2(800, 800),
        innerPosition: new Vector2(45, 62),
        innerSize: new Vector2(711, 694),

        defaultCanvasScale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_02_4,
        url: sticker_02_4,

        size: new Vector2(800, 800),
        innerPosition: new Vector2(45, 59),
        innerSize: new Vector2(710, 696),

        defaultCanvasScale: new Vector2(0.3, 0.3),
    },
]);
