import {
	Box,
	Button,
	Container,
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import "./account.css";
import { theme } from "../../theme";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UserProfile() {
	const { id } = useParams();
	const [isShow, setShow] = useState(false);
	const [data, setData] = useState(null);
	const [load, setLoad] = useState(false);
	const [profile, setProfile] = useState(null);
	const [bank, setBank] = useState(null);
	const [history, setHistory] = useState(null);
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
		if (id && load == false) {
			axios
				.post(`https://server.vnvip294.com/bank/getBankUser`, { id: id })
				.then((res) => {
					setData(res.data.data);
					setLoad(true);
				})
				.catch((res) => setData(null));
		}
		axios
			.get(`https://server.vnvip294.com/auth/user/${id}`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((res) => setProfile(null));
		axios
			.get(`https://server.vnvip294.com/history/historyuser/${id}`, {})
			.then((res) => {
				setHistory(res.data.data);
			})
			.catch((res) => setHistory(null));
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`https://server.vnvip294.com/auth/changepassword`, {
				id: id,
				password: e.target.password.value,
			})
			.then((res) => {
				setLoad(false);
				swal("Cập nhật thành công");
			})
			.catch((err) => {
				swal("Có lỗi vui lòng thử lại!");
				setData(null);
			});
	};
	const handleSubmitBank = (e) => {
		e.preventDefault();
		const formData = {
			id: bank._id,
			name_bank: e.target.name_bank.value,
			stk: e.target.stk.value,
			fullname: e.target.fullname.value,
		};
		axios
			.post(`https://server.vnvip294.com/bank/updateBank`, formData)
			.then((res) => {
				setShow(false);
				swal("Cập nhật thành công");
				setLoad(false);
			})
			.catch((err) => {
				setShow(false);
				swal("Có lỗi vui lòng thử lại!");
				setLoad(false);
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
								py: 8,
							}}
						>
							<Container maxWidth={false}>
								<div style={{ fontSize: "25px", fontWeight: 700 }}>
									Chỉnh sửa thông tin USER
								</div>
								<div className="item_accountprofile">
									<div className="account_profile">
										<div className="titleitem">Thông tin USER</div>
										{profile != null ? (
											<>
												<div className="avb_">
													<div className="detail_user">
														<div className="username_">Tên đăng nhập</div>
														<div className="username_">{profile.username}</div>
													</div>
													<div className="detail_user">
														<div className="username_">Tiền user</div>
														<div className="username_">
															{Math.floor(profile.money).toLocaleString()}
														</div>
													</div>
													<form onSubmit={handleSubmit}>
														<div className="detail_user">
															<div className="username_">Mật khẩu</div>
															<TextField name="password" />
															<Button type="submit">Xác nhận</Button>
														</div>
													</form>
													<div className="detail_user">
														<div className="username_">Tiền đã đặt cược</div>
														<div className="username_">
															{Number(profile.totalbet).toLocaleString()}
														</div>
													</div>
													<form
														onSubmit={(e) => {
															e.preventDefault();
															const form = {
																id: id,
																level: e.target.vip.value,
															};
															axios
																.post("https://server.vnvip294.com/auth/update", form)
																.then((res) =>
																	swal("Update level user thành công!","","success")
																)
																.catch(() =>
																	swal("Update không thành công","","error")
																);
														}}
													>
														<div className="detail_user">
															<div className="username_">Vip</div>
															<div className="username_">
																<select name="vip" id="vip">
																	<option
																		selected={profile?.level === 0}
																		value="0"
																	>
																		1
																	</option>
																	<option
																		selected={profile?.level === 2}
																		value="2"
																	>
																		2
																	</option>
																	<option
																		selected={profile?.level === 3}
																		value="3"
																	>
																		3
																	</option>
																	<option
																		selected={profile?.level === 4}
																		value="4"
																	>
																		4
																	</option>
																	<option
																		selected={profile?.level === 5}
																		value="5"
																	>
																		5
																	</option>
																	<option
																		selected={profile?.level === 6}
																		value="6"
																	>
																		6
																	</option>
																	<option
																		selected={profile?.level === 7}
																		value="7"
																	>
																		7
																	</option>
																	<option
																		selected={profile?.level === 8}
																		value="8"
																	>
																		8
																	</option>
																	<option
																		selected={profile?.level === 9}
																		value="9"
																	>
																		9
																	</option>
																	<option
																		selected={profile?.level === 10}
																		value="10"
																	>
																		10
																	</option>
																</select>
																<Button type="submit">Xác nhận</Button>
															</div>
														</div>
													</form>
													<div className="detail_user">
														<div className="username_">Tiền đã thắng</div>
														<div className="username_">
															{Number(profile.totalwin).toLocaleString()}
														</div>
													</div>
													<div className="detail_user">
														<div className="username_">Ngày tạo</div>
														<div className="username_">
															{formatDate(new Date(profile.createdAt))}
														</div>
													</div>
													<div className="detail_user">
														<div className="username_">SĐT</div>
														<div className="username_">
															{profile.sdt ? "0" + profile.sdt : "Chưa có sđt"}
														</div>
													</div>
												</div>
											</>
										) : null}
									</div>
									<div className="edit_account_bankl">
										<div className="titleitem">Danh sách ngân hàng USER</div>
										<Table sx={{ width: 700 }}>
											<TableHead>
												<TableRow>
													<TableCell sx={{ padding: "10px" }}>
														Tên Ngân Hàng
													</TableCell>
													<TableCell sx={{ padding: "10px" }}>STK</TableCell>
													<TableCell sx={{ padding: "10px" }}>
														Người Nhận
													</TableCell>
													<TableCell sx={{ padding: "10px" }}>
														Hành động
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{data != null ? (
													<>
														{data.map((item) => (
															<TableRow>
																<TableCell
																	sx={{ fontWeight: "600", padding: "10px" }}
																>
																	{item.name_bank}
																</TableCell>
																<TableCell
																	sx={{ fontWeight: "600", padding: "10px" }}
																>
																	{" "}
																	{item.stk}
																</TableCell>
																<TableCell
																	sx={{ fontWeight: "600", padding: "10px" }}
																>
																	{item.fullname}
																</TableCell>
																<TableCell
																	sx={{ fontWeight: "600", padding: "10px" }}
																>
																	<Button
																		onClick={() => {
																			axios
																				.delete(
																					`https://server.vnvip294.com/bank/delete/${item._id}`
																				)
																				.then((res) => {
																					setLoad(false);
																				});
																		}}
																	>
																		Xóa
																	</Button>
																	<Button
																		onClick={() => {
																			axios
																				.get(
																					`https://server.vnvip294.com/bank/user/${item._id}`,
																					{}
																				)
																				.then((res) => {
																					setBank(res.data.data);
																					setShow(true);
																				})
																				.catch((res) => {
																					swal(
																						"Lấy thông tin không thành công"
																					);
																					setLoad(false);
																				});
																		}}
																	>
																		Sửa
																	</Button>
																</TableCell>
															</TableRow>
														))}
													</>
												) : (
													<div
														style={{
															fontSize: "16px",
															textAlign: "center",
															padding: "10px",
														}}
													>
														Đang cập nhật dữ liệu
													</div>
												)}
											</TableBody>
										</Table>
									</div>
								</div>
								<Table sx={{ width: "100%" }}>
									<TableHead>
										<TableRow>
											<TableCell sx={{ padding: "10px" }}>
												Tên người chơi
											</TableCell>
											<TableCell sx={{ padding: "10px" }}>Game</TableCell>
											<TableCell sx={{ padding: "10px" }}>Loại</TableCell>
											<TableCell sx={{ padding: "10px" }}>Coin</TableCell>
											<TableCell sx={{ padding: "10px" }}>Coin nhận</TableCell>
											<TableCell sx={{ padding: "10px" }}>Thời gian</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{history != null ? (
											<>
												{history.map((item) => (
													<TableRow>
														<TableCell
															sx={{ fontWeight: "600", padding: "10px" }}
														>
															{item.name}
														</TableCell>
														<TableCell
															sx={{ fontWeight: "600", padding: "10px" }}
														>
															{" "}
															{item.game}
														</TableCell>
														<TableCell
															sx={{ fontWeight: "600", padding: "10px" }}
														>
															{item.detail}
														</TableCell>
														<TableCell
															sx={{ fontWeight: "600", padding: "10px" }}
														>
															{item.money}
														</TableCell>
														<TableCell
															sx={{ fontWeight: "600", padding: "10px" }}
														>
															{item.money_recv}
														</TableCell>
														<TableCell
															sx={{ fontWeight: "600", padding: "10px" }}
														>
															{formatDate(new Date(item.time))}
														</TableCell>
													</TableRow>
												))}
											</>
										) : (
											<div
												style={{
													fontSize: "16px",
													textAlign: "center",
													padding: "10px",
												}}
											>
												Đang cập nhật dữ liệu
											</div>
										)}
									</TableBody>
								</Table>
							</Container>
						</Box>
					}
					{isShow === true ? (
						<>
							<div className="modal">
								<div className="modaloverlay">
									<i className="ti-close closelogin"></i>
								</div>
								<div className="modalbody">
									{bank != null ? (
										<>
											<form onSubmit={handleSubmitBank}>
												<div className="modalinner">
													<div className="modalheader"> Sửa thông tin </div>

													<div className="modalform">
														<div
															className="modalformgroup"
															style={{ padding: "9px" }}
														>
															<TextField
																name="name_bank"
																defaultValue={bank.name_bank}
																sx={{ width: "100%" }}
																type="text"
																placeholder="Tên ngân hàng"
															/>
														</div>
														<div
															style={{ padding: "9px" }}
															className="modalformgroup"
														>
															<TextField
																name="stk"
																defaultValue={bank.stk}
																sx={{ width: "100%" }}
																type="number"
																placeholder="STK"
															/>
														</div>
														<div
															style={{ padding: "9px" }}
															className="modalformgroup"
														>
															<TextField
																name="fullname"
																defaultValue={bank.fullname}
																sx={{ width: "100%" }}
																type="text"
																placeholder="Tên tài khoản"
															/>
														</div>
													</div>

													<div className="item_btn_form">
														<div className="modalformcontrols">
															<Button type="submit">XÁC NHẬN</Button>
														</div>
														<div className="modalformcontrols">
															<Button onClick={() => setShow(false)}>
																ĐÓNG
															</Button>
														</div>
													</div>
												</div>
											</form>
										</>
									) : (
										<div>Đang chờ dữ liệu</div>
									)}
								</div>
							</div>
						</>
					) : null}
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}

export default UserProfile;
