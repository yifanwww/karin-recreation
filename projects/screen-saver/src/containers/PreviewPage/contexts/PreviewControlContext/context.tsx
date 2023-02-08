import { Vector2 } from 'js-vectors';
import { createContext, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

import { calculateSteps, stepConfigs, triggerConfigs } from 'src/modules/control';
import { abstractFn } from 'src/utils/function';
import { reducer } from './reducer';
import { PreviewControlContextValues, PreviewControlContextUpdaters } from './types';

const initialState: PreviewControlContextValues = {
    // data

    current: 0,

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

    screen: new Vector2(1920, 1080),
    steps: [],

    // actions

    changeTime: abstractFn,
};

export const PreviewControlContext = createContext<PreviewControlContextValues>(initialState);

export const PreviewControlProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, {
        current: initialState.current,
        initial: initialState.initial,
        stepConfigs: initialState.stepConfigs,
        maxSteps: initialState.maxSteps,
    });

    const updaters = useMemo<PreviewControlContextUpdaters>(
        () => ({
            changeTime: (time) => dispatch({ type: 'set-time', time }),
        }),
        [dispatch],
    );

    const screen = useMemo(() => new Vector2(1920, 1080), []);

    const steps = useMemo(
        () =>
            calculateSteps({
                configs: state.stepConfigs,
                initial: state.initial,
                maxSteps: state.maxSteps,
                screen,
            }),
        [screen, state],
    );

    const context = useMemo(
        (): PreviewControlContextValues => ({
            ...state,
            ...updaters,
            screen,
            steps,
        }),
        [screen, state, steps, updaters],
    );

    return <PreviewControlContext.Provider value={context}>{children}</PreviewControlContext.Provider>;
};
