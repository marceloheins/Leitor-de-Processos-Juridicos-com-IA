import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Organization } from './Organization';

@Entity()
export class SubscriptionPlan {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column('int', {default: 50})
    maxDocuments!: number;

    @Column('int', {default: 10})
    maxAnalyses!: number;

    @Column('decimal', { precision: 10, scale: 2 , default: 0 })  
        price!: number;

    @Column({ nullable: true , type: 'timestamptz' })
    expiresAt!: Date | null;

    @ManyToOne(() => Organization, org => org.subscriptionPlans, { nullable: true})
    organization!: Organization;

    @CreateDateColumn()
    createdAt!: Date;
}