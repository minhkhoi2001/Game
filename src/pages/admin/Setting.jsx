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

function Setting() {
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
	useEffect(()=>{
		if(load==true){
			axios.get(`http://localhost/setting/get`, {}).then((res) => {
				setSetting(res.data.data[0]);
				setLoad(false)
			});		
		}
	},[load])
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData={
			id: setting?._id,
			doiben: Number(e.target.doiben.value),
			banhdon: Number(e.target.banhdon.value),
			bo3: Number(e.target.bo3.value),
			culu: Number(e.target.culu.value),
			sanh: Number(e.target.sanh.value),
			bo4: Number(e.target.bo4.value),
			bo5: Number(e.target.bo5.value),
			haidoi: Number(e.target.haidoi.value),
			motdoi: Number(e.target.motdoi.value),
			tieutan: Number(e.target.tieutan.value),
			tamco: Number(e.target.tamco.value),
			sanhother: Number(e.target.sanhother.value),
			doikhac: Number(e.target.doikhac.value),
			nuasanh: Number(e.target.nuasanh.value),
			rongho: Number(e.target.rongho.value),
			hoa: Number(e.target.hoa.value),
			lothuong: Number(e.target.lothuong.value),
			bacang: Number(e.target.bacang.value),
			de: Number(e.target.de.value),
			loxien2: Number(e.target.loxien2.value),
			loxien3: Number(e.target.loxien3.value),
			loxien4: Number(e.target.loxien4.value),
			
		}
		console.log(formData);
		axios
			.put(`http://localhost/setting/update`, formData)
			.then((res) => {
				setLoad(true);
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
							<Container maxWidth={false}>
								<div style={{ fontSize: "25px", fontWeight: 700 }}>
									Cài đặt hệ thống
								</div>
								<div style={{ marginTop: "20px" }}>
									<form className="setting" onSubmit={handleSubmit}>
										<div className="form_col">
											<div className="form_group">
												<label >Đôi bên</label>
												<input
													defaultValue={setting?.doiben}
													type="number"
													name="doiben"
													step="any"
													id="doiben"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Banh đơn</label>
												<input
													defaultValue={setting?.banhdon}
													type="number"
													name="banhdon"
													step="any"
													id="banhdon"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Bộ 3</label>
												<input
													defaultValue={setting?.bo3}
													type="number"
													name="bo3"
													step="any"
													id="bo3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Cù lũ</label>
												<input
													defaultValue={setting?.culu}
													type="number"
													step="any"
													name="culu"
													id="culu"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Sảnh</label>
												<input
													defaultValue={setting?.sanh}
													type="number"
													name="sanh"
													step="any"
													id="sanh"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Bộ 4</label>
												<input
													defaultValue={setting?.bo4}
													type="number"
													name="bo4"
													id="bo4"
													step="any"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Bộ 5</label>
												<input
													defaultValue={setting?.bo5}
													type="number"
													step="any"
													name="bo5"
													id="bo5"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >2 đôi</label>
												<input
													defaultValue={setting?.haidoi}
													type="number"
													name="haidoi"
													step="any"
													id="haidoi"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >1 đoi</label>
												<input
													defaultValue={setting?.motdoi}
													type="number"
													name="motdoi"
													id="motdoi"
													step="any"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Tiêu tan</label>
												<input
													defaultValue={setting?.tieutan}
													type="number"
													name="tieutan"
													step="any"
													id="tieutan"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Tam cô</label>
												<input
													defaultValue={setting?.tamco}
													type="number"
													name="tamco"
													id="tamco"
													step="any"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Sảnh (khác)</label>
												<input
													defaultValue={setting?.sanhother}
													type="number"
													name="sanhother"
													step="any"
													id="sanhother"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Đôi (khác)</label>
												<input
													defaultValue={setting?.doikhac}
													type="number"
													name="doikhac"
													step="any"
													id="doikhac"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Nữa sảnh</label>
												<input
													defaultValue={setting?.nuasanh}
													type="number"
													step="any"
													name="nuasanh"
													id="nuasanh"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Rồng hổ</label>
												<input
													defaultValue={setting?.rongho}
													type="number"
													name="rongho"
													step="any"
													id="rongho"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Hòa</label>
												<input
													defaultValue={setting?.hoa}
													type="number"
													name="hoa"
													step="any"
													id="hoa"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô thường</label>
												<input
													defaultValue={setting?.lothuong}
													type="number"
													name="lothuong"
													step="any"
													id="lothuong"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Ba càng</label>
												<input
													defaultValue={setting?.bacang}
													type="number"
													name="bacang"
													step="any"
													id="bacang"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Đề</label>
												<input
													defaultValue={setting?.de}
													type="number"
													step="any"
													name="de"
													id="de"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 2</label>
												<input
													defaultValue={setting?.loxien2}
													type="number"
													name="loxien2"
													step="any"
													id="loxien2"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 3</label>
												<input
													defaultValue={setting?.loxien3}
													type="number"
													name="loxien3"
													step="any"
													id="loxien3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 4</label>
												<input
													defaultValue={setting?.loxien4}
													type="number"
													name="loxien4"
													step="any"
													id="loxien4"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
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

export default Setting;
