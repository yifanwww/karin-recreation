export interface ImageSize {
    height: number;
    width: number;
}

export interface ImageMargin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface ImageInfo {
    name: string;
    url: string;
    size: ImageSize;
    margin: ImageMargin;
}
