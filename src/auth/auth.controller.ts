import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInAdminDto, SignInClientDto } from './dto';
import { CookieGetter } from '../decorators';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpAgainDto } from './dto/send-otp-again.dto';
import { AdminGuard } from '../guards/admin.guard';
import { AdminCreatorGuard } from '../guards/admin-creator.guard';
import { CreateClientDto } from '../clients/dto/create-client.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new Admin' })
  @ApiResponse({
    status: 201,
    description: 'Registered',
    type: Object,
  })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminGuard)
  @Post('signup-admin')
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Sign in Admin' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: Object,
  })
  @HttpCode(200)
  @Post('signin-admin')
  async signInAdmin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signInAdminDto, res);
  }

  @ApiOperation({ summary: 'Sign out Admin' })
  @ApiResponse({
    status: 200,
    description: 'Sign out',
    type: Object,
  })
  @HttpCode(200)
  @Post('signout-admin')
  async signOut(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutAdmin(refresh_token, res);
  }

  @ApiOperation({ summary: 'Refresh Admin' })
  @ApiResponse({
    status: 200,
    description: 'Refresh',
    type: Object,
  })
  @HttpCode(200)
  @Post('refresh-admin')
  async refreshAdminToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshAdminToken(refresh_token, res);
  }

  //                      Client Controller 
  @ApiOperation({ summary: 'Register new Client' })
  @ApiResponse({
    status: 201,
    description: 'Registered',
    type: Object,
  })
  @Post('signup-client')
  async signUpClient(
    @Body() createClientDto: CreateClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpClient(createClientDto, res);
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({
    status: 200,
    description: 'Verify OTP',
    type: Object,
  })
  @HttpCode(200)
  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @ApiOperation({ summary: 'Send again OTP' })
  @ApiResponse({
    status: 200,
    description: 'Send again OTP',
    type: Object,
  })
  @HttpCode(200)
  @Post('send-again-otp')
  async sendAgainOtp(@Body() sendOtpAgainDto: SendOtpAgainDto) {
    return this.authService.sendOtpAgain(sendOtpAgainDto);
  }

  @ApiOperation({ summary: 'Sign in Client' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: Object,
  })
  @HttpCode(200)
  @Post('signin-client')
  async signInClient(
    @Body() signInClientDto: SignInClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInClient(signInClientDto, res);
  }

  @ApiOperation({ summary: 'Sign out Client' })
  @ApiResponse({
    status: 200,
    description: 'Sign out',
    type: Object,
  })
  @HttpCode(200)
  @Post('signout-client')
  async signOutClient(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutClient(refresh_token, res);
  }

  @ApiOperation({ summary: 'Refresh Client' })
  @ApiResponse({
    status: 200,
    description: 'Refresh',
    type: Object,
  })
  @HttpCode(200)
  @Post('refresh-client')
  async refreshClientToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshClientToken(refresh_token, res);
  }
}
