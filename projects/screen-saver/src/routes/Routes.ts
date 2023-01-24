import { lazy } from 'react';

import { createRoutes, RouteConfig } from 'src/utils/routes';
import { RoutePath } from './RoutePath';

export const routes: RouteConfig[] = createRoutes([
    {
        path: RoutePath.HOME,
        component: lazy(() => import(/* webpackChunkName: 'home' */ 'src/containers/HomePage')),
    },
]);
