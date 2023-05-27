import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import Results from "./0_Results";
import History from "./0_History";
import TabNavigation from "./0_Tab";
import Header from "../../components/Header";
import CountDown from "./0_countdown";

function De() {
	const [isVisible, setVisible] = useState(null);
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
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
		axios
			.get(`https://mu88.live/api/front/open/lottery/history/list/5/miba`)
			.then((res) => {
				console.log(JSON.parse(res.data.t.issueList[0].detail)[2].split(",").join(" "));
				setBet(res.data.t);
				setTotal([{
					dacbiet:JSON.parse(res.data.t.issueList[0].detail)[0],
					nhat:JSON.parse(res.data.t.issueList[0].detail)[1],
					hai:JSON.parse(res.data.t.issueList[0].detail)[2].split(",").join(" "),
					ba:JSON.parse(res.data.t.issueList[0].detail)[3].split(",").join(" "),
					tu:JSON.parse(res.data.t.issueList[0].detail)[4].split(",").join(" "),
					nam:JSON.parse(res.data.t.issueList[0].detail)[5].split(",").join(" "),
					sau:JSON.parse(res.data.t.issueList[0].detail)[6].split(",").join(" "),
					bay:JSON.parse(res.data.t.issueList[0].detail)[7].split(",").join(" "),
				}])
			});
		axios.get(`https://server.vnvip294.com/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`https://server.vnvip294.com/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});

		axios.get(`https://server.vnvip294.com/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
	}, []);

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
			}else if(item>=10&&item<100){
				newData.push(item)
			}
		})
		const currentDate = new Date()
		if(Number(currentDate.getHours()+""+currentDate.getMinutes())>1800&&Number(currentDate.getHours()+""+currentDate.getMinutes())<1915){
			swal("Đặt cược không thành công.", " Đang chờ kết quả", "warning")
		}else{
			let id=""
			axios
			.get(`https://mu88.live/api/front/open/lottery/history/list/5/miba`).then(res=>{
				const formData = {
					state: newData.join(" "),
					id: res.data.t.turnNum,
					type: 3,
					money: item1.length * newMoney,
				};
				axios
					.post("https://server.vnvip294.com/history/chooseXSMB", formData)
					.then((res) => {
						swal("Đặt cược thành công", "", "success")
						setItem([])
					})
					.catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
			}).catch((res)=>swal("Lỗi.", "Vui lòng thử lại", "warning"))
		}

	};
	const [newMoney, setNewMoney] = useState();

	const numbers = Array.from(Array(100).keys());
	return (
		<>
			<div className="loading"><div className="loader"></div></div>
			<div className="main">
				<Header profile={profile}/>

				<div className="record_bet">
					<div className="colum-resultxs">
						<div className="col-50">
							{bet ? (
								<>
									<div className="info_bet">
										<div style={{ fontSize: "0.33rem" }}>
											XSMB ngày <b style={{ color: "#333" }}>{bet.turnNum}</b>
										</div>
									</div>
								</>
							) : (
								<span></span>
							)}
							<span className="tkq">Trả kết quả lúc 19:00</span>
						</div>

						<div className="col-50">
							{bet ? (
								<>
									<div
										style={{ cursor: "pointer" }}
										onClick={openPopup1}
										className="info_bet"
									>
										<div style={{ fontSize: "0.33rem" }}>
											Kết quả ngày{" "}
											<b style={{ color: "#333" }}>
												{bet.issueList[0].turnNum}
											</b>
										</div>
										<div
											className="ball_xs"
											style={{
												margin: "0.3rem auto",
												justifyContent: "center",
											}}
										>
											{bet.issueList[0].openNum.split(",").map((x) => (
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
				
				<CountDown/>
				<TabNavigation/>

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
													Đã chọn {" "}
													<span style={{ color: "red" }}>{item1.length},</span>
												</span>
												<span>
													Tổng tiền cược {" "}
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

				<Results isOpen={isOpen1} total={total} closePopup={closePopup1} />

				<History isOpen={isOpen2} closePopup={closePopup2}/>
			</div>
		</>
	);
}
export default De;
