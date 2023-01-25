import { ReadonlyDeep } from 'type-fest';

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface Vector2 {
    x: number;
    y: number;
}

export interface ImageProperty {
    name: string;
    url: string;

    size: Vector2;
    innerPosition: Vector2;
    innerSize: Vector2;

    defaultCanvasScale: Vector2;
}

export interface ImageControl {
    property: ReadonlyDeep<ImageProperty>;

    position: Vector2;
    scale: Vector2;
}
