export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 的枚举值
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式变更（不影响代码运行）
        'refactor', // 重构（既不是新增功能，也不是修改 bug）
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或外部依赖变更
        'ci', // CI 配置和脚本变更
        'chore', // 其他不修改源代码的变更
        'revert', // 回滚
      ],
    ],
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],
    // type 不能为空
    'type-empty': [2, 'never'],
    // subject 小写
    'subject-case': [0],
    // subject 不能为空
    'subject-empty': [2, 'never'],
    // subject 以句号结尾
    'subject-full-stop': [2, 'never', '.'],
    // header 最大长度 100
    'header-max-length': [2, 'always', 100],
  },
}
