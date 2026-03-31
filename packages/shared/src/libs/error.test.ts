import { describe, expect, it } from 'vitest'

import { MaiError } from './error'

describe('MaiError 类', () => {
  it('应该正确创建错误实例', () => {
    const error = new MaiError(MaiError.ErrorCode.VALIDATE_ERROR)

    expect(error).toBeInstanceOf(MaiError)
    expect(error).toBeInstanceOf(Error)
    expect(error.name).toBe('MaiError')
    expect(error.code).toBe(MaiError.ErrorCode.VALIDATE_ERROR)
    expect(error.message).toBe('校验错误')
  })

  it('应该使用自定义错误消息', () => {
    const customMessage = '自定义验证错误'
    const error = new MaiError(MaiError.ErrorCode.VALIDATE_ERROR, customMessage)

    expect(error.message).toBe(customMessage)
    expect(error.code).toBe(MaiError.ErrorCode.VALIDATE_ERROR)
  })

  it('应该支持所有预定义的错误代码', () => {
    // 测试 VALIDATE_ERROR
    const validateError = new MaiError(MaiError.ErrorCode.VALIDATE_ERROR)
    expect(validateError.message).toBe('校验错误')

    // 测试 DB_DATA_EXIST
    const dbExistError = new MaiError(MaiError.ErrorCode.DB_DATA_EXIST)
    expect(dbExistError.message).toBe('数据已存在')

    // 测试 DB_DATA_NOT_EXIST
    const dbNotExistError = new MaiError(MaiError.ErrorCode.DB_DATA_NOT_EXIST)
    expect(dbNotExistError.message).toBe('数据不存在')
  })

  it('应该包含错误堆栈信息', () => {
    const error = new MaiError(MaiError.ErrorCode.VALIDATE_ERROR)

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
    expect(error.stack).toContain('MaiError')
  })

  it('应该正确设置 ErrorCode 静态属性', () => {
    expect(MaiError.ErrorCode.VALIDATE_ERROR).toBe(40000)
    expect(MaiError.ErrorCode.DB_DATA_EXIST).toBe(50000)
    expect(MaiError.ErrorCode.DB_DATA_NOT_EXIST).toBe(50001)
    expect(MaiError.ErrorCode.DB_VERSION_CONFLICT).toBe(50002)
    expect(MaiError.ErrorCode.DB_ERROR).toBe(50999)
  })

  it('应该支持新增的 DB_VERSION_CONFLICT 错误码', () => {
    const error = new MaiError(MaiError.ErrorCode.DB_VERSION_CONFLICT)
    expect(error.message).toBe('数据版本冲突')
    expect(error.code).toBe(MaiError.ErrorCode.DB_VERSION_CONFLICT)
  })

  it('应该支持新增的 DB_ERROR 错误码', () => {
    const error = new MaiError(MaiError.ErrorCode.DB_ERROR)
    expect(error.message).toBe('数据库错误')
    expect(error.code).toBe(MaiError.ErrorCode.DB_ERROR)
  })

  it('应该正确处理错误代码和消息的映射', () => {
    const errorCodeDefaultMessage: Record<number, string> = {
      [MaiError.ErrorCode.VALIDATE_ERROR]: '校验错误',
      [MaiError.ErrorCode.DB_DATA_EXIST]: '数据已存在',
      [MaiError.ErrorCode.DB_DATA_NOT_EXIST]: '数据不存在',
      [MaiError.ErrorCode.DB_VERSION_CONFLICT]: '数据版本冲突',
      [MaiError.ErrorCode.DB_ERROR]: '数据库错误',
    }

    // 验证每个错误代码都有对应的默认消息
    Object.values(MaiError.ErrorCode).forEach((code) => {
      if (typeof code === 'number') {
        const error = new MaiError(code)
        expect(error.message).toBe(errorCodeDefaultMessage[code])
      }
    })
  })
})
