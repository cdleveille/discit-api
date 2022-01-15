import { Migration } from '@mikro-orm/migrations';

export class Migration20220115205449 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "disc" add column "color" varchar(255) not null default \'#\', add column "background_color" varchar(255) not null default \'#\';');
  }

}
