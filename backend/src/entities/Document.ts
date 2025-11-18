import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,JoinColumn, ManyToOne } from 'typeorm';
import { Process } from './Process';

@Entity()
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id!: string;    

    @Column()
    fileUrl!: string;

    @Column()
    fileName!: string;
    
    @CreateDateColumn()
    uploadedAt!: Date;   

    @ManyToOne(() => Process, process => process.documents)
    @JoinColumn()
    process!: Process;

    
}