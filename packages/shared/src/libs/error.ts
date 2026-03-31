enum MaiErrorCode {
  // 校验错误
  VALIDATE_ERROR = 40000,

  // 数据库错误 50000~50999
  DB_DATA_EXIST = 50000,
  DB_DATA_NOT_EXIST = 50001,
  DB_VERSION_CONFLICT = 50002,
  DB_ERROR = 50999,
}

const ErrorCodeDefaultMessage: Record<MaiErrorCode, string> = {
  [MaiErrorCode.VALIDATE_ERROR]: '校验错误',
  [MaiErrorCode.DB_DATA_EXIST]: '数据已存在',
  [MaiErrorCode.DB_DATA_NOT_EXIST]: '数据不存在',
  [MaiErrorCode.DB_VERSION_CONFLICT]: '数据版本冲突',
  [MaiErrorCode.DB_ERROR]: '数据库错误',
}

export class MaiError extends Error {
  static ErrorCode = MaiErrorCode

  constructor(
    public code: MaiErrorCode,
    message = ErrorCodeDefaultMessage[code]
  ) {
    super(message)
    this.name = 'MaiError'
    Error.captureStackTrace(this, this.constructor)
  }
}
