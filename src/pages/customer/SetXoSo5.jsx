import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import {
	Box,
	Button,
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { GetNameChoose } from "../../funcUtils";
import { DashboardLayoutCustomer } from "../../components/dashboard-layout-customer";
function SetXoSo5() {
	const [isVisible, setVisible] = useState(null);
	const [list30, setList30] = useState();
	const [bet, setBet] = useState(null);
	const [profile, setProfile] = useState(null);
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(5);
	const [start, setStart] = useState(false);
	const [dulieunhap, setDulieunhap] = useState(new Date());
	const [update, setUpdate] = useState(0);
	const [current, setCurrent] = useState(null);
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
		axios.get(`http://localhost/Xoso5/getadmin`).then((res) => {
			setBet(res.data.data[0]);
			setDulieunhap(new Date(res.data.data[0].createdAt));
			setStart(true);
		});
		axios
			.get(`http://localhost/Xoso5/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios
			.get(`http://localhost/Xoso5/list30bet`, {})
			.then((res) => {
				setList30(res.data.data);
			})
			.catch(() => setList30(null));
		axios.get(`http://localhost/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
		axios.get(`http://localhost/Xoso5/getcurrent`, {}).then((res) => {
			setCurrent(res.data.data);
		});
	}, []);
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
	useEffect(() => {
		const timer = setInterval(() => {
			if (Math.floor(300 - (new Date() - dulieunhap) / 1000) < 0) {
				axios.get(`http://localhost/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`http://localhost/Xoso5/getadmin`).then((res) => {
					setBet(res.data.data[0]);
					setDulieunhap(new Date(res.data.data[0].createdAt));
				});
				axios
					.get(`http://localhost/Xoso5/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios
					.get(`http://localhost/Xoso5/list30bet`, {})
					.then((res) => {
						setList30(res.data.data);
					})
					.catch(() => setList30(null));
				axios.get(`http://localhost/notification/getnotifi`, {}).then((res) => {
					setVisible({
						money: res.data.data[0].money.toLocaleString(),
						id: res.data.data[0]._id,
					});
				});
				axios.get(`http://localhost/Xoso5/getcurrent`).then((res) => {
					setCurrent(res.data.data);
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

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			id_bet: bet._id,
			dacbiet: e.target.dacbiet.value,
			nhat: e.target.nhat.value,
			hai: e.target.hai1.value + " " + e.target.hai2.value,
			ba:
				e.target.ba1.value +
				" " +
				e.target.ba4.value +
				" " +
				e.target.ba2.value +
				" " +
				e.target.ba3.value +
				" " +
				e.target.ba5.value +
				" " +
				e.target.ba6.value,
			tu:
				e.target.tu1.value +
				" " +
				e.target.tu2.value +
				" " +
				e.target.tu3.value +
				" " +
				e.target.tu4.value,
			sau:
				e.target.sau1.value +
				" " +
				e.target.sau2.value +
				" " +
				e.target.sau3.value,
			bay:
				e.target.bay1.value +
				" " +
				e.target.bay2.value +
				" " +
				e.target.bay3.value +
				" " +
				e.target.bay4.value,
			nam:
				e.target.nam1.value +
				" " +
				e.target.nam2.value +
				" " +
				e.target.nam3.value +
				" " +
				e.target.nam4.value +
				" " +
				e.target.nam5.value +
				" " +
				e.target.nam6.value,
		};
		console.log(formData);
		axios
			.post("http://localhost/Xoso5/update", formData)
			.then((res) => {
				setBet(res.data.data);
				swal("Thành công", "Update thành công", "success");
			})
			.catch((res) => swal("Lỗi", "Update không thành công", "error"));
	};
	return (
		<>
			<ThemeProvider theme={theme}>
				<DashboardLayoutCustomer>
					{
						<Box
							component="main"
							sx={{
								flexGrow: 1,
								py: 1,
							}}
						>
							<Container maxWidth={false}>
								<div className="container_set">Set kèo</div>

								<div className="cycle_bet">
									{bet ? (
										<span style={{ color: "black" }} className="info_bet">
											Kỳ {bet.id_bet}
										</span>
									) : (
										<span>Đang chờ dữ liệu</span>
									)}
									<div style={{ color: "black" }} className="count">
										{minute} : {second < 10 ? "0" : ""}
										{second}
									</div>
								</div>
								<div className="form_set"></div>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell sx={{padding:"10px"}}>ID User</TableCell>
											<TableCell sx={{padding:"10px"}}>Username</TableCell>
											<TableCell sx={{padding:"10px"}}>Chọn</TableCell>
											<TableCell sx={{padding:"10px"}}>Số tiền</TableCell>
											<TableCell sx={{padding:"10px"}}>Thời gian đặt</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{current
											? current.map((item) => (
													<>
														<TableRow>
															<TableCell sx={{padding:"10px"}}>{item.user.iduser}</TableCell>
															<TableCell sx={{padding:"10px"}}>{item.user.username}</TableCell>
															<TableCell sx={{padding:"10px"}}>
																{GetNameChoose(item.state, item.type)}
															</TableCell>
															<TableCell sx={{padding:"10px"}}>{item.money}</TableCell>
															<TableCell sx={{padding:"10px"}}>
																{formatDate(new Date(item.createdAt))}
															</TableCell>
														</TableRow>
													</>
											  ))
											: null}
									</TableBody>
								</Table>
								<form onSubmit={handleSubmit}>
									<div
										style={{ color: "black" }}
										className="result_admin_choose"
									>
										{bet ? (
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
																<input
																	defaultValue={bet.dacbiet}
																	min="10000"
																	max="99999"
																	name="dacbiet"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>1</th>
														<td>
															<span
																id="mb_prize_1"
																className="prize1 div-horizontal"
															>
																<input
																	defaultValue={bet.nhat}
																	name="nhat"
																	min="10000"
																	max="99999"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>2</th>
														<td>
															<span
																id="mb_prize_2"
																className="prize2 div-horizontal"
															>
																<input
																	defaultValue={bet.hai.split(" ")[0]}
																	name="hai1"
																	min="10000"
																	max="99999"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_3"
																className="prize2 div-horizontal"
															>
																<input
																	defaultValue={bet.hai.split(" ")[1]}
																	name="hai2"
																	min="10000"
																	max="99999"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>3</th>
														<td>
															<span
																id="mb_prize_4"
																className="prize3 div-horizontal"
															>
																<input
																	defaultValue={bet.ba.split(" ")[0]}
																	min="10000"
																	max="99999"
																	name="ba1"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_5"
																className="prize3 div-horizontal"
															>
																<input
																	defaultValue={bet.ba.split(" ")[1]}
																	min="10000"
																	max="99999"
																	name="ba2"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_6"
																className="prize3 div-horizontal"
															>
																<input
																	defaultValue={bet.ba.split(" ")[2]}
																	min="10000"
																	max="99999"
																	name="ba3"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_7"
																className="prize3 div-horizontal"
															>
																<input
																	defaultValue={bet.ba.split(" ")[3]}
																	min="10000"
																	max="99999"
																	name="ba4"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_8"
																className="prize3 div-horizontal"
															>
																<input
																	defaultValue={bet.ba.split(" ")[4]}
																	min="10000"
																	max="99999"
																	name="ba5"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_9"
																className="prize3 div-horizontal"
															>
																<input
																	defaultValue={bet.ba.split(" ")[5]}
																	min="10000"
																	max="99999"
																	name="ba6"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>4</th>
														<td>
															<span
																id="mb_prize_10"
																className="prize4 div-horizontal"
															>
																<input
																	defaultValue={bet.tu.split(" ")[0]}
																	min="1000"
																	max="9999"
																	name="tu1"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_11"
																className="prize4 div-horizontal"
															>
																<input
																	defaultValue={bet.tu.split(" ")[1]}
																	min="1000"
																	max="9999"
																	name="tu2"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_12"
																className="prize4 div-horizontal"
															>
																<input
																	defaultValue={bet.tu.split(" ")[2]}
																	min="1000"
																	max="9999"
																	name="tu3"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_13"
																className="prize4 div-horizontal"
															>
																<input
																	defaultValue={bet.tu.split(" ")[3]}
																	min="1000"
																	max="9999"
																	name="tu4"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>5</th>
														<td>
															<span
																id="mb_prize_14"
																className="prize5 div-horizontal"
															>
																<input
																	defaultValue={bet.nam.split(" ")[0]}
																	min="1000"
																	max="9999"
																	name="nam1"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_15"
																className="prize5 div-horizontal"
															>
																<input
																	defaultValue={bet.nam.split(" ")[1]}
																	min="1000"
																	max="9999"
																	name="nam2"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_16"
																className="prize5 div-horizontal"
															>
																<input
																	defaultValue={bet.nam.split(" ")[2]}
																	min="1000"
																	max="9999"
																	name="nam6"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_17"
																className="prize5 div-horizontal"
															>
																<input
																	defaultValue={bet.nam.split(" ")[3]}
																	min="1000"
																	max="9999"
																	name="nam3"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_18"
																className="prize5 div-horizontal"
															>
																<input
																	defaultValue={bet.nam.split(" ")[4]}
																	min="1000"
																	max="9999"
																	name="nam4"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_19"
																className="prize5 div-horizontal"
															>
																<input
																	defaultValue={bet.nam.split(" ")[5]}
																	min="1000"
																	max="9999"
																	name="nam5"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>6</th>
														<td>
															<span
																id="mb_prize_20"
																className="prize6 div-horizontal"
															>
																<input
																	defaultValue={bet.sau.split(" ")[0]}
																	min="100"
																	max="999"
																	name="sau1"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_21"
																className="prize6 div-horizontal"
															>
																<input
																	defaultValue={bet.sau.split(" ")[1]}
																	min="100"
																	max="999"
																	name="sau2"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_22"
																className="prize6 div-horizontal"
															>
																<input
																	defaultValue={bet.sau.split(" ")[2]}
																	min="100"
																	max="999"
																	name="sau3"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
													<tr>
														<th>7</th>
														<td>
															<span
																id="mb_prize_23"
																className="prize7 div-horizontal"
															>
																<input
																	defaultValue={bet.bay.split(" ")[0]}
																	min="10"
																	max="99"
																	name="bay1"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_24"
																className="prize7 div-horizontal"
															>
																<input
																	defaultValue={bet.bay.split(" ")[1]}
																	min="10"
																	max="99"
																	name="bay2"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_25"
																className="prize7 div-horizontal"
															>
																<input
																	defaultValue={bet.bay.split(" ")[2]}
																	min="10"
																	max="99"
																	name="bay3"
																	style={{ width: "60px" }}
																/>
															</span>
															<span
																id="mb_prize_26"
																className="prize7 div-horizontal"
															>
																<input
																	defaultValue={bet.bay.split(" ")[3]}
																	min="10"
																	max="99"
																	name="bay4"
																	style={{ width: "60px" }}
																/>
															</span>
														</td>
													</tr>
												</tbody>
											</table>
										) : (
											<div>Đang update dữ liệu</div>
										)}
									</div>
									<h2>Sửa kết quả</h2>
									<button
										type="submit"
										className="btn-submit"
										style={{ display: "inline-block", margin: "0 0 0 10px" }}
									>
										Xác nhận
									</button>
									<button
										style={{ display: "inline-block", margin: "0 0 0 10px" }}
										className="btn-submit"
										onClick={() => {
											window.location.reload(true);
										}}
									>
										Làm mới
									</button>
								</form>
							</Container>
						</Box>
					}

					<ToastContainer />
				</DashboardLayoutCustomer>
			</ThemeProvider>
		</>
	);
}
export default SetXoSo5;
