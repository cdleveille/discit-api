import { Migration } from '@mikro-orm/migrations';

export class Migration20211113044726 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "disc" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "brand" varchar(255) not null, "category" varchar(255) not null, "speed" varchar(255) not null, "glide" varchar(255) not null, "turn" varchar(255) not null, "fade" varchar(255) not null, "stability" varchar(255) null, "link" varchar(255) null, "pic" varchar(255) null, "slug" varchar(255) not null default \'*\');');
    this.addSql('create index "disc_name_index" on "disc" ("name");');
    this.addSql('create index "disc_brand_index" on "disc" ("brand");');
    this.addSql('create index "disc_category_index" on "disc" ("category");');
    this.addSql('create index "disc_speed_index" on "disc" ("speed");');
    this.addSql('create index "disc_glide_index" on "disc" ("glide");');
    this.addSql('create index "disc_turn_index" on "disc" ("turn");');
    this.addSql('create index "disc_fade_index" on "disc" ("fade");');
    this.addSql('create index "disc_stability_index" on "disc" ("stability");');
    this.addSql('create index "disc_slug_index" on "disc" ("slug");');
  }

}
