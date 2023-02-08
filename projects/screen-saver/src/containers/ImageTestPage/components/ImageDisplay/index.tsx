import { Vector2 } from 'js-vectors';
import { useContext, useEffect, useRef } from 'react';

import { ImageProperty } from 'src/types/image';
import { createImageElement } from 'src/utils/image';
import { ImagePropertyContext } from '../../contexts/ImagePropertyContext';

import css from './styles.module.scss';

function getImagePositions(client: Vector2, image: ImageProperty): Vector2[] {
    const { contentSize, scale } = image;

    return [
        new Vector2(-contentSize.min.x * scale.x, -contentSize.min.y * scale.y),
        new Vector2(client.x - contentSize.max.x * scale.x, -contentSize.min.y * scale.y),
        new Vector2(-contentSize.min.x * scale.x, client.y - contentSize.max.y * scale.y),
        new Vector2(client.x - contentSize.max.x * scale.x, client.y - contentSize.max.y * scale.y),
    ];
}

async function paint(canvas: HTMLCanvasElement, image: ImageProperty) {
    const ctx = canvas.getContext('2d');

    if (ctx) {
        const positions = getImagePositions(new Vector2(canvas.width, canvas.height), image);
        const img = await createImageElement(image);

        for (const pos of positions) {
            ctx.drawImage(img, pos.x, pos.y, image.size.x * image.scale.x, image.size.y * image.scale.y);
        }
    }
}

export interface ImageDisplayProps {
    selectedImage: string | undefined;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedImage }) => {
    const { images } = useContext(ImagePropertyContext);

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;

        const observer = new ResizeObserver(() => {
            if (canvas) {
                canvas.width = canvas.clientWidth;
                canvas.height = canvas.clientHeight;

                if (selectedImage) {
                    paint(canvas, images[selectedImage]);
                }
            }
        });

        if (canvas) {
            observer.observe(canvas);
        }

        return () => {
            observer.disconnect();
        };
    }, [images, selectedImage]);

    return (
        <div className={css['canvas-container']}>
            <canvas ref={ref} className={css.canvas} width={1920} height={1080} />
        </div>
    );
};
