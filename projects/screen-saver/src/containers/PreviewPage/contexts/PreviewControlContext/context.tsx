import { Vector2 } from 'js-vectors';
import lodash from 'lodash';
import { createContext, useCallback, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { FRAME_PERIOD, SCREEN_SIZE } from 'src/constants/preview';
import { calculateSteps, stepConfigs, StepRecord, triggerConfigs } from 'src/modules/control';
import { abstractFn } from 'src/utils/function';
import { getNearestFrame } from 'src/utils/preview';
import { reducer } from './reducer';
import { PreviewControlContextValues, PreviewControlContextUpdaters } from './types';
import { Millisecond } from 'src/types/primitives';

function getInitialState(): PreviewControlContextValues {
    const initialDirection = new Vector2(-Math.sqrt(3) / 2, 0.5);
    const initialPosition = new Vector2(854, 436);

    return {
        // data

        currentFrame: 0,

        initial: {
            direction: initialDirection,
            position: initialPosition,
        },
        stepConfigs: {
            defaults: stepConfigs,
            triggers: triggerConfigs,
        },
        maxSteps: 25,

        // extra data

        currentTime: 0,
        currentDirection: null,
        currentPosition: null,

        steps: [],
        currentStep: null,
        currentStepIndex: -1,
        nextStep: null,

        // actions

        changeFrame: abstractFn,
        nextFrame: abstractFn,
        prevFrame: abstractFn,
        toFirstFrame: abstractFn,
        toLastFrame: abstractFn,
    };
}

export const PreviewControlContext = createContext<PreviewControlContextValues>(getInitialState());

export const PreviewControlProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, undefined, () => {
        const initialState = getInitialState();
        return {
            currentFrame: initialState.currentFrame,
            initial: initialState.initial,
            stepConfigs: initialState.stepConfigs,
            maxSteps: initialState.maxSteps,
        };
    });

    const steps = useMemo(
        () =>
            calculateSteps({
                configs: state.stepConfigs,
                initial: state.initial,
                maxSteps: state.maxSteps,
                screen: SCREEN_SIZE,
            }),
        [state.initial, state.maxSteps, state.stepConfigs],
    );

    const updaters = useMemo(
        (): PreviewControlContextUpdaters => ({
            changeFrame: (frame) => dispatch({ type: 'set-frame', frame }),
            nextFrame: (num) => dispatch({ type: 'next-frame', num }),
            prevFrame: (num) => dispatch({ type: 'prev-frame', num }),
            toFirstFrame: () => dispatch({ type: 'set-frame', frame: 0 }),
            toLastFrame: () => dispatch({ type: 'set-frame', frame: getNearestFrame(steps[steps.length - 1].time) }),
        }),
        [dispatch, steps],
    );

    const getCurrentPosition = useCallback(
        (currentTime: Millisecond, current: StepRecord, next: StepRecord) =>
            Vector2.lerp(current.position, next.position, (currentTime - current.time) / (next.time - current.time)),
        [],
    );

    const context = useMemo((): PreviewControlContextValues => {
        const currentTime = state.currentFrame * FRAME_PERIOD;

        const stepIndex = lodash.findLastIndex(steps, (item) => item.time <= currentTime);

        const currentStep = stepIndex === -1 ? null : steps[stepIndex];
        const nextStep = stepIndex === -1 ? null : steps[stepIndex + 1];

        const currentPosition = currentStep && nextStep ? getCurrentPosition(currentTime, currentStep, nextStep) : null;
        const currentDirection = currentStep && nextStep ? Vector2.sub(nextStep.position, currentStep.position) : null;

        return {
            ...state,
            ...updaters,
            currentTime,
            currentDirection,
            currentPosition,
            steps,
            currentStep,
            currentStepIndex: stepIndex,
            nextStep,
        };
    }, [getCurrentPosition, state, steps, updaters]);

    return <PreviewControlContext.Provider value={context}>{children}</PreviewControlContext.Provider>;
};
