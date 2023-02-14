import clsx from 'clsx';
import { Vector2 } from 'js-vectors';
import { useEffect, useRef } from 'react';

import { ImageAssetName, ImageAssets } from 'src/assets';
import { SCREEN_SIZE } from 'src/constants/preview';
import { createImages } from 'src/utils/image';
import { useCurrentStep } from '../../contexts/PreviewControlContext';

import css from './styles.module.css';

const { getImage } = createImages(ImageAssets);

function clearCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

async function paintImage(context: CanvasRenderingContext2D, imageName: ImageAssetName, position: Vector2) {
    const image = ImageAssets[imageName];
    const img = await getImage(imageName);
    context.drawImage(img, position.x, position.y, image.size.x * image.scale.x, image.size.y * image.scale.y);
}

export interface ScreenViewProps {
    className?: string;
}

export const ScreenView: React.FC<ScreenViewProps> = ({ className }) => {
    const { position, step } = useCurrentStep();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!position || !step) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            clearCanvas(canvas, ctx);
            paintImage(ctx, step.imageName, position);
        }
    }, [position, step]);

    return (
        <div className={clsx(css.view, className)}>
            <div className={css.toolbar}>
                <div />
            </div>
            <div className={css['canvas-container']}>
                <canvas ref={canvasRef} className={css.canvas} height={SCREEN_SIZE.y} width={SCREEN_SIZE.x} />
            </div>
        </div>
    );
};
