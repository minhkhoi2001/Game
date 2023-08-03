import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import "./users.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function AllEmployee() {
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
	const [users, setUser] = useState(null);
	const [load, setLoad] = useState(false);
	const [searched, setSearched] = useState("");
	const navigate = useNavigate();
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
		if (load == false) {
			axios
				.get(`http://localhost/auth/getEmployee`, {})
				.then((res) => {
					localStorage.setItem("data", JSON.stringify(res.data.data));
					setUser(res.data.data);
					setLoad(true);
				})
				.then((res) => setLoad(true));
		}
	}, [load]);
	const requestSearch = (searchedVal) => {
		setSearched(searchedVal);

		if (searchedVal !== "") {
			const filteredRows = JSON.parse(localStorage.getItem("data")).filter(
				(row) => {
					return row.username.toLowerCase().includes(searchedVal.toLowerCase());
				}
			);
			setUser(filteredRows);
		} else {
			setUser(JSON.parse(localStorage.getItem("data")));
		}
	};
	if (users !== null) {
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
									<div className="container_set">Danh sách nhân viên</div>
									<div className="form_set">
										<Box sx={{ minWidth: 600 }}>
											<TextField
												value={searched}
												onChange={(searchVal) =>
													requestSearch(searchVal.target.value)
												}
												placeholder="Tìm kiếm"
												sx={{ marginBottom: "5px", paddingRight: "700px" }}
											/>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell sx={{padding:"10px"}}>ID User</TableCell>
														<TableCell sx={{padding:"10px"}}>Username</TableCell>
														<TableCell sx={{padding:"10px"}}>Mã giới thiệu</TableCell>
														<TableCell sx={{padding:"10px"}}>Ngày tạo</TableCell>
														{/* <TableCell sx={{padding:"10px"}}>Admin Cộng</TableCell>

														<TableCell sx={{padding:"10px"}}>Admin Trừ</TableCell>
														<TableCell sx={{padding:"10px"}}>Admin Thưởng</TableCell>
														<TableCell sx={{padding:"10px"}}>Tổng đặt</TableCell>
														<TableCell sx={{padding:"10px"}}>Rút/ Nạp Tiền</TableCell>
														<TableCell sx={{padding:"10px"}}>Thưởng</TableCell> */}
														<TableCell sx={{padding:"10px"}}>Xem thông tin</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{users.map((item) => (
														<>
															<TableRow>
																<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.iduser}
																</TableCell>
																<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.username}
																</TableCell>
																<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.code}
																</TableCell>
																<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{formatDate(new Date(item.createdAt))}
																</TableCell>
																{/* <TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.adminadd.toLocaleString()}
																</TableCell> */}
																{/* <TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.admintru.toLocaleString()}
																</TableCell>
																<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.adminthuong.toLocaleString()}
																</TableCell>
																<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	{item.totalbet.toLocaleString()}
																</TableCell> */}
																{/* <TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	<form
																		onSubmit={(e) => {
																			e.preventDefault();
																			const dataForm = {
																				id: item._id,
																				money: e.target.money.value,
																			};
																			axios
																				.post(
																					`http://localhost/auth/update`,
																					dataForm
																				)
																				.then((res) => {
																					setUser(res.data.data);
																					setLoad(false);
																					swal("Cộng/Trừ tiền thành công!")
																				});
																		}}
																	>
																		<input
																			style={{ width: "100px" }}
																			id={item._id}
																			name="money"
																			type="number"
																		/>
																		<Button type="submit">Xác nhận</Button>
																	</form>
																</TableCell> */}
																{/* <TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																	<form
																		onSubmit={(e) => {
																			e.preventDefault();
																			const dataForm = {
																				id: item._id,
																				money: e.target.money.value,
																			};
																			axios
																				.post(
																					`http://localhost/auth/adminthuong`,
																					dataForm
																				)
																				.then((res) => {
																					
																					setLoad(false);
																					swal("Thưởng thành công!")
																				});
																		}}
																	>
																		<input
																			style={{ width: "100px" }}
																			id={item._id}
																			name="money"
																			type="number"
																		/>
																		<Button type="submit">Xác nhận</Button>
																	</form>
																</TableCell> */}
																<TableCell
																	sx={{ fontWeight: "600", display: "flex" }}
																>
																	{item.isLock == false ? (
																		<Button
																			onClick={() => {
																				axios
																					.post(
																						`http://localhost/auth/lockkey`,
																						{
																							id: item._id,

																							isLock: true,
																						}
																					)
																					.then((res) => {
																						setLoad(false);
																						
																					});
																			}}
																		>
																			Khóa
																		</Button>
																	) : (
																		<Button
																			onClick={() => {
																				axios
																					.post(
																						`http://localhost/auth/lockkey`,
																						{
																							id: item._id,

																							isLock: false,
																						}
																					)
																					.then((res) => {
																						setLoad(false);
																						
																					});
																			}}
																		>
																			Mở
																		</Button>
																	)}
																	<Button
																		onClick={() =>
																			navigate(`/admin/employee/${item.code}`)
																		}
																	>
																		Xem
																	</Button>
																</TableCell>
															</TableRow>
														</>
													))}
												</TableBody>
											</Table>
										</Box>
									</div>
								</Container>
							</Box>
						}
					</DashboardLayout>
				</ThemeProvider>
			</>
		);
	} else {
		return (
			<>
			</>
		);
	}
}
export default AllEmployee;
