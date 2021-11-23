import React from "react";

interface IRouteLinkPropsPrivate {
	route: string,
	label: string,
	changeActiveRoute: (route: string) => void
}

export interface IRouteLinkProps {
	route: string,
	label: string
}

export const RouteLink: React.FC<IRouteLinkPropsPrivate> = ({route, label, changeActiveRoute}) => {
	const onClick = (e: React.MouseEvent) => {
		e.preventDefault();
		changeActiveRoute(route);
	};

	return (
		<a href={route} onClick={e => onClick(e)}>{label}</a>
	);
};

export default RouteLink;