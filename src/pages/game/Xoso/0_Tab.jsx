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
				className={location.pathname === "/xoso3p" ? "active" : ""}
				onClick={() => handleTabClick("/xoso3p")}
			>
				Lô
			</li>
			<li
				className={location.pathname === "/xoso3p/bacang" ? "active" : ""}
				onClick={() => handleTabClick("/xoso3p/bacang")}
			>
				Ba càng
			</li>
			<li
				className={location.pathname === "/xoso3p/de" ? "active" : ""}
				onClick={() => handleTabClick("/xoso3p/de")}
			>
				Đề
			</li>
			<li
				className={location.pathname === "/xoso3p/loxien" ? "active" : ""}
				onClick={() => handleTabClick("/xoso3p/loxien")}
			>
				Lô xiên 2
			</li>
			<li
				className={location.pathname === "/xoso3p/loxien3" ? "active" : ""}
				onClick={() => handleTabClick("/xoso3p/loxien3")}
			>
				Lô xiên 3
			</li>
			<li
				className={location.pathname === "/xoso3p/loxien4" ? "active" : ""}
				onClick={() => handleTabClick("/xoso3p/loxien4")}
			>
				Lô xiên 4
			</li>
		</ul>
	);
};

export default TabNavigation;
