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
				className={location.pathname === `/xsmt/lo/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmt/lo/${id}`)}
			>
				Lô
			</li>
			<li
				className={location.pathname === `/xsmt/bacang/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmt/bacang/${id}`)}
			>
				Ba càng
			</li>
			<li
				className={location.pathname === `/xsmt/de/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmt/de/${id}` )}
			>
				Đề
			</li>
			<li
				className={location.pathname === `/xsmt/loxien/${id}` ? "active" : ""}
				onClick={() => handleTabClick(`/xsmt/loxien/${id}` )}
			>
				Lô xiên 2
			</li>
			<li
				className={location.pathname ===`/xsmt/loxien3/${id}`  ? "active" : ""}
				onClick={() => handleTabClick(`/xsmt/loxien3/${id}` )}
			>
				Lô xiên 3
			</li>
			<li
				className={location.pathname === `/xsmt/loxien4/${id}`  ? "active" : ""}
				onClick={() => handleTabClick(`/xsmt/loxien4/${id}`)}
			>
				Lô xiên 4
			</li>
		</ul>
	);
};

export default TabNavigation;
