import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenGuard } from 'src/common/guards/refreh-token.guard';
import { Public } from 'src/common/guards/auth.guard';
import { CreateUserDto } from 'src/api/user/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('signup')
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user register',
  })
  @ApiOperation({
    summary: 'User register'
  })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  @ApiBody({
    type: AuthDto,
    description: 'Json structure for user login',
  })
  @ApiOperation({
    summary: 'User login'
  })
  signin(@Body() payload: AuthDto) {
    return this.authService.signIn(payload);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshToken( userId, refreshToken );
  }

  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }
}