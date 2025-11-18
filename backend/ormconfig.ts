
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
import { User} from './src/entities/User';
import { Organization } from './src/entities/Organization';
import { Process } from './src/entities/Process';
import { Document } from './src/entities/Document';
import { Report } from './src/entities/Report';
import { Interaction } from './src/entities/Interaction';
import { SubscriptionPlan } from './src/entities/SubscriptionPlan';


export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false, // true em dev, false em produção
    logging: false,
    entities: [User, Organization, Process, Document, Report, Interaction, SubscriptionPlan],
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: "migrations"
});
