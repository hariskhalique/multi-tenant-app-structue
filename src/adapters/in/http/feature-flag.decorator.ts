import { SetMetadata } from '@nestjs/common';

export const FeatureFlag = (featureName: string) =>
  SetMetadata('featureName', featureName);
