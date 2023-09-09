import { useEffect, useState, useRef } from "react";
import LiveChat from "react-livechat";
import Footer from "../../components/Footer/Footer";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RoomChat() {
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
	const localdata = JSON.parse(localStorage.getItem("currentUser"));
	/*if (localdata) {
		const intervalId = setInterval(() => {
		if (iframeRef.current) {
			const iframeWindow = iframeRef.current.contentWindow;
			if (iframeWindow) {
				iframeWindow.postMessage(localdata, "*");
				console.log('1',localdata);
				clearInterval(intervalId);
			}
			console.log('2',localdata);
		}
		console.log('3',localdata);
		}, 1000);
	}*/
	
	return (
		<>
			<div className="main" style={{ background: "#fff" }}>
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
									<>
									<span style={{ marginRight: "0.111rem" }}>
										Số dư: <b>******đ</b>
									</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				{profile ? (
					<div
						style={{
							position: "relative",
							height: "calc(100vh - 2.96rem)",
							margin: "0 -0.32rem 0 -0.32rem",
						}}
					>
						{/*<div className="hide-chatbar">Phòng Chat</div>*/}
						{localdata ? (
							<iframe
								src={`https://chat.vnvip294.com?data=${encodeURIComponent(JSON.stringify(localdata))}`}
								allowTransparency="true"
								style={{ width: "100%", height: "100%" }}
							></iframe>
						) : <div className="loading"><div className="loader"></div></div>}
					</div>
				) : null}
			</div>
			<Footer />
		</>
	);
}

export default RoomChat;
