interface IFormProps {
	formSubmitted: any,
	inputDisabled: boolean,
	onInputChange: any,
	inputValue: string,
	getHref: string
}

export const Form: React.FC<IFormProps> = ({formSubmitted, inputDisabled, onInputChange, inputValue, getHref}) => {
	return (
		<form className="item" spellCheck="false" onSubmit={async e => await formSubmitted(e)}>
			<input className="item" value={inputValue} placeholder="value" autoComplete="off" disabled={inputDisabled} onInput={e => onInputChange(e)}/><br />
			<a href={getHref}><button id="get-btn" type="submit">GET</button></a>
		</form>
	);
}

export default Form;