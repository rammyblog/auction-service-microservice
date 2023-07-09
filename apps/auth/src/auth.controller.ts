import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '@prisma/auth-projects';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator';
import { LoginDto } from './dto';
import { JwtAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  // @MessagePattern('validate_user')
  // async validateUser(@Req() req: any) {
  //   console.log(req);
  //   return 'user';
  // }
}
