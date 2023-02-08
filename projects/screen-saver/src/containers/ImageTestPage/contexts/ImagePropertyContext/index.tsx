import { Draft } from 'immer';
import { Vector2 } from 'js-vectors';
import { createContext, useCallback, useMemo } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';

import { ImageAssets } from 'src/assets';
import { Margin, ImageProperty } from 'src/types/image';
import { abstractFn } from 'src/utils/function';

export interface ImagePropertyContextValues {
    changeInnerMargin: (name: string, margin: Partial<Margin>) => void;
    images: Record<string, ImageProperty>;
}

function updateDraftImage(draft: Draft<ImageProperty>, margin: Partial<Margin>) {
    if (margin.left !== undefined) {
        draft.contentSize.min = new Vector2(margin.left, draft.contentSize.min.y);
    }
    if (margin.top !== undefined) {
        draft.contentSize.min = new Vector2(draft.contentSize.min.x, margin.top);
    }
    if (margin.right !== undefined) {
        draft.contentSize.max = new Vector2(draft.size.x - margin.right, draft.contentSize.max.y);
    }
    if (margin.bottom !== undefined) {
        draft.contentSize.max = new Vector2(draft.contentSize.max.x, draft.size.y - margin.bottom);
    }
}

type ReducerAction = { type: 'update'; name: string; margin: Partial<Margin> };

const reducer: ImmerReducer<Pick<ImagePropertyContextValues, 'images'>, ReducerAction> = (draftState, action) => {
    let never: never;
    switch (action.type) {
        case 'update':
            updateDraftImage(draftState.images[action.name], action.margin);
            break;

        default:
            never = action.type;
    }
};

export const ImagePropertyContext = createContext<ImagePropertyContextValues>({
    changeInnerMargin: abstractFn,
    images: ImageAssets,
});

export const ImagePropertyProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, { images: ImageAssets });

    const changeInnerMargin = useCallback<ImagePropertyContextValues['changeInnerMargin']>(
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
