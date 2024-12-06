import { Inject, Injectable } from '@nestjs/common';
import { FeatureFlagRepository } from 'src/domain/repositories/saas_admin/feature-flag.repository.interface';

@Injectable()
export class FeatureFlagService {
  constructor(
    @Inject('FeatureFlagRepository')
    private readonly featureFlagRepo: FeatureFlagRepository,
  ) {}

  async isFeatureEnabled(featureName: string): Promise<boolean> {
    const featureFlag = await this.featureFlagRepo.findByName(featureName);
    return featureFlag?.isEnable;
  }
}
