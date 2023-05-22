import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function AddMoney() {
	const [profile, setProfile] = useState(null);
	const [bank, setBank] = useState(null);
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
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(`http://localhost/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios
			.get(`http://localhost/bank/getBank`, {})
			.then((res) => {
				setBank(res.data.data);
			})
			.catch((err) => setBank(null));
	}, []);
	const onSubmit = (data) => {
		const formData = {
			money: data.money,
			type_payment: "NẠP",
			detail: data.detail,
			status_payment: "Pending",
			user: profile._id,
		};
		axios
			.post(`http://localhost/payment/withDraw`, formData)
			.then((res) => {
				swal("Nạp tiền thành công", "Tiền sẽ được cộng trong vòng 5 phút. Nếu quá lâu vui lòng liên hệ CSKH để được xử lý.", "success");
				navigate("/historyadd");
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
								<img src={require("../../img/vietllot.png")} alt="Logo" />
							</Link>
						</div>
						<div className="header-right">
							<div style={{ display: "flex", float: "right" }}>
								{isShow && profile ? (
									<span style={{ marginRight: "0.111rem" }}>
										Số dư: <b>{Number(profile.money).toLocaleString()}đ</b>
									</span>
								) : (
									<span style={{ marginRight: "0.111rem" }}>
										Số dư: <b>******đ</b>
									</span>
								)}
								<div
									onClick={() => {
										setShow(!isShow);
									}}
								>
									{isShow ? <VisibilityOff /> : <Visibility />}
								</div>
							</div>
						</div>
					</div>
				</div>
				<h1 className="title-h1">Nạp Tiền</h1>
				<div className="content_profile">
					{/* <div style={{margin:"10px 0 0"}}>Vui lòng liên hệ CSKH để được hướng dẫn nạp tiền</div> */}
					<img
						style={{ width: "40%" }}
						src="https://play-lh.googleusercontent.com/ufwUy4SGVTqCs8fcp6Ajxfpae0bNImN1Rq2cXUjWI7jlmNMCsXgQE5C3yUEzBu5Gadkz"
					/>
					<div style={{ display: "flex" }}>
						<div className="content_bank">
							<div>
								<h4 style={{ fontSize: "0.45rem", color: "#333" }}>
									Quét mã QR hoặc chuyển khoản tới
								</h4>
							</div>
							<div>
								STK: <b>123456789</b>
							</div>
							<div>
								Ngân hàng: <b>Vietcombank</b>
							</div>
							<div>
								Nội dung chuyển khoản:{" "}
								<b>addxs {profile ? <span>{profile.username}</span> : null}</b>
							</div>
						</div>
					</div>
					<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div>
								<input
									className="ipadd"
									type="number"
									{...register("money", { required: true })}
									placeholder="Nhập số tiền"
								/>
							</div>
							<div>
								{" "}
								<input
									className="ipadd"
									type="text"
									{...register("detail", { required: true })}
									placeholder="Nhập mã giao dịch ngân hàng"
								/>
							</div>
							{errors.money ? (
								<p style={{ color: "red" }}>{errors.money.message}</p>
							) : null}
							<button type="submit" className="btn-submit">
								Xác nhận
							</button>
						</div>
					</form>
					<div className="text_choose_center huongdan">
						<div className="title" style={{ margin: "0.2rem 0 0.4rem" }}>
							Hướng dẫn nạp tiền
						</div>
						<ul>
							<li>Chuyển khoản đến thông tin ngân hàng ở trên.</li>
							<li>
								Sau khi chuyển khoản thành công, sẽ có ID (mã giao dịch) ở trang
								thông báo thành công của ngân hàng.
							</li>
							<li>
								Nhập số tiền đã chuyển và mã giao dịch vào ô trên và bấm xác
								nhận, tiền sẽ được cộng trong vòng 1 phút.
							</li>
						</ul>
					</div>
				</div>

				<Footer />
			</div>
		</>
	);
}
export default AddMoney;
