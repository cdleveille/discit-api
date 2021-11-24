import React, { CSSProperties, FormEvent, useEffect, useRef } from "react";

interface IFormProps {
	formSubmitted: (e: FormEvent<HTMLFormElement>) => Promise<void>,
	inputDisabled: boolean,
	onInputChange: (e: FormEvent<HTMLInputElement>) => void,
	inputValue: string,
	buttonHref: string
}

export const Form: React.FC<IFormProps> = ({formSubmitted, inputDisabled, onInputChange, inputValue, buttonHref}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const ghostRef = useRef<HTMLDivElement>(null);

	useEffect(() => inputDisabled ?  buttonRef?.current?.focus() : inputRef?.current?.focus());
	useEffect(() => adjustInputSize());

	const adjustInputSize = () => {
		if (inputRef.current && ghostRef.current) {
			const text = inputRef.current.value || inputRef.current.getAttribute("placeholder") || "";
			ghostRef.current.innerHTML = text.replace(/\s/g, "&nbsp;");

			const ghostRefStyles: CSSStyleDeclaration = window.getComputedStyle(ghostRef.current);
			inputRef.current.style.width = ghostRefStyles.width;
		}
	};

	const inputStyles: CSSProperties = {
		fontSize: "14px"
	};

	const input = (
		<input
			className="item"
			value={inputValue}
			placeholder="value"
			autoComplete="off"
			disabled={inputDisabled}
			onChange={e => onInputChange(e)}
			ref={inputRef}
			style={inputStyles}
		/>
	);

	const button = (
		<a href={buttonHref}><button id="get-btn" type="submit" ref={buttonRef}>GET</button></a>
	);

	const ghostDivStyles: CSSProperties = {
		position: "absolute",
		top: "0",
		left: "-9999px",
		overflow: "hidden",
		visibility: "hidden",
		whiteSpace: "nowrap",
		height: "0",
		fontFamily: inputRef.current ? inputRef.current.style.fontFamily : "",
		fontSize: inputRef.current ? inputRef.current.style.fontSize : "",
		fontWeight: inputRef.current ? inputRef.current.style.fontWeight : "",
		letterSpacing: inputRef.current ? inputRef.current.style.letterSpacing : "",
		borderLeftWidth: inputRef.current ? inputRef.current.style.borderLeftWidth : "",
		borderRightWidth: inputRef.current ? inputRef.current.style.borderRightWidth : "",
		paddingLeft: inputRef.current ? inputRef.current.style.paddingLeft : "",
		paddingRight: inputRef.current ? inputRef.current.style.paddingRight : ""
	};

	return (
		<>
			<form className="item" spellCheck="false" onSubmit={async e => formSubmitted(e)}>
				{input}<br />{button}
			</form>
			<div style={ghostDivStyles} ref={ghostRef}></div>
		</>
	);
};

export default Form;