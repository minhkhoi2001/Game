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
            <li className={location.pathname === "/xoso3p" ? "active" : ""} onClick={() => handleTabClick("/xoso3p")}>
                Lô
            </li>
            <li className={location.pathname === "/xoso3p/bacang" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/bacang")}>
                Ba càng
            </li>
            <li className={location.pathname === "/xoso3p/de" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/de")}>
                Đề
            </li>
            <li className={location.pathname === "/xoso3p/loxien" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/loxien")}>
                Lô xiên 2
            </li>
            <li className={location.pathname === "/xoso3p/loxien3" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/loxien3")}>
                Lô xiên 3
            </li>
            <li className={location.pathname === "/xoso3p/loxien4" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/loxien4")}>
                Lô xiên 4
            </li>
            <li className={location.pathname === "/xoso3p/truotxien4" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/truotxien4")}>
                Trượt xiên 4
            </li>
            <li className={location.pathname === "/xoso3p/truotxien8" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/truotxien8")}>
                Trượt xiên 8
            </li>
            <li className={location.pathname === "/xoso3p/truotxien10" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/truotxien10")}>
                Trượt xiên 10
            </li>
            <li className={location.pathname === "/xoso3p/4cangdacbiet" ? "active" : ""} onClick={() => handleTabClick("/xoso3p/4cangdacbiet")}>
                4 càng đặt biệt
            </li>
        </ul>
    );
};

export default TabNavigation;
