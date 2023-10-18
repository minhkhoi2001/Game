import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Header from "../components/Header";

function AddMoney() {
	const [profile, setProfile] = useState(null);
	const [bank, setBank] = useState(null);
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
			.get(`https://server.best96tx.com/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios
			.get(`https://server.best96tx.com/auth/getbank`, {})
			.then((res) => {
				setBank(res.data.data);
			})
			.catch((err) => setBank(null));
	}, []);
	const onSubmit = (data) => {
		const formData = {
			money: Number(data.money.replaceAll(".","").replaceAll(",","")),
			type_payment: "NẠP",
			detail: data.detail,
			status_payment: "Pending",
			user: profile._id,
		};
		if (Number(data.money.replaceAll(".","").replaceAll(",","")) <= 0 || typeof Number(data.money.replaceAll(".","").replaceAll(",","")) !== 'number') {
			swal(
				"Thông báo",
				"Vui lòng nhập số tiền hợp lệ",
				"error"
			);
			return false;
		}
		axios
			.post(`https://server.best96tx.com/payment/withDraw`, formData)
			.then((res) => {
				swal(
					"Nạp tiền thành công",
					"Tiền sẽ được cộng trong vòng 5 phút. Nếu quá lâu vui lòng liên hệ CSKH để được xử lý.",
					"success"
				);
				navigate("/historyadd");
			})
			.catch((err) =>
				setError("money", {
					type: "minLength",
					message: "Lỗi giao dịch 404!",
				})
			);
	};
	const handleCopyClick = (text) => {
		const textToCopy = text;
		const tempInput = document.createElement("input");
		tempInput.value = textToCopy;
		document.body.appendChild(tempInput);
		tempInput.select();
		tempInput.setSelectionRange(0, 99999);
		document.execCommand("copy");
		document.body.removeChild(tempInput);
		swal("Thành công", "Copy thành công", "success");
	};
	return (
		<>
			<div className="main">
			<Header profile={profile} />
				<h1 className="title-h1">Nạp Tiền</h1>
				<div className="content_profile">
					{/* <div style={{margin:"10px 0 0"}}>Vui lòng liên hệ CSKH để được hướng dẫn nạp tiền</div> */}
					<div className="content_bank">
						{bank ? (
							bank.map(
								(item) =>
									item.isShow && (
										<div className="item-banks">
											<span
												className="copystk"
												onClick={() => handleCopyClick(item.stk)}
											>
												Copy
											</span>
											<div>
												STK: <b>{item.stk}</b>
											</div>
											<div>
												Ngân hàng: <b>{item.name_bank}</b>
											</div>
											<div>
												Người nhận: <b>{item.fullname}</b>
											</div>
											{profile?.username ? (
												<div>
													Nội dung chuyển khoản:{" "}
													<b>
														{item.title} {" "} {profile?.username}
													</b>
												</div>
												) : null }
										</div>
									)
							)
						) : (
							<div>Vui lòng liên hệ chăm sóc khách hàng</div>
						)}
					</div>
					<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div>
									<input
										className="ipadd"
										type="text"
										{...register("money", { required: true })}
										placeholder="Nhập số tiền"
										value={newMoney}
										onClick={() => setNewMoney(null)}
										onChange={(e) => setNewMoney(Number((e.target.value).replaceAll(".","").replaceAll(",","")).toLocaleString())}
									/>
							</div>
							<div style={{ display: "none" }}>
								{" "}
								<input
									className="ipadd"
									type="text"
									{...register("detail", { required: true })}
									placeholder="Nhập mã giao dịch ngân hàng"
									defaultValue="Nạp"
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
							<li>Vui lòng ghi đúng nội dung chuyển khoản là tên đăng nhập của bạn</li>
							<li>
								Sau khi chuyển khoản thành công quý khách điền số tiền đã chuyển
								khoản vào ô "Nhập số tiền" và bấm xác nhận, số điểm sẽ được cộng
								trong vòng 3 phút.
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
