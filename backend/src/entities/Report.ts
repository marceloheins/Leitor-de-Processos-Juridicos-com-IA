import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Process } from './Process';
import { Interaction } from './Interaction';
import { Organization } from './Organization';

@Entity()
export class Report {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;  
    
    

   @OneToOne(() => Process, proc => proc.report)
    @JoinColumn()
    process!: Process;

    @OneToMany(() => Interaction, i =>i.report)
    interactions!: Interaction[];

    @ManyToOne(() => Organization,{ nullable: true})
    organization?: Organization;
}