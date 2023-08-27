import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import { GetNameChoose } from "../../../funcUtils";

function Xucxac3() {
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
		axios.get(`https://server.vnvip294.com/xucsac3/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.vnvip294.com/xucsac3/getallbet`, {})
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
			if (Math.floor(180 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`https://server.vnvip294.com/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://server.vnvip294.com/xucsac3/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`https://server.vnvip294.com/xucsac3/getallbet`, {})
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
		let curTime_second = Math.floor(180 - (date - dulieunhap) / 1000);

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
		} else if (curTime_second < 180 && curTime_second >= 0) {
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
		let curTime_second = Math.floor(180 - (date - dulieunhap) / 1000);
		let myTimeout = 0;
		if (start) {
			setSecond(curTime_second % 60);
			setMinute(Math.floor(curTime_second / 60));

			if (curTime_second > 180 || curTime_second <= 0) {
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
		
		axios
			.post("https://server.vnvip294.com/historyxucsac3p/choose", formData)
			.then((res) => {
				swal("Đặt cược thành công", "", "success");
				setItem([]);
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
		setActiveTab(tabName);
		getHistoryBet();
	};

	const [activeTabXX, setActiveTabXX] = useState("tabx1");
	const handleTabClickXX = (tabName) => {
		setActiveTabXX(tabName);
		setItem([])
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
	return (
		<>
			
			<div className="main">
				<Header profile={profile} />

				<div className="record_bet">
					<div className="colum-resultxs">
						<div className="col-50">
							{bet ? (
								<>
									<div className="info_bet">
										Phiên số <div className="xs_before">{bet.id_bet}</div>
									</div>
									<button className="btn-mini" onClick={openPopup}>
										Hướng dẫn cách chơi
									</button>
								</>
							) : (
								<div className="loading"><div className="loader"></div></div>
							)}
						</div>
						<div className="col-50">
							{total ? (
								<>
									<div className="info_bet">
										<div style={{ fontSize: "0.33rem" }}>Thời gian còn lại</div>
										<div className="count">
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
							) : null}
						</div>
						<div className="col-100">
							{total ? (
								<div className="box-quay">
									<div className="box">
										{total[0].result.split(" ").map((item, index) => (
											<div className={`num${item}`}></div>
										))}
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>

				<div className="main_game">
					<div className="route_game">
						<div className="text_choose_center">
							<ul className="tab-xucxac">
								<li
									className={activeTabXX === "tabx1" ? "active" : ""}
									onClick={() => handleTabClickXX("tabx1")}
								>
									CLTX
								</li>
								<li
									className={activeTabXX === "tabx2" ? "active" : ""}
									onClick={() => handleTabClickXX("tabx2")}
								>
									2 số trùng
								</li>
								<li
									className={activeTabXX === "tabx3" ? "active" : ""}
									onClick={() => handleTabClickXX("tabx3")}
								>
									3 số trùng
								</li>
							</ul>
							{activeTabXX === "tabx1" && (
								<div className="state_choose">
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
											{setting && setting.doiben}
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
											{setting && setting.doiben}
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
											{setting && setting.doiben}
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
											{setting && setting.doiben}
										</span>
									</div>
								</div>
							)}
							{activeTabXX === "tabx2" && (
								<div className="state_choose state_xucxac">
									<div
										onClick={onChoose}
										className={`state_rowindex ${
											item1.includes("00") ? "chooseItem" : ""
										}`}
										id="00"
									>
										<i id="00" className="state">
											Trùng bất kì
										</i>
										<span id="00" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="11"
										className={`state_rowindex ${
											item1.includes("11") ? "chooseItem" : ""
										}`}
									>
										<i id="11" className="state">
											11
										</i>
										<span id="11" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="22"
										className={`state_rowindex ${
											item1.includes("22") ? "chooseItem" : ""
										}`}
									>
										<i id="22" className="state">
											22
										</i>
										<span id="22" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="33"
										className={`state_rowindex ${
											item1.includes("33") ? "chooseItem" : ""
										}`}
									>
										<i className="state" id="33">
											33
										</i>
										<span id="33" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="44"
										className={`state_rowindex ${
											item1.includes("44") ? "chooseItem" : ""
										}`}
									>
										<i className="state" id="44">
											44
										</i>
										<span id="44" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="55"
										className={`state_rowindex ${
											item1.includes("55") ? "chooseItem" : ""
										}`}
									>
										<i className="state" id="55">
											55
										</i>
										<span id="55" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="66"
										className={`state_rowindex ${
											item1.includes("66") ? "chooseItem" : ""
										}`}
									>
										<i id="66" className="state">
											66
										</i>
										<span id="66" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
								</div>
							)}
							{activeTabXX === "tabx3" && (
								<div className="state_choose state_xucxac">
									<div
										onClick={onChoose}
										className={`state_rowindex ${
											item1.includes("000") ? "chooseItem" : ""
										}`}
										id="000"
									>
										<i id="000" className="state">
											Trùng bất kì
										</i>
										<span id="000" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="111"
										className={`state_rowindex ${
											item1.includes("111") ? "chooseItem" : ""
										}`}
									>
										<i id="111" className="state">
											111
										</i>
										<span id="111" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="222"
										className={`state_rowindex ${
											item1.includes("222") ? "chooseItem" : ""
										}`}
									>
										<i id="222" className="state">
											222
										</i>
										<span id="222" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="333"
										className={`state_rowindex ${
											item1.includes("333") ? "chooseItem" : ""
										}`}
									>
										<i className="state" id="333">
											333
										</i>
										<span id="333" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="444"
										className={`state_rowindex ${
											item1.includes("444") ? "chooseItem" : ""
										}`}
									>
										<i className="state" id="444">
											444
										</i>
										<span id="444" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="555"
										className={`state_rowindex ${
											item1.includes("555") ? "chooseItem" : ""
										}`}
									>
										<i className="state" id="555">
											555
										</i>
										<span id="555" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
									<div
										onClick={onChoose}
										id="666"
										className={`state_rowindex ${
											item1.includes("666") ? "chooseItem" : ""
										}`}
									>
										<i id="666" className="state">
											666
										</i>
										<span id="666" className="setting_type">
											{setting && setting.doiben}
										</span>
									</div>
								</div>
							)}
						</div>
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
												{item.sanh === "Xúc sắc 3p" ? (
													<div className="item_inner" onClick={() => {
														setLs(item);
														setShow(true);
													}}>
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
																{GetNameChoose(item.state, null,item.sanh)}
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

				{item1.length != 0 && (
				<div className="popup-bet">
					<form onSubmit={onSubmit}>
						<div className="footer_choose">
							<div className="title_choose_footer">
								<div className="item_choose_footer">
									<div style={{ display: "flex", alignItems: "center" }}>
										<b>Số tiền cược: </b>
										<input
											value={newMoney}
											onChange={(e) => setNewMoney(e.target.value)}
											required
											min="1"
											name="money"
											type="number"
											placeholder="Nhập số tiền cược"
										/>
									</div>
								</div>
								<div
									style={{ margin: "0.3rem 0 0" }}
									className="item_choose_footer"
								>
									<div style={{ display: "flex", alignItems: "center" }}>
										<span style={{ marginRight: "5px" }}>
											Đã chọn{" "}
											<span style={{ color: "red" }}>{item1.length}</span> , 
										</span>
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
									<button type="submit" className="btn-sbmit">
										Đặt lệnh
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
				)}

				{isOpen && (
					<div className="popup-backdrop">
						<div className="popup-main">
							<div className="popup-header">Hướng dẫn cách chơi</div>
							<div className="popup-content">
								Chiến thắng khi đặt cược kết quả 3 con Xúc sắc.
								<br />
								<br />
								<b>CLTX</b>
								<br />
								Kết quả được tính là tổng của 3 con Xúc sắc (tài/xỉu/lẻ/chẵn)
								<br />
								<br />
								<b>2 số trùng</b>
								<br />
								Kết quả được tính khi đổ Xúc sắc ra 2 con số giống nhau
								<br />
								<br />
								<b>3 số trùng</b>
								<br />
								Kết quả được tính khi đổ Xúc sắc ra 3 con số giống nhau
							</div>
							<button onClick={closePopup} className="popup-close">
								Đóng
							</button>
						</div>
					</div>
				)}

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
												<div>Xúc sắc 3p</div>
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
											<h3 style={{ fontSize: "0.4rem", margin: "20px 0 10px" }}>
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
export default Xucxac3;
