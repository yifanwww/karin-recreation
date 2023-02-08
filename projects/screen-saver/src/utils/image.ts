import { ImageProperty } from 'src/types/image';

export function createImageElement(image: ImageProperty): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image(image.size.x, image.size.y);
        img.src = image.url;
        img.onload = () => {
            resolve(img);
        };
    });
}
