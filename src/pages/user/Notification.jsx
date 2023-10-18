import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Notification() {
    const [profile, setProfile] = useState(null);
    const [isShow, setShow] = useState(false);
    const [notify, setNotify] = useState();
    const [notifyItem, setNotifyItem] = useState();
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
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));

        axios.get(`${process.env.REACT_APP_API_URL}/auth/getnotify`, {}).then((res) => {
            setNotify(res.data.data);
        });
    }, []);

    return (
        <>
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Khuyến Mãi</h1>
                <div style={{ position: "relative", margin: "1.8rem 0 0" }}>
                    {/*<div className="box-image">
						<img alt="" src={require("../../img/tb1.jpg")} />
						<div className="box-image-title">Thông báo 1</div>
					</div>
					<div className="box-image">
						<img alt="" src={require("../../img/tb2.jpg")} />
						<div className="box-image-title">Thông báo 2</div>
					</div>
					<div className="box-image">
						<img alt="" src={require("../../img/tb3.jpg")} />
						<div className="box-image-title">Thông báo 3</div>
					</div>*/}
                    {notify != null ? (
                        <>
                            {notify.map((item, index) => (
                                <>
                                    {index !== 0 && item.title !== "marquee" ? (
                                        <div
                                            className="box-image"
                                            onClick={() => {
                                                if (item.title.indexOf("{") !== 0) {
                                                    axios
                                                        .get(`${process.env.REACT_APP_API_URL}/auth/notifyall/${item._id}`, {})
                                                        .then((res) => {
                                                            setNotifyItem(res.data.data);
                                                            setShow(true);
                                                        })
                                                        .catch((error) => {
                                                            // swal("Lấy thông tin không thành công");
                                                        });
                                                } else {
                                                    navigate(item.content.replace(/<\/?[^>]+(>|$)/g, ""));
                                                }
                                            }}>
                                            <img alt="" src={item.image} style={{ width: "100%" }} />
                                            <div className="box-image-title">{item.title.replace("}", "").replace("{", "")}</div>
                                        </div>
                                    ) : null}
                                </>
                            ))}
                        </>
                    ) : (
                        <div
                            style={{
                                fontSize: "16px",
                                textAlign: "center",
                                padding: "10px"
                            }}>
                            Đang cập nhật dữ liệu
                        </div>
                    )}
                </div>
                {isShow === true ? (
                    <>
                        {notifyItem != null ? (
                            <div className="popup-backdrop">
                                <div className="popup-main">
                                    <div className="popup-header">{notifyItem.title}</div>
                                    <div className="popup-content">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: notifyItem.content
                                            }}
                                        />
                                    </div>
                                    <button onClick={() => setShow(false)} className="popup-close">
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </>
                ) : null}
            </div>
            <Footer />
        </>
    );
}

export default Notification;
