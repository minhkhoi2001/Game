import { Box, Container } from "@mui/material";
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
			axios.get(`http://localhost/auth/bank`, {}).then((res) => {
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
			name_bank: e.target.name_bank.value
		};
		console.log(formData);
		axios
			.post(`http://localhost/auth/editbank`, formData)
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
													defaultValue={bank?.fullname}
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
													defaultValue={bank?.name_bank}
													name="name_bank"
													step="any"
													id="name_bank"
													required
												/>
											</div>
										</div>
										<div >
											<div >
												<label >STK</label>
												<input
													defaultValue={bank?.stk}
													type="number"
													name="stk"
													step="any"
													id="stk"
													required
												
												/>
											</div>
										</div>
										<div >
											<button className="btn_setting">Lưu</button>
										</div>
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

export default BankAdmin;
