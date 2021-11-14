export interface IDisc {
	name: string,
	brand: string,
	category: string,
	speed: string,
	glide: string,
	turn: string,
	fade: string,
	stability: string,
	link: string,
	pic: string,
	name_slug: string,
	brand_slug: string,
	category_slug: string,
	stability_slug: string
}

export interface IDiscUpsert {
	discsToInsert: IDisc[],
	discsToUpdate: IDisc[]
}