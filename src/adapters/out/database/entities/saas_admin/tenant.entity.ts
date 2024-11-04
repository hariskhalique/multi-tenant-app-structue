import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'saas_admin', name: 'tenants' })
export class Tenants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_name: string; // Unique identifier for each tenant

  @Column()
  schema: string; // Schema associated with this tenant
}
