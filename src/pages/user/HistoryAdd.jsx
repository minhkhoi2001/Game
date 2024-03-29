import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

function HistoryAdd() {
    function formatDate(m) {
        new Date(m);
        const dateString =
            m.getUTCFullYear() +
            "/" +
            ("0" + (m.getMonth() + 1)).slice(-2) +
            "/" +
            ("0" + m.getDate()).slice(-2) +
            "  " +
            ("0" + m.getHours()).slice(-2) +
            ":" +
            ("0" + m.getMinutes()).slice(-2);
        return dateString;
    }
    const [profile, setProfile] = useState(null);
    const [profile1, setProfile1] = useState(null);
    //const [isShow, setShow] = useState(false);
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
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/payment/paymentus`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => function () {});
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile1(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
    }, []);
    return (
        <>
            <div className="main">
                <Header profile={profile1} />
                <h1 className="title-h1">Lịch Sử Nạp Tiền</h1>
                {profile ? (
                    <div className="content-history" style={{ margin: "1.5rem 0 0" }}>
                        {profile?.map((item, key) => (
                            <>
                                {item.type_payment === "NẠP" && (
                                    <>
                                        <div className="item_inner">
                                            <div className="item_history">
                                                <div className="title_item_history">
                                                    <span className="sanh"> {item.type_payment}</span>
                                                    <span
                                                        className={`type_state ${
                                                            item.status_payment === "Pending" ? "pending" : item.status_payment === "Success" ? "win" : "lose"
                                                        }`}>
                                                        {item.status_payment}
                                                    </span>
                                                </div>
                                                <div className="id_history_sanh">Nội dung : {item?.detail}</div>
                                            </div>
                                            <div className="money_history">
                                                <span className="money">
                                                    {item.status_payment === "Pending" ? "" : item.status_payment === "Success" ? "+" : ""}
                                                    {Number(item.money).toLocaleString()}đ
                                                </span>
                                                <div className="time_choose">{formatDate(new Date(item.createdAt))}</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}

                <Footer profile={profile1} />
            </div>
        </>
    );
}
export default HistoryAdd;
