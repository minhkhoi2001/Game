import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function WithDraw() {
	const [profile, setProfile] = useState(null);
	const [bank, setBank] = useState(null);
	const [isShow, setShow] = useState(false);
	const [newMoney, setNewMoney] = useState(null);
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
			.get(`https://server.vnvip294.com/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios
			.get(`https://server.vnvip294.com/bank/getBank`, {})
			.then((res) => {
				setBank(res.data.data);
			})
			.catch((err) => setBank(null));
	}, []);
	const onSubmit = (data) => {
		if (data.money > profile.money) {
			setError("money", {
				type: "minLength",
				message: "Số tiền rút vui lòng nhỏ hơn số dư hiện tại",
			});
			return;
		}
		if (Number(data.money.replaceAll(".","")) <= 0 || typeof Number(data.money.replaceAll(".","")) !== 'number') {
			swal(
				"Thông báo",
				"Vui lòng nhập số tiền hợp lệ",
				"error"
			);
			return false;
		}
		if (data.detail) {
			const formData = {
				money: Number(data.money.replaceAll(".","")),
				type_payment: "RÚT",
				detail: data.detail,
				status_payment: "Pending",
				user: profile._id,
			};
			axios
				.post(`https://server.vnvip294.com/payment/withDraw`, formData)
				.then((res) => {
					swal({
						title: "Thông báo",
						text: "Tạo yêu cầu rút tiền thành công!",
						icon: "success",
						buttons: "OK",
					}).then(() => navigate("/profile"));
				})
				.catch((err) =>
					setError("money", {
						type: "minLength",
						message: "Lỗi giao dịch 404!",
					})
				);
		} else {
			const formData = {
				money: data.money,
				type_payment: "RÚT",
				detail: data.stk + " - " + data.bank + " - " + data.name,
				status_payment: "Pending",
				user: profile._id,
			};
			axios
				.post(`https://server.vnvip294.com/payment/withDraw`, formData)
				.then((res) => {
					swal({
						title: "Thông báo",
						text: "Tạo yêu cầu rút tiền thành công!",
						icon: "success",
						buttons: "OK",
					}).then(() => navigate("/profile"));
				})
				.catch((err) =>
					setError("money", {
						type: "minLength",
						message: "Lỗi giao dịch 404!",
					})
				);
		}
	};
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img src={require("../../img/best96.png")} alt="Logo" />
							</Link>
						</div>
						<div className="header-right">
							<div style={{ display: "flex", float: "right" }}>
							{profile ? (
              <span style={{ marginRight: "0.111rem" }}>
                Số dư: <b>{Math.floor(profile.money).toLocaleString()}đ</b>
              </span>
            ) : (
              <span style={{ marginRight: "0.111rem" }}>
                Số dư: <b>******đ</b>
              </span>
            )}
							</div>
						</div>
					</div>
				</div>
				<h1 className="title-h1">Rút Tiền</h1>
				<div className="content_profile" style={{ margin: "1.5rem 0 0" }}>
					<Link
						to="/addbank"
						style={{ display: "block", margin: "1.8rem 0 0" }}
					>
						<div className="box-banking box-banking2">
							<div className="money_banking">
								<h3>Số dư khả dụng</h3>
								{profile ? (
									<>
										<h4>{Math.floor(profile.money).toLocaleString()}đ</h4>
									</>
								) : (
									<>
										<h4>0đ</h4>
									</>
								)}
							</div>
							<div className="ctk">
							{profile ? profile.username : null}
							</div>
							<div className="icon_credit">
								<img src={require("../../img/icon_credit.png")} />
							</div>
						</div>
					</Link>
					<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
						<div>
							{bank == null ? (
								<>
									<div><p>Vui lòng thêm ngân hàng</p></div>
									<Link to="/addbank" className="btn-medium">Thêm Ngân Hàng</Link>
								</>
							) : (
								<>
									<div>
										<input
											className="ipadd"
											type="text"
											value={newMoney}
											{...register("money", { required: true })}
											placeholder="Nhập số tiền cần rút"
											onClick={() => setNewMoney(null)}
											onChange={(e) => setNewMoney(Number((e.target.value).replaceAll(".","")).toLocaleString())}
										/>
									</div>
									<select
										style={{ color: "#333" }}
										{...register("detail", { required: true })}
									>
										<option value="">Chọn ngân hàng</option>
										{bank.map((item, index) => (
											<option
												key={index}
												value={
													item.name_bank +
													" - " +
													item.fullname +
													" - " +
													item.stk
												}
											>
												{"STK " +
													item.stk +
													" - " +
													item.fullname +
													" - " +
													item.name_bank}
											</option>
										))}
									</select>
									<button type="submit" className="btn-submit">
										Xác nhận
									</button>
								</>
							)}

							{errors.money ? (
								<p style={{ color: "red" }}>{errors.money.message}</p>
							) : null}
						</div>
					</form>
				</div>

				<Footer />
			</div>
		</>
	);
}
export default WithDraw;
