import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // For local development, bypass auth
    if (process.env.NODE_ENV === 'development') {
      request.user = { id: 'dev-user', email: 'dev@igad.org' };
      return true;
    }
    
    // TODO: Implement actual JWT validation for production
    return true;
  }
}
