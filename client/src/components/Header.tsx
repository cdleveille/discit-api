import React from "react";

export const Header: React.FC = () => {
	return (
		<h1>
			<a
				href="https://github.com/cdleveille/discit"
				target="_blank"
				rel="noreferrer">
				<span className="emoji">🥏</span> DiscIt
			</a>
		</h1>
	);
};

export default Header;