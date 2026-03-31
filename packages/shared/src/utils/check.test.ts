import { describe, expect, it } from 'vitest'

import { checkInclude } from './check'

describe('checkInclude 函数', () => {
  describe('目标为数组时', () => {
    it('应该在数组包含该值时返回 true', () => {
      expect(checkInclude([1, 2, 3], 2)).toBe(true)
      expect(checkInclude(['a', 'b', 'c'], 'b')).toBe(true)
    })

    it('应该在数组不包含该值时返回 false', () => {
      expect(checkInclude([1, 2, 3], 4)).toBe(false)
      expect(checkInclude(['a', 'b'], 'c')).toBe(false)
    })

    it('应该支持空数组', () => {
      expect(checkInclude([], 'anything')).toBe(false)
    })
  })

  describe('目标为字符串时', () => {
    it('应该在字符串包含子串时返回 true', () => {
      expect(checkInclude('hello world', 'world')).toBe(true)
      expect(checkInclude('version conflict', 'version')).toBe(true)
    })

    it('应该在字符串不包含子串时返回 false', () => {
      expect(checkInclude('hello world', 'foo')).toBe(false)
    })

    it('应该在 value 不是字符串时返回 false', () => {
      // target 是字符串但 value 不是字符串，走不到 string includes 分支
      expect(checkInclude('hello', 123 as unknown as string)).toBe(false)
    })
  })

  describe('目标为其他类型时', () => {
    it('目标为 null 时应返回 false', () => {
      expect(checkInclude(null, 'value')).toBe(false)
    })

    it('目标为 undefined 时应返回 false', () => {
      expect(checkInclude(undefined, 'value')).toBe(false)
    })

    it('目标为数字时应返回 false', () => {
      expect(checkInclude(123, 'value')).toBe(false)
    })

    it('目标为对象时应返回 false', () => {
      expect(checkInclude({ key: 'value' }, 'value')).toBe(false)
    })
  })
})
