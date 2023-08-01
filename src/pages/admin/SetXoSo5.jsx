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
		axios.get(`https://d3s.vnvip294.com/auth/getUser`, {}).then((res) => {
			setProfile(res.data.data);
		});
		axios.get(`https://d3s.vnvip294.com/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});
		axios.get(`https://d3s.vnvip294.com/Xoso5/getadmin`).then((res) => {
			setBet(res.data.data[0]);
			setDulieunhap(new Date(res.data.data[0].createdAt));
			setStart(true);
		});
		axios
			.get(`https://d3s.vnvip294.com/Xoso5/getallbet`, {})
			.then((res) => {
				setTotal(res.data.data);
			})
			.catch(() => setTotal(null));
		axios
			.get(`https://d3s.vnvip294.com/Xoso5/list30bet`, {})
			.then((res) => {
				setList30(res.data.data);
			})
			.catch(() => setList30(null));
		axios.get(`https://d3s.vnvip294.com/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});
		axios.get(`https://d3s.vnvip294.com/Xoso5/getcurrent`, {}).then((res) => {
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
				axios.get(`https://d3s.vnvip294.com/auth/getUser`, {}).then((res) => {
					setProfile(res.data.data);
				});
				axios.get(`https://d3s.vnvip294.com/Xoso5/getadmin`).then((res) => {
					setBet(res.data.data[0]);
					setDulieunhap(new Date(res.data.data[0].createdAt));
				});
				axios
					.get(`https://d3s.vnvip294.com/Xoso5/getallbet`, {})
					.then((res) => {
						setTotal(res.data.data);
					})
					.catch(() => setTotal(null));
				axios
					.get(`https://d3s.vnvip294.com/Xoso5/list30bet`, {})
					.then((res) => {
						setList30(res.data.data);
					})
					.catch(() => setList30(null));
				axios.get(`https://d3s.vnvip294.com/notification/getnotifi`, {}).then((res) => {
					setVisible({
						money: res.data.data[0].money.toLocaleString(),
						id: res.data.data[0]._id,
					});
				});
				axios.get(`https://d3s.vnvip294.com/Xoso5/getcurrent`).then((res) => {
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
					axios.post("https://d3s.vnvip294.com/notification/seen", {
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
			.post("https://d3s.vnvip294.com/Xoso5/update", formData)
			.then((res) => {
				setBet(res.data.data);
				swal("Thành công", "Update thành công", "success");
			})
			.catch((res) => swal("Lỗi", "Update không thành công", "error"));
	};
	const [listEdit, setListEdit] = useState();
	const [newChange, setNewChange] = useState();
	const handleChange = (e) => {
		setListEdit(e.target.value);
		const a = list30.find((item) => item.id_bet === e.target.value);
		setNewChange(a);
	};
	
	const [numbers, setNumbers] = useState(Array(27).fill(null));
	const generateRandomNumbers = () => {
		const randomNumbers = Array(27).fill('').map((_, index) => {
		  let randomNumber;
		  if (index < 10) {
			randomNumber = Math.floor(Math.random() * 90000) + 10000; 
		  } else if (index >= 10 && index < 20) {
			randomNumber = Math.floor(Math.random() * 9000) + 1000; 
		  } else if (index >= 20 && index < 23) {
			randomNumber = Math.floor(Math.random() * 900) + 100; 
		  } else {
			randomNumber = Math.floor(Math.random() * 90) + 10;
		  }
		  return randomNumber.toString();
		});
		setNumbers(randomNumbers);
	};
	const handleInputChange = (event, index) => {
		const newValue = event.target.value;
		setNumbers(prevInputValues => {
		  const newInputValues = [...prevInputValues];
		  newInputValues[index] = newValue;
		  return newInputValues;
		});
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
								<div className="container_set">Set kèo 5p</div>

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
								<Table sx={{ width: 1600 }}>
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
																{GetNameChoose(item.state,item.type)}
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
																<input defaultValue={bet.dacbiet} min="10000"max="99999" name="dacbiet" style={{width:"60px"}} value={numbers[0]==null?bet.dacbiet:numbers[0]} onChange={(e) => handleInputChange(e, 0)}/>
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
																<input defaultValue={bet.nhat} name="nhat" min="10000"max="99999" style={{width:"60px"}} value={numbers[1]==null?bet.nhat:numbers[1]} onChange={(e) => handleInputChange(e, 1)}/>
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
																<input defaultValue={bet.hai.split(" ")[0]} name="hai1" min="10000"max="99999" style={{width:"60px"}} value={numbers[2]==null?bet.hai.split(" ")[0]:numbers[2]} onChange={(e) => handleInputChange(e, 2)}/>
															</span>
															<span
																id="mb_prize_3"
																className="prize2 div-horizontal"
															>
																<input defaultValue={bet.hai.split(" ")[1]} name="hai2" min="10000"max="99999" style={{width:"60px"}} value={numbers[3]==null?bet.hai.split(" ")[1]:numbers[3]} onChange={(e) => handleInputChange(e, 3)}/>
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
																<input defaultValue={bet.ba.split(" ")[0]} min="10000"max="99999" name="ba1" style={{width:"60px"}} value={numbers[4]==null?bet.ba.split(" ")[0]:numbers[4]} onChange={(e) => handleInputChange(e, 4)}/>
															</span>
															<span
																id="mb_prize_5"
																className="prize3 div-horizontal"
															>
																<input defaultValue={bet.ba.split(" ")[1]} min="10000"max="99999" name="ba2" style={{width:"60px"}} value={numbers[5]==null?bet.ba.split(" ")[1]:numbers[5]} onChange={(e) => handleInputChange(e, 5)}/>
															</span>
															<span
																id="mb_prize_6"
																className="prize3 div-horizontal"
															>
																<input defaultValue={bet.ba.split(" ")[2]} min="10000"max="99999" name="ba3" style={{width:"60px"}} value={numbers[6]==null?bet.ba.split(" ")[2]:numbers[6]} onChange={(e) => handleInputChange(e, 6)}/>
															</span>
															<span
																id="mb_prize_7"
																className="prize3 div-horizontal"
															>
																<input defaultValue={bet.ba.split(" ")[3]} min="10000"max="99999" name="ba4" style={{width:"60px"}} value={numbers[7]==null?bet.ba.split(" ")[3]:numbers[7]} onChange={(e) => handleInputChange(e, 7)}/>
															</span>
															<span
																id="mb_prize_8"
																className="prize3 div-horizontal"
															>
																<input defaultValue={bet.ba.split(" ")[4]} min="10000"max="99999" name="ba5" style={{width:"60px"}} value={numbers[8]==null?bet.ba.split(" ")[4]:numbers[8]} onChange={(e) => handleInputChange(e, 8)}/>
															</span>
															<span
																id="mb_prize_9"
																className="prize3 div-horizontal"
															>
																<input defaultValue={bet.ba.split(" ")[5]} min="10000"max="99999" name="ba6" style={{width:"60px"}} value={numbers[9]==null?bet.ba.split(" ")[5]:numbers[9]} onChange={(e) => handleInputChange(e, 9)}/>
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
																<input defaultValue={bet.tu.split(" ")[0]} min="1000"max="9999" name="tu1" style={{width:"60px"}} value={numbers[10]==null?bet.tu.split(" ")[0]:numbers[10]} onChange={(e) => handleInputChange(e, 10)}/>
															</span>
															<span
																id="mb_prize_11"
																className="prize4 div-horizontal"
															>
																<input defaultValue={bet.tu.split(" ")[1]} min="1000"max="9999" name="tu2" style={{width:"60px"}} value={numbers[11]==null?bet.tu.split(" ")[1]:numbers[11]} onChange={(e) => handleInputChange(e, 11)}/>
															</span>
															<span
																id="mb_prize_12"
																className="prize4 div-horizontal"
															>
																<input defaultValue={bet.tu.split(" ")[2]} min="1000"max="9999" name="tu3" style={{width:"60px"}} value={numbers[12]==null?bet.tu.split(" ")[2]:numbers[12]} onChange={(e) => handleInputChange(e, 12)}/>
															</span>
															<span
																id="mb_prize_13"
																className="prize4 div-horizontal"
															>
																<input defaultValue={bet.tu.split(" ")[3]} min="1000"max="9999" name="tu4" style={{width:"60px"}} value={numbers[13]==null?bet.tu.split(" ")[3]:numbers[13]} onChange={(e) => handleInputChange(e, 13)}/>
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
																<input defaultValue={bet.nam.split(" ")[0]} min="1000"max="9999" name="nam1" style={{width:"60px"}} value={numbers[14]==null?bet.nam.split(" ")[0]:numbers[14]} onChange={(e) => handleInputChange(e, 14)}/>
															</span>
															<span
																id="mb_prize_15"
																className="prize5 div-horizontal"
															>
																<input defaultValue={bet.nam.split(" ")[1]} min="1000"max="9999" name="nam2" style={{width:"60px"}} value={numbers[15]==null?bet.nam.split(" ")[1]:numbers[15]} onChange={(e) => handleInputChange(e, 15)}/>
															</span>
															<span
																id="mb_prize_16"
																className="prize5 div-horizontal"
															>
																<input defaultValue={bet.nam.split(" ")[2]} min="1000"max="9999" name="nam6" style={{width:"60px"}} value={numbers[16]==null?bet.nam.split(" ")[2]:numbers[16]} onChange={(e) => handleInputChange(e, 16)}/>
															</span>
															<span
																id="mb_prize_17"
																className="prize5 div-horizontal"
															>
																<input defaultValue={bet.nam.split(" ")[3]} min="1000"max="9999" name="nam3" style={{width:"60px"}} value={numbers[17]==null?bet.nam.split(" ")[3]:numbers[17]} onChange={(e) => handleInputChange(e, 17)}/>
															</span>
															<span
																id="mb_prize_18"
																className="prize5 div-horizontal"
															>
																<input defaultValue={bet.nam.split(" ")[4]} min="1000"max="9999" name="nam4" style={{width:"60px"}} value={numbers[18]==null?bet.nam.split(" ")[4]:numbers[18]} onChange={(e) => handleInputChange(e, 18)}/>
															</span>
															<span
																id="mb_prize_19"
																className="prize5 div-horizontal"
															>
																<input defaultValue={bet.nam.split(" ")[5]} min="1000"max="9999" name="nam5" style={{width:"60px"}} value={numbers[19]==null?bet.nam.split(" ")[5]:numbers[19]} onChange={(e) => handleInputChange(e, 19)}/>
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
																<input defaultValue={bet.sau.split(" ")[0]} min="100"max="999" name="sau1" style={{width:"60px"}} value={numbers[20]==null?bet.sau.split(" ")[0]:numbers[20]} onChange={(e) => handleInputChange(e, 20)}/>
															</span>
															<span
																id="mb_prize_21"
																className="prize6 div-horizontal"
															>
																<input defaultValue={bet.sau.split(" ")[1]} min="100"max="999" name="sau2" style={{width:"60px"}} value={numbers[21]==null?bet.sau.split(" ")[1]:numbers[21]} onChange={(e) => handleInputChange(e, 21)}/>
															</span>
															<span
																id="mb_prize_22"
																className="prize6 div-horizontal"
															>
																<input defaultValue={bet.sau.split(" ")[2]} min="100"max="999" name="sau3" style={{width:"60px"}} value={numbers[22]==null?bet.sau.split(" ")[2]:numbers[22]} onChange={(e) => handleInputChange(e, 22)}/>
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
																<input defaultValue={bet.bay.split(" ")[0]} min="10"max="99" name="bay1" style={{width:"60px"}} value={numbers[23]==null?bet.bay.split(" ")[0]:numbers[23]} onChange={(e) => handleInputChange(e, 23)}/>
															</span>
															<span
																id="mb_prize_24"
																className="prize7 div-horizontal"
															>
																<input defaultValue={bet.bay.split(" ")[1]} min="10"max="99" name="bay2" style={{width:"60px"}} value={numbers[24]==null?bet.bay.split(" ")[1]:numbers[24]} onChange={(e) => handleInputChange(e, 24)}/>
															</span>
															<span
																id="mb_prize_25"
																className="prize7 div-horizontal"
															>
																<input defaultValue={bet.bay.split(" ")[2]} min="10"max="99" name="bay3" style={{width:"60px"}} value={numbers[25]==null?bet.bay.split(" ")[2]:numbers[25]} onChange={(e) => handleInputChange(e, 25)}/>
															</span>
															<span
																id="mb_prize_26"
																className="prize7 div-horizontal"
															>
																<input defaultValue={bet.bay.split(" ")[3]} min="10"max="99" name="bay4" style={{width:"60px"}} value={numbers[26]==null?bet.bay.split(" ")[3]:numbers[26]} onChange={(e) => handleInputChange(e, 26)}/>
															</span>
														</td>
													</tr>
												</tbody>
											</table>
										) : (
											<div>Đang update dữ liệu</div>
										)}
									</div>
									<br/>
									<button
										type="button"
										onClick={generateRandomNumbers}
										className="btn-submit btn-admin-1"
										style={{ display: "inline-block", margin: "0 0 0 10px" }}
									>
										Ngẫu nhiên
									</button>
									<button
										type="submit"
										className="btn-submit btn-admin-3"
										style={{ display: "inline-block", margin: "0 0 0 10px", padding: "7px 12px" }}
									>
										Xác nhận
									</button>
									<button
										style={{ display: "inline-block", margin: "0 0 0 10px" }}
										className="btn-submit btn-admin-2"
										onClick={() => {
											window.location.reload(true);
										}}
									>
										Làm mới
									</button>
								</form>
								<div
									style={{
										flex: 1,
										textAlign: "center",
										width: "100%",
										display: "flex",
										alignItems: "center",
										padding: "10px",
										marginTop: "50px",
										color: "white",
										backgroundColor: "#121828",
										justifyContent: "space-around",
									}}
								>
									<h1>Kỳ {listEdit}</h1>
									<select onChange={handleChange} value={listEdit}>
										{list30
											? list30.map((item) => {
													return (
														<option value={item.id_bet}>
															Kỳ {item.id_bet}
														</option>
													);
											  })
											: null}
									</select>
								</div>
								{newChange && (
									<>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												const formData = {
													id_bet: newChange._id,
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
												axios
													.post("https://d3s.vnvip294.com/Xoso5/update", formData)
													.then((res) => {
														setBet(res.data.data);
														swal("Thành công", "Update thành công", "success");
													})
													.catch((res) =>
														swal("Lỗi", "Update không thành công", "error")
													);
											}}
											style={{ marginTop: "10px" }}
										>
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
																	defaultValue={newChange.dacbiet}
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
																	defaultValue={newChange.nhat}
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
																	defaultValue={newChange.hai.split(" ")[0]}
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
																	defaultValue={newChange.hai.split(" ")[1]}
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
																	defaultValue={newChange.ba.split(" ")[0]}
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
																	defaultValue={newChange.ba.split(" ")[1]}
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
																	defaultValue={newChange.ba.split(" ")[2]}
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
																	defaultValue={newChange.ba.split(" ")[3]}
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
																	defaultValue={newChange.ba.split(" ")[4]}
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
																	defaultValue={newChange.ba.split(" ")[5]}
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
																	defaultValue={newChange.tu.split(" ")[0]}
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
																	defaultValue={newChange.tu.split(" ")[1]}
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
																	defaultValue={newChange.tu.split(" ")[2]}
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
																	defaultValue={newChange.tu.split(" ")[3]}
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
																	defaultValue={newChange.nam.split(" ")[0]}
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
																	defaultValue={newChange.nam.split(" ")[1]}
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
																	defaultValue={newChange.nam.split(" ")[2]}
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
																	defaultValue={newChange.nam.split(" ")[3]}
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
																	defaultValue={newChange.nam.split(" ")[4]}
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
																	defaultValue={newChange.nam.split(" ")[5]}
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
																	defaultValue={newChange.sau.split(" ")[0]}
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
																	defaultValue={newChange.sau.split(" ")[1]}
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
																	defaultValue={newChange.sau.split(" ")[2]}
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
																	defaultValue={newChange.bay.split(" ")[0]}
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
																	defaultValue={newChange.bay.split(" ")[1]}
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
																	defaultValue={newChange.bay.split(" ")[2]}
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
																	defaultValue={newChange.bay.split(" ")[3]}
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
											<br/>
											<button
												type="submit"
												className="btn-submit btn-admin-1"
												style={{
													display: "inline-block",
													margin: "0 0 0 10px",
												}}
											>
												Xác nhận
											</button>
											<button
												style={{
													display: "inline-block",
													margin: "0 0 0 10px",
												}}
												className="btn-submit btn-admin-2"
												onClick={() => {
													window.location.reload(true);
												}}
											>
												Làm mới
											</button>
										</form>
									</>
								)}
							</Container>
						</Box>
					}

					<ToastContainer />
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}
export default SetXoSo5;
