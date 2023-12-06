import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusColumn1701740980780 implements MigrationInterface {
    name = 'AddStatusColumn1701740980780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD "status" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "status"`);
    }

}
