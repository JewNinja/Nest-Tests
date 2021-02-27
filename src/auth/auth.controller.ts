import { Controller, Post, Body, ValidationPipe, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
    const res = await this.authService.validateUser(loginDto.email, loginDto.password).then(res => res)
    if (!res) {
      throw new HttpException('Error', 404);
    }
    return res
  }

  @Post('refresh')
  async refreshToken(@Body(new ValidationPipe()) refreshTokenDto: RefreshTokenDto) {
    const res = await this.authService.refreshToken(refreshTokenDto.refreshToken)
    if (!res) {
      throw new HttpException('Error', 401);
    }
    return res
  }

  @Post('signup')
  async signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
    const res = await this.authService.signupUser(signupDto).then(res => res)
    if (res === 'email occupied' || !res) {
      throw new HttpException('Error', 404);
    }
    return res
  }
}
