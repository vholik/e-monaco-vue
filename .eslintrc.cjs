/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    plugins: ['import', 'simple-import-sort'],
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'simple-import-sort/sort': 'error',
        'import/no-unused-modules': ['error', { unusedExports: true }],
    },
    parserOptions: {
        ecmaVersion: 'latest',
    },
}
