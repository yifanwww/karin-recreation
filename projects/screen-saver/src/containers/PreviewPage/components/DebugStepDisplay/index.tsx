import { List } from 'antd';

export interface DebugStepDisplayProps {}

export const DebugStepDisplay: React.FC<DebugStepDisplayProps> = (props) => {
    return <List dataSource={[]} renderItem={(item) => <div />} style={{ width: '256px' }} />;
};
