import { Draft } from 'immer';
import { Vector2 } from 'js-vectors';
import { createContext, useCallback, useMemo } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';

import { ImageAssets } from 'src/assets';
import { Margin, ImageProperty } from 'src/types/image';
import { abstractFn } from 'src/utils/function';

export interface ImagePropertyContextState {
    changeInnerMargin: (name: string, margin: Partial<Margin>) => void;
    images: Record<string, ImageProperty>;
}

function updateDraftImage(draft: Draft<ImageProperty>, margin: Partial<Margin>) {
    if (margin.top !== undefined) {
        const diff = draft.innerPosition.y - margin.top;
        draft.innerPosition = new Vector2(draft.innerPosition.x, margin.top);
        draft.innerSize = new Vector2(draft.innerSize.x, draft.innerSize.y + diff);
    }
    if (margin.left !== undefined) {
        const diff = draft.innerPosition.x - margin.left;
        draft.innerPosition = new Vector2(margin.left, draft.innerPosition.y);
        draft.innerSize = new Vector2(draft.innerSize.x + diff, draft.innerSize.y);
    }
    if (margin.bottom !== undefined) {
        draft.innerSize = new Vector2(draft.innerSize.x, draft.size.y - draft.innerPosition.y - margin.bottom);
    }
    if (margin.right !== undefined) {
        draft.innerSize = new Vector2(draft.size.x - draft.innerPosition.x - margin.right, draft.innerSize.y);
    }
}

type ReducerAction = { type: 'update'; name: string; margin: Partial<Margin> };

const reducer: ImmerReducer<Pick<ImagePropertyContextState, 'images'>, ReducerAction> = (draftState, action) => {
    let never: never;
    switch (action.type) {
        case 'update':
            updateDraftImage(draftState.images[action.name], action.margin);
            break;

        default:
            never = action.type;
    }
};

export const ImagePropertyContext = createContext<ImagePropertyContextState>({
    changeInnerMargin: abstractFn,
    images: ImageAssets,
});

export const ImagePropertyProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, { images: ImageAssets });

    const changeInnerMargin = useCallback<ImagePropertyContextState['changeInnerMargin']>(
        (name, margin) => dispatch({ type: 'update', name, margin }),
        [dispatch],
    );

    return (
        <ImagePropertyContext.Provider
            value={useMemo(() => ({ changeInnerMargin, images: state.images }), [changeInnerMargin, state.images])}
        >
            {children}
        </ImagePropertyContext.Provider>
    );
};
