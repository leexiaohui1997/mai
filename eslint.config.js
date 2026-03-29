import prettier from 'eslint-config-prettier'
import pluginNode from 'eslint-plugin-n'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

import eslint from '@eslint/js'

export default [
  // 忽略模式
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/coverage/**',
      '**/*.min.js',
      '**/*.lock',
    ],
  },

  // 基本配置
  eslint.configs.recommended,

  // TypeScript 配置
  ...tseslint.configs.recommended,

  // import 顺序规范
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Node.js 内置模块
            ['^node:'],
            // 2. npm 包（不包括 @/ 开头的内部包）
            [`^(?!@)`],
            // 3. 内部别名导入（@/xxx、@packages/xxx 等）
            ['^@/'],
            ['^@packages/'],
            // 4. 相对路径导入
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // Node 脚本文件配置
  {
    files: ['scripts/**/*.js', 'packages/*/scripts/**/*.js'],
    ...pluginNode.configs['flat/recommended-module'],
    rules: {
      ...pluginNode.configs['flat/recommended-module'].rules,
      'n/no-process-exit': 'off',
    },
  },

  // Prettier 配置
  prettier,
]
