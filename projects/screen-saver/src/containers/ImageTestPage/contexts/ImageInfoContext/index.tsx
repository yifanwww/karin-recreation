import lodash from 'lodash';
import { createContext, useCallback, useMemo } from 'react';
import { ImmerReducer, useImmerReducer } from 'use-immer';

import { ImageAssets } from 'src/assets';
import { ImageInfo, ImageMargin } from 'src/types/image';
import { abstractFn } from 'src/utils/function';

export interface ImageInfoContextState {
    images: Record<string, ImageInfo>;
    update: (name: string, margin: Partial<ImageMargin>) => void;
}

type ReducerAction = { type: 'update'; name: string; margin: Partial<ImageMargin> };

const reducer: ImmerReducer<Pick<ImageInfoContextState, 'images'>, ReducerAction> = (draft, action) => {
    let never: never;
    switch (action.type) {
        case 'update': {
            const draftImage = draft.images[action.name];
            draftImage.margin = lodash.merge(draftImage.margin, action.margin as ImageMargin);
            break;
        }

        default:
            never = action.type;
    }
};

export const ImageInfoContext = createContext<ImageInfoContextState>({ images: {}, update: abstractFn });

export const ImageInfoProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, { images: ImageAssets });

    const update = useCallback<ImageInfoContextState['update']>(
        (name, margin) => dispatch({ type: 'update', name, margin }),
        [dispatch],
    );

    return (
        <ImageInfoContext.Provider value={useMemo(() => ({ images: state.images, update }), [state.images, update])}>
            {children}
        </ImageInfoContext.Provider>
    );
};
