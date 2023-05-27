import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import swal from "sweetalert";

function AddBank() {
	const [profile, setProfile] = useState(null);
	const [show, setShow] = useState(false);
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
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const [bank, setBank] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(`https://server.luckkylotte9d.com/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios
			.get(`https://server.luckkylotte9d.com/bank/getBank`, {})
			.then((res) => {
				setBank(res.data.data);
			})
			.catch((err) => setBank(null));
	}, []);
	const onSubmit = (data) => {
		const formData = {
			name_bank: data.name_bank,
			stk: data.stk,
			fullname: data.fullname,
			user: profile._id,
		};
		axios
			.post(`https://server.luckkylotte9d.com/bank/create`, formData)
			.then((res) => {
				swal("Thành Công", "Ngân hàng đã được thêm thành công", "success");
				navigate("/profile");
			})
			.catch((err) =>
				setError("money", {
					type: "minLength",
					message: "Lỗi giao dịch 404!",
				})
			);
	};
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img src={require("../../img/logo-vietlott.png")} alt="Logo" />
							</Link>
						</div>
					</div>
				</div>
				<h1 className="title-h1">Liên Kết Ngân Hàng</h1>
				{/*<button onClick={()=>{
					setShow(!show)
				}} className="btn-medium" style={{margin:"1.8rem auto 0.5rem"}}>Liên kết tài khoản ngân hàng</button>*/}
				<div className="content_profile">
					{show == true ? (
						<>
							<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
								<div>
									<div>
										<input
											className="ipadd"
											type="text"
											{...register("name_bank", { required: true })}
											placeholder="Nhập tên ngân hàng"
										/>
									</div>
									<div>
										{" "}
										<input
											className="ipadd"
											type="number"
											{...register("stk", { required: true })}
											placeholder="Nhập số tài khoản"
										/>
									</div>
									<div>
										{" "}
										<input
											className="ipadd"
											type="text"
											{...register("fullname", { required: true })}
											placeholder="Nhập tên chủ tài khoản"
										/>
									</div>
									<button type="submit" className="btn-submit">
										Xác nhận
									</button>
								</div>
							</form>
						</>
					) : null}
					<div className="list-bank">
						{bank != null ? (
							<>
								{bank.map((item) => (
									<>
										<Link to={`/bank/${item._id}`} style={{ display: "block", margin: "1.8rem 0 0" }}>
											<div className="box-banking">
												<div className="money_banking">
													<h3>{item.fullname}</h3>
													<h4>{item.stk}</h4>
												</div>
												<div className="ctk">
													{item.name_bank}
												</div>
												<div className="icon_credit">
													<img src={require("../../img/icon_credit.png")} />
												</div>
											</div>
										</Link>
									</>
								))}
							</>
						) : (
							<>
								{show == false ? (
									<>
										<div style={{ margin: "1.8rem 0 0" }}>
											Hiện chưa có ngân hàng
										</div>
										<button
											className="btn-medium"
											style={{ margin: "1rem auto 0.5rem" }}
											onClick={() => setShow(!show)}
										>
											Thêm tài khoản ngân hàng
										</button>
									</>
								) : null}
							</>
						)}
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}
export default AddBank;
