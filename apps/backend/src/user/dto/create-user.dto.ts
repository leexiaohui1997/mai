import { IsNotEmpty, IsString, ValidateBy } from 'class-validator'

import { validate } from '@mai/shared'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @ValidateBy({
    name: 'isValidUsername',
    validator: {
      validate: (value: string) => validate('username', value) !== false,
      defaultMessage: () => '用户名格式错误',
    },
  })
  username: string

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @ValidateBy({
    name: 'isValidPassword',
    validator: {
      validate: (value: string) => validate('password', value) !== false,
      defaultMessage: () => '密码格式错误',
    },
  })
  password: string
}
