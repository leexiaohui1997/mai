import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { MaiError, MaiResponse, outputJson } from '@mai/shared'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, MaiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<MaiResponse<T>> {
    return next
      .handle()
      .pipe(
        map((data) =>
          outputJson(
            MaiError.ErrorCode.SUCCESS,
            MaiError.ErrorMessage[MaiError.ErrorCode.SUCCESS],
            data
          )
        )
      )
  }
}
