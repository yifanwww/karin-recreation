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
    currentDirection: Vector2 | null;
    currentPosition: Vector2 | null;

    steps: StepRecord[];
    currentStep: StepRecord | null;
    currentStepIndex: number;
    nextStep: StepRecord | null;
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
