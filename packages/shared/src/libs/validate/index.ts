import { MaiError } from '../error'
import * as validatorMap from './validators'

type ValidateType = keyof typeof validatorMap

export function validate<
  T extends ValidateType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V = (typeof validatorMap)[T] extends (...args: infer A) => any ? A : unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R = (typeof validatorMap)[T] extends (...args: any) => infer B ? B : string | boolean | void,
>(type: T, value: V, throwErr = false): R {
  const result = (validatorMap[type](value) ?? true) || '校验错误'

  if (typeof result === 'string') {
    if (throwErr) {
      throw new MaiError(MaiError.ErrorCode.VALIDATE_ERROR, result)
    }
    return false as R
  }

  return result as R
}
