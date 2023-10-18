import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper/core";
import { useEffect, useState } from "react";
import axios from "axios";
import CampaignIcon from "@mui/icons-material/Campaign";
import "./home2.css";

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
	//const [isShow, setShow] = useState(false);
	const [profile1, setProfile1] = useState(null);
	const [notify, setNotify] = useState();
	useEffect(() => {
		axios
			.get(`https://server.best96tx.com/auth/getUser`, {})
			.then((res) => {
				setProfile1(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios.get(`https://server.best96tx.com/auth/getnotify`, {}).then((res) => {
			setNotify(res.data.data[0]);
		});
	}, []);
	const [activeOption, setActiveOption] = useState("1");
	const handleOptionClick = (option) => {
		setActiveOption(option);
	};
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img alt="" src={require("../../img/best96.png")} />
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
				<div className="box-image">
				<Swiper {...swiperParams}>
					<SwiperSlide>
						<img alt="" src="/upload/tro-choi.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img alt="" src="/upload/xo-so.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img alt="" src="/upload/nang-cap-vip.jpg" />
					</SwiperSlide>
				</Swiper>
				{notify ? (
					<>
						{notify.isShow === true && notify.title === "marquee" ? (
							<div className="marquees" style={{background:"#fff", margin: "-7px 0 0", padding: "5px"}}>
								<div>
									<CampaignIcon sx={{ fontSize: "22px" }} />
								</div>
								<div>
									<div className="marquee" style={{width:"calc(100% - 50px)"}}>
										<p dangerouslySetInnerHTML={{ __html: notify.content }} />
									</div>
								</div>
							</div>
						) : null}
					</>
				) : null}
				</div>
				<div className="lottery-home">
					<div className="lottery-menu">
						<div className="lottery-menu-top">
							<div className="lottery-item" onClick={() => handleOptionClick("1")}>
								<img alt="" src={require("../../img/hotLottery.0a733060.png")}/>
								<span>Xổ số 3 miền</span>
							</div>
							<div className="lottery-item" onClick={() => handleOptionClick("2")}>
								<img alt="" src={require("../../img/all.a4d78610.png")}/>
								<span>Xổ số nhanh</span>
							</div>
							<div className="lottery-item" onClick={() => handleOptionClick("3")}>
								<img alt="" src={require("../../img/lobby.e990b38c.png")}/>
								<span>Xóc đĩa</span>
							</div>
						</div>
						<div className="lottery-menu-mid">
							<div className="lottery-item" onClick={() => handleOptionClick("4")}>
								<img alt="" src={require("../../img/SICBO.30ef5ab9.png")}/>
								<span>Xúc sắc</span>
							</div>
							<div className="lottery-item" onClick={() => handleOptionClick("5")}>
								<img alt="" src={require("../../img/KENO.b46b0ad4.png")}/>
								<span>Keno</span>
							</div>
							<div className="lottery-item" onClick={() => handleOptionClick("6")}>
								<img alt="" src={require("../../img/game_mini-d03d72bd.png")} style={{padding:"0.25rem 0.42rem"}}/>
								<span>Tài xỉu</span>
							</div>
							<Link to="/notification" className="lottery-item">
								<img alt="" src={require("../../img/invitation_bg-cba7474d.png")} style={{padding:"0.25rem 0.42rem"}}/>
								<span>Khuyến mãi</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="content-game">
					<div className="list-game">
						{activeOption === "1" && (
						<>
						<div className="box-game op xsmb">
							<Link to="/xsmb">
								<img alt=""
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
								<img alt=""
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
								<img alt=""
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
						</>
						)}
						{activeOption === "2" && (
						<>
						<div className="box-game">
							<Link to="/xoso3p">
								<img alt=""
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
								<img alt=""
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
						</>
						)}
						{activeOption === "3" && (
						<>
						<div className="box-game">
							<Link to="/xd3">
								<img alt="" src={require("../../img/xocdia.png")} />
								<h3>XÓC ĐĨA 3P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xd5">
								<img alt="" src={require("../../img/xocdia2.png")} />
								<h3>XÓC ĐĨA 5P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						</>
						)}
						{activeOption === "4" && (
						<>
						<div className="box-game">
							<Link to="/xucxac3">
								<img alt=""
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
								<img alt=""
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
						</>
						)}
						{activeOption === "5" && (
						<>
						<div className="lottery-list">
							<Link to="/keno1p" className="lottery-item">
								<img alt="" src={require("../../img/KENO.eadd2dc4.png")}/>
								<span>KENO 1P</span>
							</Link>
							<Link to="/keno3p" className="lottery-item">
								<img alt="" src={require("../../img/KENO.eadd2dc4.png")}/>
								<span>KENO 3P</span>
							</Link>
							<Link to="/keno5p" className="lottery-item">
								<img alt="" src={require("../../img/KENO.eadd2dc4.png")}/>
								<span>KENO 5P</span>
							</Link>
						</div>
						</>
						)}
						{activeOption === "6" && (
						<>
						<div className="lottery-list">
							<Link to="/taixiu1" className="lottery-item">
								<img alt="" src={require("../../img/SICBO.b8afca93.png")}/>
								<span>TÀI XỈU 1P</span>
							</Link>
							<Link to="/taixiu3" className="lottery-item">
								<img alt="" src={require("../../img/SICBO.b8afca93.png")}/>
								<span>TÀI XỈU 3P</span>
							</Link>
							<Link to="/taixiu5" className="lottery-item">
								<img alt="" src={require("../../img/SICBO.b8afca93.png")}/>
								<span>TÀI XỈU 5P</span>
							</Link>
						</div>
						</>
						)}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}
export default Home;
