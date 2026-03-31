/**
 * 检查是否包含
 * @param target 目标
 * @param value 值
 * @returns 是否包含
 */
export function checkInclude<V>(target: unknown, value: V): target is string | V[] {
  if (Array.isArray(target)) {
    return target.includes(value)
  }

  if (typeof target === 'string' && typeof value === 'string') {
    return target.includes(value)
  }

  return false
}
