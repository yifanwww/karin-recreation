import { Vector2 } from 'js-vectors';
import { ImageProperty } from 'src/types/image';

import sticker_01_1 from './sticker-01.1 [transp-1].png';
import sticker_01_2 from './sticker-01.2 [transp-1].png';
import sticker_01_3 from './sticker-01.3 [transp-1].png';
import sticker_01_4 from './sticker-01.4 [transp-1].png';
import sticker_02_1 from './sticker-02.1 [transp-1].png';
import sticker_02_4 from './sticker-02.4 [transp-1].png';

export enum ImageAssetName {
    STICKER_01_1 = 'sticker_01_1',
    STICKER_01_2 = 'sticker_01_2',
    STICKER_01_3 = 'sticker_01_3',
    STICKER_01_4 = 'sticker_01_4',
    STICKER_02_1 = 'sticker_02_1',
    STICKER_02_4 = 'sticker_02_4',
}

function createImageProperties(props: ImageProperty[]): Record<ImageAssetName, ImageProperty> {
    return Object.fromEntries(props.map((prop) => [prop.name, prop])) as never;
}

export const ImageAssets = createImageProperties([
    {
        name: ImageAssetName.STICKER_01_1,
        url: sticker_01_1,

        size: new Vector2(800, 800),
        contentSize: {
            min: new Vector2(68, 60),
            max: new Vector2(746, 743),
        },

        scale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_01_2,
        url: sticker_01_2,

        size: new Vector2(800, 800),
        contentSize: {
            min: new Vector2(64, 67),
            max: new Vector2(744, 738),
        },

        scale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_01_3,
        url: sticker_01_3,

        size: new Vector2(800, 800),
        contentSize: {
            min: new Vector2(45, 60),
            max: new Vector2(756, 755),
        },

        scale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_01_4,
        url: sticker_01_4,

        size: new Vector2(800, 800),
        contentSize: {
            min: new Vector2(65, 54),
            max: new Vector2(739, 744),
        },

        scale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_02_1,
        url: sticker_02_1,

        size: new Vector2(800, 800),
        contentSize: {
            min: new Vector2(45, 62),
            max: new Vector2(756, 756),
        },

        scale: new Vector2(0.3, 0.3),
    },

    {
        name: ImageAssetName.STICKER_02_4,
        url: sticker_02_4,

        size: new Vector2(800, 800),
        contentSize: {
            min: new Vector2(45, 59),
            max: new Vector2(755, 755),
        },

        scale: new Vector2(0.3, 0.3),
    },
]);
