import { CreateUserDto } from './dto/create-user.dto'

import { createUser } from '@mai/db-tidb-user'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

@Controller('users')
export class UserController {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return createUser({
      username: createUserDto.username,
      password: createUserDto.password,
    })
  }
}
