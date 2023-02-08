import type { ImmerReducer } from 'use-immer';

import { Millisecond } from 'src/types/primitives';
import type { PreviewControlContextState } from './types';

export type ReducerAction = { type: 'set-time'; time: Millisecond };

export const reducer: ImmerReducer<PreviewControlContextState, ReducerAction> = (state, action) => {
    switch (action.type) {
        case 'set-time':
            state.current = action.time;
            break;
    }
};
