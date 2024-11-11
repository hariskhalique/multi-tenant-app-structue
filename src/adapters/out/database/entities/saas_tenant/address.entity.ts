import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.addresses)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}
