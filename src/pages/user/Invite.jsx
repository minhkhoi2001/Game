import { useEffect, useState } from "react";
//import LiveChat from "react-livechat";
import Footer from "../../components/Footer/Footer";
import Header from "../components/Header";
import axios from "axios";

function Invite() {
    const [profile, setProfile] = useState(null);
    //const [isShow, setShow] = useState(false);
    const [profit, setProfit] = useState(null);
    //const [setting, setSetting] = useState(null);
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
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
        axios.get(`${process.env.REACT_APP_API_URL}/profit/get`, {}).then((res) => {
            setProfit(res.data.data[0]);
        });
        /*axios.get(`${process.env.REACT_APP_API_URL}/setting/get`, {}).then((res) => {
			setSetting(res.data.data[0]);
		});*/
    }, []);
    return (
        <>
            {/*isLoading ? (
				<div className="loading">
					<div className="loader"></div>
				</div>
			) : null*/}
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Mời Bạn Bè</h1>
                <div className="text_choose_center huongdan" style={{ position: "relative" }}>
                    <div className="title" style={{ margin: "0.2rem 0 0.4rem" }}>
                        Giới thiệu bạn bè nhận quà liền tay
                    </div>
                    <ul>
                        <li>Nhận ngay {profit ? Number(profit.first).toLocaleString() : 0}đ khi giới thiệu thành công một thành viên mới.</li>
                        <li>Nhận ngay {profit ? Number(profit.aff).toLocaleString() : 0}đ khi thành viên mới tham gia trò chơi lần đầu.</li>
                        {/*<li>Nhận thêm {setting ? Number(setting.aff)*100: 0}% số tiền mỗi khi thành viên của bạn giới thiệu tham gia trò chơi</li>*/}
                    </ul>
                </div>
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
