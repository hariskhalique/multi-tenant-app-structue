import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Addresses } from './address.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @OneToMany(() => Addresses, (address) => address.customer, { cascade: true })
  addresses: Addresses[];
}
