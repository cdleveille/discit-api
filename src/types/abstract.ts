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
	pic: string
}

export interface IDiscUpsert {
	discsToInsert: IDisc[],
	discsToUpdate: IDisc[]
}