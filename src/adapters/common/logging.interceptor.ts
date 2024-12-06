import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    console.log(`Request to ${method} ${url} started...`);
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `Request to ${method} ${url} completed in ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
