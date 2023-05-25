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
				className={location.pathname === "/xoso" ? "active" : ""}
				onClick={() => handleTabClick("/xoso")}
			>
				Lô
			</li>
			<li
				className={location.pathname === "/xoso/bacang" ? "active" : ""}
				onClick={() => handleTabClick("/xoso/bacang")}
			>
				Ba càng
			</li>
			<li
				className={location.pathname === "/xoso/de" ? "active" : ""}
				onClick={() => handleTabClick("/xoso/de")}
			>
				Đề
			</li>
			<li
				className={location.pathname === "/xoso/loxien" ? "active" : ""}
				onClick={() => handleTabClick("/xoso/loxien")}
			>
				Lô xiên 2
			</li>
			<li
				className={location.pathname === "/xoso/loxien3" ? "active" : ""}
				onClick={() => handleTabClick("/xoso/loxien3")}
			>
				Lô xiên 3
			</li>
			<li
				className={location.pathname === "/xoso/loxien4" ? "active" : ""}
				onClick={() => handleTabClick("/xoso/loxien4")}
			>
				Lô xiên 4
			</li>
		</ul>
	);
};

export default TabNavigation;
