import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    // Optional fields can be added as required by your application
    // For example:
    // @Column({ type: 'varchar', nullable: true })
    // phoneNumber?: string;
}