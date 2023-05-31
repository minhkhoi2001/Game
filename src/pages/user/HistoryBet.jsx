import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GetNameChoose } from "../../funcUtils";

function HistoryBet() {
	function formatDate(m) {
		new Date(m);
		const dateString =
			m.getUTCFullYear() +
			"/" +
			("0" + (m.getMonth() + 1)).slice(-2) +
			"/" +
			("0" + m.getDate()).slice(-2) +
			"  " +
			("0" + m.getHours()).slice(-2) +
			":" +
			("0" + m.getMinutes()).slice(-2);
		return dateString;
	}
	const [profile, setProfile] = useState(null);
	const [profile1, setProfile1] = useState(null);
	const [isShow, setShow] = useState(false);
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
			.get(`https://server.vnvip294.com/history/historyus`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => function () {});
		axios
			.get(`https://server.vnvip294.com/auth/getUser`, {})
			.then((res) => {
				setProfile1(res.data.data);
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
							<div style={{ display: "flex", float: "right" }}>
								{isShow && profile1 ? (
									<span style={{ marginRight: "0.111rem" }}>
										Số dư: <b>{Math.floor(profile1.money).toLocaleString()}đ</b>
									</span>
								) : (
									<span style={{ marginRight: "0.111rem" }}>
										Số dư: <b>******đ</b>
									</span>
								)}
								<div
									onClick={() => {
										setShow(!isShow);
									}}
								>
									{isShow ? <VisibilityOff /> : <Visibility />}
								</div>
							</div>
						</div>
					</div>
				</div>
				<h1 className="title-h1">Lịch Sử Tham Gia</h1>
				{profile != null ? (
					<div className="content-history" style={{margin:"1.5rem 0 0"}}>
						{profile?.map((item, key) => (
							<>
								<div className="item_inner">
									<div className="item_history">
										<div className="title_item_history">
											<span className="sanh">{item.sanh=="3 phút"?"Keno 3 phút":item.sanh=="5 phút"?"Keno 5 phút":item.sanh=="1 phút"?"Keno 1 phút": item.sanh}</span>
											<span
												className={`type_state ${
													item.status_bet === "Pending"
														? "pending"
														: item.status_bet === "Win"
														? "win"
														: "lose"
												}`}
											>
												{item.status_bet}
											</span>
										</div>
										<div className="id_history_sanh">
											Phiên cược: {item.id_bet.id_bet?item.id_bet.id_bet:item.id_bet}
										</div>
										<div className="id_history_sanh">
											{GetNameChoose(Number(item.state), null,item.sanh)}
										</div>
									</div>
									<div className="money_history">
										<span className="money">
											{Number(item.money).toLocaleString()}đ
										</span>
										<div className="time_choose">
											{formatDate(new Date(item.createdAt))}
										</div>
									</div>
								</div>
							</>
						))}
					</div>
				) : (
					<div>
					</div>
				)}

				<Footer profile={profile1} />
			</div>
		</>
	);
}
export default HistoryBet;
