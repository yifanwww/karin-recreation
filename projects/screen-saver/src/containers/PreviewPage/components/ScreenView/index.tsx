import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import { ImageAssets } from 'src/assets';
import { SCREEN_SIZE } from 'src/constants/preview';
import { StepRecord } from 'src/modules/control';
import { createImageElement } from 'src/utils/image';
import { useCurrentStep } from '../../contexts/PreviewControlContext';

import css from './styles.module.css';

async function paint(canvas: HTMLCanvasElement, step: StepRecord) {
    const ctx = canvas.getContext('2d');
    if (!ctx || !step) return;

    const { imageName, position } = step;

    const image = ImageAssets[imageName];
    const img = await createImageElement(image);
    ctx.drawImage(img, position.x, position.y, image.size.x * image.scale.x, image.size.y * image.scale.y);
}

export interface ScreenViewProps {
    className?: string;
}

export const ScreenView: React.FC<ScreenViewProps> = ({ className }) => {
    const { step } = useCurrentStep();

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;

        if (canvas && step) {
            paint(canvas, step);
        }
    }, [step]);

    return (
        <div className={clsx(css.view, className)}>
            <div className={css.toolbar}>
                <div />
            </div>
            <div className={css['canvas-container']}>
                <canvas ref={ref} className={css.canvas} height={SCREEN_SIZE.y} width={SCREEN_SIZE.x} />
            </div>
        </div>
    );
};
