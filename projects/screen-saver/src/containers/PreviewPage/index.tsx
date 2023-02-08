import { StepDisplay } from './components/StepDisplay';
import { RecordDisplay } from './components/RecordDisplay';
import { ScreenView } from './components/ScreenView';
import { PreviewControlProvider } from './contexts/PreviewControlContext';

import css from './styles.module.css';

const PreviewPage: React.FC = () => (
    <div className={css.page}>
        <div className={css['content-container']}>
            <div className={css['screen-container']}>
                <ScreenView />
            </div>
            <div className={css['record-container']}>
                <RecordDisplay />
            </div>
        </div>
        <div className={css['step-display-container']}>
            <StepDisplay />
        </div>
    </div>
);

const WrappedPreviewPage: React.FC = () => (
    <PreviewControlProvider>
        <PreviewPage />
    </PreviewControlProvider>
);

export default WrappedPreviewPage;
