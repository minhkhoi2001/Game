import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Notification() {
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
		.get(`http://localhost/auth/getUser`, {})
		.then((res) => {
			setProfile(res.data.data);
		})
		.catch((err) => localStorage.removeItem("user"));

	return (
		<>
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
				<h1 className="title-h1">Thông Báo</h1>
				<div style={{ position: "relative", margin: "1.8rem 0 0" }}>
					<div className="box-image">
						<img src={require("../../img/tb1.jpg")} />
						<div className="box-image-title">Thông báo 1</div>
					</div>
					<div className="box-image">
						<img src={require("../../img/tb2.jpg")} />
						<div className="box-image-title">Thông báo 2</div>
					</div>
					<div className="box-image">
						<img src={require("../../img/tb3.jpg")} />
						<div className="box-image-title">Thông báo 3</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Notification;
