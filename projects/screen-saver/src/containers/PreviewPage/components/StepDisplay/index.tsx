import { Descriptions, List, Tag } from 'antd';
import Scrollbars from 'rc-scrollbars';
import { useContext } from 'react';

import { Vector2View } from 'src/components/Vector2View';
import { StepRecord } from 'src/modules/control';
import { PreviewControlContext } from '../../contexts/PreviewControlContext';
import { useCurrentStep } from '../../contexts/PreviewControlContext';

import css from './styles.module.scss';

export const StepDisplay: React.FC = () => {
    const { steps } = useContext(PreviewControlContext);
    const { stepIndex } = useCurrentStep();

    const renderItem = (item: StepRecord, index: number) => (
        <List.Item key={item.time} className={css['item-container']}>
            <div className={css.num}>
                <Tag color={stepIndex === index ? 'red' : 'cyan'}>{index + 1}</Tag>
            </div>
            <Descriptions column={1} size="small">
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
    );

    return (
        <Scrollbars>
            <List className={css.list} dataSource={steps} renderItem={renderItem} />
        </Scrollbars>
    );
};
