import clsx from 'clsx';
import { Vector2 } from 'js-vectors';
import { useEffect, useRef } from 'react';

import { ImageAssetName, ImageAssets } from 'src/assets';
import { SCREEN_SIZE } from 'src/constants/preview';
import { createImageElement } from 'src/utils/image';
import { useCurrentStep } from '../../contexts/PreviewControlContext';

import css from './styles.module.css';

async function paint(canvas: HTMLCanvasElement, imageName: ImageAssetName, position: Vector2) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = ImageAssets[imageName];
    const img = await createImageElement(image);
    ctx.drawImage(img, position.x, position.y, image.size.x * image.scale.x, image.size.y * image.scale.y);
}

export interface ScreenViewProps {
    className?: string;
}

export const ScreenView: React.FC<ScreenViewProps> = ({ className }) => {
    const { position, step } = useCurrentStep();

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;

        if (canvas && position && step) {
            paint(canvas, step.imageName, position);
        }
    }, [position, step]);

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
