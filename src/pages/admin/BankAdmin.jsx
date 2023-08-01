import {
	Box,
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
	TextField,
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
	const [bankItem, setBankItem] = useState();
	useEffect(() => {
		if (load == true) {
			axios.get(`https://d3s.vnvip294.com/auth/getbank`, {}).then((res) => {
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
		
		axios
			.post(`https://d3s.vnvip294.com/auth/newbank`, formData)
			.then((res) => {
				setLoad(true);
				swal("Tạo ngân hàng thành công!")
				.then((value) => {
					window.location.reload();
				  });
			})
			.catch((res) => setLoad(true));
	};
	const handleSubmitBank = (e) => {
		e.preventDefault()
		const formData = {
			id:bankItem._id,
			fullname: e.target.fullname.value,
			stk: e.target.stk.value,
			name_bank: e.target.name_bank.value,
			title: e.target.title.value,
		};

		axios
		.post(
			`https://d3s.vnvip294.com/auth/editlistbank`,formData
		).then((res)=>{
			swal("Cập nhật thành công","","success")
			setLoad(true)
			setShow(false)
		})
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
												<label>Số tài khoản</label>
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
											<div>
												<label>Nội dung chuyển khoản</label>
												<input type="text" name="title" step="any" id="title" />
											</div>
										</div>
										<div>
											<button className="btn_setting">Thêm mới</button>
										</div>
									</form>
								</div>
								<Table sx={{ width: "100%" }}>
									<TableHead>
										<TableRow>
											<TableCell sx={{padding:"10px"}}>Tên Ngân Hàng</TableCell>
											<TableCell sx={{padding:"10px"}}>Số tài khoản</TableCell>
											<TableCell sx={{padding:"10px"}}>Chủ tài khoản</TableCell>
											<TableCell sx={{padding:"10px"}}>Nội dung chuyển khoản</TableCell>
											<TableCell style={{textAlign:"right"}}>Hành động</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{bank != null ? (
											<>
												{bank.map((item) => (
													<TableRow>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															{item.name_bank}
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															{" "}
															{item.stk}
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															{item.fullname}
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															{item.title}
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															<Button
																onClick={() => {
																	axios
																		.post(
																			`https://d3s.vnvip294.com/auth/editlistbank`,{
																				id:item._id,
																				isShow: !item.isShow
																			}
																		).then((res)=>setLoad(true))
													
																}}
															>
																{item.isShow==true?"Ẩn": "Hiện"}  
															</Button>
															<Button
																onClick={() => {
																	axios
																		.get(
																			`https://d3s.vnvip294.com/auth/bankall/${item._id}`,
																			{}
																		)
																		.then((res) => {
																			setBankItem(res.data.data);
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
											<div style={{fontSize:"16px",textAlign:"center",padding:"10px"}}>Đang cập nhật dữ liệu</div>
										)}
									</TableBody>
								</Table>
								{isShow === true ? (
									<>
										<div className="modal">
											<div className="modaloverlay">
												<i className="ti-close closelogin"></i>
											</div>
											<div
												style={{ backgroundColor: "white"}}
												className="modalbody"
											>
												{bankItem != null ? (
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
																			defaultValue={bankItem.name_bank}
																			sx={{ width: "100%" }}
																			type="text"
																			required
																			placeholder="Tên ngân hàng"
																		/>
																	</div>
																	<div
																		style={{ padding: "9px" }}
																		className="modalformgroup"
																	>
																		<TextField
																			name="stk"
																			defaultValue={bankItem.stk}
																			sx={{ width: "100%" }}
																			type="number"
																			required
																			placeholder="STK"
																		/>
																	</div>
																	<div
																		style={{ padding: "9px" }}
																		className="modalformgroup"
																	>
																		<TextField
																			name="fullname"
																			defaultValue={bankItem.fullname}
																			sx={{ width: "100%" }}
																			type="text"
																			required
																			placeholder="Tên tài khoản"
																		/>
																	</div>
																	<div
																		style={{ padding: "9px" }}
																		className="modalformgroup"
																	>
																		<TextField
																			name="title"
																			defaultValue={bankItem.title}
																			sx={{ width: "100%" }}
																			type="text"
																		
																			placeholder="Nội dung"
																		/>
																	</div>
																</div>
																<div
																	style={{ padding: "9px" }}
																	className="modalformgroup"
																></div>
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
