/* eslint-disable no-undef */

const searchBox = document.getElementById("search-box") as HTMLInputElement;
const getLink = document.getElementById("get-link") as HTMLLinkElement;
const getBtn = document.getElementById("get-btn") as HTMLButtonElement;
const getForm = document.getElementById("get-form") as HTMLFormElement;

const results = document.getElementById("results") as HTMLDivElement;
const resultsCount = document.getElementById("results-count") as HTMLDivElement;
const routeActive = document.getElementById("route-active") as HTMLLinkElement;
let routeText = routeActive.innerHTML as string;

const allLink = document.getElementById("all-link") as HTMLLinkElement;
const nameLink = document.getElementById("name-link") as HTMLLinkElement;
const brandLink = document.getElementById("brand-link") as HTMLLinkElement;
const categoryLink = document.getElementById("category-link") as HTMLLinkElement;
const speedLink = document.getElementById("speed-link") as HTMLLinkElement;
const glideLink = document.getElementById("glide-link") as HTMLLinkElement;
const turnLink = document.getElementById("turn-link") as HTMLLinkElement;
const fadeLink = document.getElementById("fade-link") as HTMLLinkElement;
const stabilityLink = document.getElementById("stability-link") as HTMLLinkElement;
const queryLink = document.getElementById("query-link") as HTMLLinkElement;

allLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc");
	underlineLink(allLink);
	getBtn.focus();
};

nameLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/name");
	underlineLink(nameLink);
};

brandLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/brand");
	underlineLink(brandLink);
};

categoryLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/category");
	underlineLink(categoryLink);
};

speedLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/speed");
	underlineLink(speedLink);
};

glideLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/glide");
	underlineLink(glideLink);
};

turnLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/turn");
	underlineLink(turnLink);
};

fadeLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/fade");
	underlineLink(fadeLink);
};

stabilityLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/stability");
	searchBox.disabled = false;
	underlineLink(stabilityLink);
};

queryLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc?");
	searchBox.disabled = false;
	underlineLink(queryLink);
};

const changeRoute = (newRouteText: string) => {
	routeText = newRouteText;
	routeActive.innerHTML = newRouteText;
	routeActive.href = newRouteText;
	getLink.href = newRouteText;
	searchBox.value = "";

	if (routeText === "/disc") {
		searchBox.disabled = true;
	} else {
		searchBox.disabled = false;
		searchBox.focus();
	}
};

searchBox.oninput = () => {
	if (searchBox.value) {
		const inputText = slugify(searchBox.value);
		routeActive.innerHTML = `${routeText}${routeText === "/disc?" || !inputText ? "" : "/"}${inputText}`;
		routeActive.href = routeActive.innerHTML;
		getLink.href = routeActive.innerHTML;
	} else routeActive.innerHTML = routeText;

	setSearchBoxWidth();
};

const slugify = (text: string): string => {
	let slug = text.toLowerCase()
		.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "")
		.replace(/[ ]/g, "-");
	return slug;
};

let ghostInput = document.createElement("div");
const setUpGhostInput = () => {
	ghostInput.style.position = "absolute";
	ghostInput.style.top = "0";
	ghostInput.style.left = "-9999px";
	ghostInput.style.overflow = "hidden";
	ghostInput.style.visibility = "hidden";
	ghostInput.style.whiteSpace = "nowrap";
	ghostInput.style.height = "0";

	const styles = window.getComputedStyle(searchBox);

	ghostInput.style.fontFamily = styles.fontFamily;
	ghostInput.style.fontSize = styles.fontSize;
	ghostInput.style.fontStyle = styles.fontStyle;
	ghostInput.style.fontWeight = styles.fontWeight;
	ghostInput.style.letterSpacing = styles.letterSpacing;
	ghostInput.style.textTransform = styles.textTransform;

	ghostInput.style.borderLeftWidth = styles.borderLeftWidth;
	ghostInput.style.borderRightWidth = styles.borderRightWidth;
	ghostInput.style.paddingLeft = styles.paddingLeft;
	ghostInput.style.paddingRight = styles.paddingRight;

	document.body.appendChild(ghostInput);
};

const setSearchBoxWidth = () => {
	const text = searchBox.value || searchBox.getAttribute("placeholder") || "";
	ghostInput.innerHTML = text.replace(/\s/g, "&" + "nbsp;");

	const ghostInputStyles = window.getComputedStyle(ghostInput);
	searchBox.style.width = ghostInputStyles.width;
};

const underlineLink = (link: HTMLLinkElement) => {
	allLink.style.textDecoration = "none";
	nameLink.style.textDecoration = "none";
	brandLink.style.textDecoration = "none";
	categoryLink.style.textDecoration = "none";
	speedLink.style.textDecoration = "none";
	glideLink.style.textDecoration = "none";
	turnLink.style.textDecoration = "none";
	fadeLink.style.textDecoration = "none";
	stabilityLink.style.textDecoration = "none";
	queryLink.style.textDecoration = "none";
	link.style.textDecoration = "underline";
};

let start: number, resTime: number;
getForm.addEventListener("submit", (e) => {
	start = Date.now();
	e.preventDefault();
	const headers = {
		"Content-Type": "application/json"
	};
	const method = "GET", route = routeActive.innerHTML;
	request(method, route, headers, null).then(res => {
		resTime = Date.now() - start;
		if (res) {
			const resArray = res as any[];
			resultsCount.innerHTML = `${resArray.length} result${resArray.length === 1 ? "" : "s"} • ${resTime} ms`;
			results.innerHTML = JSON.stringify(res, null, 2);
			results.style.visibility = "visible";
			resizeResults();
		}
	}).catch(err => console.log(err));
});

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

window.addEventListener("resize", () => {
	resizeResults();
});

const resizeResults = () => {
	let widthNum = 600;
	if (window.innerWidth * 0.95 < 600) {
		widthNum = Math.floor(window.innerWidth * 0.95);
		results.style.width = `${widthNum}px`;
	} else {
		results.style.width = "600px";
	}
	results.style.height = `${window.innerHeight - results.offsetTop - 48}px`;
};

setUpGhostInput();
changeRoute("/disc");
underlineLink(allLink);
getBtn.focus();