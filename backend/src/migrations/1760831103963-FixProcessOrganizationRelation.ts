import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProcessOrganizationRelation1760831103963 implements MigrationInterface {
    name = 'FixProcessOrganizationRelation1760831103963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_91eff5b58e36acdbca7c57026d2" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_91eff5b58e36acdbca7c57026d2"`);
        await queryRunner.query(`ALTER TABLE "process" DROP COLUMN "organizationId"`);
    }

}
