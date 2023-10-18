import Footer from "../../components/Footer/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listxs.css";
function ListXSMN() {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
    }, []);
    const date1 = new Date();
    const [date, setDate] = useState(date1.getDay());
    const [data, setData] = useState();
    const handleChange = (e) => {
        setDate(e.target.value);
        setData(null);
    };
    useEffect(() => {
        if (date == 0) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/dalat,kigi,tigi`).then((res) => setData(res.data));
        }
        if (date == 1) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/cama,doth,tphc`).then((res) => setData(res.data));
        }
        if (date == 2) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/bali,vuta`).then((res) => setData(res.data));
        }
        if (date == 3) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/cath,dona,sotr`).then((res) => setData(res.data));
        }
        if (date == 4) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/angi,bith,tani`).then((res) => setData(res.data));
        }
        if (date == 5) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/bidu,trvi`).then((res) => setData(res.data));
        }
        if (date == 6) {
            axios.get(`https://mu88.live/api/front/open/lottery/recent/list/biph,hagi,loan,tphc`).then((res) => setData(res.data));
        }
    }, [date]);
    return (
        <>
            <div className="main">
                <Header profile={profile} />
                <div className="account">
                    <h1 className="title-h1" style={{ color: "#fff" }}>
                        Xổ số miền Nam
                    </h1>
                    <div className="account__menu">
                        <div className="choose_day_xs">
                            Chọn ngày xổ{" "}
                            <select onChange={handleChange} value={date} id="date">
                                <option value="0">Chủ nhật</option>
                                <option value="1">Thứ 2</option>
                                <option value="2">Thứ 3</option>
                                <option value="3">Thứ 4</option>
                                <option value="4">Thứ 5</option>
                                <option value="5">Thứ 6</option>
                                <option value="6">Thứ 7</option>
                            </select>
                        </div>
                    </div>
                    <div className="list-xs">
                        {data ? (
                            data?.rows?.map((item) => (
                                <>
                                    <Link to={`/xsmn/lo/${item.code}`}>
                                        <div className="item-xs" data-code={`${item.code}`}>
                                            <div>{item.name}</div>
                                            {/*<span>Ngày xổ: {item.issueList[0].turnNum}</span>*/}
                                            <div>Ngày xổ: {item.turnNum}</div>
                                            <img alt="" src={`https://www.666mu88.com/static/img/gameicons/cp/${item.code}.png`} />
                                        </div>
                                    </Link>
                                </>
                            ))
                        ) : (
                            <div className="loading">
                                <div className="loader"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default ListXSMN;
