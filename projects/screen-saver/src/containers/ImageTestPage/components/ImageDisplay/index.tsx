import { Vector2 } from 'js-vectors';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { ImageProperty } from 'src/types/image';
import { ImagePropertyContext } from '../../contexts/ImagePropertyContext';

import css from './styles.module.scss';

export interface ImageDisplayProps {
    selectedImage: string | undefined;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedImage }) => {
    const { images } = useContext(ImagePropertyContext);

    const ref = useRef<HTMLCanvasElement>(null);

    const getImagePositions = useCallback((client: Vector2, image: ImageProperty): Vector2[] => {
        const { contentSize, scale } = image;

        return [
            new Vector2(-contentSize.min.x * scale.x, -contentSize.min.y * scale.y),
            new Vector2(client.x - contentSize.max.x * scale.x, -contentSize.min.y * scale.y),
            new Vector2(-contentSize.min.x * scale.x, client.y - contentSize.max.y * scale.y),
            new Vector2(client.x - contentSize.max.x * scale.x, client.y - contentSize.max.y * scale.y),
        ];
    }, []);

    const paint = useCallback(
        (canvas: HTMLCanvasElement, image: ImageProperty) => {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const positions = getImagePositions(new Vector2(canvas.width, canvas.height), image);

                const img = new Image(800, 800);
                img.src = image.url;
                img.onload = function () {
                    for (const pos of positions) {
                        ctx.drawImage(img, pos.x, pos.y, image.size.x * image.scale.x, image.size.y * image.scale.y);
                    }
                };
            }
        },
        [getImagePositions],
    );

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
    }, [images, paint, selectedImage]);

    return (
        <div className={css['canvas-container']}>
            <canvas ref={ref} className={css.canvas} width={1920} height={1080} />
        </div>
    );
};
