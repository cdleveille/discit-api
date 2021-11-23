import React, { FormEvent } from "react";

interface IFormProps {
	formSubmitted: (e: FormEvent<HTMLFormElement>) => Promise<void>,
	inputDisabled: boolean,
	onInputChange: (e: FormEvent<HTMLInputElement>) => void,
	inputValue: string,
	getHref: string
}

export const Form: React.FC<IFormProps> = ({formSubmitted, inputDisabled, onInputChange, inputValue, getHref}) => {
	const input = (
		<input className="item" value={inputValue} placeholder="value" autoComplete="off" disabled={inputDisabled} onInput={e => onInputChange(e)} autoFocus/>
	);

	const button = (
		<a href={getHref}><button id="get-btn" type="submit" autoFocus>GET</button></a>
	);
	
	return (
		<form className="item" spellCheck="false" onSubmit={async e => formSubmitted(e)}>
			{input}<br />{button}
		</form>
	);
};

export default Form;