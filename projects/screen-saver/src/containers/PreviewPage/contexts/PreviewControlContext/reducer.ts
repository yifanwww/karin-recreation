import type { ImmerReducer } from 'use-immer';

import { Millisecond } from 'src/types/primitives';
import type { PreviewControlContextState, StepContextState } from './types';

export type ReducerState = Pick<PreviewControlContextState, 'currentFrame' | 'play'> &
    Pick<StepContextState, 'maxFrame'>;

export type ReducerAction =
    | { type: 'set-play'; enabled: boolean }
    | { type: 'set-frame'; frame: Millisecond }
    | { type: 'next-frame'; num?: number }
    | { type: 'prev-frame'; num?: number }
    | { type: 'to-first-frame' }
    | { type: 'to-last-frame' };

export const reducer: ImmerReducer<ReducerState, ReducerAction> = (state, action) => {
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
            state.currentFrame = Math.min(state.currentFrame + num, state.maxFrame);
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

        case 'to-last-frame':
            state.currentFrame = state.maxFrame;
            break;

        default:
            never = action;
    }
};
