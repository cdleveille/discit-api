import { Entity, Property, Index } from "@mikro-orm/core";

import { Base } from "./Base";

@Entity()
export class Disc extends Base {

	constructor(disc?: Partial<Disc>) {
		super();
		Object.assign(this, disc);
	}

	@Index()
	@Property()
	name: string;

	@Index()
	@Property()
	brand: string;

	@Index()
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

	@Index()
	@Property({ nullable: true })
	stability: string;

	@Property({ nullable: true })
	link: string;

	@Property({ nullable: true })
	pic: string;
}