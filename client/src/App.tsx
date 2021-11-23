import React, { FormEvent, useState } from "react";

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
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [buttonHref, setButtonHref] = useState(Routes.disc as string);
	const [showResults, setShowResults] = useState(false);
	const [resultsText, setResultsText] = useState("[]");
	const [resultsCountText, setResultsCountText] = useState("");

	const changeActiveRoute = (route: string) => {
		setActiveRoute(route);
		setActiveRouteText(route);
		setButtonHref(route);
		setInputValue("");
		route === Routes.disc ? setInputDisabled(true) : setInputDisabled(false);
	};

	const onInputChange = (e: FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.value) {
			const inputText = slugify(e.currentTarget.value);
			setInputValue(inputText);
			const newActiveRouteText = `${activeRoute}${activeRoute === `${Routes.disc}?` || !inputText ? "" : "/"}${inputText}`;
			setActiveRouteText(newActiveRouteText);
			setButtonHref(newActiveRouteText);
		} else {
			setInputValue("");
			setActiveRouteText(activeRoute);
			setButtonHref(activeRoute);
		}
	};

	const formSubmitted = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetchResults();
	};

	const fetchResults = async () => {
		const startTime: number = Date.now();
		const headers = {
			"Content-Type": "application/json"
		};
		const method = "GET", route = activeRouteText;
		await request(method, route, headers, null).then(res => {
			if (res) {
				const resTime = Date.now() - startTime;
				const resArray = res as unknown as unknown[];
				setResultsCountText(`${resArray.length} result${resArray.length === 1 ? "" : "s"} • ${resTime} ms`);
				setResultsText(JSON.stringify(res, null, 2));
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
			<Form formSubmitted={formSubmitted} inputDisabled={inputDisabled} onInputChange={onInputChange} inputValue={inputValue} buttonHref={buttonHref} />
			<Results body={resultsText} visible={showResults} resultsCountText={resultsCountText} />
		</div>
	);
};

export default App;