import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import { GetNameChoose } from "../../../funcUtils";
import chen from "./img/chen.png";
import dia from "./img/dia.png";
import "./xd.css";
import ChatButton from "../../components/ChatButton";
import ShareChat from "../../components/ShareChat";

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
	const [newMoney, setNewMoney] = useState(null);
	const [message, setMessage] = useState(null);
	const [share, setShare] = useState(false);
	const hide = () => {
		setShare(false);
	};

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
	const [activeOption, setActiveOption] = useState(null);

	const handleOptionClick = (option) => {
		setActiveOption(option);
		setNewMoney(Number(Number(option) * 1000).toLocaleString());
	};
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
		axios
			.get(`https://server.vnvip294.com/notification/getnotifi`, {})
			.then((res) => {
				setVisible({
					money: res.data.data[0].money.toLocaleString(),
					id: res.data.data[0]._id,
				});
			});
		getHistoryBet();
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(300 - (new Date() - dulieunhap) / 1000) < 0) {
				axios
					.get(`https://server.vnvip294.com/auth/getUser`, {})
					.then((res) => {
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
				axios
					.get(`https://server.vnvip294.com/notification/getnotifi`, {})
					.then((res) => {
						setVisible({
							money: res.data.data[0].money.toLocaleString(),
							id: res.data.data[0]._id,
						});
					});
				getHistoryBet();
			}
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, [dulieunhap]);
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
			setSecond(curTime_second);
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
			setSecond(curTime_second);
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
	const [choose, setChoose] = useState([]);
	function onChoose(num) {
		if (choose.includes(num)) {
			setChoose(choose.filter((item) => item !== num));
		} else {
			setChoose([...choose, num]);
		}
	}
	const onSubmit = (e) => {
		e.preventDefault();
		if (newMoney == 0 || newMoney == null) {
			swal("Thất bại", "Bạn chưa nhập tiền", "error");
			return;
		}
		const formData = {
			result: choose.join(" "),
			id: bet?._id,
			money:
				choose.length *
				Number(newMoney.replaceAll(".", "").replaceAll(",", "")),
		};
		if (formData.money > profile.money) {
			swal("Thất bại", "Số dư không đủ", "error");
			return;
		}
		if (Number(second) > 10) {
			if (choose.length == 0) {
				swal("Thất bại", "Bạn chưa lựa chọn", "error");
			} else {
				axios
					.post("https://server.vnvip294.com/cxd5/choose", formData)
					.then((res) => {
						swal({
							title: "Đặt cược thành công",
							icon: "success",
							buttons: {
								ok: true,
								share: {
									text: "Chia sẻ",
									value: "share",
								},
							},
						}).then((value) => {
							switch (value) {
								case "share":
									setShare(true);
									setMessage(
										"hethong__Xóc đĩa 5p__" +
											profile.username +
											"__" +
											formData.money +
											"__" +
											GetNameChoose(formData.result, null, "Xóc dĩa 5p")
									);
									break;
								default:
							}
						});
						setChoose([]);
						axios
							.get(`https://server.vnvip294.com/auth/getUser`, {})
							.then((res) => {
								setProfile(res.data.data);
							});
						getHistoryBet();
					})
					.catch((err) => swal("Đã xảy ra lỗi", "Vui lòng tải lại trang", "error"));
			}
		} else {
			swal("Đã hết thời gian cược", "Vui lòng chờ phiên tiếp theo", "info");
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
	useEffect(() => {
		if (Number(second) === 2) {
			document.querySelector(".point").style.animation =
				"movePoint 4s forwards";
			document.querySelector(".check").style.animation = "";
		} else if (Number(second) === 295) {
			getHistoryBet()
		} else if (Number(second) === 290) {
			document.querySelector(".point").style.animation =
				"movePointBack 4s forwards";
		} else if (Number(second) === 285) {
			document.querySelector(".point").style.animation = "shake 4s forwards";
			document.querySelector(".check").style.animation = "shake1 4s forwards";
		} else if (Number(second) === 275) {
			document.querySelector(".point").style.animation =
				"movePointBack 4s forwards";
			document.querySelector(".check").style.animation = "";
		} else if (Number(second) < 275 && Number(second) > 2) {
			document.querySelector(".point").style.animation =
				"movePointBack 4s forwards";
			document.querySelector(".check").style.animation = "";
		}
	}, [second]);

	return (
		<>
			<div className="main xd">
				<Header profile={profile} />
				<div className="box-bg-game">
					<div className="bg-game">
						<div
							data-v-45adac70=""
							className="v_circle taste_lottery_countdown xodi  v_circle_show v_circle_PC"
						>
							<div data-v-45adac70="" className="mask half">
								<div
									data-v-45adac70=""
									className="fill fix"
									style={{ transform: `rotate(${second}deg)` }}
								></div>
							</div>
							<div
								data-v-45adac70=""
								flex="main:center cross:center"
								className="pv"
							>
								<span data-v-45adac70="" className="progress">
									{second}
								</span>
							</div>
						</div>
						<div className="boxdia">
							<img
								src={chen}
								className="point"
								alt=""
								style={{ animation: "movePointBack" }}
							/>
							<img className="check" src={dia} alt="" />
							{total && (
								<div className="history_xucxac result-dia">
									{total[0].result.split(" ").map((item) => (
										<div className={`a${item}`}></div>
									))}
								</div>
							)}
						</div>
						<div className="timexd">
							<span style={{ fontSize: "0.4rem" }}>Phiên {bet?.id_bet}</span>{" "}
							<br />
							<span style={{ opacity: "0.7" }}>
								{bet ? formatDate(new Date(bet.createdAt)) : null}
							</span>
						</div>
					</div>
				</div>
				<div>
					<button
						className={`taste_unit_item ${
							choose.includes("6") ? "active" : ""
						}`}
						onClick={(e) => onChoose("6")}
					>
						<div className="taste_unit_img taste_unit_img_DAN"></div>
						<div className="taste_unit_odds">{setting && setting.le}</div>
					</button>
					<button
						className={`taste_unit_item ${
							choose.includes("5") ? "active" : ""
						}`}
						onClick={(e) => onChoose("5")}
					>
						<div className="taste_unit_img taste_unit_img_SHUANG"></div>
						<div className="taste_unit_odds">{setting && setting.chan}</div>
					</button>
					<button
						className={`taste_unit_item ${
							choose.includes("4") ? "active" : ""
						}`}
						onClick={(e) => onChoose("4")}
					>
						<div>
							<div className="nums_yxx_qw">
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
							</div>
						</div>
						<div className="taste_unit_odds">{setting && setting.f3trang}</div>
					</button>
					<button
						className={`taste_unit_item ${
							choose.includes("3") ? "active" : ""
						}`}
						onClick={(e) => onChoose("3")}
					>
						<div>
							<div className="nums_yxx_qw">
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
							</div>
						</div>
						<div className="taste_unit_odds">{setting && setting.f3den}</div>
					</button>
					<button
						className={`taste_unit_item ${
							choose.includes("2") ? "active" : ""
						}`}
						onClick={(e) => onChoose("2")}
					>
						<div>
							<div className="nums_yxx_qw">
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_w die"></div>
							</div>
						</div>
						<div className="taste_unit_odds">{setting && setting.ftrang}</div>
					</button>
					<button
						className={`taste_unit_item ${
							choose.includes("1") ? "active" : ""
						}`}
						onClick={(e) => onChoose("1")}
					>
						<div>
							<div className="nums_yxx_qw">
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
								<div className="taste_unit_item_yxx taste_unit_item_r die"></div>
							</div>
						</div>
						<div className="taste_unit_odds">{setting && setting.fden}</div>
					</button>
				</div>
				<div className="bet_taste_chips">
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "50" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("50")}
					>
						<div
							data-v-331b32c3=""
							flex="main:center cross:center"
							className="taste_chip"
						>
							<div data-v-331b32c3="" className="taste_chip_base taste_chip_10">
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">50K</span>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "100" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("100")}
					>
						<div
							data-v-331b32c3=""
							flex="main:center cross:center"
							className="taste_chip"
						>
							<div
								data-v-331b32c3=""
								flex="main:center cross:center"
								className="taste_chip_base taste_chip_25"
							>
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">100K</span>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "500" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("500")}
					>
						<div data-v-331b32c3="" className="taste_chip">
							<div data-v-331b32c3="" className="taste_chip_base taste_chip_50">
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">500K</span>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "1000" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("1000")}
					>
						<div data-v-331b32c3="" className="taste_chip">
							<div
								data-v-331b32c3=""
								className="taste_chip_base taste_chip_100"
							>
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">1000K</span>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "5000" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("5000")}
					>
						<div data-v-331b32c3="" className="taste_chip">
							<div
								data-v-331b32c3=""
								className="taste_chip_base taste_chip_200"
							>
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">5000K</span>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "10000" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("10000")}
					>
						<div data-v-331b32c3="" className="taste_chip">
							<div
								data-v-331b32c3=""
								className="taste_chip_base taste_chip_500"
							>
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">10000K</span>
								</div>
							</div>
						</div>
					</div>
					<div
						data-v-331b32c3=""
						className={`taste_chips_swiper_item ${
							activeOption === "5000" ? "active" : ""
						}`}
						onClick={() => handleOptionClick("50000")}
					>
						<div data-v-331b32c3="" className="taste_chip">
							<div data-v-331b32c3="" className="taste_chip_base taste_chip_5">
								<div data-v-331b32c3="" className="item_chip_num">
									<span data-v-331b32c3="">50000K</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bet-input-panel bet_panel_taste">
					<div
						data-v-331b32c3=""
						flex="main:justify box:justify cross:center"
						className="bet_taste_info"
					>
						<button
							data-v-331b32c3=""
							className="bet_taste_reset"
							onClick={() => {
								setActiveOption(null);
								setNewMoney(null);
							}}
						>
							Đặt lại
						</button>
						<div data-v-331b32c3="" className="bet_taste_text">
							<div
								data-v-331b32c3=""
								flex="main:center cross:center"
								className="bet_taste_num vi"
							>
								<span data-v-331b32c3="" className="bet_taste_text__common">
									Đã chọn
								</span>
								<span data-v-331b32c3="" className="bet_taste_text__protrude">
									{choose ? choose.length : 0}
								</span>
								<span data-v-331b32c3="" className="bet_taste_text__common">
									Lô
								</span>
							</div>
							<div
								data-v-331b32c3=""
								flex="cross:center"
								className="bet_taste_money"
							>
								<input
									data-v-331b32c3=""
									flex-box="8"
									className="bet_taste_money_bet"
									min={10000}
									value={newMoney}
									onChange={(e) => setNewMoney(e.target.value)}
									onClick={() => setActiveOption(null)}
									onKeyUp={(e) =>
										setNewMoney(
											Number(
												e.target.value.replaceAll(".", "").replaceAll(",", "")
											).toLocaleString()
										)
									}
									name="money"
									type="text"
									placeholder="Nhập số tiền"
								/>
							</div>
						</div>
						<button
							data-v-331b32c3=""
							className="bet_taste_submit"
							type="submit"
							onClick={onSubmit}
						>
							Đặt cược
						</button>
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
											<td>Phiên</td>
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
														<td>{item?.id_bet}</td>
														<td
															className="history_xucxac"
															style={{
																display: "flex",
																justifyContent: "center",
															}}
														>
															{item.result.split(" ").map((item) => (
																<div className={`a${item}`}></div>
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
												{item.sanh === "Xóc dĩa 5p" ? (
													<div
														className="item_inner"
														onClick={() => {
															setLs(item);
															setShow(true);
														}}
													>
														<div className="item_history">
															<div className="title_item_history">
																<span
																	className="sanh"
																	style={{ color: "#f5f5f5" }}
																>
																	{item.sanh}
																</span>
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
																Phiên:{" "}
																{item?.id_bet?.id_bet
																	? item?.id_bet?.id_bet
																	: item?.id_bet}
															</div>
															<div className="id_history_sanh">
																{GetNameChoose(item.state, null, item.sanh)}
															</div>
														</div>
														<div className="money_history">
															<span
																className="money"
																style={{ color: "#f2f2f2" }}
															>
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

				<ChatButton />
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
													<div>Xóc đĩa 5p</div>
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
														fontSize: "13px",
													}}
												>
													{ls.id_bet.result.split(" ").map((item) => (
														<div className={`a${item}`}></div>
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

				<ShareChat show={share} hide={hide} message={message} />
			</div>
		</>
	);
}
export default XD5;
