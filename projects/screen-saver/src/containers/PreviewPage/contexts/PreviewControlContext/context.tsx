import { Vector2 } from 'js-vectors';
import lodash from 'lodash';
import { createContext, useCallback, useEffect, useMemo, useRef } from 'react';
import { useImmerReducer } from 'use-immer';

import { FRAME_PERIOD, SCREEN_SIZE } from 'src/constants/preview';
import { usePersistFn } from 'src/hooks';
import { calculateSteps, stepConfigs, StepRecord, triggerConfigs } from 'src/modules/control';
import { Millisecond } from 'src/types/primitives';
import { abstractFn } from 'src/utils/function';
import { getNearestFrame } from 'src/utils/preview';
import { reducer } from './reducer';
import { PreviewControlContextValues, PreviewControlContextUpdaters } from './types';

function getInitialState(): PreviewControlContextValues {
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

        steps: [],
        maxSteps: 25,

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

export const PreviewControlContext = createContext<PreviewControlContextValues>(getInitialState());

export const PreviewControlProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, undefined, () => {
        const initialState = getInitialState();
        return {
            currentFrame: initialState.currentFrame,
            initial: initialState.initial,
            maxSteps: initialState.maxSteps,
            play: initialState.play,
            stepConfigs: initialState.stepConfigs,
            steps: calculateSteps({
                configs: initialState.stepConfigs,
                initial: initialState.initial,
                maxSteps: initialState.maxSteps,
                screen: SCREEN_SIZE,
            }),
        };
    });

    const timerRef = useRef<number>();

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

    useEffect(() => {
        if (state.play) {
            const lastFrame = getNearestFrame(state.steps[state.steps.length - 1].time);

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
    }, [autoNextFrame, state.play, state.steps, updaters]);

    const getCurrentPosition = useCallback(
        (currentTime: Millisecond, current: StepRecord, next: StepRecord) =>
            Vector2.lerp(current.position, next.position, (currentTime - current.time) / (next.time - current.time)),
        [],
    );

    const context = useMemo((): PreviewControlContextValues => {
        const currentTime = state.currentFrame * FRAME_PERIOD;

        const stepIndex = lodash.findLastIndex(state.steps, (item) => item.time <= currentTime);

        const currentStep = stepIndex === -1 ? null : state.steps[stepIndex];
        const nextStep = stepIndex === -1 ? null : state.steps[stepIndex + 1];

        const currentPosition = currentStep && nextStep ? getCurrentPosition(currentTime, currentStep, nextStep) : null;
        const currentDirection = currentStep && nextStep ? Vector2.sub(nextStep.position, currentStep.position) : null;

        return {
            ...state,
            ...updaters,
            currentTime,
            currentDirection,
            currentPosition,
            currentStep,
            currentStepIndex: stepIndex,
            nextStep,
        };
    }, [getCurrentPosition, state, updaters]);

    return <PreviewControlContext.Provider value={context}>{children}</PreviewControlContext.Provider>;
};
