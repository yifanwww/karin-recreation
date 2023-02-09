import { useContext } from 'react';
import { PreviewControlContext } from './context';

export function useCurrentStep() {
    const { currentTime, steps } = useContext(PreviewControlContext);
    const stepIndex = steps.findIndex((item) => item.time <= currentTime);
    return {
        step: stepIndex === -1 ? null : steps[stepIndex],
        stepIndex,
    };
}

export function useControlOperations() {
    const { changeFrame, nextFrame, prevFrame, toFirstFrame, toLastFrame } = useContext(PreviewControlContext);
    return { changeFrame, nextFrame, prevFrame, toFirstFrame, toLastFrame };
}
