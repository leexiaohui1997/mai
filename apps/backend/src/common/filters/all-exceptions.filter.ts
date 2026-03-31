import { MaiError, outputJson } from '@mai/shared'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    let status = MaiError.ErrorCode.SERVER_ERROR
    let message = MaiError.ErrorMessage[status]

    if (exception instanceof MaiError) {
      status = exception.code
      message = exception.message
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as { message: string }).message ?? exception.message)
    } else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack)
      message = exception.message
    } else {
      this.logger.error('Unknown exception', exception)
    }

    response.status(status).json(outputJson(status, message))
  }
}
