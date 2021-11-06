import {MigrationInterface, QueryRunner} from "typeorm";

export class init1636194744939 implements MigrationInterface {
    name = 'init1636194744939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Disc" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "brand" character varying NOT NULL, "category" character varying NOT NULL, "speed" integer NOT NULL, "glide" integer NOT NULL, "turn" integer NOT NULL, "fade" integer NOT NULL, CONSTRAINT "PK_40b8f5024a2e7100fab3ea91f85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_46c17d87cb24ea7baab96688a0" ON "Disc" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_397f9135aaa1c3a57119f80d41" ON "Disc" ("brand") `);
        await queryRunner.query(`CREATE INDEX "IDX_84c24bd6857686f0d978f036ba" ON "Disc" ("category") `);
        await queryRunner.query(`CREATE INDEX "IDX_7084509c583a78495d60ed8bf3" ON "Disc" ("speed") `);
        await queryRunner.query(`CREATE INDEX "IDX_41132fffb6a21837d82001a830" ON "Disc" ("glide") `);
        await queryRunner.query(`CREATE INDEX "IDX_3cbf6dda8d498e56a3e9acb7ac" ON "Disc" ("turn") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce5e05089e9c5945fadc4092cc" ON "Disc" ("fade") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ce5e05089e9c5945fadc4092cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cbf6dda8d498e56a3e9acb7ac"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41132fffb6a21837d82001a830"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7084509c583a78495d60ed8bf3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84c24bd6857686f0d978f036ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_397f9135aaa1c3a57119f80d41"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_46c17d87cb24ea7baab96688a0"`);
        await queryRunner.query(`DROP TABLE "Disc"`);
    }

}
