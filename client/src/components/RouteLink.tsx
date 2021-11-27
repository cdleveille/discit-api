import React, { useLayoutEffect, useRef } from "react";

interface IRouteLinkProps {
	label: string,
	route: string,
	activeRoute: string,
	changeActiveRoute: (route: string) => void
}

export interface IRouteLinkPropsShort {
	label: string,
	route: string
}

export const RouteLink: React.FC<IRouteLinkProps> = ({label, route, activeRoute, changeActiveRoute}) => {
	const linkRef = useRef<HTMLAnchorElement>(null);

	useLayoutEffect(() => {
		if (linkRef.current) {
			linkRef.current.style.textDecoration = route === activeRoute ? "underline" : "none";
		}
	}, [route, activeRoute]);

	const onClick = (e: React.MouseEvent) => {
		e.preventDefault();
		changeActiveRoute(route);
	};

	return (
		<a href={route} ref={linkRef} onClick={e => onClick(e)}>{label}</a>
	);
};

export default RouteLink;
