import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper/core";
import { useEffect, useState } from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Home() {
	SwiperCore.use([Autoplay]);
	const swiperParams = {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	};
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
	const [isShow, setShow] = useState(false);
	const [profile1, setProfile1] = useState(null);
	useEffect(() => {
		axios
			.get(`https://server.vnvip294.com/auth/getUser`, {})
			.then((res) => {
				setProfile1(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
	}, []);
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
						<div className="header-right">
							{profile1 ? (
								<div style={{ display: "flex", float: "right" }}>
									{profile1 ? (
										<span style={{ marginRight: "0.111rem" }}>
											Số dư:{" "}
											<b>{Math.floor(profile1.money).toLocaleString()}đ</b>
										</span>
									) : (
										<span style={{ marginRight: "0.111rem" }}>
											Số dư: <b>******đ</b>
										</span>
									)}
								</div>
							) : (
								<div className="button-top">
									<Link to="/login" className="btn-login">
										Đăng nhập
									</Link>
									<Link to="/register" className="btn-register">
										Đăng ký
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
				<Swiper {...swiperParams}>
					<SwiperSlide>
						<img src={require("../../img/banner1.jpg")} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={require("../../img/banner3.jpg")} />
					</SwiperSlide>
				</Swiper>
				<div className="content-game">
					<h2 className="title" style={{ margin: "0.5rem 0 0" }}>
						Games
					</h2>
					<div className="list-game">
						<div className="box-game">
							<Link to="/keno1p">
								<img src={require("../../img/WinGo-749c393c.png")} />
								<h3>KENO 1P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/keno3p">
								<img
									src={require("../../img/5d-4be64165.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>KENO 3P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/keno5p">
								<img src={require("../../img/TrxWingo-7fc426b2.png")} />
								<h3>KENO 5P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game op xsmb">
							<Link to="/xsmb">
								<img
									src={require("../../img/logo-Vlottery.webp")}
									style={{ marginLeft: "-15px" }}
								/>
								<h3>XỔ SỐ TRUYỀN THỐNG</h3>
								<div className="box-game-text">
									<div>Xổ số miền Bắc</div>
									<div>Dự đoán kết quả xổ số miền Bắc để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game op xsmt">
							<Link to="/xsmt">
								<img
									src={require("../../img/logo-Vlottery.webp")}
									style={{ marginLeft: "-15px" }}
								/>
								<h3>XỔ SỐ TRUYỀN THỐNG</h3>
								<div className="box-game-text">
									<div>Xổ số miền Trung</div>
									<div>
										Dự đoán kết quả xổ số miền Trung để giành chiến thắng
									</div>
								</div>
							</Link>
						</div>
						<div className="box-game op xsmn">
							<Link to="/xsmn">
								<img
									src={require("../../img/logo-Vlottery.webp")}
									style={{ marginLeft: "-15px" }}
								/>
								<h3>XỔ SỐ TRUYỀN THỐNG</h3>
								<div className="box-game-text">
									<div>Xổ số miền Nam</div>
									<div>Dự đoán kết quả xổ số miền Nam để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xoso3p">
								<img
									src={require("../../img/lottery-81925723.png")}
									style={{ margin: "8px 5px 0 0" }}
								/>
								<h3>XỔ SỐ NHANH 3P</h3>
								<div className="box-game-text">
									<div>Dự đoán</div>
									<div>Dự đoán xổ số để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xoso5p">
								<img
									src={require("../../img/lottery-e8asj.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>XỔ SỐ NHANH 5P</h3>
								<div className="box-game-text">
									<div>Dự đoán</div>
									<div>Dự đoán xổ số để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xucxac">
								<img
									src={require("../../img/k3-3fb4362a.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>ĐỔ XÚC SẮC 3P</h3>
								<div className="box-game-text">
									<div>Dự đoán</div>
									<div>Dự đoán Xúc sắc để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xucxac5">
								<img
									src={require("../../img/logo-k333.685bfbc8.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>ĐỔ XÚC SẮC 5P</h3>
								<div className="box-game-text">
									<div>Dự đoán</div>
									<div>Dự đoán Xúc sắc để giành chiến thắng</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
export default Home;
