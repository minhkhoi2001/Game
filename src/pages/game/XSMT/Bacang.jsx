import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import Results from "./0_Results";
import History from "./0_History";
import TabNavigation from "./0_Tab";
import Header from "../../components/Header";
import CountDown from "./0_countdown";
import { useParams } from "react-router-dom";

function Bacang() {
    const [isVisible, setVisible] = useState(null);
    const [bet, setBet] = useState(null);
    const [profile, setProfile] = useState(null);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(30);
    const [start, setStart] = useState(false);
    const [dulieunhap, setDulieunhap] = useState(new Date());
    const [update, setUpdate] = useState(0);

    const date = new Date();
    const currentMinute = date.getMinutes();
    const currentSecond = date.getSeconds();
    const [item, setState] = useState(null);
    const [total, setTotal] = useState(null);
    const { id } = useParams();
    const [setting, setSetting] = useState(null);
    const [item1, setItem] = useState([]);
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
        axios.get(`https://mu88.live/api/front/open/lottery/history/list/5/${id}`).then((res) => {
            setBet(res.data.t);
            setTotal([
                {
                    dacbiet: JSON.parse(res.data.t.issueList[0].detail)[0],
                    nhat: JSON.parse(res.data.t.issueList[0].detail)[1],
                    hai: JSON.parse(res.data.t.issueList[0].detail)[2].split(",").join(" "),
                    ba: JSON.parse(res.data.t.issueList[0].detail)[3].split(",").join(" "),
                    tu: JSON.parse(res.data.t.issueList[0].detail)[4].split(",").join(" "),
                    nam: JSON.parse(res.data.t.issueList[0].detail)[5].split(",").join(" "),
                    sau: JSON.parse(res.data.t.issueList[0].detail)[6].split(",").join(" "),
                    bay: JSON.parse(res.data.t.issueList[0].detail)[7].split(",").join(" "),
                    tam: JSON.parse(res.data.t.issueList[0].detail)[8],
                    tam: JSON.parse(res.data.t.issueList[0].detail)[8]
                }
            ]);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
            setProfile(res.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/setting/get`, {}).then((res) => {
            setSetting(res.data.data[0]);
        });

        axios.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {}).then((res) => {
            setVisible({
                money: res.data.data[0].money.toLocaleString(),
                id: res.data.data[0]._id
            });
        });
    }, []);

    useEffect(() => {
        let swalInst;
        const showAlert = async (data) => {
            swalInst = swal({
                title: "Thông báo hệ thống",
                text: ` Chúc mừng quý khách đã may mắn được nhận ${data.money.toLocaleString()} vào tài khoản`,
                icon: "info",
                buttons: {
                    submit: "Tôi đã hiểu"
                }
            });
            const result = await swalInst;

            switch (result) {
                case "submit":
                    axios.post("https://server.best96tx.com/notification/seen", {
                        id: data.id
                    });
                    break;
                default:
            }

            setVisible(false);
        };
        if (isVisible) {
            showAlert(isVisible);
        }
    }, [isVisible]);

    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };

    const [isOpen1, setIsOpen1] = useState(false);
    const openPopup1 = () => {
        setIsOpen1(true);
    };
    const closePopup1 = () => {
        setIsOpen1(false);
    };

    const [isOpen2, setIsOpen2] = useState(false);
    const openPopup2 = () => {
        setIsOpen2(true);
    };
    const closePopup2 = () => {
        setIsOpen2(false);
    };

    const onChoose = (e) => {
        if (item1.includes(e.target.id) && item1.length < 10) {
            setItem(item1.filter((item) => item !== e.target.id));
        } else if (item1.length < 10) {
            setItem([...item1, e.target.id]);
        } else {
            swal("Chú ý", "Bạn chỉ được chọn tối đa 10 số", "warning");
            item1.pop();
            setItem(item1);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const newData = [];
        item1.map((item) => {
            if (item < 10) {
                newData.push("00" + item);
            } else if (item >= 10 && item < 100) {
                newData.push("0" + item);
            } else {
                newData.push(item);
            }
        });
        const currentDate = new Date();
        const minute = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
        if (Number(currentDate.getHours() + "" + minute) < 1800 && Number(currentDate.getHours() + "" + minute) > 1710) {
            swal("Đặt cược không thành công.", " Đã hết thời gian cược", "warning");
        } else if (Number(currentDate.getHours() + "" + minute) > 1800) {
            const date = new Date();
            const day = Number(date.getDate() + 1) < 10 ? "0" + Number(date.getDate() + 1) : Number(date.getDate() + 1);
            const month = date.getUTCMonth() < 9 ? "0" + Number(date.getUTCMonth() + 1) : Number(date.getUTCMonth() + 1);

            const formData = {
                state: newData.join(" "),
                id: bet.turnNum,
                type: 2,
                money: item1.length * newMoney,
                sanh: bet.name
            };
            if (item1.length == 0) {
                swal("Thất bại", "Bạn chưa chọn số đánh", "info");
            } else {
                axios
                    .post("https://server.best96tx.com/history/chooseXSMB", formData)
                    .then((res) => {
                        swal("Đặt cược thành công", "", "success");
                        setItem([]);
                    })
                    .catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
            }
        } else if (Number(currentDate.getHours() + "" + minute) < 1710) {
            const formData = {
                state: newData.join(" "),
                id: bet.turnNum,
                type: 2,
                money: item1.length * newMoney,
                sanh: bet.name
            };
            if (item1.length == 0) {
                swal("Thất bại", "Bạn chưa chọn số đánh", "info");
            } else {
                axios
                    .post("https://server.best96tx.com/history/chooseXSMB", formData)
                    .then((res) => {
                        swal("Đặt cược thành công", "", "success");
                        setItem([]);
                    })
                    .catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
            }
        }
    };
    const [newMoney, setNewMoney] = useState();

    const [activeTab3c, setActiveTab3c] = useState("tab_1");
    const handleTabClick3c = (tabName) => {
        setActiveTab3c(tabName);
    };

    const numbers = Array.from(Array(1000).keys());
    return (
        <>
            <div className="main">
                <Header profile={profile} />

                <div className="record_bet">
                    <div className="colum-resultxs">
                        <div className="col-50">
                            {bet ? (
                                <>
                                    <div className="info_bet">
                                        <div style={{ fontSize: "0.33rem" }}>
                                            {bet.name} ngày <b style={{ color: "#333" }}>{bet.turnNum}</b>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="loading">
                                    <div className="loader"></div>
                                </div>
                            )}
                            <span className="tkq">Trả kết quả lúc 18:00</span>
                        </div>

                        <div className="col-50">
                            {bet ? (
                                <>
                                    <div style={{ cursor: "pointer" }} onClick={openPopup1} className="info_bet">
                                        <div style={{ fontSize: "0.33rem" }}>
                                            Kết quả ngày <b style={{ color: "#333" }}>{bet.issueList[0].turnNum}</b>
                                        </div>
                                        <div
                                            className="ball_xs"
                                            style={{
                                                margin: "0.25rem auto 0rem",
                                                justifyContent: "center"
                                            }}>
                                            {bet.issueList[0].openNum.split(",").map((x) => (
                                                <div className="redball">{x}</div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className="col-100">
                            <div style={{ display: "flex" }}>
                                <button className="btn-mini" onClick={openPopup2} style={{ border: "1px solid #477bff", color: "#477bff" }}>
                                    Lịch sử của bạn
                                </button>
                                <button className="btn-mini" onClick={openPopup1} style={{ border: "1px solid #00b977", color: "#00b977" }}>
                                    Chi tiết kết quả
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <CountDown date={bet?.turnNum} />

                <TabNavigation />

                <div className="main_game">
                    <div className="route_game">
                        <div className="text_choose_center">
                            <form onSubmit={onSubmit} className="form-lg">
                                <div className="footer_choose1">
                                    <div className="title_choose_footer1">
                                        <div className="item_choose_footer1">
                                            <div>
                                                <div
                                                    style={{
                                                        margin: "0.2rem auto",
                                                        textAlign: "left",
                                                        width: "90%"
                                                    }}>
                                                    Số tiền cược 1 con
                                                </div>
                                                <input
                                                    value={newMoney}
                                                    onChange={(e) => setNewMoney(e.target.value)}
                                                    required
                                                    min="1"
                                                    name="money"
                                                    type="number"
                                                    placeholder="Nhập số tiền cược"
                                                />
                                            </div>
                                        </div>
                                        <div style={{ margin: "0.3rem 0 0" }} className="item_choose_footer1">
                                            <div
                                                style={{
                                                    margin: "0.1rem auto",
                                                    textAlign: "left",
                                                    width: "90%"
                                                }}>
                                                <span style={{ marginRight: "5px" }}>
                                                    Đã chọn <span style={{ color: "red" }}>{item1.length}</span> ,
                                                </span>
                                                <span>
                                                    Tổng tiền cược{" "}
                                                    <span style={{ color: "red" }}>{item1.length != 0 && newMoney ? (item1.length * newMoney).toLocaleString() : 0}đ</span>
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    margin: "0.1rem auto",
                                                    textAlign: "left",
                                                    width: "90%"
                                                }}>
                                                Tỉ lệ cược {setting ? "1 : " + setting.mtbacang : "Chưa cài đặt"}
                                            </div>
                                            <button type="submit" className="btn-sbmit">
                                                Đặt lệnh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="text_choose_center">
                            <div className="bet_state">Chọn Số</div>
                            <div className="bacang">
                                <ul className="tab-navigation tab-3cang">
                                    {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((startNumber, index) => {
                                        const endNumber = startNumber + 99;
                                        const tabId = `tab_${index + 1}`;
                                        const isActive = activeTab3c === tabId ? "active" : "";

                                        return (
                                            <li key={tabId} className={isActive} onClick={() => handleTabClick3c(tabId)}>
                                                {startNumber.toString().padStart(3, "0")}
                                                <br /> ━ <br />
                                                {endNumber.toString().padStart(3, "0")}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="tab-contents" style={{ marginLeft: "-0.2rem", marginRight: "-0.2rem" }}>
                                <div>
                                    {[
                                        { tabId: "tab_1", startNumber: 0, endNumber: 99 },
                                        { tabId: "tab_2", startNumber: 100, endNumber: 199 },
                                        { tabId: "tab_3", startNumber: 200, endNumber: 299 },
                                        { tabId: "tab_4", startNumber: 300, endNumber: 399 },
                                        { tabId: "tab_5", startNumber: 400, endNumber: 499 },
                                        { tabId: "tab_6", startNumber: 500, endNumber: 599 },
                                        { tabId: "tab_7", startNumber: 600, endNumber: 699 },
                                        { tabId: "tab_8", startNumber: 700, endNumber: 799 },
                                        { tabId: "tab_9", startNumber: 800, endNumber: 899 },
                                        { tabId: "tab_10", startNumber: 900, endNumber: 999 }
                                    ].map(({ tabId, startNumber, endNumber }) => {
                                        if (activeTab3c === tabId) {
                                            return (
                                                <div key={tabId} className="state_choose">
                                                    {numbers.map((number) => {
                                                        if (number >= startNumber && number <= endNumber) {
                                                            return (
                                                                <div
                                                                    key={number}
                                                                    id={number}
                                                                    onClick={onChoose}
                                                                    className={`choose_xs ${item1.includes(String(number)) ? "chooseItem" : ""}`}>
                                                                    {number < 100 && number >= 10 ? `0${number}` : number < 10 ? `00${number}` : number}
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

                <Results isOpen={isOpen1} total={total} closePopup={closePopup1} />

                <History isOpen={isOpen2} closePopup={closePopup2} />
            </div>
        </>
    );
}
export default Bacang;
