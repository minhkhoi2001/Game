import { Box, Container } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import "./account.css";
import { theme } from "../../theme";
import { useEffect, useState } from "react";

function SettingProfit() {
	const [setting, setSetting] = useState();
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
			axios.get(`http://localhost/profit/get`, {}).then((res) => {
				setSetting(res.data.data[0]);
				setLoad(false);
			});
		}
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			id: setting?._id,
			v1: Number(e.target.v1.value),
			v2: Number(e.target.v2.value),
			v3: Number(e.target.v3.value),
			v4: Number(e.target.v4.value),
			v5: Number(e.target.v5.value),
			v6: Number(e.target.v6.value),
			v7: Number(e.target.v7.value),
			v8: Number(e.target.v8.value),
			v9: Number(e.target.v9.value),
			v10: Number(e.target.v10.value),
			aff: Number(e.target.aff.value),
			first: Number(e.target.first.value),
		};

		axios
			.put(`http://localhost/profit/update`, formData)
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
									Cài đặt trả thưởng lãi suất
								</div>
								<div style={{ marginTop: "20px" }}>
									<form className="setting" onSubmit={handleSubmit}>
										<h3
											style={{
												width: "100%",
												flex: "0 0 100%",
												textAlign: "left",
												fontWeight: "bold",
												margin: "30px 10px 10px",
											}}
										>
											lãi suất
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Vip 1</label>
												<input
													defaultValue={setting?.v1}
													type="number"
													name="v1"
													step="any"
													id="v1"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 2</label>
												<input
													defaultValue={setting?.v2}
													type="number"
													name="v2"
													step="any"
													id="v2"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Vip 3</label>
												<input
													defaultValue={setting?.v3}
													type="number"
													name="v3"
													step="any"
													id="v3"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 4</label>
												<input
													defaultValue={setting?.v4}
													type="number"
													name="v4"
													step="any"
													id="v4"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 5</label>
												<input
													defaultValue={setting?.v5}
													type="number"
													name="v5"
													step="any"
													id="v5"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 6</label>
												<input
													defaultValue={setting?.v6}
													type="number"
													name="v6"
													step="any"
													id="v6"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 7</label>
												<input
													defaultValue={setting?.v7}
													type="number"
													name="v7"
													step="any"
													id="v7"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 8</label>
												<input
													defaultValue={setting?.v8}
													type="number"
													name="v8"
													step="any"
													id="v8"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 9</label>
												<input
													defaultValue={setting?.v9}
													type="number"
													name="v9"
													step="any"
													id="v9"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Vip 10</label>
												<input
													defaultValue={setting?.v10}
													type="number"
													name="v10"
													step="any"
													id="v10"
													className="input_setting"
												/>
											</div>
										</div>
										<h3
											style={{
												width: "100%",
												flex: "0 0 100%",
												textAlign: "left",
												fontWeight: "bold",
												margin: "30px 10px 10px",
											}}
										>
											Trả thưởng
										</h3>
										<div className="form_col">
											<div className="form_group">
												<label>Đăng kí</label>
												<input
													defaultValue={setting?.aff}
													type="number"
													name="aff"
													step="any"
													id="aff"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label>Chơi lần đầu</label>
												<input
													defaultValue={setting?.first}
													type="number"
													name="first"
													step="any"
													id="first"
													className="input_setting"
												/>
											</div>
										</div>
										<div
											className="form_col"
											style={{ clear: "both", width: "100%" }}
										>
											<button type="submit" className="btn_setting">
												Lưu
											</button>
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

export default SettingProfit;
