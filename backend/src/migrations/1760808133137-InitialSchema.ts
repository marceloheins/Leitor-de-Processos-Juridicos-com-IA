import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1760808133137 implements MigrationInterface {
    name = 'InitialSchema1760808133137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileUrl" character varying NOT NULL, "fileName" character varying NOT NULL, "uploadedAt" TIMESTAMP NOT NULL DEFAULT now(), "processId" uuid, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" text NOT NULL, "answer" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "reportId" uuid, CONSTRAINT "PK_9204371ccb2c9dab5428b406413" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription_plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "maxDocuments" integer NOT NULL DEFAULT '50', "maxAnalyses" integer NOT NULL DEFAULT '10', "price" numeric(10,2) NOT NULL DEFAULT '0', "expiresAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" uuid, CONSTRAINT "PK_5fde988e5d9b9a522d70ebec27c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "processId" uuid, "organizationId" uuid, CONSTRAINT "REL_83d6336965e03ceafb1fa664f8" UNIQUE ("processId"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "process" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "reportId" uuid, CONSTRAINT "REL_b78354955e01f84b71284716ed" UNIQUE ("reportId"), CONSTRAINT "PK_d5e3ab0f6df55ee74ca24967952" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_d8451d51a61c6323302d39ccb7a" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interaction" ADD CONSTRAINT "FK_671064a945c9d817a3e48e535b1" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_plan" ADD CONSTRAINT "FK_d50b88356f1f9373911b97975b5" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_83d6336965e03ceafb1fa664f87" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_a2e51152c9bc8637a231b40b0fc" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "process" ADD CONSTRAINT "FK_b78354955e01f84b71284716ed7" FOREIGN KEY ("reportId") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_b78354955e01f84b71284716ed7"`);
        await queryRunner.query(`ALTER TABLE "process" DROP CONSTRAINT "FK_69375d00ef5f4a91a156f5a7124"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_a2e51152c9bc8637a231b40b0fc"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_83d6336965e03ceafb1fa664f87"`);
        await queryRunner.query(`ALTER TABLE "subscription_plan" DROP CONSTRAINT "FK_d50b88356f1f9373911b97975b5"`);
        await queryRunner.query(`ALTER TABLE "interaction" DROP CONSTRAINT "FK_671064a945c9d817a3e48e535b1"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_d8451d51a61c6323302d39ccb7a"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "process"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "subscription_plan"`);
        await queryRunner.query(`DROP TABLE "interaction"`);
        await queryRunner.query(`DROP TABLE "document"`);
    }

}
