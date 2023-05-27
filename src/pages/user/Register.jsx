import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function Register() {
	const [err, setErr] = useState(null);
	const login = localStorage.getItem("user");
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	useEffect(() => {
		if (login) {
			navigate("/");
		}
	}, []);
	const onSubmit = (data) => {
		let code = "";
		if (data.username.length < 6) {
			setError("username", {
				type: "minLength",
				message: "Username yêu cầu ít nhất 6 kí tự",
			});
		}

		if (data.password.length < 6) {
			setError("password", {
				type: "minLength",
				message: "Password yêu cầu ít nhất 6 kí tự",
			});
		}
		if (data.password !== data.ippassword) {
			setError("ippassword", {
				type: "minLength",
				message: "Nhập lại password",
			});
		}

		if (
			data.password.length < 6 ||
			data.username.length < 6 ||
			data.password !== data.ippassword
		) {
			return;
		}
		if (data.code === "") {
			axios
				.post(`https://server.vnvip294.com/auth/register`, {
					username: data.username,
					password: data.password,
					code: "admin",
				})
				.then((res) => {
					swal({
						title: "Thông báo",
						text: "Đăng ký thành công",
						icon: "success",
						buttons: "OK",
					}).then(() => navigate("/login"));
				})
				.catch((err) => {
					setErr(err.message);
				});
		} else if (data.code) {
			axios
				.post(`https://server.vnvip294.com/auth/register`, {
					username: data.username,
					password: data.password,
					code: data.code,
				})
				.then((res) => {
					swal({
						title: "Thông báo",
						text: "Đăng ký thành công",
						icon: "success",
						buttons: "OK",
					}).then(() => navigate("/login"));
				})
				.catch((err) => {
					setErr(err.message);
				});
		}
	};
	return (
		<>
			<div className="login">
				<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
					<h1>Đăng ký</h1>
					<div className="inputs">
						<input
							type="text"
							{...register("username", { required: true })}
							className="ip-lg"
							placeholder="Tên đăng nhập"
						/>
						{errors.username ? <p>{errors.username.message}</p> : null}
						<input
							type="password"
							className="ip-lg"
							{...register("password", { required: true })}
							placeholder="Mật Khẩu"
						/>
						{errors.password ? <p>{errors.password.message}</p> : null}
						<input
							type="password"
							className="ip-lg"
							{...register("ippassword", { required: true })}
							placeholder="Nhập Lại Mật Khẩu"
						/>
						<input
							type="code"
							className="ip-lg"
							{...register("code")}
							placeholder="Nhập mã giới thiệu"
						/>
					</div>
					{errors.ippassword ? <p>{errors.ippassword.message}</p> : null}
					{err ? <p style={{ color: "#140707" }}>{err}</p> : null}
					<button type="submit" className="btn-lg">
						Đăng ký
					</button>
					<p className="p-lg">
						Có tài khoản?{" "}
						<Link className="a-lg" to="/login">
							Đăng nhập
						</Link>
					</p>
				</form>
			</div>
		</>
	);
}
export default Register;
