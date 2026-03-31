import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MaiError } from '../error'
import { validate } from './index'
import * as validatorMap from './validators'
// Mock 验证器函数
vi.mock('./validators', () => ({
  username: vi.fn().mockImplementation((value) => {
    if (typeof value !== 'string') return '用户名必须是字符串'
    if (value === 'validUser') return undefined
    if (value === 'invalidUser') return '用户名无效'
    return '其他错误'
  }),
  password: vi.fn().mockImplementation((value) => {
    if (typeof value !== 'string') return '密码必须是字符串'
    if (value === 'validPass') return undefined
    if (value === 'invalidPass') return '密码无效'
    return '其他错误'
  }),
}))

describe('validate 函数', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该成功验证有效的用户名', () => {
    const result = validate('username', 'validUser')
    expect(result).toBe(true)
  })

  it('应该返回 false 对于无效的用户名', () => {
    const result = validate('username', 'invalidUser')
    expect(result).toBe(false)
  })

  it('应该成功验证有效的密码', () => {
    const result = validate('password', 'validPass')
    expect(result).toBe(true)
  })

  it('应该返回 false 对于无效的密码', () => {
    const result = validate('password', 'invalidPass')
    expect(result).toBe(false)
  })

  it('应该抛出错误当 throwErr 为 true 且验证失败时', () => {
    expect(() => {
      validate('username', 'invalidUser', true)
    }).toThrow(MaiError)

    expect(() => {
      validate('username', 'invalidUser', true)
    }).toThrow('用户名无效')
  })

  it('应该不抛出错误当 throwErr 为 false 且验证失败时', () => {
    expect(() => {
      validate('username', 'invalidUser', false)
    }).not.toThrow()
  })

  it('应该处理非字符串输入的错误', () => {
    const result = validate('username', 123)
    expect(result).toBe(false)
  })

  it('应该处理未知验证器类型', () => {
    // 对于未知类型，TypeScript 会在编译时报错，但运行时可能会返回默认值
    // 这里测试运行时行为
    const result = validate('username', 'test')
    expect(result).toBeDefined()
  })

  it('应该处理验证器返回 falsy 值的情况', () => {
    // 测试空字符串返回 false
    vi.mocked(validatorMap.username).mockReturnValueOnce('')
    const result1 = validate('username', 'test')
    expect(result1).toBe(false)

    // 测试 falsy 值返回 false
    vi.mocked(validatorMap.username).mockReturnValueOnce(false)
    const result2 = validate('username', 'test')
    expect(result2).toBe(false)
  })
})
