import { CSSProperties, useEffect, useRef, useState } from "react";

interface IResultsProps {
	body: string,
	visible: boolean,
	resultsCountText: string
}

export const Results: React.FC<IResultsProps> = ({body, visible, resultsCountText}) => {
	const ref = useRef<HTMLDivElement>(null);

	const [winDimensions, setWinDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	});

	useEffect(() => {
		window.addEventListener("resize", updateWinDimensions);
		return () => window.removeEventListener("resize", updateWinDimensions);
	});

	const updateWinDimensions = () => {
		setWinDimensions({
			width: window.innerWidth,
			height: window.innerHeight
		})
	};

	const styles: CSSProperties = {
		visibility: visible ? "visible" : "hidden",
		width: `${Math.min(600, 0.98 * winDimensions.width)}px`,
		height: `${winDimensions.height - (ref.current ? ref.current.offsetTop : 0) - 48}px`
	};

	const results = (
		<div id="results" className="item" style={styles} ref={ref}>
			{body}
		</div>
	);

	const resultsCount = (
		<div id="results-count" className="item">{resultsCountText}</div>
	);

	return (<>{results}{resultsCount}</>);
}

export default Results;