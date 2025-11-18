import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Document } from './Document';
import { Report } from './Report';
import { Organization } from './Organization';

@Entity()
export class Process {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column()
    title!: string;

    @Column()
    status!: string;

    @CreateDateColumn()
    createdAt!: Date;   

    @ManyToOne(() => User, user => user.processes)
    user!: User;

    @ManyToOne(() => Organization, org => org.processes, { nullable: true})
    organization?: Organization;

    @OneToMany(() => Document, doc => doc.process)
    documents!: Document[];

    @OneToOne(() => Report, report => report.process, { nullable: true })
    report!: Report | null;


}