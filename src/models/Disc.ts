import { Index, Entity, Column } from "typeorm";

import Base from "./Base";

@Entity("Disc")
export class Disc extends Base {

	@Index()
	@Column()
	name: string;

	@Index()
	@Column()
	brand: string;

	@Index()
	@Column()
	category: string;

	@Index()
	@Column()
	speed: number;

	@Index()
	@Column()
	glide: number;

	@Index()
	@Column()
	turn: number;

	@Index()
	@Column()
	fade: number;
}
