import { Vector2 } from 'js-vectors';

import { Millisecond } from 'src/types/primitives';

export const FPS = 60;

export const FRAME_PERIOD: Millisecond = 1_000 / FPS;

export const SCREEN_SIZE = Object.freeze(new Vector2(1920, 1080));
