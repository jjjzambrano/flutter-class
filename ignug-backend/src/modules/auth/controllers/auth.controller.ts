import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PublicRoute, User } from '@auth/decorators';
import { JwtGuard, LoginGuard } from '@auth/guards';
import { AuthService } from '@auth/services';
import { UserEntity } from '@auth/entities';
import { LoginDto, UpdateProfileDto } from '@auth/dto';
import { PasswordChangeDto } from '@auth/dto';
import { ResponseHttpModel } from '@shared/models';
import { UpdateUserInformationDto } from '@auth/dto';

@ApiTags('auth')
// @UseGuards(JwtGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('login')
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body() payload: LoginDto,
    @User() user: UserEntity,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = this.authService.generateJwt(user);

    return {
      data: serviceResponse.data,
      message: 'Correct Access',
      title: 'Welcome',
    };
  }

  @Put(':id/change-password')
  @HttpCode(HttpStatus.CREATED)
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PasswordChangeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.changePassword(id, payload);

    return {
      data: serviceResponse.data,
      message: 'The password was changed',
      title: 'Password Changed',
    };
  }

  @ApiOperation({ summary: 'Profile User' })
  @Get(':id/profile')
  @HttpCode(HttpStatus.OK)
  async findProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findProfile(id);

    return {
      data: serviceResponse.data,
      message: `profile ${id}`,
      title: `Success`,
    };
  }

  @Get(':id/user-information')
  @HttpCode(HttpStatus.CREATED)
  async findUserInformation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.findUserInformation(id);

    return {
      data: serviceResponse.data,
      message: 'The user information was updated',
      title: 'User Information Updated',
    };
  }

  @Put(':id/profile')
  @HttpCode(HttpStatus.CREATED)
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProfileDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateProfile(id, payload);

    return {
      data: serviceResponse.data,
      message: 'The profile was updated',
      title: 'Profile Updated',
    };
  }

  @Put(':id/user-information')
  @HttpCode(HttpStatus.CREATED)
  async updateUserInformation(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserInformationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.authService.updateUserInformation(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: 'The user information was updated',
      title: 'User Information Updated',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  logout(@Req() req: Request) {
    // return req.logOut(() => true);
  }
}
