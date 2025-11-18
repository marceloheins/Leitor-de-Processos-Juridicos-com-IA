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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const Process_1 = require("./Process");
const Interaction_1 = require("./Interaction");
const Organization_1 = require("./Organization");
let Report = class Report {
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Report.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Process_1.Process, process => process.report),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Process_1.Process)
], Report.prototype, "process", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Interaction_1.Interaction, i => i.report),
    __metadata("design:type", Array)
], Report.prototype, "interactions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, { nullable: true }),
    __metadata("design:type", Organization_1.Organization)
], Report.prototype, "organization", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)()
], Report);
//# sourceMappingURL=Report.js.map