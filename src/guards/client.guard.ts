import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class ClientGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      throw new UnauthorizedException('Unauthorized admin');
    }

    const bearer = authHeaders.split(' ')[0];
    const token = authHeaders.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized admin');
    }

    async function verify(token: string, jwtService: JwtService) {
      let payload: any;
      try {
        payload = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        
      } catch (error) {
        payload = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_ADMIN_KEY,
        });
      }
      console.log(payload);
      
      if (!payload) {
        throw new UnauthorizedException('Unauthorized client');
      }
      if (!payload.is_active) {
        throw new ForbiddenException('Ruxsat etilmagan client');
      }

      req.client = payload;
      return true;
    }

    return verify(token, this.jwtService);
  }
}
