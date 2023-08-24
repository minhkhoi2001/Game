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
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';

function Profile() {
	const [profile, setProfile] = useState(null);
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
							{profile ? (
								<strong id="account__balance">
									{Math.floor(profile.money).toLocaleString()} <small>đ</small>
								</strong>
							) : (
								<strong>*****</strong>
							)}
						</div>
					</div>
					<div className="account__transaction">
						<div className="account__transaction-box">
							<Link to="/recharge" className="account__transaction-item">
								<AddCardOutlinedIcon />
								<span>Nạp tiền</span>
							</Link>
							<div className="account__transaction-line"></div>
							<Link to="/withdraw" className="account__transaction-item">
								<PriceChangeOutlinedIcon />
								<span>Rút tiền</span>
							</Link>
						</div>
					</div>
					<div className="account__menu">
						<Link to="/historyplay" className="account__menu-item">
							<span>
								<QueryStatsOutlinedIcon sx={{ fontSize: "25px" }} />
								Lịch sử tham gia
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/history" className="account__menu-item">
							<span>
								<LocalAtmOutlinedIcon sx={{ fontSize: "25px" }} />
								Biến động số dư
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/money" className="account__menu-item">
							<span>
								<SavingsOutlinedIcon sx={{ fontSize: "25px" }} />
								Két tiết kiệm
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/historyadd" className="account__menu-item">
							<span>
								<CreditScoreOutlinedIcon sx={{ fontSize: "25px" }} />
								Lịch sử nạp
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/historyget" className="account__menu-item">
							<span>
								<PaymentsOutlinedIcon sx={{ fontSize: "25px" }} />
								Lịch sử rút
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/addbank" className="account__menu-item">
							<span>
								<AccountBalanceOutlinedIcon sx={{ fontSize: "25px" }} />
								Liên kết ngân hàng
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/transfer" className="account__menu-item">
							<span>
								<MoveUpIcon sx={{ fontSize: "25px" }} />
								Chuyển tiền
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<Link to="/password" className="account__menu-item">
							<span>
								<LockPersonOutlinedIcon sx={{ fontSize: "25px" }} />
								Đổi mật khẩu
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</Link>
						<div
							className="account__menu-item"
							onClick={() => {
								localStorage.removeItem("user");
								navigate("/login");
							}}
						>
							<span>
								<LogoutOutlinedIcon sx={{ fontSize: "25px" }} />
								Đăng xuất
							</span>
							<KeyboardArrowRightOutlinedIcon />
						</div>
					</div>
				</div>
			</div>
			<Footer profile={profile} />
		</>
	);
}
export default Profile;
