import { Vector2 } from 'js-vectors';

import { StepConfigs, StepRecord } from 'src/modules/control';
import { Millisecond } from 'src/types/primitives';

export type PreviewControlContextState = {
    currentFrame: number;

    initial: {
        direction: Vector2;
        position: Vector2;
    };
    stepConfigs: StepConfigs;
    maxSteps: number;
};

export type PreviewControlContextExtraData = {
    currentTime: Millisecond;

    steps: StepRecord[];
};

export type PreviewControlContextUpdaters = {
    changeFrame: (frame: number) => void;
    nextFrame: (num?: number) => void;
    prevFrame: (num?: number) => void;
    toFirstFrame: () => void;
    toLastFrame: () => void;
};

export type PreviewControlContextValues = PreviewControlContextState &
    PreviewControlContextExtraData &
    PreviewControlContextUpdaters;
