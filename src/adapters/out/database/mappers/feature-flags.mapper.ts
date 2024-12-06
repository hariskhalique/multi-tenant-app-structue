import { FeatureFlag } from 'src/domain/models/saas_admin/feature-flag.model';
import { FeatureFlags } from '../entities/saas_admin/feature-flag.entity';

export function toFeatureFlagModel(featureFlag: FeatureFlags): FeatureFlag {
  return new FeatureFlag(
    featureFlag.id,
    featureFlag.name,
    featureFlag.isEnabled,
  );
}
