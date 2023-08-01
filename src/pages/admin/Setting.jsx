import {
	Box,
	Container,

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
			axios.get(`https://d3s.vnvip294.com/setting/get`, {}).then((res) => {
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

			xucsac5p:Number(e.target.xucsac5p.value),
			xucsac3p:Number(e.target.xucsac5p.value),
			haitrung3:Number(e.target.haitrung3.value),
			haitrung5:Number(e.target.haitrung5.value),

			batrung3:Number(e.target.batrung3.value),
			batrung5:Number(e.target.batrung5.value),

			lothuong: Number(e.target.lothuong.value),
			bacang: Number(e.target.bacang.value),
			de: Number(e.target.de.value),
			loxien2: Number(e.target.loxien2.value),
			loxien3: Number(e.target.loxien3.value),
			loxien4: Number(e.target.loxien4.value),
			
			mblothuong: Number(e.target.mblothuong.value),
			mbbacang: Number(e.target.mbbacang.value),
			mbde: Number(e.target.mbde.value),
			mbloxien2: Number(e.target.mbloxien2.value),
			mbloxien3: Number(e.target.mbloxien3.value),
			mbloxien4: Number(e.target.mbloxien4.value),

			mtlothuong: Number(e.target.mtlothuong.value),
			mtbacang: Number(e.target.mtbacang.value),
			mtde: Number(e.target.mtde.value),
			mtloxien2: Number(e.target.mtloxien2.value),
			mtloxien3: Number(e.target.mtloxien3.value),
			mtloxien4: Number(e.target.mtloxien4.value),

			mnlothuong: Number(e.target.mnlothuong.value),
			mnbacang: Number(e.target.mnbacang.value),
			mnde: Number(e.target.mnde.value),
			mnloxien2: Number(e.target.mnloxien2.value),
			mnloxien3: Number(e.target.mnloxien3.value),
			mnloxien4: Number(e.target.mnloxien4.value),
			
			aff: Number(e.target.aff.value)
		}
		
		axios
			.put(`https://d3s.vnvip294.com/setting/update`, formData)
			.then((res) => {
				setLoad(true);
				swal("Sửa thông tin trò chơi thành công!")
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
									Cài đặt trả thưởng
								</div>
								<div style={{ marginTop: "20px" }}>
									<form className="setting" onSubmit={handleSubmit}>
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>Keno</h3>
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
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>Xúc sắc</h3>
										<div className="form_col">
											<div className="form_group">
												<label >Súc xắc 3p</label>
												<input
													defaultValue={setting?.xucsac3p}
													type="number"
													name="xucsac3p"
													step="any"
													id="xucsac3p"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Hai số trùng Xúc sắc 3p</label>
												<input
													defaultValue={setting?.haitrung3}
													type="number"
													name="haitrung3"
													step="any"
													id="haitrung3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Ba số trùng Xúc sắc 3p</label>
												<input
													defaultValue={setting?.batrung3}
													type="number"
													name="batrung3"
													step="any"
													id="batrung3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Súc xắc 5p</label>
												<input
													defaultValue={setting?.xucsac5p}
													type="number"
													name="xucsac5p"
													step="any"
													id="xucsac5p"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Hai số trùng Xúc sắc 5p</label>
												<input
													defaultValue={setting?.haitrung5}
													type="number"
													name="haitrung5"
													step="any"
													id="haitrung5"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Ba số trùng Xúc sắc 5p</label>
												<input
													defaultValue={setting?.batrung5}
													type="number"
													name="batrung5"
													step="any"
													id="batrung5"
													className="input_setting"
												/>
											</div>
										</div>
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>Xổ số nhanh</h3>
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
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>XSMB</h3>
										<div className="form_col">
											<div className="form_group">
												<label>Lô thường</label>
												<input
													defaultValue={setting?.mblothuong}
													type="number"
													name="mblothuong"
													step="any"
													id="mblothuong"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Ba càng</label>
												<input
													defaultValue={setting?.mbbacang}
													type="number"
													name="mbbacang"
													step="any"
													id="mbbacang"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Đề</label>
												<input
													defaultValue={setting?.mbde}
													type="number"
													step="any"
													name="mbde"
													id="mbde"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 2</label>
												<input
													defaultValue={setting?.mbloxien2}
													type="number"
													name="mbloxien2"
													step="any"
													id="mbloxien2"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 3</label>
												<input
													defaultValue={setting?.mbloxien3}
													type="number"
													name="mbloxien3"
													step="any"
													id="mbloxien3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 4</label>
												<input
													defaultValue={setting?.mbloxien4}
													type="number"
													name="mbloxien4"
													step="any"
													id="mbloxien4"
													className="input_setting"
												/>
											</div>
										</div>
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>XSMT</h3>
										<div className="form_col">
											<div className="form_group">
												<label >Lô thường</label>
												<input
													defaultValue={setting?.mtlothuong}
													type="number"
													name="mtlothuong"
													step="any"
													id="mtlothuong"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Ba càng</label>
												<input
													defaultValue={setting?.mtbacang}
													type="number"
													name="mtbacang"
													step="any"
													id="mtbacang"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Đề</label>
												<input
													defaultValue={setting?.mtde}
													type="number"
													step="any"
													name="mtde"
													id="mtde"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 2</label>
												<input
													defaultValue={setting?.mtloxien2}
													type="number"
													name="mtloxien2"
													step="any"
													id="mtloxien2"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 3</label>
												<input
													defaultValue={setting?.mtloxien3}
													type="number"
													name="mtloxien3"
													step="any"
													id="mtloxien3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 4</label>
												<input
													defaultValue={setting?.mtloxien4}
													type="number"
													name="mtloxien4"
													step="any"
													id="mtloxien4"
													className="input_setting"
												/>
											</div>
										</div>
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>XSMN</h3>
										<div className="form_col">
											<div className="form_group">
												<label >Lô thường</label>
												<input
													defaultValue={setting?.mnlothuong}
													type="number"
													name="mnlothuong"
													step="any"
													id="mnlothuong"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Ba càng</label>
												<input
													defaultValue={setting?.mnbacang}
													type="number"
													name="mnbacang"
													step="any"
													id="mnbacang"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Đề</label>
												<input
													defaultValue={setting?.mnde}
													type="number"
													step="any"
													name="mnde"
													id="mnde"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 2</label>
												<input
													defaultValue={setting?.mnloxien2}
													type="number"
													name="mnloxien2"
													step="any"
													id="mnloxien2"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 3</label>
												<input
													defaultValue={setting?.mnloxien3}
													type="number"
													name="mnloxien3"
													step="any"
													id="mnloxien3"
													className="input_setting"
												/>
											</div>
										</div>
										<div className="form_col">
											<div className="form_group">
												<label >Lô xiên 4</label>
												<input
													defaultValue={setting?.mnloxien4}
													type="number"
													name="mnloxien4"
													step="any"
													id="mnloxien4"
													className="input_setting"
												/>
											</div>
										</div>
										<h3 style={{width:"100%", flex:"0 0 100%",textAlign:"left",fontWeight:"bold",margin:"30px 10px 10px"}}>Khác</h3>
										<div className="form_col">
											<div className="form_group">
												<label >Hoa hồng</label>
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
										<div className="form_col" style={{clear:"both",width:"100%"}}>
											<button type="submit" className="btn_setting">Lưu</button>
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
