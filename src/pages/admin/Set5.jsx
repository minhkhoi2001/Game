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
function Set5() {
	const [isVisible, setVisible] = useState(null);
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
		axios.get(`https://server.luckkylotte9d.com/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`https://server.luckkylotte9d.com/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});
		axios.get(`https://server.luckkylotte9d.com/bet5/getadmin`).then((res) => {
			setBet(res.data.data[0]);
			setDulieunhap(new Date(res.data.data[0].createdAt));
			setStart(true);
		});
		axios
			.get(`https://server.luckkylotte9d.com/bet5/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios.get(`https://server.luckkylotte9d.com/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
		axios.get(`https://server.luckkylotte9d.com/bet5/getcurrent`, {}).then((res) => {
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
				axios.get(`https://server.luckkylotte9d.com/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://server.luckkylotte9d.com/bet5/getadmin`).then((res) => {
					setBet(res.data.data[0]);
					setDulieunhap(new Date(res.data.data[0].createdAt));
				});
				axios
					.get(`https://server.luckkylotte9d.com/bet5/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios.get(`https://server.luckkylotte9d.com/notification/getnotifi`, {}).then((res) => {
					setVisible({
						money: res.data.data[0].money.toLocaleString(),
						id: res.data.data[0]._id,
					});
				});
				axios.get(`https://server.luckkylotte9d.com/bet5/getcurrent`).then((res) => {
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
					axios.post("https://server.luckkylotte9d.com/notification/seen", {
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
			result: String(e.target.bet.value).split("").join(" "),
		};
		axios
			.post("https://server.luckkylotte9d.com/bet5/update", formData)
			.then((res) => {
				setBet(res.data.data);
				swal("Thành công", "Update thành công", "success");
			})
			.catch((res) => swal("Lỗi", "Update không thành công", "error"));
	};
	return (
		<>
			<ThemeProvider theme={theme}>
				<DashboardLayout>
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
										0{minute} : {second < 10 ? "0" : ""}
										{second}
									</div>
								</div>
								<div className="form_set"></div>
								<Table sx={{ width: 1600 }}>
									<TableHead>
										<TableRow>
											<TableCell>ID User</TableCell>
											<TableCell>Username</TableCell>
											<TableCell>Chọn</TableCell>
											<TableCell>Số tiền</TableCell>
											<TableCell>Thời gian đặt</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{current?current.map((item) => (
											<>
												<TableRow>
													<TableCell>{item.user.iduser}</TableCell>
													<TableCell>{item.user.username}</TableCell>
													<TableCell>{GetNameChoose(Number(item.state))}</TableCell>
													<TableCell>{item.money}</TableCell>
													<TableCell>{formatDate(new Date(item.createdAt))}</TableCell>
												</TableRow>
											</>
										)):null}
									</TableBody>
								</Table>
								<form onSubmit={handleSubmit}>
									<div
										style={{ color: "black" }}
										className="result_admin_choose"
									>
										Kết quả kèo hiện tại là{" "}
										{bet ? (
											<div
												style={{ fontWeight: "600", color: "black" }}
												className="title_result"
											>
												{bet.result}
											</div>
										) : (
											<div>Đang update dữ liệu</div>
										)}
									</div>
									<h2>Chọn kèo</h2>
									<input
										min="10000"
										max="99999"
										type="number"
										name="bet"
										id="bet"
									/>
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
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}
export default Set5;
