import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig}*/
export default [
    {
        plugins: {
            'react-hooks': eslintReactHooks,
            react: eslintReact,
            'react-refresh': eslintReactRefresh,
            prettier: prettierPlugin,
        },
    },
    {
        ignores: ['node-modules', 'dist', 'build', '.idea', 'public'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: { ...globals.node, ...globals.es2022, ...globals.browser },
        },
        parserOptions: eslintReact.configs.recommended.parserOptions,
    },
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...eslintConfigPrettier.rules,
            '@typescript-eslint/no-unused-vars': 'warn',
            'try/catch wrapper.(no-useless-catch)': 'off',
            'no-useless-catch': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'prefer-const': 'warn',
            'react/react-in-jsx-scope': 'off',
            'prettier/prettier': [
                'warn',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },
];
