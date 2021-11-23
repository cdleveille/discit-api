import { useState } from "react";

import "./styles.css";
import { ActiveRoute } from "./components/ActiveRoute";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Results } from "./components/Results";
import { IRouteLinkProps } from "./components/RouteLink";
import RouteLinks from "./components/RouteLinks";
import { request, slugify } from "./shared/helpers/util";
import { Routes } from "./shared/types/constants";

export const App: React.FC = () => {
	const [activeRoute, setActiveRoute] = useState(Routes.disc as string);
	const [activeRouteText, setActiveRouteText] = useState(Routes.disc as string);
	const [showResults, setShowResults] = useState(false);
	const [results, setResults] = useState("[]");
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [getHref, setGetHref] = useState(Routes.disc as string);
	const [resultsCountText, setResultsCountText] = useState("");

	const changeActiveRoute = (route: string) => {
		setActiveRoute(route);
		setActiveRouteText(route);
		setGetHref(route);
		setInputValue("");
		route === Routes.disc ? setInputDisabled(true) : setInputDisabled(false);
	};

	const onInputChange = (e: any) => {
		if (e.target.value) {
			const inputText = slugify(e.target.value);
			setInputValue(inputText);
			const newActiveRouteText = `${activeRoute}${activeRoute === `${Routes.disc}?` || !inputText ? "" : "/"}${inputText}`;
			setActiveRouteText(newActiveRouteText);
			setGetHref(newActiveRouteText);
		} else {
			setInputValue("");
			setActiveRouteText(activeRoute);
			setGetHref(activeRoute);
		}
	};

	const formSubmitted = async (e: Event) => {
		e.preventDefault();
		await fetchResults();
	};

	const fetchResults = async () => {
		let startTime: number = Date.now(), resTime: number;
		const headers = {
			"Content-Type": "application/json"
		};
		const method = "GET", route = activeRouteText;
		await request(method, route, headers, null).then(res => {
			if (res) {
				resTime = Date.now() - startTime;
				const resArray = res as any[];
				setResultsCountText(`${resArray.length} result${resArray.length === 1 ? "" : "s"} • ${resTime} ms`);
				const json = JSON.stringify(res, null, 2);
				setResults(json);
				setShowResults(true);
			} else throw Error("No response from server!");
		}).catch(err => console.error(err));
	};

	const routeLinkProps: IRouteLinkProps[] = [
		{ route: Routes.disc, label: "all" },
		{ route: `${Routes.disc}${Routes.name}`, label: "name" },
		{ route: `${Routes.disc}${Routes.brand}`, label: "brand" },
		{ route: `${Routes.disc}${Routes.category}`, label: "category" },
		{ route: `${Routes.disc}${Routes.speed}`, label: "speed" },
		{ route: `${Routes.disc}${Routes.glide}`, label: "glide" },
		{ route: `${Routes.disc}${Routes.turn}`, label: "turn" },
		{ route: `${Routes.disc}${Routes.fade}`, label: "fade" },
		{ route: `${Routes.disc}${Routes.stability}`, label: "stability" },
		{ route: `${Routes.disc}?`, label: "query" }
	];
	
	return (
		<div className="app">
			<Header />
			<RouteLinks routeLinks={routeLinkProps} changeActiveRoute={changeActiveRoute} />
			<ActiveRoute activeRoute={activeRouteText} />
			<Form formSubmitted={formSubmitted} inputDisabled={inputDisabled} onInputChange={onInputChange} inputValue={inputValue} getHref={getHref} />
			<Results body={results} visible={showResults} resultsCountText={resultsCountText} />
		</div>
	);
}

export default App;