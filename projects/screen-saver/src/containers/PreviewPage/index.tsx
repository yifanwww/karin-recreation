import { DebugStepDisplay } from './components/DebugStepDisplay';
import { MovingControl } from './components/MovingControl';
import { ScreenView } from './components/ScreenView';
import { PreviewControlProvider } from './contexts/PreviewControlContext';

import css from './styles.module.css';

const ScreenSaverPage: React.FC = () => {
    return (
        <div className={css.page}>
            <div className={css['content-container']}>
                <div className={css['moving-control-container']}>
                    <MovingControl />
                </div>
                <div className={css['screen-container']}>
                    <ScreenView />
                </div>
            </div>
            <div className={css['debug-display-container']}>
                <DebugStepDisplay />
            </div>
        </div>
    );
};

const WrappedScreenSaverPage: React.FC = () => (
    <PreviewControlProvider>
        <ScreenSaverPage />
    </PreviewControlProvider>
);

export default WrappedScreenSaverPage;
