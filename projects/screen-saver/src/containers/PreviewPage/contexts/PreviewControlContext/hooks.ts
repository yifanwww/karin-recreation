import { useContext } from 'react';
import { PreviewControlContext } from './context';

export function useCurrentStep() {
    const { current, steps } = useContext(PreviewControlContext);
    const stepIndex = steps.findIndex((item) => item.time <= current);
    return {
        step: stepIndex === -1 ? null : steps[stepIndex],
        stepIndex,
    };
}
