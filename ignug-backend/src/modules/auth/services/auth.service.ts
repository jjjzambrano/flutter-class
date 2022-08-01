import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { PayloadTokenModel } from '@auth/models';
import { RepositoryEnum } from '@shared/enums';
import {
  PasswordChangeDto,
  ReadProfileDto,
  ReadUserInformationDto,
  UpdateProfileDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async changePassword(id: number, payload: PasswordChangeDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatchPassword = await this.checkPassword(payload.oldPassword, user);

    if (!isMatchPassword) {
      throw new ForbiddenException('The old password is not match.');
    }

    if (payload.confirmationPassword !== payload.newPassword) {
      throw new ForbiddenException('The passwords do not match.');
    }

    user.password = payload.newPassword;

    await this.repository.save(user);

    return { data: true };
  }

  async login(username: string, password: string) {
    const user = await this.findByUsername(username);

    if (user) {
      return this.checkPassword(password, user);
    }

    return null;
  }

  async logout(id: number) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { data: true };
  }

  async findProfile(id: number): Promise<ServiceResponseHttpModel> {
    const user = await this.repository.findOne({
      where: { id },
      relations: {
        bloodType: true,
        ethnicOrigin: true,
        identificationType: true,
        gender: true,
        maritalStatus: true,
        sex: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { data: plainToInstance(ReadProfileDto, user) };
  }

  async findUserInformation(id: number): Promise<ServiceResponseHttpModel> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { data: plainToInstance(ReadUserInformationDto, user) };
  }

  async updateUserInformation(
    id: number,
    payload: UpdateUserInformationDto,
  ): Promise<ServiceResponseHttpModel> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.repository.merge(user, payload);
    const userUpdated = await this.repository.save(user);

    return { data: plainToInstance(ReadUserInformationDto, userUpdated) };
  }

  async updateProfile(
    id: number,
    payload: UpdateProfileDto,
  ): Promise<ServiceResponseHttpModel> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.repository.merge(user, payload);
    const profileUpdated = await this.repository.save(user);

    return { data: plainToInstance(ReadProfileDto, profileUpdated) };
  }

  generateJwt(user: UserEntity) {
    const payload: PayloadTokenModel = { role: 'admin', sub: user.id };
    return {
      data: {
        accessToken: this.jwtService.sign(payload),
        user,
      },
    };
  }

  private async findByUsername(username: string) {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }

  private async checkPassword(passwordCompare: string, user: UserEntity) {
    const { password, ...userRest } = user;
    const isMatch = await Bcrypt.compare(passwordCompare, password);

    if (isMatch) {
      userRest.maxAttempts = 3;
      await this.repository.save(userRest);
      return user;
    }

    userRest.maxAttempts =
      userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
    await this.repository.save(userRest);
    return null;
  }
}
