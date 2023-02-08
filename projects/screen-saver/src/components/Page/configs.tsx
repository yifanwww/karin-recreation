import { FileImageOutlined, HomeOutlined, VideoCameraOutlined } from '@ant-design/icons';

import { RoutePath } from 'src/routes';

export interface SiderConfig {
    path: string;
    icon: React.ReactNode;
}

function createSiders(): SiderConfig[] {
    return [
        { path: RoutePath.HOME, icon: <HomeOutlined /> },
        { path: RoutePath.PREVIEW, icon: <VideoCameraOutlined /> },
        { path: RoutePath.IMAGE_TEST, icon: <FileImageOutlined /> },
    ];
}

export const siderConfigs: Record<string, SiderConfig[] | undefined> = {
    [RoutePath.IMAGE_TEST]: createSiders(),
    [RoutePath.PREVIEW]: createSiders(),
};
