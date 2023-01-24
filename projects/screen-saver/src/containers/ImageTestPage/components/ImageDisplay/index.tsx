import { useRef } from 'react';

import css from './styles.module.scss';

export interface ImageDisplayProps {}

export const ImageDisplay: React.FC<ImageDisplayProps> = (props) => {
    const ref = useRef<HTMLCanvasElement>(null);

    return (
        <div>
            <canvas ref={ref} className={css['image-area']} width="1280px" height="720px" />
        </div>
    );
};
