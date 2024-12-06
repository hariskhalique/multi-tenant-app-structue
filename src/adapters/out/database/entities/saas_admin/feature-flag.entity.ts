import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenants } from './tenant.entity';

@Entity({ name: 'feature_flag' })
export class FeatureFlags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false, name: 'is_enabled' })
  isEnabled: boolean;

  @ManyToOne(() => Tenants, (tenant) => tenant.featureFlags)
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenants;
}
