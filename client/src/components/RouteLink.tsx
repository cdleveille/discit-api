import React, { useEffect, useRef } from "react";

interface IRouteLinkPropsPrivate {
	label: string,
	route: string,
	activeRoute: string,
	changeActiveRoute: (route: string) => void
}

export interface IRouteLinkProps {
	label: string,
	route: string
}

export const RouteLink: React.FC<IRouteLinkPropsPrivate> = ({label, route, activeRoute, changeActiveRoute}) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (linkRef.current) {
			linkRef.current.style.textDecoration = route === activeRoute ? "underline" : "none";
		}
	});

	const onClick = (e: React.MouseEvent) => {
		e.preventDefault();
		changeActiveRoute(route);
	};

	return (
		<a href={route} ref={linkRef} onClick={e => onClick(e)}>{label}</a>
	);
};

export default RouteLink;