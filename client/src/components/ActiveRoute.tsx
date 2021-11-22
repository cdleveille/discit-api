interface IActiveRouteProps {
	activeRoute: string
}

export const ActiveRoute: React.FC<IActiveRouteProps> = ({activeRoute}) => {

	return (
		<div className="item active-route">
			<a href={activeRoute} target="_blank" rel="noreferrer">{activeRoute}</a>
		</div>
	)
}

export default ActiveRoute