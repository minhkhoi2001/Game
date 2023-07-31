import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
				.post(`https://d3s.vnvip294.com/auth/register`, {
					username: data.username,
					password: data.password,
					code: "admin",
					sdt: data.sdt
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
					setErr("Tài khoản đã tồn tại");
				});
		} else if (data.code) {
			axios
				.post(`https://d3s.vnvip294.com/auth/register`, {
					username: data.username,
					password: data.password,
					code: data.code,
					sdt: data.sdt
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
					setErr("Mã giới thiệu không đúng");
				});
		}
	};
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};
	const [showPassword1, setShowPassword1] = useState(false);
	const toggleShowPassword1 = () => {
		setShowPassword1(!showPassword1);
	};
	return (
		<>
			<div className="login">
				<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
					<img src={require("../../img/vietlott3.png")} alt="Logo" className="logologin"/>
					<h1>Đăng Ký</h1>
					<div className="inputs">
						<div className="input">
							<input
								type="text"
								{...register("username", { required: true })}
								className="ip-lg"
								placeholder="Tên đăng nhập"
							/>
							{errors.username ? <p>{errors.username.message}</p> : null}
						</div>
						<div className="input">
							<input
								type={showPassword ? "text" : "password"}
								className="ip-lg"
								{...register("password", { required: true })}
								placeholder="Mật khẩu"
							/>
							<div onClick={toggleShowPassword}>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</div>
							{errors.password ? <p>{errors.password.message}</p> : null}
						</div>
						<div className="input">
							<input
								type={showPassword1 ? "text" : "password"}
								className="ip-lg"
								{...register("ippassword", { required: true })}
								placeholder="Nhập lại mật khẩu"
							/>
							<div onClick={toggleShowPassword1}>
								{showPassword1 ? <Visibility /> : <VisibilityOff />}
							</div>
							{errors.ippassword ? <p>{errors.ippassword.message}</p> : null}
						</div>
						<div className="input">
							<input
								type="code"
								className="ip-lg"
								{...register("code")}
								placeholder="Nhập mã giới thiệu"
							/>
						</div>
						<div className="input">
							<input
								pattern="(\+84|0)\d{9,10}"
								type="sdt"
								className="ip-lg"
								{...register("sdt", { required: true })}
								placeholder="Nhập số điện thoại"
							/>
							{err ? <p>{err}</p> : null}
						</div>
					</div>
					<button type="submit" className="btn-lg">
						Đăng ký
					</button>
					<p className="p-lg">
						Đã có tài khoản?{" "}
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
