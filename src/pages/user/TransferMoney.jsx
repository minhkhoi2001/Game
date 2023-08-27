import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function TransferMoney() {
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
		formState: { errors },
	} = useForm();
	const [bank, setBank] = useState(null);
	const navigate = useNavigate();

	const onSubmit = (data) => {
		const formData = {
			username: data.username,
			money: data.money,
		};
		axios
			.post(`http://localhost/auth/transfer`, formData)
			.then((res) => {
				swal("Chuyển tiền thành công!");
				navigate("/profile");
			})
			.catch((err) => swal("Sai người nhận hoặc số dư không đủ"));
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
							<div style={{ display: "flex", float: "right" }}></div>
						</div>
					</div>
				</div>
				<h1 className="title-h1">Chuyển tiền</h1>
				<div className="content_profile">
					<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div>
								<input
									className="ipadd"
									type="username"
									{...register("username", { required: true })}
									placeholder="Người nhận"
								/>
							</div>
							<div>
								{" "}
								<input
									className="ipadd"
									type="number"
									{...register("money", { required: true })}
									placeholder="Số tiền"
								/>
							</div>
							<button type="submit" className="btn-submit">
								Xác nhận
							</button>
						</div>
					</form>
				</div>

				<Footer />
			</div>
		</>
	);
}
export default TransferMoney;
