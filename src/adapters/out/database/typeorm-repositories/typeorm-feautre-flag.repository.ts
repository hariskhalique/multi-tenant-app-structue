import { Inject, Injectable } from '@nestjs/common';
import { FeatureFlagRepository } from 'src/domain/repositories/saas_admin/feature-flag.repository.interface';
import { FeatureFlags } from '../entities/saas_admin/feature-flag.entity';
import { DataSource } from 'typeorm';
import { toFeatureFlagModel } from '../mappers/feature-flags.mapper';
import { FeatureFlag } from 'src/domain/models/saas_admin/feature-flag.model';

@Injectable()
export class TypeORMFeatureFlagRepository implements FeatureFlagRepository {
  constructor(
    @Inject('SAAS_ADMIN_DATASOURCE')
    private readonly adminDataSource: DataSource,
  ) {}

  async findByName(name: string): Promise<FeatureFlag | null> {
    const featureFlag = await this.adminDataSource
      .getRepository(FeatureFlags)
      .findOne({
        where: {
          name,
        },
      });

    return featureFlag ? toFeatureFlagModel(featureFlag) : null;
  }
  async find(): Promise<FeatureFlag[] | null> {
    const featureFlags = await this.adminDataSource
      .getRepository(FeatureFlags)
      .find();

    return featureFlags ? featureFlags.map(toFeatureFlagModel) : null;
  }
}
