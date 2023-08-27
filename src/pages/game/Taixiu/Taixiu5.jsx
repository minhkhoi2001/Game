import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import { GetNameChoose } from "../../../funcUtils";

function Taixiu5() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
	const [historyGame, setHistoryGame] = useState(null);
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(3);
	const [start, setStart] = useState(false);
	const [dulieunhap, setDulieunhap] = useState(new Date());
	const [update, setUpdate] = useState(0);

	const date = new Date();
	const currentMinute = date.getMinutes();
	const currentSecond = date.getSeconds();
	const [item, setState] = useState(null);
	const [total, setTotal] = useState(null);
	const [total2, setTotal2] = useState(null);
	const [setting, setSetting] = useState(null);
	const [item1, setItem] = useState([]);
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
		axios.get(`https://server.vnvip294.com/taixiu5/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.vnvip294.com/taixiu5/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
				setTotal2(res.data.data);
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
			if (Math.floor(300 - (new Date() - dulieunhap) / 1000) < 0) {
				axios
					.get(`https://server.vnvip294.com/auth/getUser`, {})
					.then((res) => {
						setProfile(res.data.data);
					});
				axios.get(`https://server.vnvip294.com/taixiu5/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`https://server.vnvip294.com/taixiu5/getallbet`, {})
					.then((res) => {
						rollLottery(res);
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
				setMinute(3);
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

	const onChoose = (e) => {
		if (item1.includes(e.target.id)) {
			setItem(item1.filter((item) => item !== e.target.id));
		} else {
			setItem([...item1, e.target.id]);
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = {
			result: item1.join(" "),
			id: bet?._id,
			money: item1.length * newMoney,
		};
		if (item1.length == 0) {
			swal("Thất bại", "Bạn chưa lựa chọn", "error");
		} else if (newMoney == 0 || newMoney == null) {
			swal("Thất bại", "Bạn chưa nhập tiền", "error");
		} else {
			axios
				.post("https://server.vnvip294.com/tx5/choose", formData)
				.then((res) => {
					swal("Đặt cược thành công", "", "success");
					setItem([]);
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
	const [newMoney, setNewMoney] = useState();

	const [activeTab, setActiveTab] = useState("tab1");
	const handleTabClick = (tabName) => {
		setActiveTab(tabName);
		getHistoryBet();
	};

	const [activeTabXX, setActiveTabXX] = useState("tabx1");
	const handleTabClickXX = (tabName) => {
		setActiveTabXX(tabName);
		setItem([]);
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
	const options = [
		"1000000",
		"3000000",
		"8000000",
		"24000000",
		"60000000",
		"150000000",
		"400000000",
		"900000000",
	];
	const [activeOption, setActiveOption] = useState(null);

	const handleOptionClick = (option) => {
		setActiveOption(option);
		setNewMoney(option);
	};
	return (
		<>
			<div className="main">
				<Header profile={profile} />

				<div
					className="record_bet"
					style={{
						minHeight: "auto",
						margin: "0 0 0.3rem",
						padding: ".3rem 0 .6rem",
					}}
				>
					<div className="colum-resultxs">
						<section className="col-100">
							{total && bet ? (
								<>
									<div className="info_bet">
										Phiên số <span className="xs_before">{bet.id_bet}</span>
										<div className="count2">
											<div>0</div>
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
							) : (
								<div className="loading">
									<div className="loader"></div>
								</div>
							)}
						</section>
					</div>
				</div>

				<div style={{ minHeight: "2rem" }}>
					{total ? (
						<div className="box-quay">
							<div className="box">
								{total[0]?.result.split(" ").map((item, index) => (
									<div className={`num${item}`}></div>
								))}
							</div>
						</div>
					) : null}
				</div>

				<div className="main_game">
					<div className="text_choose_center2">
						<div className="state_choose state_choose2">
							<div
								onClick={onChoose}
								id="1"
								className={`state_rowindex ${
									item1.includes("1") ? "chooseItem" : ""
								}`}
							>
								<i id="1" className="state">
									T
								</i>
								<span id="1" className="setting_type">
									{setting && setting.tx5}
								</span>
							</div>
							<div
								onClick={onChoose}
								id="2"
								className={`state_rowindex ${
									item1.includes("2") ? "chooseItem" : ""
								}`}
							>
								<i id="2" className="state">
									X
								</i>
								<span id="2" className="setting_type">
									{setting && setting.tx5}
								</span>
							</div>
							<div
								onClick={onChoose}
								id="3"
								className={`state_rowindex ${
									item1.includes("3") ? "chooseItem" : ""
								}`}
							>
								<i id="3" className="state">
									L
								</i>
								<span id="3" className="setting_type">
									{setting && setting.tx5}
								</span>
							</div>
							<div
								onClick={onChoose}
								id="4"
								className={`state_rowindex ${
									item1.includes("4") ? "chooseItem" : ""
								}`}
							>
								<i id="4" className="state">
									C
								</i>
								<span id="4" className="setting_type">
									{setting && setting.tx5}
								</span>
							</div>
						</div>
					</div>
					<div
						className="text_choose_center"
						style={{ padding: "0.6rem 0.16667rem" }}
					>
						<form onSubmit={onSubmit} className="form-lg">
							<div className="footer_choose1">
								<div className="title_choose_footer1">
									<div className="state_choose state_choose_price">
										{options.map((option) => (
											<div
												key={option}
												className={`state_rowindex ${
													activeOption === option ? "chooseItem" : ""
												}`}
												onClick={() => handleOptionClick(option)}
											>
												<span className="setting_type">
													{Number(option).toLocaleString()}
												</span>
											</div>
										))}
									</div>
									<div className="item_choose_footer1">
										<div
											style={{ textAlign: "center", margin: "0 auto 0.5rem" }}
										>
											<span>
												Tổng tiền cược{" "}
												<span style={{ color: "red" }}>
													{item1.length != 0 && newMoney
														? (item1.length * newMoney).toLocaleString()
														: 0}{" "}
													đ
												</span>
											</span>
										</div>
										<button
											type="submit"
											className="btn-sbmit"
											style={{ margin: "0.1rem auto 0" }}
										>
											Đặt lệnh
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>

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

				{isShow === true && ls.status_bet != "Pending" ? (
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
													<div>Tổng Cược</div>
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
export default Taixiu5;
