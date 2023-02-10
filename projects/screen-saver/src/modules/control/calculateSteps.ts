import { Vector2 } from 'js-vectors';

import { ImageAssets } from 'src/assets';
import { Range } from 'src/types/misc';
import { Millisecond } from 'src/types/primitives';
import { StepCommonOption, StepConfigs, StepRecord } from './types';

type Options = {
    configs: StepConfigs;
    initial: {
        direction: Vector2;
        position: Vector2;
    };
    maxSteps: number;
    screen: Vector2;
};

function findCurrentStepConfig<T extends StepCommonOption>(time: Millisecond, configs: T[]): T {
    return configs.find((item) => item.time <= time)!;
}

function calculateRawSteps(options: Options): StepRecord[] {
    const { configs, initial, maxSteps, screen } = options;

    let currTime: Millisecond = 0;

    const currDirection = initial.direction.clone();
    const currPosition = initial.position.clone();

    let currDefault = configs.defaults[0];
    let currTrigger = configs.triggers[0];

    const steps: StepRecord[] = [
        {
            time: currTime,
            imageName: currDefault.imageName,
            position: currPosition.clone(),
            direction: currDirection.clone(),
        },
    ];

    const getAvaliablePosition = (): Range<Vector2> => {
        const image = ImageAssets[currDefault.imageName];
        return {
            min: image.contentSize.min.clone().mul(image.scale).neg(),
            max: Vector2.sub(screen, Vector2.mul(image.size, image.scale)),
        };
    };

    const getNextStep = (): StepRecord => {
        const { max, min } = getAvaliablePosition();

        const durationX =
            currDirection.x > 0 ? (max.x - currPosition.x) / currDirection.x : currPosition.x / -currDirection.x;
        const durationY =
            currDirection.y > 0 ? (max.y - currPosition.y) / currDirection.y : currPosition.y / -currDirection.y;

        const duration = Math.min(durationX, durationY);

        currTime = currTime + duration;

        if (durationX === durationY) {
            currPosition.set(currDirection.x > 0 ? max.x : min.x, currDirection.y > 0 ? max.y : min.y);
        } else if (durationX < durationY) {
            currPosition.set(currDirection.x > 0 ? max.x : min.x, currPosition.y + currDirection.y * duration);
        } else {
            currPosition.set(currPosition.x + currDirection.x * duration, currDirection.y > 0 ? max.y : min.y);
        }

        if (durationX === durationY) {
            currDirection.neg();
        } else if (durationX < durationY) {
            currDirection.set(-currDirection.x, currDirection.y);
        } else {
            currDirection.set(currDirection.x, -currDirection.y);
        }

        currDefault = findCurrentStepConfig(currTime, configs.defaults);
        currTrigger = findCurrentStepConfig(currTime, configs.triggers);

        return {
            time: currTime,
            imageName: currDefault.imageName,
            position: currPosition.clone(),
            direction: currDirection.clone(),
        };
    };

    for (let i = 1; i < maxSteps; i++) {
        steps.push(getNextStep());
    }

    return steps;
}

function normalizeStep(step: StepRecord): StepRecord {
    return step;
}

function normalizeSteps(rawSteps: StepRecord[]): StepRecord[] {
    return rawSteps;
}

export function calculateSteps(options: Options): StepRecord[] {
    const rawSteps = calculateRawSteps(options);
    const steps = normalizeSteps(rawSteps);

    return steps;
}
