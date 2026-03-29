type ValidateFn = (value: unknown) => string | boolean | void

const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * 用户名验证规则（业界通用标准）
 * - 长度：3-20 个字符
 * - 字符合法性：只允许字母、数字、下划线、连字符
 * - 格式：不能以连字符或下划线开头/结尾，不能有连续特殊字符
 */
export const username: ValidateFn = (value) => {
  if (!isString(value)) return '用户名必须是字符串'

  if (!value) return '用户名不能为空'

  // 检查是否包含首尾空格
  if (value !== value.trim()) {
    return '用户名不能包含首尾空格'
  }

  if (value.length < 3 || value.length > 20) {
    return '用户名长度必须在 3-20 个字符之间'
  }

  // 只允许字母、数字、下划线、连字符
  const validPattern = /^[a-zA-Z0-9_-]+$/
  if (!validPattern.test(value)) {
    return '用户名只能包含字母、数字、下划线和连字符'
  }

  // 不能以连字符或下划线开头/结尾
  if (/^[-_]|[-_]$/.test(value)) {
    return '用户名不能以连字符或下划线开头/结尾'
  }

  // 不能有连续的特殊字符
  if (/__|--|_-|-_/.test(value)) {
    return '用户名不能有连续的特殊字符'
  }
}

/**
 * 密码验证规则（业界通用安全标准）
 * - 长度：8-64 个字符
 * - 复杂度：至少包含字母和数字
 * - 可选增强：特殊字符、大小写字母
 */
export const password: ValidateFn = (value) => {
  if (!isString(value)) return '密码必须是字符串'

  if (!value) return '密码不能为空'

  // 检查是否包含首尾空格
  if (value !== value.trim()) {
    return '密码不能包含首尾空格'
  }

  if (value.length < 8 || value.length > 64) {
    return '密码长度必须在 8-64 个字符之间'
  }

  // 至少包含一个字母和一个数字
  const hasLetter = /[a-zA-Z]/.test(value)
  const hasNumber = /[0-9]/.test(value)

  if (!hasLetter || !hasNumber) {
    return '密码必须包含字母和数字'
  }
}
