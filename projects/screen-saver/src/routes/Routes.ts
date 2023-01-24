import { lazy } from 'react';

import { createRoutes, RouteConfig } from 'src/utils/routes';
import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
    },
    {
        path: RoutePath.IMAGE_TEST,
        component: lazy(() => import(/* webpackChunkName: 'image-test' */ 'src/containers/ImageTestPage')),
    },
    {
        path: RoutePath.SCREEN_SAVER,
        component: lazy(() => import(/* webpackChunkName: 'screen-saver' */ 'src/containers/ScreenSaverPage')),
    },
]);
