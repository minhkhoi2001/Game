import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import {
	Box,
	Button,
	Container,
	Table,
	Pagination,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetNameChoose } from "../../funcUtils";
function HistoryBetAll() {
	const [data, setData] = useState(null);
	const [searched, setSearched] = useState("");
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
	const requestSearch = (searchedVal) => {
		setSearched(searchedVal);

		if (searchedVal !== "") {
			const filteredRows = JSON.parse(localStorage.getItem("data")).filter(
				(row) => {
					return row.user.iduser.toString()
						.toLowerCase()
						.includes(searchedVal.toLowerCase());
				}
			);
			setData(filteredRows);
		} else {
			setData(JSON.parse(localStorage.getItem("data")));
		}
	};
	useEffect(() => {
		axios
			.get(`https://server.st666.pro/history/all`, {})
			.then((res) => {
				localStorage.setItem("data", JSON.stringify(res.data.data));
				setData(res.data.data);
			})
			.catch((res) => setData(null));
	}, []);
	const [pages, setPage] = useState(1);

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
								<div className="container_set">Lịch sử giao dịch</div>
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
													<TableCell>Số kỳ</TableCell>
													<TableCell>User</TableCell>
													<TableCell>ID User</TableCell>
													<TableCell>Người chơi đặt</TableCell>
													<TableCell>Số tiền</TableCell>
													<TableCell>Trạng thái</TableCell>
													<TableCell>Thời gian</TableCell>
												</TableRow>
											</TableHead>
											{data != null ? (
												<TableBody>
													{data?.slice((pages - 1) * 10, (pages - 1) * 10 + 10).map((item) => (
														<>
															<TableRow>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.id_bet.id_bet}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.user.username}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{item.user.iduser}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{GetNameChoose(Number(item.state),null)}
																</TableCell>
																<TableCell sx={{ fontWeight: "600" }}>
																	{" "}
																	{(
																		item.money
																	).toLocaleString()}{" "}
																	VNĐ
																</TableCell>
																{item.status_bet === "Win" ? (
																	<TableCell sx={{ fontWeight: "600" }}>
																		<Button color="success">
																			{item.status_bet}
																		</Button>
																	</TableCell>
																) : null}
																{item.status_bet === "Lose" ? (
																	<TableCell sx={{ fontWeight: "600" }}>
																		<Button color="error">
																			{item.status_bet}
																		</Button>
																	</TableCell>
																) : null}
																{item.status_bet === "Pending" ? (
																	<TableCell sx={{ fontWeight: "600" }}>
																		<Button color="warning">
																			{item.status_bet}
																		</Button>
																	</TableCell>
																) : null}
																<TableCell sx={{ fontWeight: "600" }}>
																	{formatDate(new Date(item.createdAt))}
																</TableCell>
															</TableRow>
														</>
													))}
												</TableBody>
											) : (
												<div>Đang cập nhật</div>
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
export default HistoryBetAll;
