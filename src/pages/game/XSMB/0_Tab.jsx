import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TabNavigation = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const handleTabClick = (tabName) => {
		navigate(tabName);
	};

	return (
		<ul className="tab-navigation tab-game">
			<li
				className={location.pathname === "/xsmb" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb")}
			>
				Lô
			</li>
			<li
				className={location.pathname === "/xsmb/bacang" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/bacang")}
			>
				Ba càng
			</li>
			<li
				className={location.pathname === "/xsmb/de" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/de")}
			>
				Đề
			</li>
			<li
				className={location.pathname === "/xsmb/loxien" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/loxien")}
			>
				Lô xiên 2
			</li>
			<li
				className={location.pathname === "/xsmb/loxien3" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/loxien3")}
			>
				Lô xiên 3
			</li>
			<li
				className={location.pathname === "/xsmb/loxien4" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/loxien4")}
			>
				Lô xiên 4
			</li>
			<li
				className={location.pathname === "/xsmb/truotxien4" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/truotxien4")}
			>
				Trượt xiên 4
			</li>
			<li
				className={location.pathname === "/xsmb/truotxien8" ? "active" : ""}
				onClick={() => handleTabClick("/xsmb/truotxien8")}
			>
				Trượt xiên 8
			</li>
		</ul>
	);
};

export default TabNavigation;
