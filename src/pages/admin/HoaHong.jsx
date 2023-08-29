import { Box, Container } from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import "./account.css";
import { theme } from "../../theme";
import { useEffect, useState } from "react";

function HoaHong() {
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
			axios.get(`http://localhost/play/get`, {}).then((res) => {
				setSetting(res.data.data[0]);
				setLoad(false);
			});
		}
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			id: setting?._id,
			l1:Number(e.target.v1.value),
			l2:Number(e.target.v2.value),
			l3:Number(e.target.v3.value),
			v1:{
				lv1: Number(e.target.v4.value),
				lv2: Number(e.target.v5.value),
				lv3: Number(e.target.v6.value),
			},
			v2:{
				lv1: Number(e.target.v7.value),
				lv2: Number(e.target.v8.value),
				lv3: Number(e.target.v9.value),
			},
			v3:{
				lv1: Number(e.target.v10.value),
				lv2: Number(e.target.v11.value),
				lv3: Number(e.target.v12.value),
			},
			v4:{
				lv1: Number(e.target.v13.value),
				lv2: Number(e.target.v14.value),
				lv3: Number(e.target.v15.value),
			},
			v5:{
				lv1: Number(e.target.v16.value),
				lv2: Number(e.target.v17.value),
				lv3: Number(e.target.v18.value),
			},
			v6:{
				lv1: Number(e.target.v19.value),
				lv2: Number(e.target.v20.value),
				lv3: Number(e.target.v21.value),
			},
			v7:{
				lv1: Number(e.target.v22.value),
				lv2: Number(e.target.v23.value),
				lv3: Number(e.target.v24.value),
			},
			v8:{
				lv1: Number(e.target.v25.value),
				lv2: Number(e.target.v26.value),
				lv3: Number(e.target.v27.value),
			},
			v9:{
				lv1: Number(e.target.v28.value),
				lv2: Number(e.target.v29.value),
				lv3: Number(e.target.v30.value),
			},
			v10:{
				lv1: Number(e.target.v31.value),
				lv2: Number(e.target.v32.value),
				lv3: Number(e.target.v33.value),
			},

	
		};

		axios
			.put(`http://localhost/play/update`, formData)
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
									Cài đặt lãi suất đặt cược
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
											Mức trả thưởng hoa hồng
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.l1}
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
												<label>Mức 2</label>
												<input
													defaultValue={setting?.l2}
													type="number"
													name="v2"
													step="any"
													min={setting?.l1}
													id="v2"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.l3}
													type="number"
													name="v3"
													step="any"
													id="v3"
													min={setting?.l2}
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
											Vip 1
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v1?.lv1}
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
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v1?.lv2}
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
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v1?.lv3}
													type="number"
													name="v6"
													step="any"
													id="v6"
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
											Vip 2
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v2?.lv1}
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
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v2?.lv2}
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
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v2?.lv3}
													type="number"
													name="v9"
													step="any"
													id="v9"
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
											Vip 3
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v3?.lv1}
													type="number"
													name="v10"
													step="any"
													id="v10"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v3?.lv2}
													type="number"
													name="v11"
													step="any"
													id="v11"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v3?.lv3}
													type="number"
													name="v12"
													step="any"
													id="v12"
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
											Vip 4
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v4?.lv1}
													type="number"
													name="v13"
													step="any"
													id="v13"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v4?.lv2}
													type="number"
													name="v14"
													step="any"
													id="v14"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v4?.lv3}
													type="number"
													name="v15"
													step="any"
													id="15"
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
											Vip 5
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v5?.lv1}
													type="number"
													name="v16"
													step="any"
													id="v16"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v5?.lv2}
													type="number"
													name="v17"
													step="any"
													id="v17"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v5?.lv3}
													type="number"
													name="v18"
													step="any"
													id="v18"
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
											Vip 6
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v6?.lv1}
													type="number"
													name="v19"
													step="any"
													id="v19"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v6?.lv2}
													type="number"
													name="v20"
													step="any"
													id="v20"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v6?.lv3}
													type="number"
													name="v21"
													step="any"
													id="v21"
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
											Vip 7
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v7?.lv1}
													type="number"
													name="v22"
													step="any"
													id="v22"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v7?.lv2}
													type="number"
													name="v23"
													step="any"
													id="v23"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v7?.lv3}
													type="number"
													name="v24"
													step="any"
													id="v24"
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
											Vip 8
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v8?.lv1}
													type="number"
													name="v25"
													step="any"
													id="v25"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v8?.lv2}
													type="number"
													name="v26"
													step="any"
													id="v26"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v8?.lv3}
													type="number"
													name="v27"
													step="any"
													id="v27"
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
											Vip 9
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v9?.lv1}
													type="number"
													name="v28"
													step="any"
													id="v28"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v9?.lv2}
													type="number"
													name="v29"
													step="any"
													id="v29"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v9?.lv3}
													type="number"
													name="v30"
													step="any"
													id="v30"
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
											Vip 10
										</h3>

										<div className="form_col">
											<div className="form_group">
												<label>Mức 1</label>
												<input
													defaultValue={setting?.v10?.lv1}
													type="number"
													name="v31"
													step="any"
													id="v31"
													className="input_setting"
												/>
											</div>
										</div>
										
										<div className="form_col">
											<div className="form_group">
												<label>Mức 2</label>
												<input
													defaultValue={setting?.v10?.lv2}
													type="number"
													name="v32"
													step="any"
													id="v32"
													className="input_setting"
												/>
											</div>
										</div>
						
										<div className="form_col">
											<div className="form_group">
												<label>Mức 3</label>
												<input
													defaultValue={setting?.v10?.lv3}
													type="number"
													name="v33"
													step="any"
													id="v33"
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

export default HoaHong;
