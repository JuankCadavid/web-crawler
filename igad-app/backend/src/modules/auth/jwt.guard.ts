import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // For local development, bypass auth
    if (process.env.NODE_ENV === 'development') {
      request.user = { 
        id: 'dev-user', 
        email: 'dev@igad.org',
        groups: ['ADMIN'] // Default to ADMIN for development
      };
      return true;
    }
    
    // Extract JWT claims from API Gateway event
    const event = request.event || request;
    const claims = event?.requestContext?.authorizer?.jwt?.claims;
    
    if (!claims) {
      throw new ForbiddenException('No authentication token provided');
    }
    
    // Set user context from JWT claims
    request.user = {
      id: claims.sub,
      username: claims['cognito:username'],
      email: claims.email,
      groups: claims['cognito:groups'] || [],
    };
    
    return true;
  }
}

@Injectable()
export class JwtRoleGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // For local development, bypass role check
    if (process.env.NODE_ENV === 'development') {
      return true;
    }
    
    // Extract user from request (set by JwtAuthGuard)
    const user = request.user;
    
    if (!user || !user.groups) {
      throw new ForbiddenException('User not authenticated');
    }
    
    // Check if user has any of the required roles
    const hasRole = this.requiredRoles.some(role => user.groups.includes(role));
    
    if (!hasRole) {
      throw new ForbiddenException(`Access denied. Required roles: ${this.requiredRoles.join(', ')}`);
    }
    
    return true;
  }
}
