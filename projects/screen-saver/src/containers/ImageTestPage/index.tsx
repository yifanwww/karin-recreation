import { useContext, useState } from 'react';

import { ImageInfoEditor } from './components/ImageInfoEditor';
import { ImageDisplay } from './components/ImageDisplay';
import { ImageSelector } from './components/ImageSelector';
import { ImageInfoContext, ImageInfoProvider } from './contexts/ImageInfoContext';

import css from './styles.module.scss';

const ImageTestPage: React.FC = () => {
    const { images, update } = useContext(ImageInfoContext);
    const [selectedImage, setSelectedImage] = useState<string>();

    return (
        <div className={css.page}>
            <div className={css['image-info-panel']}>
                <ImageSelector onChange={setSelectedImage} value={selectedImage} />
                <ImageInfoEditor image={selectedImage ? images[selectedImage] : undefined} onChangeImage={update} />
            </div>
            <div className={css['image-container']}>
                <ImageDisplay />
            </div>
        </div>
    );
};

const WrappedImageTestPage: React.FC = () => (
    <ImageInfoProvider>
        <ImageTestPage />
    </ImageInfoProvider>
);

export default WrappedImageTestPage;
