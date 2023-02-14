import { useContext } from 'react';
import { PreviewControlContext, StepContext } from './context';

export function useCurrentStep() {
    const { currentDirection, currentFrame, currentPosition, currentStep, currentStepIndex, currentTime } =
        useContext(PreviewControlContext);
    return {
        direction: currentDirection,
        frame: currentFrame,
        position: currentPosition,
        step: currentStep,
        stepIndex: currentStepIndex,
        time: currentTime,
    };
}

export function useNextStep() {
    const { nextStep } = useContext(PreviewControlContext);
    return { nextStep };
}

export function useControlOperations() {
    const { changeFrame, changePlay, nextFrame, prevFrame, toFirstFrame, toLastFrame } =
        useContext(PreviewControlContext);
    return { changeFrame, changePlay, nextFrame, prevFrame, toFirstFrame, toLastFrame };
}

export function usePreviewPlayState() {
    const { play } = useContext(PreviewControlContext);
    return { play };
}

export function usePreviewSteps() {
    const { maxFrame, steps } = useContext(StepContext);
    return { maxFrame, steps };
}
