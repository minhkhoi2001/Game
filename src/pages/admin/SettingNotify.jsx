import {
	Box,
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Button,
	TextField,
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import "./account.css";
import { theme } from "../../theme";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function SettingNotify() {
	const [notify, setNotify] = useState();
	const [load, setLoad] = useState(true);
	const [isShow, setShow] = useState(false);
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

	const [content, setContent] = useState('');
	const handleChangeContent = (value) => {
		setContent(value);
	};

	const [notifyItem, setNotifyItem] = useState();
	useEffect(() => {
		if (load == true) {
			axios.get(`http://localhost/auth/getnotify`, {}).then((res) => {
				setNotify(res.data.data);
				setLoad(false);
			});
		}
	}, [load]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			title: e.target.title.value,
			image: e.target.image.value,
			content: content,
		};
		axios
			.post(`http://localhost/auth/newnotify`, formData)
			.then((res) => {
				setLoad(true);
				swal("Tạo thông báo thành công!")
				.then((value) => {
					window.location.reload();
				  });
			})
			.catch((res) => setLoad(true));
	};
	const handleSubmitnotify = (e) => {
		e.preventDefault()
		const formData = {
			id:notifyItem._id,
			title: e.target.title.value,
			image: e.target.image.value,
			content: content,
		};

		axios
		.post(
			`http://localhost/auth/editlistnotify`,formData
		).then((res)=>{
			swal("Cập nhật thành công","","success")
			setLoad(true)
			setShow(false)
		})
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
									Cài đặt chữ chạy ở trang chủ
								</div>
								<div>
									{notify != null ? (
										<>
											{notify.map((item, index) => (
												<>
													{index == 0 && item.title == "marquee" ? (
														<div style={{display:"flex", margin:"10px 0 80px", border: "1px solid red", lineHeight: "2"}}>
															<marquee className="thongbaomarquee">
																<div className="contentHtml" dangerouslySetInnerHTML={{ __html: item.content }} />
															</marquee>
															<button
																className="btn-marquee"
																onClick={() => {
																	axios
																		.get(
																			`http://localhost/auth/notifyall/${item._id}`,
																			{}
																		)
																		.then((res) => {
																			setNotifyItem(res.data.data);
																			setShow(true);
																		})
																		.catch((res) => {
																			swal("Lấy thông tin không thành công");
																			setLoad(false);
																		});
																}}
															>
																Sửa
															</button>
														</div>
													) : null}
												</>
											))}
										</>
									) : null }
								</div>
								<div style={{ fontSize: "25px", fontWeight: 700 }}>
									Cài đặt trang thông báo
								</div>
								<div style={{ marginTop: "20px" }}>
									<form onSubmit={handleSubmit} className="form-admin" style={{maxWidth:"800px"}}>
										<div>
											<div>
												<label>Tiêu đề thông báo</label>
												<input
													required
													name="title"
													id="title"
												/>
											</div>
										</div>
										<div>
											<div>
												<label>Link hình ảnh</label>
												<input
													name="image"
													id="image"
												/>
											</div>
										</div>
										<div>
											<div>
												<label>Nội dung thông báo (HTML)</label>
												<ReactQuill value={content} onChange={handleChangeContent} />
											</div>
										</div>
										<div>
											<button className="btn_setting">Thêm mới</button>
										</div>
									</form>
								</div>
								<Table sx={{ width: "100%" }}>
									<TableHead>
										<TableRow>
											<TableCell sx={{padding:"10px"}}>Tiêu đề thông báo</TableCell>
											<TableCell sx={{padding:"10px"}}>Hình ảnh</TableCell>
											<TableCell sx={{padding:"10px"}}>Nội dung thông báo</TableCell>
											<TableCell style={{textAlign:"right"}}>Hành động</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{notify != null ? (
											<>
												{notify.map((item, index) => (
													<>
													{index != 0 && item.title != "marquee" ? (
													<TableRow>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															{item.title}
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															<img src={item.image} style={{width:"200px",height:"auto"}}/>
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															<div className="contentHtml" dangerouslySetInnerHTML={{ __html: item.content }} />
														</TableCell>
														<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
															<Button
																onClick={() => {
																	axios
																		.post(
																			`http://localhost/auth/editlistnotify`,{
																				id:item._id,
																				isShow: !item.isShow
																			}
																		).then((res)=>setLoad(true))
													
																}}
															>
																{item.isShow==true?"Ẩn": "Hiện"}  
															</Button>
															<Button
																onClick={() => {
																	axios
																		.get(
																			`http://localhost/auth/notifyall/${item._id}`,
																			{}
																		)
																		.then((res) => {
																			setNotifyItem(res.data.data);
																			setShow(true);
																		})
																		.catch((res) => {
																			swal("Lấy thông tin không thành công");
																			setLoad(false);
																		});
																}}
															>
																Sửa
															</Button>
														</TableCell>
													</TableRow>
													) : null}
													</>
												))}
											</>
										) : (
											<div style={{fontSize:"16px",textAlign:"center",padding:"10px"}}>Đang cập nhật dữ liệu</div>
										)}
									</TableBody>
								</Table>
								{isShow === true ? (
									<>
										<div className="modal">
											<div className="modaloverlay">
												<i className="ti-close closelogin"></i>
											</div>
											<div
												style={{ backgroundColor: "white", width: "600px" }}
												className="modalbody"
											>
												{notifyItem != null ? (
													<>
														<form onSubmit={handleSubmitnotify}>
															<div className="modalinner">
																<div className="modalheader">
																	Sửa thông báo
																</div>
																<div className="modalform">
																{notifyItem.title != "marquee" ? (
																<>
																	<div
																		className="modalformgroup"
																		style={{ padding: "9px" }}
																	>
																		<TextField
																			name="title"
																			defaultValue={notifyItem.title}
																			sx={{ width: "100%" }}
																			type="text"
																			required
																			placeholder="Tiêu đề"
																		/>
																	</div>
																	<div
																		style={{ padding: "9px" }}
																		className="modalformgroup"
																	>
																		<TextField
																			name="image"
																			defaultValue={notifyItem.image}
																			sx={{ width: "100%" }}
																			type="text"
																			required
																			placeholder="Hình ảnh"
																		/>
																	</div>
																</>
																) : <>
																	<div
																		className="modalformgroup"
																		style={{ padding: "9px",display: "none" }}
																	>
																		<TextField
																			name="title"
																			defaultValue={notifyItem.title}
																			sx={{ width: "100%" }}
																			type="text"
																			required
																			placeholder="Tiêu đề"
																		/>
																	</div>
																	<div
																		style={{ padding: "9px",display: "none" }}
																		className="modalformgroup"
																	>
																		<TextField
																			name="image"
																			defaultValue={notifyItem.image}
																			sx={{ width: "100%" }}
																			type="text"
																			required
																			placeholder="Hình ảnh"
																		/>
																	</div>
																</>}
																	<div
																		style={{ padding: "9px" }}
																		className="modalformgroup"
																	>
																		<ReactQuill defaultValue={notifyItem.content} onChange={handleChangeContent} />
																	</div>
																</div>
																<div
																	style={{ padding: "9px" }}
																	className="modalformgroup"
																></div>
																<div className="item_btn_form">
																	<div className="modalformcontrols">
																		<Button type="submit">XÁC NHẬN</Button>
																	</div>
																	<div className="modalformcontrols">
																		<Button onClick={() => setShow(false)}>
																			ĐÓNG
																		</Button>
																	</div>
																</div>
															</div>
														</form>
													</>
												) : (
													<div>Đang chờ dữ liệu</div>
												)}
											</div>
										</div>
									</>
								) : null}
							</Container>
						</Box>
					}
				</DashboardLayout>
			</ThemeProvider>
		</>
	);
}

export default SettingNotify;
