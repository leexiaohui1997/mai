import { Prisma } from '@prisma/client'

// 判断是否是已知的请求错误
export function isKnownRequestError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError
}
