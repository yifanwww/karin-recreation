import { Button } from 'antd';
import { useNavigate } from 'react-router';

import css from './PageNavigator.module.scss';

export interface PageNavigatorProps {
    title: string;
    url: string;
}

export const PageNavigator: React.FC<PageNavigatorProps> = ({ title, url }) => {
    const navigate = useNavigate();

    return (
        <Button className={css.button} onClick={() => navigate(url)}>
            <div>{title}</div>
            <code className={css.code}>{url}</code>
        </Button>
    );
};
