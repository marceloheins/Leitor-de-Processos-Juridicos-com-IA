import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne} from 'typeorm';
import { Process } from './Process';
import { Organization } from './Organization';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;  

    @Column({ unique: true })
    email!: string;     

    @Column()
    password!: string; 

    @Column({default: 'user'})
    role!: 'user' | 'admin';

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => Organization, org => org.users, { nullable: true})
    organization?: Organization;

    @OneToMany(() => Process, process => process.user)
    processes!: Process[];

    get isAdmin(): boolean {
        return this.role === 'admin';
    }

}