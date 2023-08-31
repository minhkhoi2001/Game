import { useEffect, useState } from "react";
import LiveChat from "react-livechat";
import Footer from "../../components/Footer/Footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Invite() {
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

	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);
	useEffect(() => {
		axios
			.get(`https://server.vnvip294.com/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
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
				<h1 className="title-h1">Mời Bạn Bè</h1>
				<div className="invite">
                    <div className="text-invite">
                        <h3>{profile?.username}</h3>
                        <div>Mã mời thành viên</div>
                        <h4>{profile?.code}</h4>
                    </div>
                </div>
			</div>
			<Footer />
		</>
	);
}

export default Invite;
