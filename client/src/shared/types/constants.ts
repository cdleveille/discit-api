/* eslint-disable no-unused-vars */
import { IRouteLinkPropsShort } from "../../components/RouteLink";

export enum Routes {
	root = "/",
	disc = "/disc",
	name = "/name",
	brand = "/brand",
	category = "/category",
	speed = "/speed",
	glide = "/glide",
	turn = "/turn",
	fade = "/fade",
	stability = "/stability",
}

export const routeLinks: IRouteLinkPropsShort[] = [
	{ label: "all", route: Routes.disc },
	{ label: "name", route: `${Routes.disc}${Routes.name}` },
	{ label: "brand", route: `${Routes.disc}${Routes.brand}` },
	{ label: "category", route: `${Routes.disc}${Routes.category}` },
	{ label: "speed", route: `${Routes.disc}${Routes.speed}` },
	{ label: "glide", route: `${Routes.disc}${Routes.glide}` },
	{ label: "turn", route: `${Routes.disc}${Routes.turn}` },
	{ label: "fade", route: `${Routes.disc}${Routes.fade}` },
	{ label: "stability", route: `${Routes.disc}${Routes.stability}` },
	{ label: "query", route: `${Routes.disc}?` }
];