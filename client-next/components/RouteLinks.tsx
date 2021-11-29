import React from "react";

import RouteLink, { IRouteLinkPropsShort } from "./RouteLink";
import Spacer from "./Spacer";

export interface IRouteLinksProps {
	routeLinks: IRouteLinkPropsShort[],
	activeRoute: string,
	changeActiveRoute: (route: string) => void
}

export const RouteLinks: React.FC<IRouteLinksProps> = ({routeLinks, activeRoute, changeActiveRoute}) => {
	const links = routeLinks.map((routeLink) => (
		<RouteLink
			key={routeLink.route}
			label={routeLink.label}
			route={routeLink.route}
			activeRoute={activeRoute}
			changeActiveRoute={changeActiveRoute}
		/>
	));

	const spacedLinks: JSX.Element[] | React.FC = [];
	for (let i = 0; i < links.length; i++) {
		spacedLinks.push(links[i]);
		if (i <= links.length - 2) {
			spacedLinks.push(<Spacer key={i} />);
		}
	}

	return (<div className="item">{spacedLinks}</div>);
};

export default RouteLinks;
