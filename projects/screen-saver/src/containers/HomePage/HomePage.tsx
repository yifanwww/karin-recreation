import { Layout } from 'antd';

import { RoutePath } from 'src/routes';
import { PageNavigator } from './components/PageNavigator';

import css from './HomePage.module.scss';

const HomePage: React.FC = () => (
    <Layout.Content className={css.home}>
        <PageNavigator title="Preview" url={RoutePath.PREVIEW} />
        <PageNavigator title="Image Test" url={RoutePath.IMAGE_TEST} />
    </Layout.Content>
);

export default HomePage;
