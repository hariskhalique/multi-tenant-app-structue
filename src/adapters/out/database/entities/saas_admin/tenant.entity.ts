import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FeatureFlags } from './feature-flag.entity';

@Entity({ schema: 'saas_admin', name: 'tenants' })
export class Tenants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_name: string; // Unique identifier for each tenant

  @Column()
  schema: string; // Schema associated with this tenant

  @OneToMany(() => FeatureFlags, (featureFlag) => featureFlag.tenant, {
    cascade: true,
  })
  featureFlags: FeatureFlags;
}
