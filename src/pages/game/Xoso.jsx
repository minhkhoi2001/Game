import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import swal from "sweetalert";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function Xoso() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
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
		axios.get(`http://localhost/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`http://localhost/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});
		axios.get(`http://localhost/Xoso/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`http://localhost/bet1/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios.get(`http://localhost/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(1800 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`http://localhost/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`http://localhost/bet1/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`http://localhost/bet1/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios.get(`http://localhost/notification/getnotifi`, {}).then((res) => {
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
					axios.post("http://localhost/notification/seen", {
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

	const [showPopup, setShowPopup] = useState(false);
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
			.post("http://localhost/history1/choose", formData)
			.then((res) => swal("Chọn thành công"))
			.catch((err) => swal("Chọn không thành công"));
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
	return (
		<>
			<div className="app1">
				<div className="info_profile">
					<div className="cycle_bet">
						<Link style={{ color: "white" }} to="/">
							<ArrowBackOutlinedIcon />
						</Link>
						<span className="title_game_header"> Kendo Xổ số</span>
					</div>
					<div style={{ display: "flex", float: "right" }}>
						{isShow && profile ? (
							<span style={{ color: "white", marginRight: "15px" }}>
								{Number(profile.money).toLocaleString()}đ
							</span>
						) : null}
						<div
							onClick={() => {
								setShow(!isShow);
							}}
						>
							<RemoveRedEyeIcon />
						</div>
					</div>
				</div>

				<div className="record_bet">
					<div className="colum-resultxs">
						<div className="col-50">
							{bet ? (
								<>
									<div className="info_bet">
										Phiên số {bet.id_bet}
										<div className="count">
											{minute} : {second < 10 ? "0" : ""}
											{second}
										</div>
									</div>
								</>
							) : (
								<span></span>
							)}
						</div>
						<div className="col-50">
							{total ? (
								<>
									<div
										style={{ cursor: "pointer" }}
										onClick={() => {
											setShowPopup(!showPopup);
										}}
										className="info_bet"
									>
										Kết quả phiên số {total[0].id_bet}{" "}
										<ArrowDropDownIcon sx={{ marginBottom: "-5px" }} />
										<div className="ball_xs">
											{total[0].result.split(" ").map((item) => (
												<div className="ball">{item}</div>
											))}
										</div>
									</div>
								</>
							) : null}
						</div>
					</div>
					{showPopup && (
						<div className="award_tb">
							<table>
								<thead>
									<tr>
										<td style={{ textAlign: "center" }}>Phiên số</td>
										<td style={{ textAlign: "center" }}>Kết quả giải thưởng</td>
										<td style={{ textAlign: "center" }}>Kết quả</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style={{ textAlign: "center" }}>{bet && bet.id_bet}</td>
										<td style={{ textAlign: "center" }}>Đang chờ kết quả</td>
										<td style={{ textAlign: "center" }}>
											{bet && formatDate(new Date(bet.createdAt))}
										</td>
									</tr>
									{total &&
										total.map((item, index) => (
											<>
												<tr
													key={index}
													style={{
														backgroundColor: `${index % 2 == 1 && "#f4f4f4"}`,
													}}
												>
													<td style={{ textAlign: "center" }}>{item.id_bet}</td>
													<td
														style={{
															textAlign: "center",
															display: "flex",
															justifyContent: "center",
														}}
													>
														{item.result.split(" ").map((x) => (
															<div className="redball">{x}</div>
														))}
													</td>
													<td style={{ textAlign: "center" }}>
														{formatDate(new Date(item.createdAt))}
													</td>
												</tr>
											</>
										))}
								</tbody>
							</table>
						</div>
					)}
					<div className="route_game">
						<div className="route_game_container"></div>
						<div className="text_choose_center">
							{Array.from(Array(100), (e, i) => {
								return <div key={i}>{i<10?`0${i}`:`${i}`}</div>;
							})}
						</div>
					</div>
				</div>
			</div>

			<div className="bg-menu1">
				<form onSubmit={onSubmit}>
					<div className="footer_choose">
						<div className="title_choose_footer">
							<div className="item_choose_footer">
								<div style={{ display: "flex", alignItems: "center" }}>
									Số tiền cược:{" "}
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
								<div style={{ display: "flex", alignItems: "center" }}>
									<span style={{ marginRight: "5px" }}>
										Đã chọn{" "}
										<span style={{ color: "red" }}>{item1.length},</span>
									</span>
									<span>
										Tổng số{" "}
										<span style={{ color: "red" }}>
											{item1.length != 0 && newMoney
												? (item1.length * newMoney).toLocaleString()
												: 0}{" "}
											đ
										</span>
									</span>
								</div>
							</div>
							<div
								style={{ justifyContent: "flex-end" }}
								className="item_choose_footer"
							>
								<button type="submit" className="btn-sbmit">
									Đặt lệnh
								</button>
							</div>
						</div>
					</div>
				</form>
				<div className="footer"></div>
			</div>
		</>
	);
}
export default Xoso;
