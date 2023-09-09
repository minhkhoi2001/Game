import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
	const [err, setErr] = useState(null);
	const login = localStorage.getItem("user");

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	useEffect(() => {
		if (login) {
			navigate("/");
		}
	}, []);
	const onSubmit = async (data) => {
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
		if (data.password.length < 6 || data.username.length < 6) {
			return;
		}
		axios
			.post(`https://server.vnvip294.com/auth/login`, data)
			.then((res) => {
				axios
				.post(`https://chat.vnvip294.com/signin`, {
					email: data.username + '@gmail.com',
					password: data.password,
				}).then((res2) => {
					localStorage.setItem("currentUser", JSON.stringify(res2.data));
				});
				localStorage.setItem("user", res.data.data);
				swal({
					title: "Thông báo",
					text: "Đăng nhập thành công",
					icon: "success",
					buttons: "OK",
				}).then(() => navigate("/"));
			})
			.catch((err) => setErr("Tên đăng nhập hoặc mật khẩu không chính xác"));
	};
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => {
	  setShowPassword(!showPassword);
	};
	return (
		<>
			<div className="login">
				<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
					<img src={require("../../img/best96.png")} alt="Logo" className="logologin"/>
					<h1>Đăng Nhập</h1>
					<div className="inputs">
						<div className="input">
						<input
							type="text"
							className="ip-lg"
							{...register("username", { required: true })}
							placeholder="Tên đăng nhập"
						/>
						{errors.username ? <p>{errors.username.message}</p> : null}
						</div>
						<div className="input">
						<input
							type={showPassword ? 'text' : 'password'}
							className="ip-lg"
							{...register("password", { required: true })}
							placeholder="Mật khẩu"
						/>
						<div onClick={toggleShowPassword}>{showPassword ? <Visibility/> : <VisibilityOff/>}</div>
						{errors.password ? <p>{errors.password.message}</p> : null}
						</div>
					</div>
					{err ? <p>{err}</p> : null}
					<button className="btn-red-big" type="submit">
						Đăng nhập
					</button>
					<p className="p-lg">
						Chưa có tài khoản?{" "}
						<Link className="bold" to="/register">
							Đăng ký
						</Link>
					</p>
				</form>
			</div>
		</>
	);
}
export default Login;
