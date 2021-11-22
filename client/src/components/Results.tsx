interface IResultsProps {
	body: string,
	visible: boolean,
	resultsCountText: string
}

export const Results: React.FC<IResultsProps> = ({body, visible, resultsCountText}) => {

	return (
		<>
			<div id="results" className="item" style={{ visibility: visible ? "visible" : "hidden" }}>
				{body}
			</div>
			<div id="results-count" className="item">{resultsCountText}</div>
		</>
	);
}

export default Results;