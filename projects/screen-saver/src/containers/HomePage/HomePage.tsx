import { RoutePath } from 'src/routes';
import { PageNavigator } from './components/PageNavigator';

import css from './HomePage.module.scss';

const HomePage: React.FC = (props) => {
    return (
        <div className={css.home}>
            <PageNavigator title="Screen Saver" url={RoutePath.SCREEN_SAVER} />
            <PageNavigator title="Image Testing" url={RoutePath.IMAGE_TEST} />
        </div>
    );
};

export default HomePage;
