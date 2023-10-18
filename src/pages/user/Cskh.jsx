import { useEffect, useState } from "react";
//import LiveChat from "react-livechat";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import Header from "../components/Header";

function CSKH() {
    const [profile, setProfile] = useState(null);
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
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="loading">
                    <div className="loader"></div>
                </div>
            ) : null}
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Chăm Sóc Khách Hàng</h1>
                <div style={{ position: "relative", height: "70vh" }}>
                    <iframe src="https://tawk.to/chat/64b7fa5c94cf5d49dc649a9e/1h5najupn1" frameborder="0" width="100%" height="100%"></iframe>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CSKH;
