import {
    DoubleLeftOutlined,
    DoubleRightOutlined,
    LeftOutlined,
    RightOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
} from '@ant-design/icons';
import { Button, Spin } from 'antd';
import clsx from 'clsx';
import { Vector2 } from 'js-vectors';
import { useContext } from 'react';

import { Vector2View } from 'src/components/Vector2View';
import { formatFrame } from 'src/utils/time';
import { PreviewControlContext, useControlOperations, useCurrentStep } from '../../contexts/PreviewControlContext';

import css from './styles.module.scss';

export interface ControlPanelProps {
    className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ className }) => {
    const { currentFrame, currentTime } = useContext(PreviewControlContext);
    const { step } = useCurrentStep();
    const { nextFrame, prevFrame, toFirstFrame, toLastFrame } = useControlOperations();

    return (
        <div className={clsx(css.layout, className)}>
            <div className={css['control-bar']}>
                <Button icon={<VerticalRightOutlined />} onClick={toFirstFrame} />
                <Button icon={<DoubleLeftOutlined />} onClick={() => prevFrame(15)} />
                <Button icon={<LeftOutlined />} onClick={() => prevFrame()} />
                <div className={css.time}>
                    <code>{currentFrame}</code>/<code>{formatFrame(currentFrame)}</code>/
                    <code>{currentTime.toFixed(2)} ms</code>
                </div>
                <Button icon={<RightOutlined />} onClick={() => nextFrame()} />
                <Button icon={<DoubleRightOutlined />} onClick={() => nextFrame(15)} />
                <Button icon={<VerticalLeftOutlined />} onClick={toLastFrame} />
            </div>
            <Spin spinning={step === null}>
                <div className={css['info-panel']}>
                    <div>
                        <span>image: &nbsp;</span>
                        <code>{step?.imageName}</code>
                    </div>
                    <div>
                        <span>position: &nbsp;</span>
                        <Vector2View vector={step?.position ?? Vector2.ZERO} />
                    </div>
                    <div>
                        <span>direction: &nbsp;</span>
                        <Vector2View vector={step?.direction ?? Vector2.ZERO} />
                    </div>
                </div>
            </Spin>
        </div>
    );
};
