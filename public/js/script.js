/* eslint-disable no-undef */

const searchBox = document.getElementById("search-box");
const getLink = document.getElementById("get-link");
const getBtn = document.getElementById("get-btn");
const getForm = document.getElementById("get-form");
const results = document.getElementById("results");
const routeDiv = document.getElementById("route-div");
let routeText = routeDiv.innerHTML;

const allLink = document.getElementById("all-link");
allLink.onclick = (e) => {
	if (e) e.preventDefault();
	changeRoute("/disc");
	underlineLink(allLink);
	getBtn.focus();
};

const nameLink = document.getElementById("name-link");
nameLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/name");
	underlineLink(nameLink);
};

const brandLink = document.getElementById("brand-link");
brandLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/brand");
	underlineLink(brandLink);
};

const categoryLink = document.getElementById("category-link");
categoryLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/category");
	underlineLink(categoryLink);
};

const speedLink = document.getElementById("speed-link");
speedLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/speed");
	underlineLink(speedLink);
};

const glideLink = document.getElementById("glide-link");
glideLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/glide");
	underlineLink(glideLink);
};

const turnLink = document.getElementById("turn-link");
turnLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/turn");
	underlineLink(turnLink);
};

const fadeLink = document.getElementById("fade-link");
fadeLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/fade");
	underlineLink(fadeLink);
};

const stabilityLink = document.getElementById("stability-link");
stabilityLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc/stability");
	searchBox.disabled = false;
	underlineLink(stabilityLink);
};

const queryLink = document.getElementById("query-link");
queryLink.onclick = (e) => {
	e.preventDefault();
	changeRoute("/disc?");
	searchBox.disabled = false;
	underlineLink(queryLink);
};

const changeRoute = (newRouteText) => {
	routeText = newRouteText;
	routeDiv.innerHTML = newRouteText;
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
		routeDiv.innerHTML = `${routeText}${routeText === "/disc?" || !inputText ? "" : "/"}${inputText}`;
		getLink.href = routeDiv.innerHTML;
	} else routeDiv.innerHTML = routeText;

	setSearchBoxWidth();
};

const slugify = (text) => {
	let slug = text.toLowerCase();
	slug = slug.replace(/[/\\#,+()$~%!@^|`.'":;*?<>{}[\]]/g, "");
	slug = slug.replace(/[ _]/g, "-");
	return slug;
};

// Create a div element
const fakeEle = document.createElement("div");

// Hide it completely
fakeEle.style.position = "absolute";
fakeEle.style.top = "0";
fakeEle.style.left = "-9999px";
fakeEle.style.overflow = "hidden";
fakeEle.style.visibility = "hidden";
fakeEle.style.whiteSpace = "nowrap";
fakeEle.style.height = "0";

// Get the styles
const styles = window.getComputedStyle(searchBox);

// Copy font styles from the textbox
fakeEle.style.fontFamily = styles.fontFamily;
fakeEle.style.fontSize = styles.fontSize;
fakeEle.style.fontStyle = styles.fontStyle;
fakeEle.style.fontWeight = styles.fontWeight;
fakeEle.style.letterSpacing = styles.letterSpacing;
fakeEle.style.textTransform = styles.textTransform;

fakeEle.style.borderLeftWidth = styles.borderLeftWidth;
fakeEle.style.borderRightWidth = styles.borderRightWidth;
fakeEle.style.paddingLeft = styles.paddingLeft;
fakeEle.style.paddingRight = styles.paddingRight;

// Append the fake element to `body`
document.body.appendChild(fakeEle);

const setSearchBoxWidth = () => {
    const string = searchBox.value || searchBox.getAttribute("placeholder") || "";
    fakeEle.innerHTML = string.replace(/\s/g, "&" + "nbsp;");

    const fakeEleStyles = window.getComputedStyle(fakeEle);
    searchBox.style.width = fakeEleStyles.width;
};

const underlineLink = (link) => {
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

getForm.addEventListener("submit", (e) => {
	e.preventDefault();
	results.src = routeDiv.innerHTML;
});

window.addEventListener("resize", () => {
	resizeResults();
});

const resizeResults = () => {
	if (window.innerWidth * 0.95 < 600 ) {
		results.style.width = `${Math.floor(window.innerWidth * 0.95)}px`;
	} else {
		results.style.width = "600px";
	}

	results.style.height = `${window.innerHeight - results.offsetTop - 16}px`;
	
};

resizeResults();
allLink.onclick();