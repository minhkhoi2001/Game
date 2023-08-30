import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import { GetNameChoose } from "../../../funcUtils";
import chen from "./img/chen.png";
import dia from "./img/dia.png";
import "./xd.css";
function XD5() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
	const [historyGame, setHistoryGame] = useState(null);
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(5);
	const [start, setStart] = useState(false);
	const [dulieunhap, setDulieunhap] = useState(new Date());
	const [update, setUpdate] = useState(0);
	const date = new Date();
	const currentMinute = date.getMinutes();
	const currentSecond = date.getSeconds();
	const [total, setTotal] = useState(null);
	const [total2, setTotal2] = useState(null);
	const [setting, setSetting] = useState(null);
	const [isShow, setShow] = useState(false);
	const [ls, setLs] = useState(null);

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
		axios.get(`https://server.vnvip294.com/xd5/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.vnvip294.com/xd5/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
				setTotal2(res.data.data);
			})
			.catch(() => setTotal(null));
		axios.get(`https://server.vnvip294.com/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(300 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`https://server.vnvip294.com/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://server.vnvip294.com/xd5/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`https://server.vnvip294.com/xd5/getallbet`, {})
					.then((res) => {
						rollLottery(res);
					})
					.catch(() => setTotal(null));
				axios.get(`https://server.vnvip294.com/notification/getnotifi`, {}).then((res) => {
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

			switch (result) {
				case "submit":
					axios.post("https://server.vnvip294.com/notification/seen", {
						id: data.id,
					});
					break;
				default:
			}

			setVisible(false);
		};
		if (isVisible) {
			showAlert(isVisible);
		}
	}, [isVisible]);
	useEffect(() => {
		let curTime_second = Math.floor(300 - (date - dulieunhap) / 1000);

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
		} else if (curTime_second < 300 && curTime_second >= 0) {
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
		let curTime_second = Math.floor(300 - (date - dulieunhap) / 1000);
		let myTimeout = 0;
		if (start) {
			setSecond(curTime_second % 60);
			setMinute(Math.floor(curTime_second / 60));

			if (curTime_second > 300 || curTime_second <= 0) {
				setStart(false);
				setMinute(5);
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
	const [choose, setChoose] = useState();
	// const onChoose = (e) => {
	// 	if (choose.includes(e.target.id)) {
	// 		setItem(choose.filter((item) => item !== e.target.id));
	// 	} else {
	// 		setItem([...choose, e.target.id]);
	// 	}
	// };
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = {
			result: choose.join(" "),
			id: bet?._id,
			money: choose.length * money,
		};
		if (choose.length == 0) {
			swal("Thất bại", "Bạn chưa lựa chọn", "error");
		} else if (money == 0 || money == null) {
			swal("Thất bại", "Bạn chưa nhập tiền", "error");
		} else {
			axios
				.post("https://server.vnvip294.com/cxd5/choose", formData)
				.then((res) => {
					swal("Đặt cược thành công", "", "success");
					setChoose([]);
				})
				.catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
		}
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

	const [activeTab, setActiveTab] = useState("tab1");
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
		getHistoryBet();
	};

	function rollLottery(res) {
		setTotal2(res.data.data);
		const interval = setInterval(() => {
			const randomDigits1 = Math.floor(Math.random() * 6) + 1;
			const randomDigits2 = Math.floor(Math.random() * 6) + 1;
			const randomDigits3 = Math.floor(Math.random() * 6) + 1;
			setTotal([
				{
					id_bet: res.data.data[0].id_bet,
					result:
						String(randomDigits1) +
						" " +
						String(randomDigits2) +
						" " +
						String(randomDigits3),
				},
			]);
		}, 100);

		setTimeout(() => {
			clearInterval(interval);
			setTotal(res.data.data);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}

	function getHistoryBet() {
		axios
			.get(`https://server.vnvip294.com/history/historyus`, {})
			.then((res) => {
				setHistoryGame(res.data.data);
			})
			.catch((err) => function () {});
	}
	const [money, setMoney] = useState();
	useEffect(() => {
		const point = document.querySelector(".point");
		const point1 = document.querySelector(".check");
		point.style.animation = "movePoint 4s forwards";
		function handleAnimationEnd(event) {
			console.log(event);
			if (event.animationName === "movePoint") {
				point.style.animation = "movePointBack 4s forwards";
			} else if (event.animationName === "movePointBack") {
				point.style.animation = "shake 4s forwards";
				point1.style.animation = "shake1 4s forwards";
			}
		}
		point.addEventListener("animationend", handleAnimationEnd);
		return () => {
			point.removeEventListener("animationend", handleAnimationEnd);
		};
	}, []);

	return (
		<>
			<div className="main">
				<div className="bg-game">
					<img src={chen} className="point" alt=""  />

					<img className="check" src={dia} alt="" />
					<div></div>
				</div>
				<div>
					<button
						style={choose?.includes(5) ? { background: "red" }:{background:'none'}}
						onClick={() => {
							if (choose) {
								setChoose([...choose, 5]);
							} else {
								setChoose([5]);
							}
						}}
					>
						Chẵn
					</button>
					<button
					style={choose?.includes(6) ? { background: "red" }:{background:'none'}}
						onClick={() => {
							if (choose) {
								setChoose([...choose, 6]);
							} else {
								setChoose([6]);
							}
						}}
					>
						Lẽ
					</button>
					<button
						style={choose?.includes(4) ? { background: "red" }:{background:'none'}}
						onClick={() => {
							if (choose) {
								setChoose([...choose, 4]);
							} else {
								setChoose([4]);
							}
						}}
					>
						3 trắng - 1đen
					</button>
					<button
						style={choose?.includes(3) ? { background: "red" }:{background:'none'}}
						onClick={() => {
							if (choose) {
								setChoose([...choose, 3]);
							} else {
								setChoose([3]);
							}
						}}
					>
						3 đen - 1 trắng
					</button>
					<button
						style={choose?.includes(2) ? { background: "red" }:{background:'none'}}
						onClick={() => {
							if (choose) {
								setChoose([...choose, 2]);
							} else {
								setChoose([2]);
							}
						}}
					>
						4 trắng
					</button>
					<button
						style={choose?.includes(1) ? { background: "red" }:{background:'none'}}
						onClick={() => {
							if (choose) {
								setChoose([...choose, 1]);
							} else {
								setChoose([1]);
							}
						}}
					>
						4 đen
					</button>
				</div>
				<input
					min={1}
					value={money}
					onChange={(e) => setMoney(e.target.value)}
					name="money"
					type="number"
				/>
					<button onClick={onSubmit}>Cược</button>
				<div className="history_game">
					<ul className="tab-navigation">
						<li
							className={activeTab === "tab1" ? "active" : ""}
							onClick={() => handleTabClick("tab1")}
						>
							Lịch sử trò chơi
						</li>
						<li
							className={activeTab === "tab2" ? "active" : ""}
							onClick={() => handleTabClick("tab2")}
						>
							Lịch sử của tôi
						</li>
					</ul>

					<div className="tab-content">
						{activeTab === "tab1" && (
							<div className="award_tb">
								<table>
									<thead style={{ textAlign: "center" }}>
										<tr>
											<td>Phiên số</td>
											<td>Kết quả</td>
											<td>Thời gian</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>{bet && bet.id_bet}</td>
											<td style={{ textAlign: "center" }}>Đang chờ kết quả</td>
											<td>{bet && formatDate(new Date(bet.createdAt))}</td>
										</tr>
										{total2 &&
											total2.map((item, index) => (
												<>
													<tr key={index}>
														<td>{item.id_bet}</td>
														<td
															className="history_xucxac"
															style={{
																display: "flex",
																justifyContent: "center",
															}}
														>
															{item.result.split(" ").map((item) => (
																<div className={`n${item}`}></div>
															))}
														</td>
														<td>{formatDate(new Date(item.createdAt))}</td>
													</tr>
												</>
											))}
									</tbody>
								</table>
							</div>
						)}
						{activeTab === "tab2" && (
							<>
								{historyGame != null ? (
									<div className="content-history award_tb">
										{historyGame?.map((item, key) => (
											<>
												{item.sanh === "Tài xỉu 3p" ? (
													<div
														className="item_inner"
														onClick={() => {
															setLs(item);
															setShow(true);
														}}
													>
														<div className="item_history">
															<div className="title_item_history">
																<span className="sanh">{item.sanh}</span>
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
																Phiên cược:{" "}
																{item.id_bet.id_bet
																	? item.id_bet.id_bet
																	: item.id_bet}
															</div>
															<div className="id_history_sanh">
																{GetNameChoose(item.state, null, item.sanh)}
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
							</>
						)}
					</div>
				</div>

				<Footer />

				{isShow === true && ls.status_bet !== "Pending" ? (
					<>
						<div className="modal" style={{ zIndex: "9999999" }}>
							<div className="modaloverlay">
								<i className="ti-close closelogin"></i>
							</div>
							<div className="modalbody">
								<div>
									<div className="modalinner" style={{ padding: "10px 15px" }}>
										<div
											className="modalheader"
											style={{ padding: "10px 0 20px" }}
										>
											Chi tiết cược
										</div>

										{ls.id_bet.id_bet ? (
											<>
												<div className="lsgd-table">
													<div>Trò chơi</div>
													<div>Tài xỉu 3p</div>
												</div>
												<div className="lsgd-table">
													<div>Phiên</div>
													<div>{ls.id_bet.id_bet}</div>
												</div>
												<div className="lsgd-table">
													<div>Thời gian</div>
													<div>{formatDate(new Date(ls.createdAt))}</div>
												</div>
												<div className="lsgd-table">
													<div>Đặt cược</div>
													<div>{GetNameChoose(ls.state, ls.type, ls.sanh)}</div>
												</div>
												<div className="lsgd-table">
													<div>Tổng đặt</div>
													<div>{Number(ls.money).toLocaleString()} đ</div>
												</div>
												<div className="lsgd-table">
													<div>Tổng thắng</div>
													<div>{Number(ls.moneythang).toLocaleString()} đ</div>
												</div>
												<h3
													style={{ fontSize: "0.4rem", margin: "20px 0 10px" }}
												>
													Kết quả phiên {ls.id_bet.id_bet}
												</h3>
												<div
													className="history_xucxac"
													style={{
														display: "flex",
														justifyContent: "center",
													}}
												>
													{ls.id_bet.result.split(" ").map((item) => (
														<div className={`n${item}`}></div>
													))}
												</div>
											</>
										) : null}
										<div>
											<div className="modalformcontrols">
												<button
													onClick={() => setShow(false)}
													className="popup-close"
													style={{
														background: "#0064ff",
														boxShadow: "none",
														textShadow: "none",
													}}
												>
													ĐÓNG
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}
			</div>
		</>
	);
}
export default XD5;
