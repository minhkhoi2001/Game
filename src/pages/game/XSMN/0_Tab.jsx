import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const TabNavigation = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {id} =useParams()
	console.log(id);
	const handleTabClick = (tabName) => {
		navigate(tabName);
	};

	return (
		<ul className="tab-navigation tab-game">
			<li
				className={location.pathname === `/xsmn/lo/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmn/lo/${id}`)}
			>
				Lô
			</li>
			<li
				className={location.pathname === `/xsmn/bacang/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmn/bacang/${id}`)}
			>
				Ba càng
			</li>
			<li
				className={location.pathname === `/xsmn/de/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmn/de/${id}` )}
			>
				Đề
			</li>
			<li
				className={location.pathname === `/xsmn/loxien/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmn/loxien/${id}` )}
			>
				Lô xiên 2
			</li>
			<li
				className={location.pathname ===`/xsmn/loxien3/${id}`  ? "active" : ""}
				onClick={() => handleTabClick(`/xsmn/loxien3/${id}` )}
			>
				Lô xiên 3
			</li>
			<li
				className={location.pathname === `/xsmn/loxien4/${id}`  ? "active" : ""}
				onClick={() => handleTabClick(`/xsmn/loxien4/${id}`)}
			>
				Lô xiên 4
			</li>
		</ul>
	);
};

export default TabNavigation;
