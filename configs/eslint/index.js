module.exports = {
    env: {
        browser: true,
        es2017: true,
        jest: true,
        node: true,
    },
    ignorePatterns: ['*.cjs', '*.js', '*.mjs'],
    plugins: ['react-hooks'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'react-hooks/exhaustive-deps': ['error', { additionalHooks: 'use[a-zA-Z]+Effect' }],
        'react-hooks/rules-of-hooks': 'error',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
        },
    ],
};
