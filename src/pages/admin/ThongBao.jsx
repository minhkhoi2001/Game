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

function ThongBao() {
	const { id } = useParams();
	const [isShow, setShow] = useState(false);
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
		if (load == false) {
			axios
				.get(`https://d3s.vnvip294.com/notification/getSale`)
				.then((res) => {
					setData(res.data.data);
					setLoad(true);
				})
				.catch((res) => setData(null));
		}
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			title: e.target.title1.value,
		};
		axios
			.post(`https://d3s.vnvip294.com/notification/create`, formData)
			.then((res) => {
				setShow(false);
				swal("Thêm thông báo thành công");
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
									Gửi thông báo user
								</div>
								<div className="edit_account_bankl">Thông báo : {data!=null?(data[0].title):null}</div>
								<div className="item_accountprofile">
									<div className="edit_account_bankl">
										{data != null ? (
											<form onSubmit={(e)=>{
												e.preventDefault();
												const formData = {
													title: e.target.title.value,
													id: data[0]._id
												};
												axios
													.post(`https://d3s.vnvip294.com/notification/updatebyadmin`, formData)
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
											}}>
												<TextField
													name="title"
													defaultValue={data[0].title}
													placeholder="Nhập thông báo gửi cho người chơi"
													sx={{ width: "1000px" }}
												/>
												<Button type="submit">Xác nhận</Button>
											</form>
										) : (
											<form onSubmit={handleSubmit}>
												<TextField
													name="title1"
													
													placeholder="Nhập thông báo gửi cho người chơi"
													sx={{ width: "1000px" }}
												/>
												<Button type="submit">Xác nhận</Button>
											</form>
										)}
									</div>
								</div>
							</Container>
						</Box>
					}
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}

export default ThongBao;
