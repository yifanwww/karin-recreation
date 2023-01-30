import clsx from 'clsx';
import { useRef } from 'react';

import css from './styles.module.css';

export interface ScreenViewProps {
    className?: string;
}

export const ScreenView: React.FC<ScreenViewProps> = ({ className }) => {
    const ref = useRef<HTMLCanvasElement>(null);

    return (
        <div className={clsx(css.view, className)}>
            <div className={css.toolbar}>
                <div />
            </div>
            <div className={css['canvas-container']}>
                <canvas ref={ref} className={css.canvas} height={1080} width={1920} />
            </div>
        </div>
    );
};
