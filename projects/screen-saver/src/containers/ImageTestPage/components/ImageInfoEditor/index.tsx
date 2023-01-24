import { Descriptions, InputNumber } from 'antd';

import { ImageInfo, ImageMargin } from 'src/types/image';

import css from './styles.module.scss';

export interface ImageInfoEditorProps {
    image?: ImageInfo;
    onChangeImage?: (name: string, margin: Partial<ImageMargin>) => void;
}

export const ImageInfoEditor: React.FC<ImageInfoEditorProps> = ({ image, onChangeImage }) => (
    <div>
        <Descriptions>
            <Descriptions.Item label="Width">{image?.size.width ?? '--'}</Descriptions.Item>
            <Descriptions.Item label="Height">{image?.size.height ?? '--'}</Descriptions.Item>
        </Descriptions>
        <Descriptions className={css.description} column={2}>
            <Descriptions.Item label="Top">
                <InputNumber
                    disabled={image?.margin.top === undefined}
                    onChange={(value) => onChangeImage?.(image!.name, { top: value ?? 0 })}
                    value={image?.margin.top}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Bottom">
                <InputNumber
                    disabled={image?.margin.bottom === undefined}
                    onChange={(value) => onChangeImage?.(image!.name, { bottom: value ?? 0 })}
                    value={image?.margin.bottom}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Left">
                <InputNumber
                    disabled={image?.margin.left === undefined}
                    onChange={(value) => onChangeImage?.(image!.name, { left: value ?? 0 })}
                    value={image?.margin.left}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
            <Descriptions.Item label="Right">
                <InputNumber
                    disabled={image?.margin.right === undefined}
                    onChange={(value) => onChangeImage?.(image!.name, { right: value ?? 0 })}
                    value={image?.margin.right}
                    style={{ width: '192px' }}
                />
            </Descriptions.Item>
        </Descriptions>
    </div>
);
