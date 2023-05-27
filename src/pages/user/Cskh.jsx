import { useEffect, useState } from "react";
import LiveChat from "react-livechat";
import Footer from "../../components/Footer/Footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function CSKH() {
	const [profile, setProfile] = useState(null);
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
	axios
		.get(`https://server.luckkylotte9d.com/auth/getUser`, {})
		.then((res) => {
			setProfile(res.data.data);
		})
		.catch((err) => localStorage.removeItem("user"));

	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => {
		setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{isLoading ? (
				<div className="loading">
					<div className="loader"></div>
				</div>
			) : null}
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
				<h1 className="title-h1">Chăm Sóc Khách Hàng</h1>
				<div style={{position:"relative", height: "100vh"}}>
					<iframe src="https://tawk.to/chat/64563b4c6a9aad4bc5793cfd/1gvodf9bp" frameborder="0" width="100%" height="100%"></iframe>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default CSKH;
