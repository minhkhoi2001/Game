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
				className={location.pathname === "/xoso5p" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p")}
			>
				Lô
			</li>
			<li
				className={location.pathname === "/xoso5p/bacang" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/bacang")}
			>
				Ba càng
			</li>
			<li
				className={location.pathname === "/xoso5p/de" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/de")}
			>
				Đề
			</li>
			<li
				className={location.pathname === "/xoso5p/loxien" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/loxien")}
			>
				Lô xiên 2
			</li>
			<li
				className={location.pathname === "/xoso5p/loxien3" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/loxien3")}
			>
				Lô xiên 3
			</li>
			<li
				className={location.pathname === "/xoso5p/loxien4" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/loxien4")}
			>
				Lô xiên 4
			</li>
			<li
				className={location.pathname === "/xoso5p/truotxien4" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/truotxien4")}
			>
				Trượt xiên 4
			</li>
			<li
				className={location.pathname === "/xoso5p/truotxien8" ? "active" : ""}
				onClick={() => handleTabClick("/xoso5p/truotxien8")}
			>
				Trượt xiên 8
			</li>
		</ul>
	);
};

export default TabNavigation;
