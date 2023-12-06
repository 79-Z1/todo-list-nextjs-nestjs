import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelation1701664333137 implements MigrationInterface {
    name = 'UpdateRelation1701664333137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_9322094bc5715ebfeb1d0cb2aa4"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_4583be7753873b4ead956f040e3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_4583be7753873b4ead956f040e3"`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "userIdId" integer`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_9322094bc5715ebfeb1d0cb2aa4" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
