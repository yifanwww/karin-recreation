import type { ImmerReducer } from 'use-immer';

import { Millisecond } from 'src/types/primitives';
import type { PreviewControlContextState } from './types';

export type ReducerAction =
    | { type: 'set-frame'; frame: Millisecond }
    | { type: 'next-frame'; num?: number }
    | { type: 'prev-frame'; num?: number };

export const reducer: ImmerReducer<PreviewControlContextState, ReducerAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'set-frame':
            state.currentFrame = action.frame;
            break;

        case 'next-frame':
            state.currentFrame += Math.max(action.num ?? 1, 1);
            break;

        case 'prev-frame':
            state.currentFrame = Math.max(state.currentFrame - Math.max(action.num ?? 1, 1), 0);
            break;

        default:
            never = action;
    }
};
