"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Process = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Document_1 = require("./Document");
const Report_1 = require("./Report");
const Organization_1 = require("./Organization");
let Process = class Process {
};
exports.Process = Process;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Process.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Process.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Process.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Process.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.processes),
    __metadata("design:type", User_1.User)
], Process.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, org => org.processes, { nullable: true }),
    __metadata("design:type", Organization_1.Organization)
], Process.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Document_1.Document, doc => doc.process),
    __metadata("design:type", Array)
], Process.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Report_1.Report, report => report.process, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Process.prototype, "report", void 0);
exports.Process = Process = __decorate([
    (0, typeorm_1.Entity)()
], Process);
//# sourceMappingURL=Process.js.map