import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from "swiper/core";
import { useEffect, useState } from "react";
import axios from "axios";
import CampaignIcon from "@mui/icons-material/Campaign";

function Home() {
    SwiperCore.use([Autoplay]);
    const swiperParams = {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }
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
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile1(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getnotify`, {}).then((res) => {
            setNotify(res.data.data[0]);
        });
    }, []);
    console.log(process.env.REACT_APP_API_URL);
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
                                            Số dư: <b>{Math.floor(profile1.money).toLocaleString()}đ</b>
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
                        <img alt="" src={require("../../img/banner12.jpg")} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img alt="" src={require("../../img/banner11.jpg")} />
                    </SwiperSlide>
                </Swiper>
                {notify ? (
                    <>
                        {notify.isShow === true && notify.title === "marquee" ? (
                            <div className="marquees">
                                <div>
                                    <CampaignIcon sx={{ fontSize: "22px" }} />
                                </div>
                                <div>
                                    <div className="marquee">
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: notify.content
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : null}

                <div className="content-game">
                    <h2 className="title" style={{ margin: "0.5rem 0 0" }}>
                        Games
                    </h2>
                    <div className="list-game">
                        {/*<div className="box-game op xsmb">
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
						<div className="box-game">
							<Link to="/keno1p">
								<img alt="" src={require("../../img/WinGo-749c393c.png")} />
								<h3>KENO 1P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
						<div className="box-game">
							<Link to="/keno3p">
								<img alt=""
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
								<img alt="" src={require("../../img/TrxWingo-7fc426b2.png")} />
								<h3>KENO 5P</h3>
								<div className="box-game-text">
									<div>Đoán số</div>
									<div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
								</div>
							</Link>
						</div>
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
				</div>*/}
                        <div className="box-game">
                            <Link to="/taixiu1">
                                <img alt="" src={require("../../img/taixiu1.png")} style={{ margin: "0 5px 0 0" }} />
                                <h3>TÀI XỈU 1P</h3>
                                <div className="box-game-text">
                                    <div>Tài xỉu nông dân</div>
                                    <div>Thời gian cược 1 phút</div>
                                </div>
                            </Link>
                        </div>
                        <div className="box-game">
                            <Link to="/taixiu3">
                                <img alt="" src={require("../../img/k3-3fb4362a.png")} style={{ margin: "0 5px 0 0" }} />
                                <h3>TÀI XỈU 3P</h3>
                                <div className="box-game-text">
                                    <div>Tài xỉu chuyên nghiệp</div>
                                    <div>Thời gian cược 3 phút</div>
                                </div>
                            </Link>
                        </div>
                        <div className="box-game">
                            <Link to="/taixiu5">
                                <img alt="" src={require("../../img/logo-k333.685bfbc8.png")} style={{ margin: "0 5px 0 0" }} />
                                <h3>TÀI XỈU 5P</h3>
                                <div className="box-game-text">
                                    <div>Tài xỉu đại gia</div>
                                    <div>Thời gian cược 5 phút</div>
                                </div>
                            </Link>
                        </div>
                        <div className="box-game">
                            <Link to="xocdia3">
                                <img alt="" src={require("../../img/xocdia.png")} />
                                <h3>XÓC ĐĨA 3P</h3>
                                <div className="box-game-text">
                                    <div>Đoán số</div>
                                    <div>Lớn/Nhỏ/Lẻ/Chẵn để giành chiến thắng</div>
                                </div>
                            </Link>
                        </div>
                        <div className="box-game">
                            <Link to="xocdia5">
                                <img alt="" src={require("../../img/xocdia2.png")} />
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
