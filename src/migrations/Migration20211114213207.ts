import { Migration } from '@mikro-orm/migrations';

export class Migration20211114213207 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "disc" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "brand" varchar(255) not null, "category" varchar(255) not null, "speed" varchar(255) not null, "glide" varchar(255) not null, "turn" varchar(255) not null, "fade" varchar(255) not null, "stability" varchar(255) not null, "link" varchar(255) not null, "pic" varchar(255) null, "name_slug" varchar(255) not null default \'*\', "brand_slug" varchar(255) not null default \'*\', "category_slug" varchar(255) not null default \'*\', "stability_slug" varchar(255) not null default \'*\');');
    this.addSql('create index "disc_speed_index" on "disc" ("speed");');
    this.addSql('create index "disc_glide_index" on "disc" ("glide");');
    this.addSql('create index "disc_turn_index" on "disc" ("turn");');
    this.addSql('create index "disc_fade_index" on "disc" ("fade");');
    this.addSql('create index "disc_name_slug_index" on "disc" ("name_slug");');
    this.addSql('create index "disc_brand_slug_index" on "disc" ("brand_slug");');
    this.addSql('create index "disc_category_slug_index" on "disc" ("category_slug");');
    this.addSql('create index "disc_stability_slug_index" on "disc" ("stability_slug");');
  }

}
