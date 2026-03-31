import { beforeEach, describe, expect, it, vi } from 'vitest'

// mock bcryptjs
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}))

// mock @mai/db-tidb
vi.mock('@mai/db-tidb', () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
  isKnownRequestError: vi.fn(),
}))

// mock @mai/shared 的 validate，保留 MaiError 真实实现
vi.mock('@mai/shared', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mai/shared')>()
  return {
    ...actual,
    validate: vi.fn(),
  }
})

import bcrypt from 'bcryptjs'

import { createUser } from './index'

import { isKnownRequestError, prisma } from '@mai/db-tidb'
import { MaiError, validate } from '@mai/shared'

const mockBcryptHash = vi.mocked(bcrypt.hash)
const mockPrismaUserCreate = vi.mocked(prisma.user.create)
const mockIsKnownRequestError = vi.mocked(isKnownRequestError)
const mockValidate = vi.mocked(validate)

describe('createUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockBcryptHash.mockResolvedValue('hashed_password' as never)
    // 默认 validate 不抛出错误
    mockValidate.mockReturnValue(undefined)
  })

  it('应该成功创建用户并返回不含密码的用户对象', async () => {
    const mockUser = { id: 1, username: 'testuser', createdAt: new Date() }
    mockPrismaUserCreate.mockResolvedValue(mockUser as never)

    const result = await createUser({ username: 'testuser', password: 'password123' })

    expect(mockValidate).toHaveBeenCalledWith('username', 'testuser', true)
    expect(mockValidate).toHaveBeenCalledWith('password', 'password123', true)
    expect(mockBcryptHash).toHaveBeenCalledWith('password123', 10)
    expect(mockPrismaUserCreate).toHaveBeenCalledWith({
      data: { username: 'testuser', password: 'hashed_password' },
      omit: { password: true },
    })
    expect(result).toEqual(mockUser)
  })

  it('当 validate 抛出错误时应该向上传播', async () => {
    const validateError = new MaiError(MaiError.ErrorCode.VALIDATE_ERROR, '用户名格式错误')
    mockValidate.mockImplementation(() => {
      throw validateError
    })

    await expect(createUser({ username: 'bad user!', password: 'password123' })).rejects.toThrow(
      validateError
    )

    expect(mockPrismaUserCreate).not.toHaveBeenCalled()
  })

  it('当用户已存在时应该抛出 DB_DATA_EXIST 错误', async () => {
    const prismaError = { code: 'P2002' }
    mockPrismaUserCreate.mockRejectedValue(prismaError as never)
    mockIsKnownRequestError.mockReturnValue(true)

    await expect(
      createUser({ username: 'existuser', password: 'password123' })
    ).rejects.toMatchObject({
      code: MaiError.ErrorCode.DB_DATA_EXIST,
      message: '用户已存在',
    })
  })

  it('当发生未知数据库错误时应该直接抛出原始错误', async () => {
    const unknownError = new Error('数据库连接失败')
    mockPrismaUserCreate.mockRejectedValue(unknownError as never)
    mockIsKnownRequestError.mockReturnValue(false)

    await expect(createUser({ username: 'testuser', password: 'password123' })).rejects.toThrow(
      '数据库连接失败'
    )
  })
})
