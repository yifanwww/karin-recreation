import { Vector2 } from 'js-vectors';

import { StepConfigs, StepRecord } from 'src/modules/control';
import { Millisecond } from 'src/types/primitives';

export type PreviewControlContextUpdaters = {
    changeTime: (time: Millisecond) => void;
};

export type PreviewControlContextState = {
    current: Millisecond;

    initial: {
        direction: Vector2;
        position: Vector2;
    };
    stepConfigs: StepConfigs;
    maxSteps: number;
};

export type PreviewControlContextExtraData = {
    screen: Vector2;
    steps: StepRecord[];
};

export type PreviewControlContextValues = PreviewControlContextState &
    PreviewControlContextExtraData &
    PreviewControlContextUpdaters;
