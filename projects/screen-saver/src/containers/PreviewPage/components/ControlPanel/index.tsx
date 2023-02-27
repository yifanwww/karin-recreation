import {
    CaretRightOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    PauseOutlined,
    RightOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
} from '@ant-design/icons';
import { Button, Spin, Tooltip } from 'antd';
import clsx from 'clsx';
import { Vector2 } from 'js-vectors';

import { Vector2View } from 'src/components/Vector2View';
import { formatFrame } from 'src/utils/time';
import {
    useControlOperations,
    useCurrentStep,
    useNextStep,
    usePreviewPlayState,
} from '../../contexts/PreviewControlContext';

import css from './styles.module.scss';

export interface ControlPanelProps {
    className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ className }) => {
    const { play } = usePreviewPlayState();
    const { frame, position, step, time } = useCurrentStep();
    const { nextStep } = useNextStep();
    const { changePlay, nextFrame, prevFrame, toFirstFrame, toLastFrame } = useControlOperations();

    const renderData = (label: string, value: React.ReactNode) => (
        <div>
            <span>{label}: &nbsp;</span>
            {value}
        </div>
    );

    return (
        <div className={clsx(css.layout, className)}>
            <div className={css['control-bar']}>
                <div className={css.time}>
                    <code>{frame}</code>/<code>{formatFrame(frame)}</code>/<code>{time.toFixed(2)} ms</code>
                </div>
                <div className={css.buttons}>
                    <Tooltip title="jump to the first frame">
                        <Button icon={<VerticalRightOutlined />} onClick={toFirstFrame} />
                    </Tooltip>
                    <Tooltip title="jump to the previous 15 frame">
                        <Button icon={<DoubleLeftOutlined />} onClick={() => prevFrame(15)} />
                    </Tooltip>
                    <Tooltip title="jump to the previous frame">
                        <Button icon={<LeftOutlined />} onClick={() => prevFrame()} />
                    </Tooltip>
                    <Tooltip title={play ? 'stop' : 'start'}>
                        <Button
                            icon={play ? <PauseOutlined /> : <CaretRightOutlined />}
                            onClick={() => changePlay(!play)}
                        />
                    </Tooltip>
                    <Tooltip title="jump to the next frame">
                        <Button icon={<RightOutlined />} onClick={() => nextFrame()} />
                    </Tooltip>
                    <Tooltip title="jump to the next 15 frame">
                        <Button icon={<DoubleRightOutlined />} onClick={() => nextFrame(15)} />
                    </Tooltip>
                    <Tooltip title="jump to the last frame">
                        <Button icon={<VerticalLeftOutlined />} onClick={toLastFrame} />
                    </Tooltip>
                </div>
            </div>
            <Spin spinning={step === null}>
                <div className={css['info-panel']}>{renderData('image', <code>{step?.imageName}</code>)}</div>
                <div className={css['info-panel']}>
                    <div>
                        {renderData('position', <Vector2View vector={position ?? Vector2.ZERO} />)}
                        {renderData('from position', <Vector2View vector={step?.position ?? Vector2.ZERO} />)}
                        {renderData('to position', <Vector2View vector={nextStep?.position ?? Vector2.ZERO} />)}
                    </div>
                    <div>
                        {renderData(
                            'direction',
                            <span>
                                <Vector2View vector={step?.direction ?? Vector2.ZERO} />
                                <code>/s</code>
                            </span>,
                        )}
                        {renderData('speed', <code>{(step?.direction ?? Vector2.ZERO).length().toFixed(2)}/s</code>)}
                    </div>
                </div>
            </Spin>
        </div>
    );
};
