import { Vector2 } from 'js-vectors';

import { ImageAssets } from 'src/assets';
import { FRAME_PERIOD } from 'src/constants/preview';
import { Range } from 'src/types/misc';
import { Millisecond } from 'src/types/primitives';
import { StepCommonOption, StepConfigs, StepRecord } from './types';

type Options = {
    configs: StepConfigs;
    initial: {
        direction: Vector2;
        position: Vector2;
    };
    maxFrame: number;
    screen: Vector2;
};

function findCurrentStepConfig<T extends StepCommonOption>(time: Millisecond, configs: T[]): T {
    return configs.find((item) => item.time <= time)!;
}

function calculateRawSteps(options: Options): StepRecord[] {
    const { configs, initial, maxFrame, screen } = options;

    const maxTime = maxFrame * FRAME_PERIOD;

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

    const calculateAvaliablePosition = (): Range<Vector2> => {
        const image = ImageAssets[currDefault.imageName];
        return {
            min: image.contentSize.min.clone().mul(image.scale).neg(),
            max: Vector2.sub(screen, Vector2.mul(image.size, image.scale)),
        };
    };

    const calculateNextStep = (): StepRecord => {
        const { max, min } = calculateAvaliablePosition();

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

    while (true) {
        const nextStep = calculateNextStep();
        if (nextStep.time <= maxTime) {
            steps.push(nextStep);
        } else {
            const prevStep = steps[steps.length - 1];
            steps.push({
                time: maxTime,
                imageName: nextStep.imageName,
                direction: nextStep.direction,
                position: Vector2.lerp(
                    prevStep.position,
                    nextStep.position,
                    (maxTime - prevStep.time) / (nextStep.time - prevStep.time),
                ),
            });
            break;
        }
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
