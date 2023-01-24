const path = require('node:path');

// `..` points to `<repo>/configs`
// `../..` points to `<repo>`
const repo = path.join(__dirname, '../..');

const rootNodeModules = path.join(repo, 'node_modules');

const configs = path.join(repo, 'configs');
const projs = path.join(repo, 'projects');

const paths = {
    repository: repo,

    // node_modules

    rootNodeModules,

    // packages

    configs,
    projs,

    // compilation

    reactWebpackConfig: path.resolve(configs, 'webpack/webpack.config.js'),
};

module.exports = {
    paths,
};
