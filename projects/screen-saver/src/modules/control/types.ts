import { Vector2 } from 'js-vectors';

import { ImageAssetName } from 'src/assets';
import { Millisecond } from 'src/types/primitives';

export type StepCommonOption = {
    time: Millisecond;
};

export type StepOption = StepCommonOption & {
    imageName: ImageAssetName;
};

export type StepTriggerOption = StepCommonOption & {
    imageName: ImageAssetName;
    duration: Millisecond;
};

export type StepRecord = {
    time: Millisecond;

    imageName: ImageAssetName;
    position: Vector2;
    direction: Vector2;
};

export type StepConfigs = {
    defaults: StepOption[];
    triggers: StepTriggerOption[];
};
