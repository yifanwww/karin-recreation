import { ImageAssetName } from 'src/assets';
import { StepOption, StepTriggerOption } from './types';

export const stepConfigs: StepOption[] = [
    { time: 0, image: ImageAssetName.STICKER_01_3 },
    { time: 1_000, image: ImageAssetName.STICKER_02_1 },
];

export const triggerConfigs: StepTriggerOption[] = [
    {
        time: 0,
        image: ImageAssetName.STICKER_01_2,
        duration: 30,
    },
];
