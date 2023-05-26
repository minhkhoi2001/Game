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
				.post(`http://localhost/bank/getBankUser`, { id: id })
				.then((res) => {
					setData(res.data.data);
					setLoad(true);
				})
				.catch((res) => setData(null));
		}
		axios
			.get(`http://localhost/auth/user/${id}`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((res) => setProfile(null));
		axios
			.get(`http://localhost/history/historyuser/${id}`, {})
			.then((res) => {
				setHistory(res.data.data);
			})
			.catch((res) => setHistory(null));
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`http://localhost/auth/changepassword`, {
				id: id,
				password: e.target.password.value,
			})
			.then((res) => {
				setLoad(false);
			})
			.catch((res) => setData(null));
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
			.post(`http://localhost/bank/updateBank`, formData)
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
															{Number(profile.money).toLocaleString()}
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
													<div className="detail_user">
														<div className="username_">Tiền đã win</div>
														<div className="username_">
															{Number(profile.totalwin).toLocaleString()}
														</div>
													</div>
													<div className="detail_user">
														<div className="username_">Ngày lập nick</div>
														<div className="username_">
															{formatDate(new Date(profile.createdAt))}
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
													<TableCell>Tên Ngân Hàng</TableCell>
													<TableCell>STK</TableCell>
													<TableCell>Người Nhận</TableCell>
													<TableCell>Hành động</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{data != null ? (
													<>
														{data.map((item) => (
															<TableRow>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.name_bank}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{" "}
																	{item.stk}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.fullname}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	<Button
																		onClick={() => {
																			axios
																				.delete(
																					`http://localhost/bank/delete/${item._id}`
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
																					`http://localhost/bank/user/${item._id}`,
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
													<div>Đang cập nhật dữ liệu</div>
												)}
											</TableBody>
										</Table>
									</div>
								</div>
								<Table sx={{ width: "100%" }}>
									<TableHead>
										<TableRow>
											<TableCell>Tên người chơi</TableCell>
											<TableCell>Game</TableCell>
											<TableCell>Loại</TableCell>
											<TableCell>Coin</TableCell>
											<TableCell>Coin nhận</TableCell>
											<TableCell>Thời gian</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{history != null ? (
											<>
												{history.map((item) => (
													<TableRow>
														<TableCell sx={{ fontWeight: "600" }}>
															{item.name}
														</TableCell>
														<TableCell sx={{ fontWeight: "600" }}>
															{" "}
															{item.game}
														</TableCell>
														<TableCell sx={{ fontWeight: "600" }}>
															{item.detail}
														</TableCell>
														<TableCell sx={{ fontWeight: "600" }}>
															{item.money}
														</TableCell>
														<TableCell sx={{ fontWeight: "600" }}>
															{item.money_recv}
														</TableCell>
														<TableCell sx={{ fontWeight: "600" }}>
															{formatDate(new Date(item.time))}
														</TableCell>
													</TableRow>
												))}
											</>
										) : (
											<div>Đang cập nhật dữ liệu</div>
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
