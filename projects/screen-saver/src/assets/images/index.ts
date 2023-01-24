import { ImageInfo } from 'src/types/image';

import sticker_01_1 from './sticker-01.1 [transp-1].png';
import sticker_01_2 from './sticker-01.2 [transp-1].png';
import sticker_01_3 from './sticker-01.3 [transp-1].png';
import sticker_01_4 from './sticker-01.4 [transp-1].png';
import sticker_02_1 from './sticker-02.1 [origin].jpg';
import sticker_02_4 from './sticker-02.4 [origin].jpg';

function createImageInfos(infos: Record<string, Omit<ImageInfo, 'name'>>): Record<string, ImageInfo> {
    return Object.fromEntries(Object.entries(infos).map(([name, info]) => [name, { ...info, name }]));
}

export const ImageAssets = createImageInfos({
    sticker_01_1: {
        url: sticker_01_1,
        size: { height: 800, width: 800 },
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
    },

    sticker_01_2: {
        url: sticker_01_2,
        size: { height: 800, width: 800 },
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
    },

    sticker_01_3: {
        url: sticker_01_3,
        size: { height: 800, width: 800 },
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
    },

    sticker_01_4: {
        url: sticker_01_4,
        size: { height: 800, width: 800 },
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
    },

    sticker_02_1: {
        url: sticker_02_1,
        size: { height: 800, width: 800 },
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
    },

    sticker_02_4: {
        url: sticker_02_4,
        size: { height: 800, width: 800 },
        margin: {
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        },
    },
});
