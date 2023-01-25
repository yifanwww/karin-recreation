import { useContext, useState } from 'react';

import { ImagePropertyEditor } from './components/ImagePropertyEditor';
import { ImageDisplay } from './components/ImageDisplay';
import { ImageSelect } from './components/ImageSelect';
import { ImagePropertyContext, ImagePropertyProvider } from './contexts/ImagePropertyContext';

import css from './styles.module.scss';

const ImageTestPage: React.FC = () => {
    const { changeInnerMargin, images } = useContext(ImagePropertyContext);
    const [selectedImage, setSelectedImage] = useState<string>();

    return (
        <div className={css.page}>
            <div className={css['image-info-panel']}>
                <ImageSelect onChange={setSelectedImage} value={selectedImage} />
                <ImagePropertyEditor
                    image={selectedImage ? images[selectedImage] : undefined}
                    onChangeImageInnerMargin={changeInnerMargin}
                />
            </div>
            <ImageDisplay selectedImage={selectedImage} />
        </div>
    );
};

const WrappedImageTestPage: React.FC = () => (
    <ImagePropertyProvider>
        <ImageTestPage />
    </ImagePropertyProvider>
);

export default WrappedImageTestPage;
