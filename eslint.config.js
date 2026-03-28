import prettier from 'eslint-config-prettier'
import eslint from '@eslint/js'

export default [
  // 基本配置
  eslint.configs.recommended,

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

  // Prettier 配置
  prettier,
]
