import { useState } from "react";

import "./styles.css";
import { ActiveRoute } from "./components/ActiveRoute";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Results } from "./components/Results";
import { IRouteLinkProps } from "./components/RouteLink";
import RouteLinks from "./components/RouteLinks";

export const App: React.FC = () => {
	const [activeRoute, setActiveRoute] = useState("/disc");
	const [activeRouteText, setActiveRouteText] = useState("/disc");
	const [showResults, setShowResults] = useState(false);
	const [results, setResults] = useState("[]");
	const [inputDisabled, setInputDisabled] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [getHref, setGetHref] = useState("/disc");
	const [resultsCountText, setResultsCountText] = useState("");

	const changeActiveRoute = (route: string) => {
		setActiveRoute(route);
		setActiveRouteText(route);
		setGetHref(route);
		setInputValue("");
		route === "/disc" ? setInputDisabled(true) : setInputDisabled(false);
	};

	const onInputChange = (e: any) => {
		if (e.target.value) {
			const inputText = slugify(e.target.value);
			setInputValue(inputText);
			const newActiveRouteText = `${activeRoute}${activeRoute === "/disc?" || !inputText ? "" : "/"}${inputText}`;
			setActiveRouteText(newActiveRouteText);
			setGetHref(newActiveRouteText);
		} else {
			setInputValue("");
			setActiveRouteText(activeRoute);
			setGetHref(activeRoute);
		}
	};

	const slugify = (text: string): string => {
		let slug = text.toLowerCase()
			.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "")
			.replace(/[ ]/g, "-");
		return slug;
	};

	const formSubmitted = async (e: Event) => {
		e.preventDefault();
		await getResults();
	};

	const getResults = async () => {
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

	const request = (method: string, uri: string, headers: any, body: any): Promise<any> => {
		return new Promise((resolve, reject) => {
			fetch(uri, { method, headers, body }
			).then(r => r.json()).then(data => {
				return resolve(data);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	const routeLinks: IRouteLinkProps[]  = [
		{ route: "/disc", label: "all", changeActiveRoute },
		{ route: "/disc/name", label: "name", changeActiveRoute },
		{ route: "/disc/brand", label: "brand", changeActiveRoute },
		{ route: "/disc/category", label: "category", changeActiveRoute },
		{ route: "/disc/speed", label: "speed", changeActiveRoute },
		{ route: "/disc/glide", label: "glide", changeActiveRoute },
		{ route: "/disc/turn", label: "turn", changeActiveRoute },
		{ route: "/disc/fade", label: "fade", changeActiveRoute },
		{ route: "/disc/stability", label: "stability", changeActiveRoute },
		{ route: "/disc?", label: "query", changeActiveRoute }
	];

	return (
		<div className="app">
			<Header />
			<RouteLinks routeLinks={routeLinks} />
			<ActiveRoute activeRoute={activeRouteText} />
			<Form formSubmitted={formSubmitted} inputDisabled={inputDisabled} onInputChange={onInputChange} inputValue={inputValue} getHref={getHref} />
			<Results body={results} visible={showResults} resultsCountText={resultsCountText} />
		</div>
	);
}

export default App;