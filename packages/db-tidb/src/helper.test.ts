import { describe, expect, it } from 'vitest'

import { isKnownRequestError } from './helper'

import { Prisma } from '@prisma/client'

describe('isKnownRequestError', () => {
  it('传入 PrismaClientKnownRequestError 实例时应返回 true', () => {
    const error = new Prisma.PrismaClientKnownRequestError('测试错误', {
      code: 'P2002',
      clientVersion: '0.0.0',
    })

    expect(isKnownRequestError(error)).toBe(true)
  })

  it('传入普通 Error 实例时应返回 false', () => {
    const error = new Error('普通错误')

    expect(isKnownRequestError(error)).toBe(false)
  })

  it('传入字符串时应返回 false', () => {
    expect(isKnownRequestError('错误字符串')).toBe(false)
  })

  it('传入 null 时应返回 false', () => {
    expect(isKnownRequestError(null)).toBe(false)
  })

  it('传入普通对象时应返回 false', () => {
    expect(isKnownRequestError({ code: 'P2002' })).toBe(false)
  })
})
