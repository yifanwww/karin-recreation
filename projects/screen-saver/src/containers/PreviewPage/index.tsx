import { ControlPanel } from './components/ControlPanel';
import { ScreenView } from './components/ScreenView';
import { StepDisplay } from './components/StepDisplay';
import { PreviewControlProvider } from './contexts/PreviewControlContext';

import css from './styles.module.css';

const PreviewPage: React.FC = () => (
    <div className={css.page}>
        <div className={css['content-container']}>
            <div className={css['screen-container']}>
                <ScreenView />
            </div>
            <ControlPanel className={css['control-container']} />
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
