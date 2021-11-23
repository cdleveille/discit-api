export interface IRouteLinkProps {
	route: string,
	label: string,
	changeActiveRoute: any
}

export const RouteLink: React.FC<IRouteLinkProps> = ({route, label, changeActiveRoute}) => {
	const onClick = (e: React.MouseEvent) => {
		e.preventDefault();
		changeActiveRoute(route);
	};

	return (
		<a href={route} onClick={e => onClick(e)}>{label}</a>
	)
}

export default RouteLink;