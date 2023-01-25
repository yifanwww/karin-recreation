import { createContext, useCallback, useMemo } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';

import { ImageAssets } from 'src/assets';
import { Margin, ImageProperty } from 'src/types/image';
import { abstractFn } from 'src/utils/function';

export interface ImagePropertyContextState {
    changeInnerMargin: (name: string, margin: Partial<Margin>) => void;
    images: Record<string, ImageProperty>;
}

type ReducerAction = { type: 'update'; name: string; margin: Partial<Margin> };

const reducer: ImmerReducer<Pick<ImagePropertyContextState, 'images'>, ReducerAction> = (draft, action) => {
    let never: never;
    switch (action.type) {
        case 'update': {
            const { margin, name } = action;

            const draftImage = draft.images[name];
            if (margin.top !== undefined) {
                const diff = draftImage.innerPosition.y - margin.top;
                draftImage.innerPosition.y = margin.top;
                draftImage.innerSize.y += diff;
            }
            if (margin.left !== undefined) {
                const diff = draftImage.innerPosition.x - margin.left;
                draftImage.innerPosition.x = margin.left;
                draftImage.innerSize.x += diff;
            }
            if (margin.bottom !== undefined) {
                draftImage.innerSize.y = draftImage.size.y - draftImage.innerPosition.y - margin.bottom;
            }
            if (margin.right !== undefined) {
                draftImage.innerSize.x = draftImage.size.x - draftImage.innerPosition.x - margin.right;
            }
            break;
        }

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
