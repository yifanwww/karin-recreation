import { Select } from 'antd';
import { ImageAssets } from 'src/assets';

export interface ImageSelectorProps {
    onChange?: (value: string) => void;
    value?: string;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({ onChange, value }) => (
    <Select
        onChange={onChange}
        options={Object.keys(ImageAssets).map((name) => ({ label: name, value: name }))}
        placeholder="choose a image"
        value={value}
        style={{ flex: 'none', width: '192px' }}
    />
);
