import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

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
			.post(`http://localhost/auth/login`, data)
			.then((res) => {
				localStorage.setItem("user", res.data.data);
				navigate("/");
			})
			.catch((err) => setErr("Tên đăng nhập hoặc mật khẩu không chính xác"));
	};

	return (
		<>
			<div className="login">
				<form className="form-lg" onSubmit={handleSubmit(onSubmit)}>
					<h1>Đăng nhập</h1>
					<div className="inputs">
						<input
							type="text"
							className="ip-lg"
							{...register("username", { required: true })}
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
					</div>
					{err ? <p style={{ color: "white" }}>{err}</p> : null}
					<button className="btn-red-big" type="submit">
						Đăng nhập
					</button>
					<p className="p-lg">
						Không có tài khoản?{" "}
						<Link className="bold" to="/register">
							Đăng ký ngay
						</Link>
					</p>
				</form>
			</div>
		</>
	);
}
export default Login;
