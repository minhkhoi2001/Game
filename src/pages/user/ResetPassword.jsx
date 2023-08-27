import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ResetPassword() {
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

	const onSubmit = (data) => {
		const formData = {
			password: data.oldpassword,
			newpassword: data.password,
		};
		axios
			.post(`http://localhost/auth/password`, formData)
			.then((res) => {
				swal("Sửa mật khẩu thành công");
				navigate("/profile");
			})
			.catch((err) => swal("Sai tên đăng nhập hoặc mật khẩu"));
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
				<h1 className="title-h1">Đổi Mật Khẩu</h1>
				<div className="content_profile">
					<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
						<div>
							<div>
								<input
									className="ipadd"
									type="password"
									{...register("oldpassword", { required: true })}
									placeholder="Mật khẩu cũ"
								/>
							</div>
							<div>
								{" "}
								<input
									className="ipadd"
									type="password"
									{...register("password", { required: true })}
									placeholder="Mật khẩu mới"
								/>
							</div>
							<div>
								{" "}
								<input
									className="ipadd"
									type="password"
									{...register("checkpassword", { required: true })}
									placeholder="Nhập lại mật khẩu"
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
export default ResetPassword;
