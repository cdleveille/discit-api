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
	speed: number;

	@Index()
	@Property()
	glide: number;

	@Index()
	@Property()
	turn: number;

	@Index()
	@Property()
	fade: number;
}
