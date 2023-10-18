import Footer from "../../components/Footer/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

function HistoryAll() {
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
	//const [isShow, setShow] = useState(false);
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
			.get(`https://server.best96tx.com/auth/biendongsodu`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => function () {});
		axios
			.get(`https://server.best96tx.com/auth/getUser`, {})
			.then((res) => {
				setProfile1(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
	}, []);
	return (
		<>
			<div className="main">
				<Header profile={profile1} />
				<h1 className="title-h1">Biến Động Số Dư</h1>
				{profile ? (
					<div className="content-history" style={{ margin: "1.5rem 0 0" }}>
						{profile?.map((item, key) => (
							<>
								{item?.id_bet && (
									<>
										<div className="item_inner">
											<div className="item_history">
												<div className="title_item_history">
													<span className="sanh">Keno {item.sanh}</span>
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
													Phiên cược: {item?.id_bet.id_bet}
												</div>
											</div>
											<div className="money_history">
												<span className="money">
													{item.status_bet === "Win"
														? "+"
														: item.status_bet === "Lose"
														? "-"
														: ""}
													{Number(item.money).toLocaleString()}đ
												</span>
												<div className="time_choose">
													{formatDate(new Date(item.createdAt))}
												</div>
											</div>
										</div>
									</>
								)}
								{item.type_payment && (
									<>
										<div className="item_inner">
											<div className="item_history">
												<div className="title_item_history">
													<span className="sanh"> {item.type_payment}</span>
													<span
														className={`type_state ${
															item.status_payment === "Pending"
																? "pending"
																: item.status_payment === "Success"
																? "win"
																: "lose"
														}`}
													>
														{item.status_payment}
													</span>
													<span
														className={`type_state ${
															item.type_payment === "NẠP"
																? "win"
																: item.type_payment === "RÚT"
																? "lose"
																: "pending"
														}`}
													>
														{item.type_payment}
													</span>
												</div>
												<div className="id_history_sanh">
													{item?.detail}
												</div>
											</div>
											<div className="money_history">
												<span className="money">
													{item.type_payment === "NẠP"
														? "+"
														: item.type_payment === "RÚT"
														? "-"
														: ""}
													{Number(item.money).toLocaleString()}đ
												</span>
												<div className="time_choose">
													{formatDate(new Date(item.createdAt))}
												</div>
											</div>
										</div>
									</>
								)}
							</>
						))}
					</div>
				) : (
					<div></div>
				)}

				<Footer profile={profile1} />
			</div>
		</>
	);
}
export default HistoryAll;
