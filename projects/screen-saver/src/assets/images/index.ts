import { ImageConfig, ImageMargin } from 'src/types/image';

import sticker_01_1 from './sticker-01.1 [transp-1].png';
import sticker_01_2 from './sticker-01.2 [transp-1].png';
import sticker_01_3 from './sticker-01.3 [transp-1].png';
import sticker_01_4 from './sticker-01.4 [transp-1].png';
import sticker_02_1 from './sticker-02.1 [origin].png';
import sticker_02_4 from './sticker-02.4 [origin].png';

interface ImageOptions {
    margin?: Partial<ImageMargin>;
}

function createImageConfigs(url: string, options: ImageOptions): ImageConfig {
    const { margin } = options;

    return {
        url,
        margin: {
            bottom: margin?.bottom ?? 0,
            left: margin?.left ?? 0,
            right: margin?.right ?? 0,
            top: margin?.top ?? 0,
        },
    };
}

export const ImageAssets: Record<string, ImageConfig> = {
    sticker_01_1: createImageConfigs(sticker_01_1, {}),
    sticker_01_2: createImageConfigs(sticker_01_2, {}),
    sticker_01_3: createImageConfigs(sticker_01_3, {}),
    sticker_01_4: createImageConfigs(sticker_01_4, {}),
    sticker_02_1: createImageConfigs(sticker_02_1, {}),
    sticker_02_4: createImageConfigs(sticker_02_4, {}),
};
