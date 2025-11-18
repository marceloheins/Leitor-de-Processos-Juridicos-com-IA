"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixProcessOrganizationRelation1760831103963 = void 0;
class FixProcessOrganizationRelation1760831103963 {
    constructor() {
        this.name = 'FixProcessOrganizationRelation1760831103963';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "process" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_91eff5b58e36acdbca7c57026d2" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_91eff5b58e36acdbca7c57026d2"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "organizationId"`);
    }
}
exports.FixProcessOrganizationRelation1760831103963 = FixProcessOrganizationRelation1760831103963;
//# sourceMappingURL=1760831103963-FixProcessOrganizationRelation.js.map