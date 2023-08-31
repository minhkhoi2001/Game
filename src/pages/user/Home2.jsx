import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper/core";
import { useEffect, useState } from "react";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
	const [isShow, setShow] = useState(false);
	const [profile1, setProfile1] = useState(null);
	const [notify, setNotify] = useState();
	useEffect(() => {
		axios
			.get(`https://server.vnvip294.com/auth/getUser`, {})
			.then((res) => {
				setProfile1(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios.get(`https://server.vnvip294.com/auth/getnotify`, {}).then((res) => {
			setNotify(res.data.data[0]);
		});
	}, []);
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img src={require("../../img/best96.png")} alt="Logo" />
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
						<img src={require("../../img/banner1.jpg")} />
					</SwiperSlide>
					<SwiperSlide>
						<img src={require("../../img/banner3.jpg")} />
					</SwiperSlide>
				</Swiper>
				{notify ? (
					<>
						{notify.isShow == true && notify.title == "marquee" ? (
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
						<div class="lottery-menu-top">
							<div class="lottery-item">
								<img src="https://m.vn5555.vip/static/img/hotLottery.0a733060.png"/>
								<span>Xổ số 3 miền</span>
							</div>
							<div class="lottery-item">
								<img src="https://m.vn5555.vip/static/img/all.a4d78610.png"/>
								<span>Xổ số nhanh</span>
							</div>
							<div class="lottery-item">
								<img src="https://m.vn5555.vip/static/img/lobby.e990b38c.png"/>
								<span>Xóc đĩa</span>
							</div>
						</div>
						<div class="lottery-menu-mid">
							<div class="lottery-item">
								<img src="https://m.vn5555.vip/static/img/SICBO.30ef5ab9.png"/>
								<span>Xúc sắc</span>
							</div>
							<div class="lottery-item">
								<img src="https://m.vn5555.vip/static/img/KENO.b46b0ad4.png"/>
								<span>Keno</span>
							</div>
							<div class="lottery-item">
								<img src={require("../../img/game_mini-d03d72bd.png")} style={{padding:"0.25rem 0.42rem"}}/>
								<span>Tài xỉu</span>
							</div>
							<Link to="/notification" class="lottery-item">
								<img src={require("../../img/invitation_bg-cba7474d.png")} style={{padding:"0.25rem 0.42rem"}}/>
								<span>Khuyến mãi</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="content-game">
					<div className="list-game">
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
						<div className="box-game">
							<Link to="/xucxac3">
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
						<div className="box-game">
							<Link to="/taixiu1">
								<img
									src={require("../../img/taixiu1.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>TÀI XỈU 1P</h3>
								<div className="box-game-text">
									<div>Tài xỉu nông dân</div>
									<div>Thời gian cược 1 phút</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/taixiu3">
								<img
									src={require("../../img/k3-3fb4362a.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>TÀI XỈU 3P</h3>
								<div className="box-game-text">
									<div>Tài xỉu chuyên nghiệp</div>
									<div>Thời gian cược 3 phút</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/taixiu5">
								<img
									src={require("../../img/logo-k333.685bfbc8.png")}
									style={{ margin: "0 5px 0 0" }}
								/>
								<h3>TÀI XỈU 5P</h3>
								<div className="box-game-text">
									<div>Tài xỉu đại gia</div>
									<div>Thời gian cược 5 phút</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xd3">
								<img src={require("../../img/xocdia.png")} />
								<h3>XÓC ĐĨA 3P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/xd5">
								<img src={require("../../img/xocdia2.png")} />
								<h3>XÓC ĐĨA 5P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
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
