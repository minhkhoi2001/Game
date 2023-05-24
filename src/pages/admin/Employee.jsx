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
import { useEffect, useState } from "react";

function Employee() {
	const [setting,setSetting]= useState()
	const [load,setLoad] =useState(true)
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
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData={
			username: e.target.username.value,
			password: e.target.password.value
		}
		console.log(formData);
		axios
			.post(`https://server.vnvip294.com/auth/createEmployee`, formData)
			.then((res) => {
				setLoad(true);
				swal("Thêm mới nhân viên thành công!")
			})
			.catch((res) => setLoad(true))
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
							<Container sx={{justifyContent:"center"}} maxWidth={false}>
								<div style={{ fontSize: "25px", fontWeight: 700 }}>
									Tạo tài khoản nhân viên
								</div>
								<div style={{ display:"flex" , justifyContent:"center", marginTop: "20px", marginLeft:"50px" }}>
									<form onSubmit={handleSubmit}>
										<div >
											<div style={{width:"400px", marginBottom:"20px"}} >
												<label >Tài khoản</label>
												<input
													
													type="username"
													name="username"

													id="username"
													className="input_setting"
												/>
											</div>
										</div>
										<div >
											<div style={{width:"400px", marginBottom:"20px"}} >
												<label >Mật khẩu</label>
												<input
													type="password"
													name="password"
		
													id="password"
													className="input_setting"
												/>
											</div>
										</div>
										<button>Xác nhận</button>
									</form>
								</div>
							</Container>
						</Box>
					}
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}

export default Employee;
