import type { ImmerReducer } from 'use-immer';

import { Millisecond } from 'src/types/primitives';
import { getNearestFrame } from 'src/utils/preview';
import type { PreviewControlContextState } from './types';

export type ReducerAction =
    | { type: 'set-play'; enabled: boolean }
    | { type: 'set-frame'; frame: Millisecond }
    | { type: 'next-frame'; num?: number }
    | { type: 'prev-frame'; num?: number }
    | { type: 'to-first-frame' }
    | { type: 'to-last-frame' };

export const reducer: ImmerReducer<PreviewControlContextState, ReducerAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'set-play':
            state.play = action.enabled;
            break;

        case 'set-frame':
            state.currentFrame = action.frame;
            break;

        case 'next-frame': {
            const num = Math.max(action.num ?? 1, 1);
            const lastFrame = getNearestFrame(state.steps[state.steps.length - 1].time);
            state.currentFrame = Math.min(state.currentFrame + num, lastFrame);
            break;
        }

        case 'prev-frame': {
            const num = Math.max(action.num ?? 1, 1);
            state.currentFrame = Math.max(state.currentFrame - num, 0);
            break;
        }

        case 'to-first-frame':
            state.currentFrame = 0;
            break;

        case 'to-last-frame': {
            state.currentFrame = getNearestFrame(state.steps[state.steps.length - 1].time);
            break;
        }

        default:
            never = action;
    }
};
