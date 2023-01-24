// Used for `react-scripts` 5.0.1
// For more information about how to override default configs of `react-scripts`
// please visit https://github.com/timarney/react-app-rewired

const path = require('node:path');

const { paths } = require('./path');

const PROJ_PREFIX = '@karin/';

const projName = process.env.npm_package_name;
const projRealName = projName?.includes(PROJ_PREFIX) ? projName.slice(PROJ_PREFIX.length) : projName;

const proj = projRealName ? path.resolve(paths.projs, projRealName) : process.cwd();
const resolveProj = (relative) => path.resolve(proj, relative);

// Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/paths.js
const craPaths = {
    appBuild: resolveProj('build'),
    appHtml: resolveProj('public/index.html'),
    appIndexTs: resolveProj('src/index.tsx'),
    appNodeModules: paths.rootNodeModules,
    appPath: proj,
    appPublic: resolveProj('public'),
    appSrc: resolveProj('src'),
    appTsConfig: resolveProj('tsconfig.json'),
    appTypeDeclarations: resolveProj('src/global.d.ts'),
    proxySetup: resolveProj('src/setup.proxy.js'),
    swSrc: resolveProj('src/serviceWorker.js'),
    testsSetup: resolveProj('src/setup.tests.ts'),
};

/**
 * Override paths configurations.
 *
 * The paths config to use when compiling your react app for development or production.
 *
 * Check Check https://github.com/facebook/create-react-app/blob/v5.0.1/packages/react-scripts/config/paths.js
 */
function overridePathsConfigs(_paths) {
    _paths.appBuild = craPaths.appBuild;
    _paths.appHtml = craPaths.appHtml;
    _paths.appIndexJs = craPaths.appIndexTs;
    _paths.appPath = craPaths.appPath;
    _paths.appPublic = craPaths.appPublic;
    _paths.appSrc = craPaths.appSrc;
    _paths.appTsConfig = craPaths.appTsConfig;
    _paths.appTypeDeclarations = craPaths.appTypeDeclarations;
    _paths.proxySetup = craPaths.proxySetup;
    _paths.swSrc = craPaths.swSrc;
    _paths.testsSetup = craPaths.testsSetup;

    return _paths;
}

module.exports = {
    paths: overridePathsConfigs,
};
