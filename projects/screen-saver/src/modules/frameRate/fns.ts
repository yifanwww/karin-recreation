import { Millisecond } from 'src/types/primitives';
import { FRAME_PERIOD } from './constants';

export function getNearestFrameTime(time: Millisecond) {
    const curr = time / FRAME_PERIOD;
    const previous = Math.floor(curr);

    return curr - previous < 0.5 ? previous * FRAME_PERIOD : Math.ceil(previous) * FRAME_PERIOD;
}
