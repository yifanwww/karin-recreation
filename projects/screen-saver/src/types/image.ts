import { Vector2 } from 'js-vectors';

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface ImageProperty {
    name: string;
    url: string;

    /**
     * Image size.
     */
    size: Vector2;
    /**
     * Image content size.
     */
    contentSize: {
        min: Vector2;
        max: Vector2;
    };

    scale: Vector2;
}
