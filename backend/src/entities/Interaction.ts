import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from './Report'; 


@Entity()
export class Interaction {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text') 
    question!: string;

    @Column('text')
    answer!: string;

    @CreateDateColumn()
    createdAt!: Date;   

    @ManyToOne(() => Report, report => report.interactions)
    @JoinColumn()
    report!: Report;


}