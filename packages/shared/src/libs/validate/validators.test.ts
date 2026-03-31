import { describe, expect, it } from 'vitest'

import { password, username } from './validators'

describe('用户名验证器', () => {
  it('应该验证有效的用户名', () => {
    expect(username('validUser123')).toBeUndefined()
    expect(username('user-name')).toBeUndefined()
    expect(username('user_name')).toBeUndefined()
  })

  it('应该拒绝非字符串输入', () => {
    expect(username(123)).toBe('用户名必须是字符串')
    expect(username(null)).toBe('用户名必须是字符串')
    expect(username(undefined)).toBe('用户名必须是字符串')
  })

  it('应该拒绝空用户名', () => {
    expect(username('')).toBe('用户名不能为空')
    expect(username('   ')).toBe('用户名不能包含首尾空格')
  })

  it('应该拒绝包含首尾空格的用户名', () => {
    expect(username(' user ')).toBe('用户名不能包含首尾空格')
  })

  it('应该验证用户名长度', () => {
    expect(username('ab')).toBe('用户名长度必须在 3-20 个字符之间')
    expect(username('a'.repeat(21))).toBe('用户名长度必须在 3-20 个字符之间')
  })

  it('应该拒绝非法字符', () => {
    expect(username('user@name')).toBe('用户名只能包含字母、数字、下划线和连字符')
    expect(username('user name')).toBe('用户名只能包含字母、数字、下划线和连字符')
  })

  it('应该拒绝以特殊字符开头或结尾', () => {
    expect(username('-username')).toBe('用户名不能以连字符或下划线开头/结尾')
    expect(username('username-')).toBe('用户名不能以连字符或下划线开头/结尾')
    expect(username('_username')).toBe('用户名不能以连字符或下划线开头/结尾')
  })

  it('应该拒绝连续特殊字符', () => {
    expect(username('user__name')).toBe('用户名不能有连续的特殊字符')
    expect(username('user--name')).toBe('用户名不能有连续的特殊字符')
  })
})

describe('密码验证器', () => {
  it('应该验证有效的密码', () => {
    expect(password('Password123')).toBeUndefined()
    expect(password('password123')).toBeUndefined()
  })

  it('应该拒绝非字符串输入', () => {
    expect(password(123)).toBe('密码必须是字符串')
    expect(password(null)).toBe('密码必须是字符串')
  })

  it('应该拒绝空密码', () => {
    expect(password('')).toBe('密码不能为空')
    expect(password('   ')).toBe('密码不能包含首尾空格')
  })

  it('应该拒绝包含首尾空格的密码', () => {
    expect(password(' password ')).toBe('密码不能包含首尾空格')
  })

  it('应该验证密码长度', () => {
    expect(password('pass1')).toBe('密码长度必须在 8-64 个字符之间')
    expect(password('a'.repeat(65))).toBe('密码长度必须在 8-64 个字符之间')
  })

  it('应该要求包含字母和数字', () => {
    expect(password('password')).toBe('密码必须包含字母和数字')
    expect(password('12345678')).toBe('密码必须包含字母和数字')
  })
})
