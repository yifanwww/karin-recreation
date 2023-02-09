import { FRAME_PERIOD } from 'src/constants/preview';
import { Millisecond } from 'src/types/primitives';

export function getNearestFrame(time: Millisecond) {
    const curr = time / FRAME_PERIOD;
    const previous = Math.floor(curr);

    return curr - previous < 0.5 ? previous : Math.ceil(previous);
}

export function getNearestFrameTime(time: Millisecond): Millisecond {
    return getNearestFrame(time) * FRAME_PERIOD;
}
