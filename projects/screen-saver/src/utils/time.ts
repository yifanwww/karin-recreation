import { FPS } from 'src/constants/preview';

export function formatFrame(frame: number) {
    const totalSeconds = Math.floor(frame / FPS);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    return [
        totalHours,
        (totalMinutes % 60).toString().padStart(2, '0'),
        (totalSeconds % 60).toString().padStart(2, '0'),
        (frame % FPS).toString().padStart(2, '0'),
    ].join(':');
}
