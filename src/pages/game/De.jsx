import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import swal from "sweetalert";
import Footer from "../../components/Footer/Footer";
import { GetNameChoose } from "../../funcUtils";

function De() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
	const [historyGame, setHistoryGame] = useState(null);
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(30);
	const [start, setStart] = useState(false);
	const [dulieunhap, setDulieunhap] = useState(new Date());
	const [update, setUpdate] = useState(0);

	const date = new Date();
	const currentMinute = date.getMinutes();
	const currentSecond = date.getSeconds();
	const [item, setState] = useState(null);
	const [total, setTotal] = useState(null);
	const [isShow, setShow] = useState(false);
	const [setting, setSetting] = useState(null);
	const [item1, setItem] = useState([]);
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
		axios.get(`https://server.vnvip294.com/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`https://server.vnvip294.com/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});
		axios.get(`https://server.vnvip294.com/Xoso/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.vnvip294.com/Xoso/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios
			.get(`https://server.vnvip294.com/notification/getnotifi`, {})
			.then((res) => {
				setVisible({
					money: res.data.data[0].money.toLocaleString(),
					id: res.data.data[0]._id,
				});
			});
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(1800 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`https://server.vnvip294.com/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://server.vnvip294.com/Xoso/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`https://server.vnvip294.com/Xoso/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios
					.get(`https://server.vnvip294.com/notification/getnotifi`, {})
					.then((res) => {
						setVisible({
							money: res.data.data[0].money.toLocaleString(),
							id: res.data.data[0]._id,
						});
					});
			}
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, [dulieunhap]);
	useEffect(() => {
		let swalInst;
		const showAlert = async (data) => {
			swalInst = swal({
				title: "Thông báo hệ thống",
				text: ` Chúc mừng quý khách đã may mắn được nhận ${data.money.toLocaleString()} vào tài khoản`,
				icon: "info",
				buttons: {
					submit: "Tôi đã hiểu",
				},
			});
			const result = await swalInst;
			// handle your actions here
			switch (result) {
				case "submit":
					// clear everything here!!
					axios.post("https://server.vnvip294.com/notification/seen", {
						id: data.id,
					});
					break;
				default:
			}
			// always hide
			setVisible(false);
		};
		if (isVisible) {
			showAlert(isVisible);
		}
	}, [isVisible]);
	useEffect(() => {
		let curTime_second = Math.floor(1800 - (date - dulieunhap) / 1000);

		let myTimeout;

		if (
			currentMinute === dulieunhap.getMinutes() &&
			currentSecond === dulieunhap.getSeconds()
		) {
			setStart(true);
			setSecond(second - 1);
			return () => {
				clearTimeout(myTimeout);
			};
		} else if (curTime_second < 1800 && curTime_second >= 0) {
			setSecond(curTime_second % 60);
			setMinute((curTime_second - (curTime_second % 60)) / 60);
			setStart(true);
			return () => {
				clearTimeout(myTimeout);
			};
		} else {
			//cập nhật thời gian hiện tại 0.5s/lần
			myTimeout = setTimeout(() => {
				setUpdate(update + 1);
			}, 500);
		}
	}, [update, dulieunhap]);

	useEffect(() => {
		let curTime_second = Math.floor(1800 - (date - dulieunhap) / 1000);
		let myTimeout = 0;
		if (start) {
			setSecond(curTime_second % 60);
			setMinute(Math.floor(curTime_second / 60));

			if (curTime_second > 1800 || curTime_second <= 0) {
				setStart(false);
				setMinute(30);
				setSecond(0);
				return () => {
					clearTimeout(myTimeout);
				};
			}
			myTimeout = setTimeout(() => {
				setSecond(second - 1);
			}, 1000);
		}
		return () => {
			clearTimeout(myTimeout);
		};
	}, [second, start, dulieunhap]);

	const [isOpen, setIsOpen] = useState(false);
	const openPopup = () => {
		setIsOpen(true);
	};
	const closePopup = () => {
		setIsOpen(false);
	};

	const [isOpen1, setIsOpen1] = useState(false);
	const openPopup1 = () => {
		setIsOpen1(true);
	};
	const closePopup1 = () => {
		setIsOpen1(false);
	};

	const [isOpen2, setIsOpen2] = useState(false);
	const openPopup2 = () => {
		getHistoryBet()
		setIsOpen2(true);
	};
	const closePopup2 = () => {
		setIsOpen2(false);
	};

	const onChoose = (e) => {
		console.log(e.target.id);
		if (item1.includes(e.target.id)&&item1.length<10) {
			setItem(item1.filter((item) => item !== e.target.id));
		} else if(item1.length<10){
			setItem([...item1, e.target.id]);
		}else{
			swal("Chú ý", "Bạn chỉ được chọn tối đa 10 số", "warning")
			item1.pop()
			setItem(item1)
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const newData=[]
		item1.map((item)=>{
			if(item<10){
				newData.push("0"+item)
			}else{
				newData.push(item)
			}
		})
		const formData = {
			state: newData.join(" "),
			id: bet?._id,
			type: 3,
			money: item1.length * newMoney,
		};
		axios
			.post("https://server.vnvip294.com/historyxs/choose", formData)
			.then((res) => {
				swal("Đặt cược thành công", "", "success")
				setItem([])
			})
			.catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
	};
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
	const [newMoney, setNewMoney] = useState();

	const [activeTab, setActiveTab] = useState("tab1");

	const handleTabClick = (tabName) => {
		navigate(tabName);
		getHistoryBet();
	};

	useEffect(() => {
		if (minute == 0 && second == 0) {
			runSlotEffect();
		}
	}, [minute, second]);

	const slotTransforms = document.querySelectorAll(".slot-transform");
	function runSlotEffect() {
		slotTransforms.forEach((slotTransform) => {
			slotTransform.classList.add("slot-scroll");
			setTimeout(() => {
				slotTransform.classList.remove("slot-scroll");
			}, 3000);
		});
	}
	const location = useLocation();
	const navigate = useNavigate();
	function getHistoryBet() {
		axios
			.get(`https://server.vnvip294.com/history/historyus`, {})
			.then((res) => {
				setHistoryGame(res.data.data);
			})
			.catch((err) => function () {});
	}
	const numbers = Array.from(Array(100).keys());
	return (
		<>
			<div className="loading"><div className="loader"></div></div>
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
								{isShow && profile ? (
									<span style={{ marginRight: "0.111rem" }}>
										Số dư: <b>{Number(profile.money).toLocaleString()}đ</b>
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

				<div className="record_bet">
					<div className="colum-resultxs">
						<div className="col-50">
							{bet ? (
								<>
									<div className="info_bet">
										<div style={{ fontSize: "0.33rem" }}>
											Phiên số <b style={{ color: "#333" }}>{bet.id_bet}</b>
										</div>
									</div>
								</>
							) : (
								<span></span>
							)}
							{total ? (
								<>
									<div className="info_bet">
										<div
											className="count"
											style={{
												margin: "0.3rem auto",
												justifyContent: "center",
											}}
										>
											<div>{minute < 10 ? "0" : null}</div>
											{minute
												.toString()
												.split("")
												.map((item, index) => (
													<div key={index}>{item}</div>
												))}
											<div className="notime">:</div>
											{second < 10 ? <div>0</div> : ""}
											{second
												.toString()
												.split("")
												.map((item, index) => (
													<div key={index}>{item}</div>
												))}
										</div>
									</div>
								</>
							) : null}
						</div>
						<div className="col-50">
							{total ? (
								<>
									<div
										style={{ cursor: "pointer" }}
										onClick={openPopup1}
										className="info_bet"
									>
										<div style={{ fontSize: "0.33rem" }}>
											Kết quả phiên{" "}
											<b style={{ color: "#333" }}>{total[0]?.id_bet}</b>
										</div>
										<div
											className="ball_xs"
											style={{
												margin: "0.3rem auto",
												justifyContent: "center",
											}}
										>
											{total[0].dacbiet.split("").map((x) => (
												<div className="redball">{x}</div>
											))}
										</div>
									</div>
								</>
							) : null}
						</div>
						<div className="col-100">
							<div style={{ display: "flex" }}>
								<button className="btn-mini" onClick={openPopup}>
									Hướng dẫn cách chơi
								</button>
								<button
									className="btn-mini"
									onClick={openPopup1}
									style={{ border: "1px solid #00b977", color: "#00b977" }}
								>
									Chi tiết kết quả
								</button>
								<button
									className="btn-mini"
									onClick={openPopup2}
									style={{ border: "1px solid #477bff", color: "#477bff" }}
								>
									Lịch sử của bạn
								</button>
							</div>
						</div>
					</div>
				</div>
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

				<div className="main_game">
					<div className="route_game">
						<div className="text_choose_center">
							<form onSubmit={onSubmit} className="form-lg">
								<div className="footer_choose1">
									<div className="title_choose_footer1">
										<div className="item_choose_footer1">
											<div>
												<div
													style={{
														margin: "0.2rem auto",
														textAlign: "left",
														width: "90%",
													}}
												>
													Số tiền cược 1 con
												</div>
												<input
													value={newMoney}
													onChange={(e) => setNewMoney(e.target.value)}
													required
													min="1"
													name="money"
													type="number"
													placeholder="Chọn số tiền cược"
												/>
											</div>
										</div>
										<div
											style={{ margin: "0.3rem 0 0" }}
											className="item_choose_footer1"
										>
											<div
												style={{
													margin: "0.1rem auto",
													textAlign: "left",
													width: "90%",
												}}
											>
												<span style={{ marginRight: "5px" }}>
													Đã chọn
													<span style={{ color: "red" }}>{item1.length},</span>
												</span>
												<span>
													Tổng tiền cược
													<span style={{ color: "red" }}>
														{item1.length != 0 && newMoney
															? (item1.length * newMoney).toLocaleString()
															: 0}
														đ
													</span>
												</span>
											</div>
											<button type="submit" className="btn-sbmit">
												Đặt lệnh
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div className="text_choose_center">
							<div className="bet_state">Chọn Số</div>
							<div className="state_choose">
								{numbers.map((number) => (
									<div
										key={number}
										id={number}
										onClick={onChoose}
										className={`choose_xs  ${
											item1.includes(String(number)) ? "chooseItem" : ""
										}`}
									>
										{number < 10 ? `0${number}` : number}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<Footer />

				{isOpen && (
					<div className="popup-backdrop">
						<div className="popup-main">
							<div className="popup-header">Hướng dẫn cách chơi</div>
							<div className="popup-content">
								Chiến thắng khi đặt cược bi (tài/xỉu/lẻ/chẵn) khớp với kết quả
								xổ số. Tỉ lệ ăn 1.98 (đánh 100k ăn 198k).
								<br />
								<br />
								<b>Ví dụ 1</b>
								<br />
								Bạn đặt bi thứ 2 là L (lẻ) và T (tài). Kết quả xổ số là 71294,
								bi thứ 2 có kết quả là 1. Bạn chiến thắng L nhưng thua T.
								<br />
								<br />
								<b>Ví dụ 2</b>
								<br />
								Bạn đặt bi thứ 4 là C (chẵn). Kết quả xổ số là 71294, bi thứ 4
								có kết quả là 9. Bạn thua cuộc.
							</div>
							<button onClick={closePopup} className="popup-close">
								Đóng
							</button>
						</div>
					</div>
				)}

				{isOpen1 && (
					<div className="popup-backdrop">
						<div className="popup-main">
							<div className="popup-content" style={{ padding: "0" }}>
								<table
									id="table-xsmb"
									className="table-result table table-bordered table-striped table-xsmb"
								>
									<tbody>
										<tr>
											<th style={{ width: "10%" }}>ĐB</th>
											<td>
												<span
													id="mb_prize_0"
													className="special-prize div-horizontal"
												>
													{total[0].dacbiet}
												</span>
											</td>
										</tr>
										<tr>
											<th>1</th>
											<td>
												<span id="mb_prize_1" className="prize1 div-horizontal">
													{total[0].nhat}
												</span>
											</td>
										</tr>
										<tr>
											<th>2</th>
											<td>
												<span id="mb_prize_2" className="prize2 div-horizontal">
													{total[0].hai.split(" ")[0]}
												</span>
												<span id="mb_prize_3" className="prize2 div-horizontal">
													{total[0].hai.split(" ")[1]}
												</span>
											</td>
										</tr>
										<tr>
											<th>3</th>
											<td>
												<span id="mb_prize_4" className="prize3 div-horizontal">
													{total[0].ba.split(" ")[0]}
												</span>
												<span id="mb_prize_5" className="prize3 div-horizontal">
													{total[0].ba.split(" ")[1]}
												</span>
												<span id="mb_prize_6" className="prize3 div-horizontal">
													{total[0].ba.split(" ")[2]}
												</span>
												<span id="mb_prize_7" className="prize3 div-horizontal">
													{total[0].ba.split(" ")[3]}
												</span>
												<span id="mb_prize_8" className="prize3 div-horizontal">
													{total[0].ba.split(" ")[4]}
												</span>
												<span id="mb_prize_9" className="prize3 div-horizontal">
													{total[0].ba.split(" ")[5]}
												</span>
											</td>
										</tr>
										<tr>
											<th>4</th>
											<td>
												<span id="mb_prize_10" className="prize4 div-horizontal">
													{total[0].tu.split(" ")[0]}
												</span>
												<span id="mb_prize_11" className="prize4 div-horizontal">
													{total[0].tu.split(" ")[1]}
												</span>
												<span id="mb_prize_12" className="prize4 div-horizontal">
													{total[0].tu.split(" ")[2]}
												</span>
												<span id="mb_prize_13" className="prize4 div-horizontal">
													{total[0].tu.split(" ")[3]}
												</span>
											</td>
										</tr>
										<tr>
											<th>5</th>
											<td>
												<span id="mb_prize_14" className="prize5 div-horizontal">
													{total[0].nam.split(" ")[0]}
												</span>
												<span id="mb_prize_15" className="prize5 div-horizontal">
													{total[0].nam.split(" ")[1]}
												</span>
												<span id="mb_prize_16" className="prize5 div-horizontal">
													{total[0].nam.split(" ")[2]}
												</span>
												<span id="mb_prize_17" className="prize5 div-horizontal">
													{total[0].nam.split(" ")[3]}
												</span>
												<span id="mb_prize_18" className="prize5 div-horizontal">
													{total[0].nam.split(" ")[4]}
												</span>
												<span id="mb_prize_19" className="prize5 div-horizontal">
													{total[0].nam.split(" ")[5]}
												</span>
											</td>
										</tr>
										<tr>
											<th>6</th>
											<td>
												<span id="mb_prize_20" className="prize6 div-horizontal">
													{total[0].sau.split(" ")[0]}
												</span>
												<span id="mb_prize_21" className="prize6 div-horizontal">
													{total[0].sau.split(" ")[1]}
												</span>
												<span id="mb_prize_22" className="prize6 div-horizontal">
													{total[0].sau.split(" ")[2]}
												</span>
											</td>
										</tr>
										<tr>
											<th>7</th>
											<td>
												<span id="mb_prize_23" className="prize7 div-horizontal">
													{total[0].bay.split(" ")[0]}
												</span>
												<span id="mb_prize_24" className="prize7 div-horizontal">
													{total[0].bay.split(" ")[1]}
												</span>
												<span id="mb_prize_25" className="prize7 div-horizontal">
													{total[0].bay.split(" ")[2]}
												</span>
												<span id="mb_prize_26" className="prize7 div-horizontal">
													{total[0].bay.split(" ")[3]}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<button
								onClick={closePopup1}
								className="popup-close"
								style={{
									background: "#00b977",
									boxShadow: "none",
									textShadow: "none",
								}}
							>
								Đóng
							</button>
						</div>
					</div>
				)}

				{isOpen2 && (
					<div className="popup-backdrop">
						<div className="popup-main">
							<div className="popup-header" style={{ background: "#477bff" }}>
								Lịch Sử Tham Gia
							</div>
							<div className="popup-content">
								{historyGame != null ? (
									<div className="content-history award_tb">
										{historyGame?.map((item, key) => (
											<>
												{item.sanh&&item.type? (
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
																Phiên cược: {item.id_bet.id_bet}
															</div>
															<div className="id_history_sanh">
																{GetNameChoose(Number(item.state), null)}
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
												) : null}
											</>
										))}
									</div>
								) : (
									<div></div>
								)}
							</div>
							<button
								onClick={closePopup2}
								className="popup-close"
								style={{
									background: "#477bff",
									boxShadow: "none",
									textShadow: "none",
								}}
							>
								Đóng
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
export default De;
