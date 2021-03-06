import React, { FormEvent, useState } from "react";

import { ActiveRoute } from "./components/ActiveRoute";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Results } from "./components/Results";
import RouteLinks from "./components/RouteLinks";
import { slugify } from "./shared/helpers/util";
import { routeLinks, Routes } from "./shared/types/constants";
import "./styles.css";

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

	const onFormSubmit = async () => {
		const startTime: number = Date.now();
		const res = await fetch(activeRouteText);
		const resTime = Date.now() - startTime;
		const json = await res.json();
		setResultsCountText(`${json.length} result${json.length === 1 ? "" : "s"} • ${resTime} ms`);
		setResultsText(JSON.stringify(json, null, 2));
		if (!showResults) setShowResults(true);
	};

	return (
		<div className="app">
			<Header />
			<RouteLinks
				routeLinks={routeLinks}
				activeRoute={activeRoute}
				changeActiveRoute={changeActiveRoute}
			/>
			<ActiveRoute
				activeRoute={activeRouteText}
			/>
			<Form
				activeRoute={activeRoute}
				onFormSubmit={onFormSubmit}
				inputDisabled={inputDisabled}
				onInputChange={onInputChange}
				inputValue={inputValue}
				buttonHref={buttonHref}
			/>
			<Results
				body={resultsText}
				visible={showResults}
				resultsCountText={resultsCountText}
			/>
		</div>
	);
};

export default App;
