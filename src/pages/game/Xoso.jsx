import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import swal from "sweetalert";
import Footer from "../../components/Footer/Footer";
import { GetNameChoose } from "../../funcUtils";

function Xoso() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
	const [historyGame, setHistoryGame] = useState(null);
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(1);
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
		axios.get(`https://server.st666.pro/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`https://server.st666.pro/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});
		axios.get(`https://server.st666.pro/bet1/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.st666.pro/bet1/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios
			.get(`https://server.st666.pro/notification/getnotifi`, {})
			.then((res) => {
				setVisible({
					money: res.data.data[0].money.toLocaleString(),
					id: res.data.data[0]._id,
				});
			});
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(60 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`https://server.st666.pro/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://server.st666.pro/bet1/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`https://server.st666.pro/bet1/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios
					.get(`https://server.st666.pro/notification/getnotifi`, {})
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
					axios.post("https://server.st666.pro/notification/seen", {
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
		let curTime_second = Math.floor(60 - (date - dulieunhap) / 1000);

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
		} else if (curTime_second < 60 && curTime_second >= 0) {
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
		let curTime_second = Math.floor(60 - (date - dulieunhap) / 1000);
		let myTimeout = 0;
		if (start) {
			setSecond(curTime_second % 60);
			setMinute(Math.floor(curTime_second / 60));

			if (curTime_second > 60 || curTime_second <= 0) {
				setStart(false);
				setMinute(1);
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
		console.log(e.target.id);
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
			.post("https://server.st666.pro/history1/choose", formData)
			.then((res) => swal("Đặt cược thành công", "", "success"))
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
	function getHistoryBet() {
		axios
			.get(`https://server.st666.pro/history/historyus`, {})
			.then((res) => {
				setHistoryGame(res.data.data);
			})
			.catch((err) => function () {});
	}
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img src={require("../../img/vietllot.png")} alt="Logo" />
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
											<div>0</div>
											<div>{minute}</div>
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
										onClick={() => {
											//setShowPopup(!showPopup);
										}}
										className="info_bet"
									>
										<div style={{ fontSize: "0.33rem" }}>
											Kết quả phiên{" "}
											<b style={{ color: "#333" }}>{total[0].id_bet}</b>{" "}
										</div>
										<div className="ball_xs" style={{ margin: "0.3rem auto", justifyContent: "center" }}>
											{total[0].result.split(" ").map((item) => (
												<div className="ball">{item}</div>
											))}
										</div>
									</div>
								</>
							) : null}
						</div>
						<div className="col-100">
							<div style={{display:"flex"}}>
								<button className="btn-mini" onClick={openPopup}>
									Hướng dẫn cách chơi
								</button>
								<button
									className="btn-mini"
									onClick={openPopup}
									style={{ border: "1px solid #00b977", color: "#00b977" }}
								>
									Chi tiết kết quả
								</button>
								<button
									className="btn-mini"
									onClick={openPopup}
									style={{ border: "1px solid #477bff", color: "#477bff" }}
								>
									Lịch sử của bạn
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="main_game">
					<div className="route_game">
						<div className="text_choose_center">
							<div className="bet_state">Chọn Số</div>
							<div className="state_choose">
								<div
									onClick={onChoose}
									className={`state_rowindex ${
										item1.includes("1") ? "chooseItem" : ""
									}`}
									id="1"
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
							</div>
						</div>
					</div>
				</div>
				<Footer />

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
											placeholder="Chọn số tiền cược"
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
											<span style={{ color: "red" }}>{item1.length},</span>
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
			</div>
		</>
	);
}
export default Xoso;
