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
	TextField,
	Pagination
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
function Add() {
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
	const [data, setData] = useState(null);
	const [load, setLoad] = useState(false);
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
		if (load === false) {
			axios.get(`https://server.best96tx.com/payment/nap`, {}).then((res) => {
				setData(res.data.data);
				localStorage.setItem("data", JSON.stringify(res.data.data));
				setLoad(true);
			});
		}
	}, [load]);
	const requestSearch = (searchedVal) => {
		setSearched(searchedVal);

		if (searchedVal !== "") {
			const filteredRows = JSON.parse(localStorage.getItem("data")).filter(
				(row) => {
					return row.user.username.toString()
						
						.includes(searchedVal);
				}
			);
			setData(filteredRows);
		} else {
			setData(JSON.parse(localStorage.getItem("data")));
		}
	};
	const [pages, setPage] = useState(1);
	const [searched, setSearched] = useState("");
	const handleChange = (e, page) => {
		setPage(page);
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
								<div className="container_set">Yêu cầu nạp tiền</div>
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
										<Table sx={{ width: 1200 }}>
											<TableHead>
												<TableRow>
													<TableCell sx={{padding:"10px"}}>Tên tài khoản</TableCell>
													<TableCell sx={{padding:"10px"}}>ID USER</TableCell>
													<TableCell sx={{padding:"10px"}}>Thông tin thanh toán</TableCell>
													<TableCell sx={{padding:"10px"}}>Số tiền</TableCell>
													<TableCell sx={{padding:"10px"}}>Trạng thái</TableCell>
													<TableCell sx={{padding:"10px"}}>Hành Động</TableCell>
													<TableCell sx={{padding:"10px"}}>Thời gian</TableCell>
												</TableRow>
											</TableHead>
											{data && (
											<TableBody>
												{data?.slice((pages - 1) * 10, (pages - 1) * 10 + 10).map((item) => (
													<>
														<TableRow>
															<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																{item?.user?.username}
															</TableCell>
															<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																{item?.user?.iduser}
															</TableCell>
															<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																{item?.detail}
															</TableCell>

															<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																{Number(item?.money).toLocaleString()} VNĐ
															</TableCell>
															{item?.status_payment === "Pending" ? (
																<TableCell sx={{padding:"10px"}}>
																	<Button type="text" color="warning">
																		{item?.status_payment}
																	</Button>
																</TableCell>
															) : null}
															{item?.status_payment === "Success" ? (
																<TableCell sx={{padding:"10px"}}>
																	<Button type="text" color="success">
																		{item?.status_payment}
																	</Button>
																</TableCell>
															) : null}
															{item?.status_payment === "Deny" ? (
																<TableCell sx={{padding:"10px"}}>
																	<Button type="text" color="error">
																		{item?.status_payment}
																	</Button>
																</TableCell>
															) : null}
															<TableCell sx={{padding:"10px"}}>
																<Button
																	onClick={() => {
																		const formData = {
																			id: item?._id,
																			status: "Accept",
																		};
																		axios
																			.post(
																				`https://server.best96tx.com/payment/update`,
																				formData
																			)
																			.then((res) => {
																				setLoad(false);
																			})
																			.catch((err) => setLoad(false));
																	}}
																	disabled={item?.status_payment !== "Pending"}
																>
																	Xác nhận
																</Button>
																<Button
																	onClick={() => {
																		const formData = {
																			id: item?._id,
																			status: "Deny",
																		};
																		axios
																			.post(
																				`https://server.best96tx.com/payment/update`,
																				formData
																			)
																			.then((res) => {
																				setLoad(false);
																			})
																			.catch((err) => setLoad(false));
																	}}
																	disabled={item?.status_payment !== "Pending"}
																>
																	Từ chối
																</Button>
															</TableCell>
															<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																{formatDate(new Date(item?.createdAt))}
															</TableCell>
														</TableRow>
													</>
												))}
											</TableBody>
											)}
										</Table>
									</Box>
								</div>
								<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											pt: 3,
										}}
									>
										{data != null ? (
											<Pagination
												color="primary"
												count={Math.floor(data.length / 10) + 1}
												size="small"
												onChange={handleChange}
											/>
										) : null}
									</Box>
							</Container>
						</Box>
					}
					<ToastContainer />
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}
export default Add;
