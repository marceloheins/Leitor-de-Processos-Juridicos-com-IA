import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Process } from './Process';
import { SubscriptionPlan } from './SubscriptionPlan';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;   

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => User, user => user.organization)
    users!: User[];

    @OneToMany(() => Process, process => process.organization)
    processes!: Process[];

    @OneToMany(() => SubscriptionPlan, plan => plan.organization)
    subscriptionPlans!: SubscriptionPlan[];
}