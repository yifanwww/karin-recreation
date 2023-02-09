import { Tag } from 'antd';
import { Vector2 } from 'js-vectors';

export interface Vector2ViewProps {
    vector: Vector2;
}

export const Vector2View: React.FC<Vector2ViewProps> = ({ vector }) => (
    <Tag>
        <code>{`(${vector.x.toFixed(2)}, ${vector.y.toFixed(2)})`}</code>
    </Tag>
);
