interface IFormProps {
	formSubmitted: any,
	inputDisabled: boolean,
	onInputChange: any,
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
		<form className="item" spellCheck="false" onSubmit={async e => await formSubmitted(e)}>
			{input}<br />{button}
		</form>
	);
}

export default Form;