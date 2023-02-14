import { ImageAssetName } from 'src/assets';
import { ImageProperty } from 'src/types/image';

export function createImageElement(prop: ImageProperty): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image(prop.size.x, prop.size.y);
        img.src = prop.url;
        img.onload = () => {
            resolve(img);
        };
    });
}

export function createImages(images: Record<ImageAssetName, ImageProperty>) {
    let imgs: Record<ImageAssetName, HTMLImageElement>;

    const getImages = async () => {
        if (imgs) return imgs;

        const promises = Object.entries(images).map(([name, prop]) =>
            createImageElement(prop).then((element): [string, HTMLImageElement] => [name, element]),
        );

        imgs = Object.fromEntries(await Promise.all(promises)) as Record<ImageAssetName, HTMLImageElement>;

        return imgs;
    };

    const getImage = async (name: ImageAssetName) => {
        if (!imgs) {
            await getImages();
        }

        return imgs[name];
    };

    return { getImage, getImages };
}
