import React, { FormEvent, useEffect, useRef } from "react";

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

	useEffect(() => inputDisabled ?  buttonRef?.current?.focus() : inputRef?.current?.focus());

	const input = (
		<input className="item" value={inputValue} placeholder="value" autoComplete="off" disabled={inputDisabled} onInput={e => onInputChange(e)} ref={inputRef} />
	);

	const button = (
		<a href={buttonHref}><button id="get-btn" type="submit" ref={buttonRef}>GET</button></a>
	);
	
	return (
		<form className="item" spellCheck="false" onSubmit={async e => formSubmitted(e)}>
			{input}<br />{button}
		</form>
	);
};

export default Form;