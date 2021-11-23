import React from "react";

import RouteLink, { IRouteLinkProps } from "./RouteLink";
import Spacer from "./Spacer";

export interface IRouteLinksProps {
	routeLinks: IRouteLinkProps[],
	changeActiveRoute: any
}

export const RouteLinks: React.FC<IRouteLinksProps> = ({routeLinks, changeActiveRoute}) => {
	let links = routeLinks.map((routeLink) => (
		<RouteLink key={routeLink.route} route={routeLink.route} label={routeLink.label} changeActiveRoute={changeActiveRoute} />
	))

	let spacedLinks: JSX.Element[] | React.FC = [];
	for (let i = 0; i < links.length; i++) {
		spacedLinks.push(links[i]);
		if (i <= links.length - 2) {
			spacedLinks.push(<Spacer key={i} />);
		}
	}

	return (
		<div className="item">
			{spacedLinks}
		</div>
	)
};

export default RouteLinks;