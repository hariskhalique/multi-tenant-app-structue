import { FeatureFlag } from 'src/domain/models/saas_admin/feature-flag.model';

export interface FeatureFlagRepository {
  findByName(name: string): Promise<FeatureFlag | null>;
  find(): Promise<FeatureFlag[] | null>;
}
