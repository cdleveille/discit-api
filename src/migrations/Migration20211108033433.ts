import { Migration } from '@mikro-orm/migrations';

export class Migration20211108033433 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "disc" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "brand" varchar(255) not null, "category" varchar(255) not null, "speed" int4 not null, "glide" int4 not null, "turn" int4 not null, "fade" int4 not null);');
    this.addSql('create index "disc_name_index" on "disc" ("name");');
    this.addSql('create index "disc_brand_index" on "disc" ("brand");');
    this.addSql('create index "disc_category_index" on "disc" ("category");');
    this.addSql('create index "disc_speed_index" on "disc" ("speed");');
    this.addSql('create index "disc_glide_index" on "disc" ("glide");');
    this.addSql('create index "disc_turn_index" on "disc" ("turn");');
    this.addSql('create index "disc_fade_index" on "disc" ("fade");');
  }

}
