import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import stylisticJs from '@stylistic/eslint-plugin-js';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: pluginJs.configs.recommended,
});
export default [
    {
        ignores: [ 'dist/', '*.json' ], // отключение проверок для папок
    },
    {
        // определение стандарта и парсинга
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: [ '@babel/preset-env' ],
                },
            },
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: globals.browser,
        },
    },
    ...compat.extends('airbnb-base'),
    {
    // files: ['src/**/*.js'],
        rules: {
            indent: [ 'error', 4 ], // отступы, авто
            semi: [ 'error', 'always' ], // точка с запятой, авто
            'no-unused-vars': 'off', // не испоьзуемые переменные
            'no-console': 'off', // console.log
        },
    },
    {
        files: [ '*.config.*' ], // правила для конфигов
        rules: {
            'no-underscore-dangle': [ 'off' ], // двойное подчеркивание перед/после переменной
            'import/no-extraneous-dependencies': 'off', // импорт из дев-зависимостей
        },
    },
    {
        plugins: {
            '@stylistic/js': stylisticJs,
        },
        rules: {
            'max-len': [ 'error', { code: 120 } ], // длинна строки, нет авто
            quotes: [ 'error', 'single' ], // одинарные кавычки, авто
            'object-property-newline': [ 'error' ], // разбиение объекта по строчно, авто
            'array-bracket-spacing': [ 'error', 'always' ],
            'no-multiple-empty-lines': [ 'error', {
                max: 1, // одна внутренняя
                maxBOF: 1, // одна сверху в импортах
            } ], // пустые строки, авто
        },
    },
];
