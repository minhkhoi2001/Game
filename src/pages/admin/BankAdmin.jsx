import {
	Box,
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import "./account.css";
import { theme } from "../../theme";
import { useEffect, useState } from "react";

function BankAdmin() {
	const [bank, setBank] = useState();
	const [load, setLoad] = useState(true);
	const [isShow, setShow] = useState(false);
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
		if (load == true) {
			axios.get(`http://localhost/auth/getbank`, {}).then((res) => {
				setBank(res.data.data);
				setLoad(false);
			});
		}
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			fullname: e.target.fullname.value,
			stk: e.target.stk.value,
			name_bank: e.target.name_bank.value,
			title: e.target.title.value,
		};
		console.log(formData);
		axios
			.post(`http://localhost/auth/newbank`, formData)
			.then((res) => {
				setLoad(true);
				swal("Sửa thông tin trò chơi thành công!");
			})
			.catch((res) => setLoad(true));
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
									Cài đặt ngân hàng
								</div>
								<div style={{ marginTop: "20px" }}>
									<form onSubmit={handleSubmit} className="form-admin">
										<div>
											<div>
												<label>Tên người nhận</label>
												<input
													required
													name="fullname"
													step="any"
													id="fullname"
												/>
											</div>
										</div>
										<div>
											<div>
												<label>Tên ngân hàng</label>
												<input
													name="name_bank"
													step="any"
													id="name_bank"
													required
												/>
											</div>
										</div>
										<div>
											<div>
												<label>STK</label>
												<input
													type="number"
													name="stk"
													step="any"
													id="stk"
													required
												/>
											</div>
										</div>
											<div>
												<label>Nội dung chuyển khoản</label>
												<input type="text" name="title" step="any" id="title" />
											</div>
										</div>
										<div>
											<button className="btn_setting">Lưu</button>
										</div>
									</form>
								</div>
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
										{bank != null ? (
											<>
												{bank.map((item) => (
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
																			`http://localhost/auth/bank/${item._id}`,
																			{}
																		)
																		.then((res) => {
																			setBank(res.data.data);
																			setShow(true);
																		})
																		.catch((res) => {
																			swal("Lấy thông tin không thành công");
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
								{isShow === true ? (
									<>
										<div className="modal">
											<div className="modaloverlay">
												<i className="ti-close closelogin"></i>
											</div>
											<div style={{backgroundColor:"white"}} className="modalbody">
												{bank != null ? (
													<>
														<form onSubmit={handleSubmitBank}>
															<div className="modalinner">
																<div className="modalheader">
																	{" "}
																	Sửa thông tin{" "}
																</div>

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
							</Container>
						</Box>
					}
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}

export default BankAdmin;
