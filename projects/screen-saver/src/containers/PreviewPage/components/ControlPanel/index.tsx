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

import { Vector2View } from 'src/components/Vector2View';
import { formatFrame } from 'src/utils/time';
import { useControlOperations, useCurrentStep, useNextStep } from '../../contexts/PreviewControlContext';

import css from './styles.module.scss';

export interface ControlPanelProps {
    className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ className }) => {
    const { frame, position, step, time } = useCurrentStep();
    const { nextStep } = useNextStep();
    const { nextFrame, prevFrame, toFirstFrame, toLastFrame } = useControlOperations();

    const renderData = (label: string, value: React.ReactNode) => (
        <div>
            <span>{label}: &nbsp;</span>
            {value}
        </div>
    );

    return (
        <div className={clsx(css.layout, className)}>
            <div className={css['control-bar']}>
                <Button icon={<VerticalRightOutlined />} onClick={toFirstFrame} />
                <Button icon={<DoubleLeftOutlined />} onClick={() => prevFrame(15)} />
                <Button icon={<LeftOutlined />} onClick={() => prevFrame()} />
                <div className={css.time}>
                    <code>{frame}</code>/<code>{formatFrame(frame)}</code>/<code>{time.toFixed(2)} ms</code>
                </div>
                <Button icon={<RightOutlined />} onClick={() => nextFrame()} />
                <Button icon={<DoubleRightOutlined />} onClick={() => nextFrame(15)} />
                <Button icon={<VerticalLeftOutlined />} onClick={toLastFrame} />
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
                        {renderData('direction', <Vector2View vector={step?.direction ?? Vector2.ZERO} />)}
                        {renderData('speed', <code>{(step?.direction ?? Vector2.ZERO).length().toFixed(2)}</code>)}
                    </div>
                </div>
            </Spin>
        </div>
    );
};
