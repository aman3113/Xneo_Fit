import React from "react";
import xneoLogo from "../images/xneoLogo.png";
import smallLogo from "../images/smallLogo.png";

const Header = () => {
	return (
		<header className="h-[10vh] p-2 border-2 border-black">
			<div className="w-[200px] h-full">
				<img src={xneoLogo} alt="" className="w-full h-full" />
			</div>
		</header>
	);
};

export default Header;
