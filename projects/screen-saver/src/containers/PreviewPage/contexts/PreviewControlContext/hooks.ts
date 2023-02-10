import { useContext } from 'react';
import { PreviewControlContext } from './context';

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
    const { changeFrame, nextFrame, prevFrame, toFirstFrame, toLastFrame } = useContext(PreviewControlContext);
    return { changeFrame, nextFrame, prevFrame, toFirstFrame, toLastFrame };
}
