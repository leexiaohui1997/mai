import bcrypt from 'bcryptjs'

import { isKnownRequestError, prisma, User } from '@mai/db-tidb'
import { checkInclude, MaiError, validate } from '@mai/shared'

/** Bcrypt 加密轮数 */
const SALT_ROUNDS = 10

/**
 * 创建用户
 * @param username 用户名
 * @param plainPassword 明文密码
 * @returns 用户对象（不包含密码）
 * @throws 如果用户已存在
 */
export async function createUser({
  username,
  password: plainPassword,
}: Pick<User, 'username' | 'password'>) {
  validate('username', username, true)
  validate('password', plainPassword, true)

  const password = await bcrypt.hash(plainPassword, SALT_ROUNDS)

  try {
    return await prisma.user.create({
      data: {
        username,
        password,
      },
      omit: {
        password: true,
      },
    })
  } catch (error) {
    if (isKnownRequestError(error) && error.code === 'P2002') {
      throw new MaiError(MaiError.ErrorCode.DB_DATA_EXIST, '用户已存在')
    }
    throw error
  }
}

/**
 * 更新用户信息
 * @param userId 用户ID
 * @param info 用户信息（目前支持密码更新）
 * @returns 更新后的用户对象（不包含密码）
 * @throws 如果用户不存在或其他数据库错误
 */
export async function updateUser(
  user: Pick<User, 'id' | 'version'>,
  updates: Partial<Pick<User, 'password'>>
) {
  const info = { ...updates }

  if (info.password) {
    validate('password', info.password, true)
    info.password = await bcrypt.hash(info.password, SALT_ROUNDS)
  }

  try {
    return await prisma.user.update({
      where: user,
      data: {
        ...info,
        version: {
          increment: 1,
        },
      },
      omit: {
        password: true,
      },
    })
  } catch (error) {
    if (isKnownRequestError(error)) {
      if (error.code === 'P2025') {
        if (
          checkInclude(error.meta?.cause, 'version') ||
          checkInclude(error.meta?.reason, 'version')
        ) {
          throw new MaiError(MaiError.ErrorCode.DB_VERSION_CONFLICT, '版本冲突')
        } else {
          throw new MaiError(MaiError.ErrorCode.DB_DATA_NOT_EXIST, '用户不存在')
        }
      }
    }
    throw error
  }
}
