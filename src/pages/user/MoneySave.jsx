import Footer from "../../components/Footer/Footer";
import "../user/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

function MoneySave() {
	const [profile, setProfile] = useState(null);
	const [saving, setSaving] = useState(null);
	const navigate = useNavigate();
	axios.interceptors.request.use(
		(config) => {
			const token = localStorage.getItem("user");

			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}

			return config;
		},

		(error) => {
			return Promise.reject(error);
		}
	);
	useEffect(() => {
		axios
			.get(`http://localhost/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios.get(`http://localhost/money/get/user`, {}).then((res) => {
			setSaving(res.data.data);
		});
	}, []);
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img src={require("../../img/logo-vietlott.png")} alt="Logo" />
							</Link>
						</div>
						<div className="header-right">
							<div style={{ display: "flex", float: "right" }}></div>
						</div>
					</div>
				</div>
				<div className="account">
					<div className="account__top promotionRule__container-content__rules-item">
						<div className="promotionRule__container-content__rules-item__splitBorder">
							<span></span>
						</div>
						<div className="promotionRule__container-content__rules-item__borderTopStyle">
							<span></span>
							<span></span>
						</div>
						<div className="promotionRule__container-content__rules-item__titleLeft"></div>
						<div className="promotionRule__container-content__rules-item__title">
							{profile ? (
								<>{profile.level == 0 ? "VIP 1" : "VIP " + profile.level}</>
							) : null}
						</div>
						<div className="promotionRule__container-content__rules-item__titleRight"></div>
						<div className="account__ID"></div>
						<div className="account__balance">
							{profile ? (
								<span className="background-vip">
									<img
										src={require(`../../img/${
											profile.level == 0 ? "v1" : "v" + profile.level
										}.png`)}
										className={`img-vip ${
											profile.level == 0
												? "img-vip-1"
												: "img-vip-" + profile.level
										}`}
									/>
									<img
										src={require("../../img/profile-picture.jpg")}
										alt="Profile"
									/>
								</span>
							) : null}
							{profile ? <span>{profile.username}</span> : <span>...</span>}
							<span style={{ margin: "0" }}>
								{profile ? (
									<span>
										Mã giới thiệu <b>{profile.code}</b>
									</span>
								) : (
									<span>...</span>
								)}
							</span>
							{saving ? (
								<strong id="account__balance">
									{Math.floor(saving?.vi?.money).toLocaleString()} <small>đ</small>
								</strong>
							) : (
								<strong>0đ</strong>
							)}
						</div>
					</div>
					<div className="account__transaction">
						<div className="account__transaction-box">
							<Link to="/money/send" className="account__transaction-item">
								<AddCardOutlinedIcon />
								<span>Nạp tiền</span>
							</Link>
							<div className="account__transaction-line"></div>
							<Link to="/money/withdraw" className="account__transaction-item">
								<PriceChangeOutlinedIcon />
								<span>Rút tiền</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<Footer profile={profile} />
		</>
	);
}
export default MoneySave;
