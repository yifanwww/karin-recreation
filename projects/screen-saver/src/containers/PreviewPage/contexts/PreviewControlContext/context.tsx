import { Vector2 } from 'js-vectors';
import { createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { FRAME_PERIOD, SCREEN_SIZE } from 'src/constants/preview';
import { calculateSteps, stepConfigs, triggerConfigs } from 'src/modules/control';
import { abstractFn } from 'src/utils/function';
import { reducer } from './reducer';
import { PreviewControlContextValues, PreviewControlContextUpdaters } from './types';
import { getNearestFrame } from 'src/utils/preview';

const initialState: PreviewControlContextValues = {
    // data

    currentFrame: 0,

    initial: {
        direction: new Vector2(-Math.sqrt(3) / 2, 0.5),
        position: new Vector2(854, 436),
    },
    stepConfigs: {
        defaults: stepConfigs,
        triggers: triggerConfigs,
    },
    maxSteps: 25,

    // extra data

    currentTime: 0,

    steps: [],

    // actions

    changeFrame: abstractFn,
    nextFrame: abstractFn,
    prevFrame: abstractFn,
    toFirstFrame: abstractFn,
    toLastFrame: abstractFn,
};

export const PreviewControlContext = createContext<PreviewControlContextValues>(initialState);

export const PreviewControlProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, {
        currentFrame: initialState.currentFrame,
        initial: initialState.initial,
        stepConfigs: initialState.stepConfigs,
        maxSteps: initialState.maxSteps,
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
            toLastFrame: () =>
                dispatch({ type: 'set-frame', frame: getNearestFrame(steps[steps.length - 1].time) }),
        }),
        [dispatch, steps],
    );

    const context = useMemo(
        (): PreviewControlContextValues => ({
            ...state,
            ...updaters,
            currentTime: state.currentFrame * FRAME_PERIOD,
            steps,
        }),
        [state, steps, updaters],
    );

    return <PreviewControlContext.Provider value={context}>{children}</PreviewControlContext.Provider>;
};
