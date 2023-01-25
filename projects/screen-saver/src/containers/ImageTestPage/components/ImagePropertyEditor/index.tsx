import { Descriptions, InputNumber } from 'antd';

import { Margin, ImageProperty } from 'src/types/image';

import css from './styles.module.scss';

export interface ImagePropertyEditorProps {
    image?: ImageProperty;
    onChangeImageInnerMargin?: (name: string, margin: Partial<Margin>) => void;
}

export const ImagePropertyEditor: React.FC<ImagePropertyEditorProps> = ({ image, onChangeImageInnerMargin }) => (
    <div>
        <Descriptions>
            <Descriptions.Item label="Width">{image?.size.x ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="Height">{image?.size.y ?? '--'}</Descriptions.Item>
        </Descriptions>
        <Descriptions className={css.description} column={2}>
            <Descriptions.Item label="Top">
                <InputNumber
                    disabled={image === undefined}
                    onChange={(value) => onChangeImageInnerMargin?.(image!.name, { top: value ?? 0 })}
                    value={image?.innerPosition.y}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Bottom">
                <InputNumber
                    disabled={image === undefined}
                    onChange={(value) => onChangeImageInnerMargin?.(image!.name, { bottom: value ?? 0 })}
                    value={image ? image.size.y - image.innerPosition.y - image.innerSize.y : undefined}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Left">
                <InputNumber
                    disabled={image === undefined}
                    onChange={(value) => onChangeImageInnerMargin?.(image!.name, { left: value ?? 0 })}
                    value={image?.innerPosition.x}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Right">
                <InputNumber
                    disabled={image === undefined}
                    onChange={(value) => onChangeImageInnerMargin?.(image!.name, { right: value ?? 0 })}
                    value={image ? image.size.x - image.innerPosition.x - image.innerSize.x : undefined}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
        </Descriptions>
    </div>
);
