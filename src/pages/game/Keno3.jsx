import { Link} from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import swal from "sweetalert";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

function Keno3() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
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
		axios.get(`https://server.st666.pro/bet/get`).then((res) => {
			setBet(res.data.data);
			setDulieunhap(new Date(res.data.data.createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.st666.pro/bet/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios.get(`https://server.st666.pro/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(180 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`https://server.st666.pro/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://server.st666.pro/bet/get`).then((res) => {
					setBet(res.data.data);
					setDulieunhap(new Date(res.data.data.createdAt));
				});
				axios
					.get(`https://server.st666.pro/bet/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios.get(`https://server.st666.pro/notification/getnotifi`, {}).then((res) => {
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

	const [showPopup, setShowPopup] = useState(false);
	const onChoose = (e) => {
		console.log(e.target.id);
		if (item1.includes(e.target.id)) {
			setItem(item1.filter((item) => item !== e.target.id));
		} else {
			setItem([...item1, e.target.id]);
		}
	};
	const onSubmit =  (e) => {
		e.preventDefault()
		const formData={
			result: item1.join(" "),
			id:bet?._id,
			money: item1.length*newMoney
		}
		axios.post("https://server.st666.pro/history	/choose",formData).then((res)=>swal("Chọn thành công")).catch((err)=>swal("Chọn không thành công"))
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
	const [newMoney, setNewMoney]= useState()
	return (
		<>
			<div className="app1">
				<div className="info_profile">
					<div className="cycle_bet">
						<Link style={{ color: "white" }} to="/">
							<ArrowBackOutlinedIcon />
						</Link>
						<span className="title_game_header"> Kendo 3p</span>
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
											0{minute} : {second < 10 ? "0" : ""}
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
							<div className="bet_state">Bi thứ 1</div>
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
									<i className="state">C</i>
									<span className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
							</div>
						</div>
						<div className="text_choose_center">
							<div className="bet_state">Bi thứ 2</div>
							<div className="state_choose">
								<div
									onClick={onChoose}
									id="5"
									className={`state_rowindex ${
										item1.includes("5") ? "chooseItem" : ""
									}`}
								>
									<i id="5" className="state">
										T
									</i>
									<span id="5" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="6"
									className={`state_rowindex ${
										item1.includes("6") ? "chooseItem" : ""
									}`}
								>
									<i id="6" className="state">
										X
									</i>
									<span id="6" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="7"
									className={`state_rowindex ${
										item1.includes("7") ? "chooseItem" : ""
									}`}
								>
									<i id="7" className="state">
										L
									</i>
									<span id="7" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="8"
									className={`state_rowindex ${
										item1.includes("8") ? "chooseItem" : ""
									}`}
								>
									<i id="8" className="state">
										C
									</i>
									<span id="8" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
							</div>
						</div>
						<div className="text_choose_center">
							<div className="bet_state">Bi thứ 3</div>
							<div className="state_choose">
								<div
									onClick={onChoose}
									id="9"
									className={`state_rowindex ${
										item1.includes("9") ? "chooseItem" : ""
									}`}
								>
									<i id="9" className="state">
										T
									</i>
									<span id="9" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="10"
									className={`state_rowindex ${
										item1.includes("10") ? "chooseItem" : ""
									}`}
								>
									<i id="10" className="state">
										X
									</i>
									<span id="10" className="setting_type">
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
										L
									</i>
									<span id="11" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="12"
									className={`state_rowindex ${
										item1.includes("12") ? "chooseItem" : ""
									}`}
								>
									<i id="12" className="state">
										C
									</i>
									<span id="12" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
							</div>
						</div>
						<div className="text_choose_center">
							<div className="bet_state">Bi thứ 4</div>
							<div className="state_choose">
								<div
									onClick={onChoose}
									id="13"
									className={`state_rowindex ${
										item1.includes("13") ? "chooseItem" : ""
									}`}
								>
									<i id="13" className="state">
										T
									</i>
									<span id="13" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="14"
									className={`state_rowindex ${
										item1.includes("14") ? "chooseItem" : ""
									}`}
								>
									<i id="14" className="state">
										X
									</i>
									<span id="14" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="15"
									className={`state_rowindex ${
										item1.includes("15") ? "chooseItem" : ""
									}`}
								>
									<i id="15" className="state">
										L
									</i>
									<span id="15" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="16"
									className={`state_rowindex ${
										item1.includes("16") ? "chooseItem" : ""
									}`}
								>
									<i id="16" className="state">
										C
									</i>
									<span id="16" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
							</div>
						</div>
						<div className="text_choose_center">
							<div className="bet_state">Bi thứ 5</div>
							<div className="state_choose">
								<div
									onClick={onChoose}
									id="17"
									className={`state_rowindex ${
										item1.includes("17") ? "chooseItem" : ""
									}`}
								>
									<i id="17" className="state">
										T
									</i>
									<span id="17" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="18"
									className={`state_rowindex ${
										item1.includes("18") ? "chooseItem" : ""
									}`}
								>
									<i id="18" className="state">
										X
									</i>
									<span id="18" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="19"
									className={`state_rowindex ${
										item1.includes("19") ? "chooseItem" : ""
									}`}
								>
									<i id="19" className="state">
										L
									</i>
									<span id="19" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="20"
									className={`state_rowindex ${
										item1.includes("20") ? "chooseItem" : ""
									}`}
								>
									<i id="20" className="state">
										C
									</i>
									<span id="20" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
							</div>
						</div>
						<div className="text_choose_center">
							<div className="bet_state">Tổng</div>
							<div className="state_choose">
								<div
									onClick={onChoose}
									id="21"
									className={`state_rowindex ${
										item1.includes("21") ? "chooseItem" : ""
									}`}
								>
									<i id="21" className="state">
										T
									</i>
									<span id="21" className="setting_type">
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
										X
									</i>
									<span id="22" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="23"
									className={`state_rowindex ${
										item1.includes("23") ? "chooseItem" : ""
									}`}
								>
									<i id="23" className="state">
										L
									</i>
									<span id="23" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
								<div
									onClick={onChoose}
									id="24"
									className={`state_rowindex ${
										item1.includes("24") ? "chooseItem" : ""
									}`}
								>
									<i id="24" className="state">
										C
									</i>
									<span id="24" className="setting_type">
										{setting && setting.doiben}
									</span>
								</div>
							</div>
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
										onChange={(e)=>setNewMoney(e.target.value)}
										required
										min="1"
										name="money"
										type="number"
										placeholder="Chọn số tiền cược"
									/>
								</div>
								<div style={{ display: "flex", alignItems: "center" }}>
									<span style={{marginRight:"5px"}}>
										Đã chọn <span style={{ color: "red" }}>{item1.length},</span>
									</span>
									<span>
										Tổng số <span style={{ color: "red" }}>{item1.length!=0&&newMoney?(item1.length*newMoney).toLocaleString():0} đ</span>
									</span>
								</div>
							</div>
							<div style={{justifyContent:"flex-end"}} className="item_choose_footer">
								<button type="submit" className="btn-sbmit">Đặt lệnh</button>
							</div>
						</div>
					</div>
				</form>
				<div className="footer"></div>
			</div>
		</>
	);
}
export default Keno3;
