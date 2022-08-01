import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@auth/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.login(username, password);

    if (!user) {
      throw new UnauthorizedException(
        'Usuario y/o clave incorrecto',
        'Acceso Denegado',
      );
    }

    return user;
  }
}
