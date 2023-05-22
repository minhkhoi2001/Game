import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper/core";

function Home() {
	SwiperCore.use([Autoplay]);
	const swiperParams = {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	};
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
				<Swiper {...swiperParams}>
					<SwiperSlide>
						<img src="https://img.guyuan88.cc/banner/Banner_202305141839062oqs.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://img.guyuan88.cc/banner/Banner_20230514220845olf7.jpg" />
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://img.guyuan88.cc/banner/Banner_202305102059046jic.jpg" />
					</SwiperSlide>
				</Swiper>
				<div className="content-game">
					{/*<div className="notifiall">
						<div className="title-speaker">
							<CampaignOutlinedIcon sx={{ color: "red", fontSize: "20px" }} />
							<span>Công bố:</span>
						</div>
						<div style={{ height: "100%", overflow: "hidden" }}>
							<marquee>Chào mừng đến với vietlot.com</marquee>
						</div>
                    </div>*/}
					<h2 className="title" style={{ margin: "0.5rem 0 0" }}>
						Games
					</h2>
					<div className="list-game">
						<div className="box-game">
							<Link to="/keno1p">
								<img src={require("../../img/5d-4be64165.png")} />
								<h3>KENO 1P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/keno3p ">
								<img src={require("../../img/k3-3fb4362a.png")} />
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
							<Link to="/xoso">
								<img src={require("../../img/WinGo-749c393c.png")} />
								<h3>XỔ SỐ NHANH</h3>
								<div className="box-game-text">
									<div>Dự đoán</div>
									<div>Dự đoán xổ số để giành chiến thắng</div>
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
