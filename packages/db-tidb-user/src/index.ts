import bcrypt from 'bcryptjs'

import { isKnownRequestError, prisma, User } from '@mai/db-tidb'
import { MaiError, validate } from '@mai/shared'

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
