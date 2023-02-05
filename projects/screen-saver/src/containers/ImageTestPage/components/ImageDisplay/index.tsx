import { Vector2 } from 'js-vectors';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { ImageControl, ImageProperty } from 'src/types/image';
import { ImagePropertyContext } from '../../contexts/ImagePropertyContext';

import css from './styles.module.scss';

export interface ImageDisplayProps {
    selectedImage: string | undefined;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedImage }) => {
    const { images } = useContext(ImagePropertyContext);

    const ref = useRef<HTMLCanvasElement>(null);

    const getImageControls = useCallback(
        (client: Vector2, image: ImageProperty): Pick<ImageControl, 'property' | 'position' | 'scale'>[] => {
            const { defaultCanvasScale: scale, innerPosition, innerSize } = image;

            return [
                {
                    property: image,
                    position: new Vector2(-innerPosition.x * scale.x, -innerPosition.y * scale.y),
                    scale,
                },
                {
                    property: image,
                    position: new Vector2(
                        client.x - (innerPosition.x + innerSize.x) * scale.x,
                        -innerPosition.y * scale.y,
                    ),
                    scale,
                },
                {
                    property: image,
                    position: new Vector2(
                        -innerPosition.x * scale.x,
                        client.y - (innerPosition.y + innerSize.y) * scale.y,
                    ),
                    scale,
                },
                {
                    property: image,
                    position: new Vector2(
                        client.x - (innerPosition.x + innerSize.x) * scale.x,
                        client.y - (innerPosition.y + innerSize.y) * scale.y,
                    ),
                    scale,
                },
            ];
        },
        [],
    );

    const paint = useCallback(
        (canvas: HTMLCanvasElement, image: ImageProperty) => {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const controls = getImageControls(new Vector2(canvas.width, canvas.height), image);

                const img = new Image(800, 800);
                img.src = image.url;
                img.onload = function () {
                    for (const control of controls) {
                        ctx.drawImage(
                            img,
                            control.position.x,
                            control.position.y,
                            control.property.size.x * control.scale.x,
                            control.property.size.y * control.scale.y,
                        );
                    }
                };
            }
        },
        [getImageControls],
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
