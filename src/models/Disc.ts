import { Entity, Property, Index } from "@mikro-orm/core";

import { Base } from "./Base";

@Entity()
export class Disc extends Base {

	constructor(disc?: Partial<Disc>) {
		super();
		Object.assign(this, disc);
	}

	@Property()
	name: string;

	@Property()
	brand: string;

	@Property()
	category: string;

	@Index()
	@Property()
	speed: string;

	@Index()
	@Property()
	glide: string;

	@Index()
	@Property()
	turn: string;

	@Index()
	@Property()
	fade: string;

	@Property()
	stability: string;

	@Property()
	link: string;

	@Property({ nullable: true })
	pic: string;

	@Index()
	@Property({ default: "*" })
	name_slug: string;

	@Index()
	@Property({ default: "*" })
	brand_slug: string;

	@Index()
	@Property({ default: "*" })
	category_slug: string;

	@Index()
	@Property({ default: "*" })
	stability_slug: string;
}
