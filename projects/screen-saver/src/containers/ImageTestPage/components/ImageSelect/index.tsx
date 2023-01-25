import { Select } from 'antd';
import { ImageAssetName } from 'src/assets';

export interface ImageSelectProps {
    onChange?: (value: string) => void;
    value?: string;
}

export const ImageSelect: React.FC<ImageSelectProps> = ({ onChange, value }) => (
    <Select
        onChange={onChange}
        options={Object.values(ImageAssetName).map((name) => ({ label: name, value: name }))}
        placeholder="choose a image"
        value={value}
        style={{ flex: 'none', width: '192px' }}
    />
);
