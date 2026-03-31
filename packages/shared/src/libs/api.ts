export interface MaiResponse<T = unknown> {
  code: number
  data?: T
  message: string
  timestamp: string
}

export function outputJson<T = unknown>(code: number, message: string, data?: T): MaiResponse<T> {
  return {
    code,
    data,
    message,
    timestamp: new Date().toISOString(),
  }
}
