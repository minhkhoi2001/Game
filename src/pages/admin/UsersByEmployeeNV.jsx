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
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { DashboardLayoutCustomer } from "../../components/dashboard-layout-customer";
function UsersByEmployeeNV() {
	const [code, setCode]=useState()
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
	useEffect(()=>{
		axios
		.get(`https://d3s.vnvip294.com/auth/getUser`,{
		})
		.then((res) => {
			setCode(res.data.data.code)
		}).catch(res=>localStorage.removeItem("user"))
	},[])
	useEffect(() => {
		if (load == false&&code) {
			axios
				.post(`https://d3s.vnvip294.com/auth/getCustomerEmployee`, {code: code})
				.then((res) => {
					localStorage.setItem("data", JSON.stringify(res.data.data));
					setUser(res.data.data);
					setLoad(true);
				})
				.then((res) => setLoad(true));
		}
	}, [load,code]);
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
									<div className="container_set">Danh sách user</div>
									{users?(<>
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
											<Table sx={{ width: 1600 }}>
												<TableHead>
													<TableRow>
														<TableCell>ID User</TableCell>
														<TableCell>Username</TableCell>
														<TableCell>Số tiền</TableCell>
														<TableCell>Ngày tạo</TableCell>
														<TableCell>Admin Cộng</TableCell>

														<TableCell>Admin Trừ</TableCell>
														<TableCell>Admin Thưởng</TableCell>
														<TableCell>Tổng đặt</TableCell>
														{/* <TableCell>Rút/ Nạp Tiền</TableCell>
														<TableCell>Thưởng</TableCell>
														<TableCell>Xem thông tin</TableCell> */}
													</TableRow>
												</TableHead>
												<TableBody>
													{users.map((item) => (
														<>
															<TableRow>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.iduser}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.username}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.money.toLocaleString()} VNĐ
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{formatDate(new Date(item.createdAt))}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.adminadd.toLocaleString()}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.admintru.toLocaleString()}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.adminthuong.toLocaleString()}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.totalbet.toLocaleString()}
																</TableCell>
																{/* <TableCell sx={{ fontWeight: "600" }}>
																	<form
																		onSubmit={(e) => {
																			e.preventDefault();
																			const dataForm = {
																				id: item._id,
																				money: e.target.money.value,
																			};
																			axios
																				.post(
																					`https://d3s.vnvip294.com/auth/update`,
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
																{/* <TableCell sx={{ fontWeight: "600" }}>
																	<form
																		onSubmit={(e) => {
																			e.preventDefault();
																			const dataForm = {
																				id: item._id,
																				money: e.target.money.value,
																			};
																			axios
																				.post(
																					`https://d3s.vnvip294.com/auth/adminthuong`,
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
																{/* <TableCell
																	sx={{ fontWeight: "600", display: "flex" }}
																>
																	{item.isLock == false ? (
																		<Button
																			onClick={() => {
																				axios
																					.post(
																						`https://d3s.vnvip294.com/auth/lockkey`,
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
																						`https://d3s.vnvip294.com/auth/lockkey`,
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
																			navigate(`/admin/user/${item._id}`)
																		}
																	>
																		Xem
																	</Button>
																</TableCell> */}
															</TableRow>
														</>
													))}
												</TableBody>
											</Table>
										</Box>
									</div>
									</>):<div>Hiện chưa có user</div>}
								</Container>
							</Box>
						}
					</DashboardLayoutCustomer>
				</ThemeProvider>
			</>
		);
}
export default UsersByEmployeeNV;
