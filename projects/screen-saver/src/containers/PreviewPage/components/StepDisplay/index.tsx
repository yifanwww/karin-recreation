import { Descriptions, List, Tag } from 'antd';
import Scrollbars from 'rc-scrollbars';
import { useCallback } from 'react';

import { Vector2View } from 'src/components/Vector2View';
import { FRAME_PERIOD } from 'src/constants/preview';
import { StepRecord } from 'src/modules/control';
import { usePreviewSteps } from '../../contexts/PreviewControlContext';

import css from './styles.module.scss';

export const StepDisplay: React.FC = () => {
    const { maxFrame, steps } = usePreviewSteps();

    const renderItem = useCallback(
        (item: StepRecord, index: number) => (
            <List.Item key={item.time} className={css['item-container']}>
                <div className={css.num}>
                    <Tag color="cyan">{index + 1}</Tag>
                </div>
                <Descriptions column={1} size="small">
                    <Descriptions.Item label="frame">
                        <code>{(item.time / FRAME_PERIOD).toFixed(1)}</code>
                    </Descriptions.Item>
                    <Descriptions.Item label="time">
                        <code>{item.time.toFixed(2)} ms</code>
                    </Descriptions.Item>
                    <Descriptions.Item label="image">
                        <code>{item.imageName}</code>
                    </Descriptions.Item>
                    <Descriptions.Item label="position">
                        <Vector2View vector={item.position} />
                    </Descriptions.Item>
                    <Descriptions.Item label="direction">
                        <Vector2View vector={item.direction} />
                    </Descriptions.Item>
                </Descriptions>
            </List.Item>
        ),
        [],
    );

    return (
        <div className={css['step-panel']}>
            <div className={css.title}>
                <div>
                    MAX FRAME: <code>{maxFrame}</code>
                </div>
            </div>
            <Scrollbars>
                <List className={css.list} dataSource={steps} renderItem={renderItem} />
            </Scrollbars>
        </div>
    );
};
