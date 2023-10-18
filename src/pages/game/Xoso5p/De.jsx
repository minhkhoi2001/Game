import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import Results from "./0_Results";
import History from "./0_History";
import TabNavigation from "./0_Tab";
import Header from "../../components/Header";

function De() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [newData, setNewData] = useState(null);
	const [profile, setProfile] = useState(null);
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(5);
	const [start, setStart] = useState(false);
	const [dulieunhap, setDulieunhap] = useState(new Date());
	const [update, setUpdate] = useState(0);

	const date = new Date();
	const currentMinute = date.getMinutes();
	const currentSecond = date.getSeconds();
	const [item, setState] = useState(null);
	const [total, setTotal] = useState(null);
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
	function rollLottery(res) {
		const interval = setInterval(() => {
			const randomDigits = Math.floor(Math.random() * 90000) + 10000;
			setTotal([
				{ id_bet: res.data.data[0].id_bet, dacbiet: String(randomDigits) },
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
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`${process.env.REACT_APP_API_URL}/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});
		axios.get(`${process.env.REACT_APP_API_URL}/Xoso5/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`${process.env.REACT_APP_API_URL}/Xoso5/getallbet`, {})
			.then((res) => {
				rollLottery(res);
				setNewData(res.data.data);
			})
			.catch(() => setTotal(null));
		axios
			.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {})
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
					.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
					.then((res) => {
						setProfile(res.data.data);
					});
				axios.get(`${process.env.REACT_APP_API_URL}/Xoso5/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`${process.env.REACT_APP_API_URL}/Xoso5/getallbet`, {})
					.then((res) => {
						rollLottery(res);
						setNewData(res.data.data);
					})
					.catch(() => setTotal(null));
				axios
					.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {})
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
					axios.post("https://server.best96tx.com/notification/seen", {
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
		setIsOpen2(true);
	};
	const closePopup2 = () => {
		setIsOpen2(false);
	};

	const onChoose = (e) => {
		
		if (item1.includes(e.target.id) && item1.length < 10) {
			setItem(item1.filter((item) => item !== e.target.id));
		} else if (item1.length < 10) {
			setItem([...item1, e.target.id]);
		} else {
			swal("Chú ý", "Bạn chỉ được chọn tối đa 10 số", "warning");
			item1.pop();
			setItem(item1);
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const newData = [];
		item1.map((item) => {
			if (item < 10) {
				newData.push("0" + item);
			} else {
				newData.push(item);
			}
		});
		const formData = {
			state: newData.join(" "),
			id: bet._id,
			type: 3,
			money: item1.length * newMoney,
		};
		if (item1.length > 0) {
			axios
				.post("https://server.best96tx.com/history5pxs/choose", formData)
				.then((res) => {
					swal("Đặt cược thành công", "", "success");
					setItem([]);
				})
				.catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
		} else {
			swal("Thất bại", "Bạn chưa chọn số đánh", "info");
		}
	};
	const [newMoney, setNewMoney] = useState();

	const numbers = Array.from(Array(100).keys());
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
										<div style={{ fontSize: "0.33rem" }}>
											Phiên số <b style={{ color: "#333" }}>{bet.id_bet}</b>
										</div>
									</div>
								</>
							) : (
								<div className="loading">
									<div className="loader"></div>
								</div>
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
								<button
									className="btn-mini"
									onClick={openPopup2}
									style={{ border: "1px solid #477bff", color: "#477bff" }}
								>
									Lịch sử của bạn
								</button>
								<button
									className="btn-mini"
									onClick={openPopup1}
									style={{ border: "1px solid #00b977", color: "#00b977" }}
								>
									Chi tiết kết quả
								</button>
							</div>
						</div>
					</div>
				</div>

				<TabNavigation />

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
													placeholder="Nhập số tiền cược"
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
													Đã chọn{" "}
													<span style={{ color: "red" }}>{item1.length}</span> , 
												</span>
												<span>
													Tổng tiền cược{" "}
													<span style={{ color: "red" }}>
														{item1.length != 0 && newMoney
															? (item1.length * newMoney).toLocaleString()
															: 0}
														đ
													</span>
												</span>
											</div>
											<div
												style={{
													margin: "0.1rem auto",
													textAlign: "left",
													width: "90%",
												}}
											>
												Tỉ lệ cược{" "}
												{setting
													? "1 : " + setting.de
													: "Chưa cài đặt"}
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

				<Results isOpen={isOpen1} total={newData} closePopup={closePopup1} />

				<History isOpen={isOpen2} closePopup={closePopup2} />
			</div>
		</>
	);
}
export default De;
