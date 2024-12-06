import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FeatureFlagService } from 'src/domain/services/saas_admin/feature-flag.service';

@Injectable()
export class FeatureFlagInterceptor<T> implements NestInterceptor {
  constructor(
    private readonly featureService: FeatureFlagService,
    private readonly reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<T>> {
    const featureName = this.reflector.get<string>(
      'featureName',
      context.getHandler(),
    );

    if (!featureName) {
      throw new HttpException(
        'Feature name is not defined',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const feature_flag =
      await this.featureService.isFeatureEnabled(featureName);

    // Check if the feature is enabled
    if (!feature_flag) {
      throw new HttpException(
        `Feature "${featureName}" is disabled`,
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
