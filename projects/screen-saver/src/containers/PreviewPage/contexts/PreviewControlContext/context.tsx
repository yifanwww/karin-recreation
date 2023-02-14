import { Vector2 } from 'js-vectors';
import lodash from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useImmerReducer } from 'use-immer';

import { FRAME_PERIOD, SCREEN_SIZE } from 'src/constants/preview';
import { usePersistFn } from 'src/hooks';
import { calculateSteps, stepConfigs, StepRecord, triggerConfigs } from 'src/modules/control';
import { Millisecond } from 'src/types/primitives';
import { abstractFn } from 'src/utils/function';
import { getNearestFrame } from 'src/utils/preview';
import { reducer } from './reducer';
import { PreviewControlContextValues, PreviewControlContextUpdaters, StepContextState } from './types';

function getPreviewControlContextInitialState(): PreviewControlContextValues {
    const initialDirection = new Vector2(-Math.sqrt(3) / 2, 0.5);
    const initialPosition = new Vector2(854, 436);

    return {
        // data

        currentFrame: 0,
        play: false,

        initial: {
            direction: initialDirection,
            position: initialPosition,
        },
        stepConfigs: {
            defaults: stepConfigs,
            triggers: triggerConfigs,
        },

        // extra data

        currentTime: 0,
        currentDirection: null,
        currentPosition: null,

        currentStep: null,
        currentStepIndex: -1,
        nextStep: null,

        // actions

        changeFrame: abstractFn,
        changePlay: abstractFn,
        nextFrame: abstractFn,
        prevFrame: abstractFn,
        toFirstFrame: abstractFn,
        toLastFrame: abstractFn,
    };
}

function getStepContextInitialState(): StepContextState {
    return {
        maxFrame: 10_000,
        steps: [],
    };
}

export const PreviewControlContext = createContext<PreviewControlContextValues>(getPreviewControlContextInitialState());

export const StepContext = createContext<StepContextState>(getStepContextInitialState());

export const PreviewControlProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, undefined, () => {
        const { currentFrame, play } = getPreviewControlContextInitialState();
        const { maxFrame } = getStepContextInitialState();
        return { currentFrame, maxFrame, play };
    });

    const [constState] = useState(() => {
        const { initial, stepConfigs } = getPreviewControlContextInitialState();
        return { initial, stepConfigs };
    });

    const steps = useMemo(
        () =>
            calculateSteps({
                configs: constState.stepConfigs,
                initial: constState.initial,
                maxFrame: state.maxFrame,
                screen: SCREEN_SIZE,
            }),
        [constState.initial, constState.stepConfigs, state.maxFrame],
    );

    const updaters = useMemo(
        (): PreviewControlContextUpdaters => ({
            changeFrame: (frame) => dispatch({ type: 'set-frame', frame }),
            changePlay: (enabled) => dispatch({ type: 'set-play', enabled }),
            nextFrame: (num) => dispatch({ type: 'next-frame', num }),
            prevFrame: (num) => dispatch({ type: 'prev-frame', num }),
            toFirstFrame: () => dispatch({ type: 'to-first-frame' }),
            toLastFrame: () => dispatch({ type: 'to-last-frame' }),
        }),
        [dispatch],
    );

    const autoNextFrame = usePersistFn((lastFrame: number) => {
        if (state.currentFrame < lastFrame) {
            updaters.nextFrame();
        } else {
            updaters.changePlay(false);
        }
    });

    const timerRef = useRef<number>();
    useEffect(() => {
        if (state.play) {
            const lastFrame = getNearestFrame(steps[steps.length - 1].time);

            timerRef.current = window.setInterval(autoNextFrame, FRAME_PERIOD, lastFrame);
        } else if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = undefined;
        }

        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = undefined;
            }
        };
    }, [autoNextFrame, state.play, steps, updaters]);

    const getCurrentPosition = useCallback(
        (currentTime: Millisecond, current: StepRecord, next: StepRecord) =>
            Vector2.lerp(current.position, next.position, (currentTime - current.time) / (next.time - current.time)),
        [],
    );

    const previewControlContext = useMemo((): PreviewControlContextValues => {
        const currentTime = state.currentFrame * FRAME_PERIOD;

        const stepIndex = lodash.findLastIndex(steps, (item) => item.time <= currentTime);

        const currentStep = stepIndex === -1 ? null : steps[stepIndex];
        const nextStep = stepIndex === -1 ? null : steps[stepIndex + 1];

        const currentPosition = currentStep && nextStep ? getCurrentPosition(currentTime, currentStep, nextStep) : null;
        const currentDirection = currentStep && nextStep ? Vector2.sub(nextStep.position, currentStep.position) : null;

        return {
            ...constState,
            ...state,
            ...updaters,
            currentTime,
            currentDirection,
            currentPosition,
            currentStep,
            currentStepIndex: stepIndex,
            nextStep,
        };
    }, [constState, getCurrentPosition, state, steps, updaters]);

    const stepContext = useMemo(
        () => ({
            maxFrame: state.maxFrame,
            steps,
        }),
        [state.maxFrame, steps],
    );

    return (
        <PreviewControlContext.Provider value={previewControlContext}>
            <StepContext.Provider value={stepContext}>{children}</StepContext.Provider>
        </PreviewControlContext.Provider>
    );
};
