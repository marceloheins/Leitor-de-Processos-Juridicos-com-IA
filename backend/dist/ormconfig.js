"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = require("./src/entities/User");
const Organization_1 = require("./src/entities/Organization");
const Process_1 = require("./src/entities/Process");
const Document_1 = require("./src/entities/Document");
const Report_1 = require("./src/entities/Report");
const Interaction_1 = require("./src/entities/Interaction");
const SubscriptionPlan_1 = require("./src/entities/SubscriptionPlan");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false, // true em dev, false em produção
    logging: false,
    entities: [User_1.User, Organization_1.Organization, Process_1.Process, Document_1.Document, Report_1.Report, Interaction_1.Interaction, SubscriptionPlan_1.SubscriptionPlan],
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: "migrations"
});
//# sourceMappingURL=ormconfig.js.map