import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import swal from "sweetalert";
import Footer from "../../../components/Footer/Footer";
import { GetNameChoose } from "../../../funcUtils";

function Keno1() {
    const [isVisible, setVisible] = useState(null);
    const [bet, setBet] = useState(null);
    const [profile, setProfile] = useState(null);
    const [historyGame, setHistoryGame] = useState(null);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(3);
    const [start, setStart] = useState(false);
    const [dulieunhap, setDulieunhap] = useState(new Date());
    const [update, setUpdate] = useState(0);

    const date = new Date();
    const currentMinute = date.getMinutes();
    const currentSecond = date.getSeconds();
    const [item, setState] = useState(null);
    const [total, setTotal] = useState(null);
    const [setting, setSetting] = useState(null);
    const [item1, setItem] = useState([]);
    const [isShow, setShow] = useState(false);
    const [ls, setLs] = useState(null);

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
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
            setProfile(res.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/setting/get`, {}).then((res) => {
            setSetting(res.data.data[0]);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/bet/get`).then((res) => {
            setBet(res.data.data);
            setDulieunhap(new Date(res.data.data.createdAt));
            setStart(true);
        });
        axios
            .get(`${process.env.REACT_APP_API_URL}/bet/getallbet`, {})
            .then((res) => {
                setTotal(res.data.data);
            })
            .catch(() => setTotal(null));
        axios.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {}).then((res) => {
            setVisible({
                money: res.data.data[0].money.toLocaleString(),
                id: res.data.data[0]._id
            });
        });
    }, []);
    useEffect(() => {
        const timer = setInterval(() => {
            if (Math.floor(180 - (new Date() - dulieunhap) / 1000) < 0) {
                axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
                    setProfile(res.data.data);
                });
                axios.get(`${process.env.REACT_APP_API_URL}/bet/get`).then((res) => {
                    setBet(res.data.data);
                    setDulieunhap(new Date(res.data.data.createdAt));
                });
                axios
                    .get(`${process.env.REACT_APP_API_URL}/bet/getallbet`, {})
                    .then((res) => {
                        setTotal(res.data.data);
                    })
                    .catch(() => setTotal(null));
                axios.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {}).then((res) => {
                    setVisible({
                        money: res.data.data[0].money.toLocaleString(),
                        id: res.data.data[0]._id
                    });
                });
            }
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, [dulieunhap]);
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
    useEffect(() => {
        let curTime_second = Math.floor(180 - (date - dulieunhap) / 1000);

        let myTimeout;

        if (currentMinute === dulieunhap.getMinutes() && currentSecond === dulieunhap.getSeconds()) {
            setStart(true);
            setSecond(second - 1);
            return () => {
                clearTimeout(myTimeout);
            };
        } else if (curTime_second < 180 && curTime_second >= 0) {
            setSecond(curTime_second % 60);
            setMinute((curTime_second - (curTime_second % 60)) / 60);
            setStart(true);
            return () => {
                clearTimeout(myTimeout);
            };
        } else {
            //cập nhật thời gian hiện tại 0.5s/lần
            myTimeout = setTimeout(() => {
                setUpdate(update + 1);
            }, 500);
        }
    }, [update, dulieunhap]);

    useEffect(() => {
        let curTime_second = Math.floor(180 - (date - dulieunhap) / 1000);
        let myTimeout = 0;
        if (start) {
            setSecond(curTime_second % 60);
            setMinute(Math.floor(curTime_second / 60));

            if (curTime_second > 180 || curTime_second <= 0) {
                setStart(false);
                setMinute(3);
                setSecond(0);
                return () => {
                    clearTimeout(myTimeout);
                };
            }
            myTimeout = setTimeout(() => {
                setSecond(second - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(myTimeout);
        };
    }, [second, start, dulieunhap]);

    const [isOpen, setIsOpen] = useState(false);
    const openPopup = () => {
        setIsOpen(true);
    };
    const closePopup = () => {
        setIsOpen(false);
    };

    const onChoose = (e) => {
        if (item1.includes(e.target.id)) {
            setItem(item1.filter((item) => item !== e.target.id));
        } else {
            setItem([...item1, e.target.id]);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            result: item1.join(" "),
            id: bet._id,
            money: item1.length * newMoney
        };
        axios
            .post("https://server.best96tx.com/history/choose", formData)
            .then((res) => swal("Đặt cược thành công", "", "success"))
            .catch((err) => swal("Thất bại", "Số tiền trong ví không đủ", "error"));
    };
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
    const [newMoney, setNewMoney] = useState();

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        getHistoryBet();
    };

    useEffect(() => {
        if (minute == 0 && second == 0) {
            runSlotEffect();
        }
    }, [minute, second]);

    const slotTransforms = document.querySelectorAll(".slot-transform");
    function runSlotEffect() {
        slotTransforms.forEach((slotTransform) => {
            slotTransform.classList.add("slot-scroll");
            setTimeout(() => {
                slotTransform.classList.remove("slot-scroll");
            }, 3000);
        });
    }
    function getHistoryBet() {
        axios
            .get(`${process.env.REACT_APP_API_URL}/history/historyus`, {})
            .then((res) => {
                setHistoryGame(res.data.data);
            })
            .catch((err) => function () {});
    }
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
                                        Phiên số <div className="xs_before">{bet.id_bet}</div>
                                    </div>
                                    <button className="btn-mini" onClick={openPopup}>
                                        Hướng dẫn cách chơi
                                    </button>
                                </>
                            ) : (
                                <div className="loading">
                                    <div className="loader"></div>
                                </div>
                            )}
                        </div>
                        <div className="col-50">
                            {total ? (
                                <>
                                    <div className="info_bet">
                                        <div style={{ fontSize: "0.33rem" }}>Thời gian còn lại</div>
                                        <div className="count">
                                            <div>0</div>
                                            {minute
                                                .toString()
                                                .split("")
                                                .map((item, index) => (
                                                    <div key={index}>{item}</div>
                                                ))}
                                            <div className="notime">:</div>
                                            {second < 10 ? <div>0</div> : ""}
                                            {second
                                                .toString()
                                                .split("")
                                                .map((item, index) => (
                                                    <div key={index}>{item}</div>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className="col-100">
                            {total ? (
                                <div className="box-quay">
                                    <div className="box">
                                        {total[0].result.split(" ").map((item, index) => (
                                            <div className="slot-column">
                                                <div className="slot-transform" data-col={index}>
                                                    <div className="slot-num">{index}</div>
                                                    <div className="slot-num">{index + 1}</div>
                                                    <div className="slot-num active">{item}</div>
                                                    <div className="slot-num">{index + 2}</div>
                                                    <div className="slot-num">{index + 3}</div>
                                                    <div className="slot-num">{index + 4}</div>
                                                    <div className="slot-num">{index + 5}</div>
                                                    <div className="slot-num">7</div>
                                                    <div className="slot-num">8</div>
                                                    <div className="slot-num">9</div>
                                                    <div className="slot-num">0</div>
                                                    <div className="slot-num">1</div>
                                                    <div className="slot-num">2</div>
                                                    <div className="slot-num">3</div>
                                                    <div className="slot-num">4</div>
                                                    <div className="slot-num">5</div>
                                                    <div className="slot-num">6</div>
                                                    <div className="slot-num">7</div>
                                                    <div className="slot-num">8</div>
                                                    <div className="slot-num">9</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="main_game">
                    <div className="route_game">
                        <div className="text_choose_center">
                            <div className="bet_state">Bi thứ 1</div>
                            <div className="state_choose">
                                <div onClick={onChoose} className={`state_rowindex ${item1.includes("1") ? "chooseItem" : ""}`} id="1">
                                    <i id="1" className="state">
                                        T
                                    </i>
                                    <span id="1" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="2" className={`state_rowindex ${item1.includes("2") ? "chooseItem" : ""}`}>
                                    <i id="2" className="state">
                                        X
                                    </i>
                                    <span id="2" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="3" className={`state_rowindex ${item1.includes("3") ? "chooseItem" : ""}`}>
                                    <i id="3" className="state">
                                        L
                                    </i>
                                    <span id="3" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="4" className={`state_rowindex ${item1.includes("4") ? "chooseItem" : ""}`}>
                                    <i id="4" className="state">
                                        C
                                    </i>
                                    <span id="4" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text_choose_center">
                            <div className="bet_state">Bi thứ 2</div>
                            <div className="state_choose">
                                <div onClick={onChoose} id="5" className={`state_rowindex ${item1.includes("5") ? "chooseItem" : ""}`}>
                                    <i id="5" className="state">
                                        T
                                    </i>
                                    <span id="5" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="6" className={`state_rowindex ${item1.includes("6") ? "chooseItem" : ""}`}>
                                    <i id="6" className="state">
                                        X
                                    </i>
                                    <span id="6" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="7" className={`state_rowindex ${item1.includes("7") ? "chooseItem" : ""}`}>
                                    <i id="7" className="state">
                                        L
                                    </i>
                                    <span id="7" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="8" className={`state_rowindex ${item1.includes("8") ? "chooseItem" : ""}`}>
                                    <i id="8" className="state">
                                        C
                                    </i>
                                    <span id="8" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text_choose_center">
                            <div className="bet_state">Bi thứ 3</div>
                            <div className="state_choose">
                                <div onClick={onChoose} id="9" className={`state_rowindex ${item1.includes("9") ? "chooseItem" : ""}`}>
                                    <i id="9" className="state">
                                        T
                                    </i>
                                    <span id="9" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="10" className={`state_rowindex ${item1.includes("10") ? "chooseItem" : ""}`}>
                                    <i id="10" className="state">
                                        X
                                    </i>
                                    <span id="10" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="11" className={`state_rowindex ${item1.includes("11") ? "chooseItem" : ""}`}>
                                    <i id="11" className="state">
                                        L
                                    </i>
                                    <span id="11" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="12" className={`state_rowindex ${item1.includes("12") ? "chooseItem" : ""}`}>
                                    <i id="12" className="state">
                                        C
                                    </i>
                                    <span id="12" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text_choose_center">
                            <div className="bet_state">Bi thứ 4</div>
                            <div className="state_choose">
                                <div onClick={onChoose} id="13" className={`state_rowindex ${item1.includes("13") ? "chooseItem" : ""}`}>
                                    <i id="13" className="state">
                                        T
                                    </i>
                                    <span id="13" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="14" className={`state_rowindex ${item1.includes("14") ? "chooseItem" : ""}`}>
                                    <i id="14" className="state">
                                        X
                                    </i>
                                    <span id="14" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="15" className={`state_rowindex ${item1.includes("15") ? "chooseItem" : ""}`}>
                                    <i id="15" className="state">
                                        L
                                    </i>
                                    <span id="15" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="16" className={`state_rowindex ${item1.includes("16") ? "chooseItem" : ""}`}>
                                    <i id="16" className="state">
                                        C
                                    </i>
                                    <span id="16" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text_choose_center">
                            <div className="bet_state">Bi thứ 5</div>
                            <div className="state_choose">
                                <div onClick={onChoose} id="17" className={`state_rowindex ${item1.includes("17") ? "chooseItem" : ""}`}>
                                    <i id="17" className="state">
                                        T
                                    </i>
                                    <span id="17" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="18" className={`state_rowindex ${item1.includes("18") ? "chooseItem" : ""}`}>
                                    <i id="18" className="state">
                                        X
                                    </i>
                                    <span id="18" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="19" className={`state_rowindex ${item1.includes("19") ? "chooseItem" : ""}`}>
                                    <i id="19" className="state">
                                        L
                                    </i>
                                    <span id="19" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="20" className={`state_rowindex ${item1.includes("20") ? "chooseItem" : ""}`}>
                                    <i id="20" className="state">
                                        C
                                    </i>
                                    <span id="20" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text_choose_center">
                            <div className="bet_state">Tổng</div>
                            <div className="state_choose">
                                <div onClick={onChoose} id="21" className={`state_rowindex ${item1.includes("21") ? "chooseItem" : ""}`}>
                                    <i id="21" className="state">
                                        T
                                    </i>
                                    <span id="21" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="22" className={`state_rowindex ${item1.includes("22") ? "chooseItem" : ""}`}>
                                    <i id="22" className="state">
                                        X
                                    </i>
                                    <span id="22" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="23" className={`state_rowindex ${item1.includes("23") ? "chooseItem" : ""}`}>
                                    <i id="23" className="state">
                                        L
                                    </i>
                                    <span id="23" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                                <div onClick={onChoose} id="24" className={`state_rowindex ${item1.includes("24") ? "chooseItem" : ""}`}>
                                    <i id="24" className="state">
                                        C
                                    </i>
                                    <span id="24" className="setting_type">
                                        {setting && setting.doiben}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="history_game">
                    <ul className="tab-navigation">
                        <li className={activeTab === "tab1" ? "active" : ""} onClick={() => handleTabClick("tab1")}>
                            Lịch sử trò chơi
                        </li>
                        <li className={activeTab === "tab2" ? "active" : ""} onClick={() => handleTabClick("tab2")}>
                            Lịch sử của tôi
                        </li>
                    </ul>

                    <div className="tab-content">
                        {activeTab === "tab1" && (
                            <div className="award_tb">
                                <table>
                                    <thead style={{ textAlign: "center" }}>
                                        <tr>
                                            <td>Phiên số</td>
                                            <td>Kết quả</td>
                                            <td>Thời gian</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{bet && bet.id_bet}</td>
                                            <td style={{ textAlign: "center" }}>Đang chờ kết quả</td>
                                            <td>{bet && formatDate(new Date(bet.createdAt))}</td>
                                        </tr>
                                        {total &&
                                            total.map((item, index) => (
                                                <>
                                                    <tr key={index}>
                                                        <td>{item?.id_bet}</td>
                                                        <td
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center"
                                                            }}>
                                                            {item.result.split(" ").map((x) => (
                                                                <div className="redball">{x}</div>
                                                            ))}
                                                        </td>
                                                        <td>{formatDate(new Date(item.createdAt))}</td>
                                                    </tr>
                                                </>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === "tab2" && (
                            <>
                                {historyGame != null ? (
                                    <div className="content-history award_tb">
                                        {historyGame?.map((item, key) => (
                                            <>
                                                {item.sanh === "3 phút" ? (
                                                    <div
                                                        className="item_inner"
                                                        onClick={() => {
                                                            setLs(item);
                                                            setShow(true);
                                                        }}>
                                                        <div className="item_history">
                                                            <div className="title_item_history">
                                                                <span className="sanh">Keno {item.sanh}</span>
                                                                <span
                                                                    className={`type_state ${
                                                                        item.status_bet === "Pending" ? "pending" : item.status_bet === "Win" ? "win" : "lose"
                                                                    }`}>
                                                                    {item.status_bet}
                                                                </span>
                                                            </div>
                                                            <div className="id_history_sanh">Phiên cược: {item?.id_bet?.id_bet ? item?.id_bet?.id_bet : item?.id_bet}</div>
                                                            <div className="id_history_sanh">{GetNameChoose(item.state, null)}</div>
                                                        </div>
                                                        <div className="money_history">
                                                            <span className="money">{Number(item.money).toLocaleString()}đ</span>
                                                            <div className="time_choose">{formatDate(new Date(item.createdAt))}</div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </>
                                        ))}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <Footer />

                {item1.length != 0 && (
                    <div className="popup-bet">
                        <form onSubmit={onSubmit}>
                            <div className="footer_choose">
                                <div className="title_choose_footer">
                                    <div className="item_choose_footer">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <b>Số tiền cược: </b>
                                            <input
                                                value={newMoney}
                                                onChange={(e) => setNewMoney(e.target.value)}
                                                required
                                                min="1"
                                                name="money"
                                                type="number"
                                                placeholder="Chọn số tiền cược"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ margin: "0.3rem 0 0" }} className="item_choose_footer">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "5px" }}>
                                                Đã chọn <span style={{ color: "red" }}>{item1.length}</span> ,
                                            </span>
                                            <span>
                                                Tổng tiền cược{" "}
                                                <span style={{ color: "red" }}>{item1.length != 0 && newMoney ? (item1.length * newMoney).toLocaleString() : 0} đ</span>
                                            </span>
                                        </div>
                                        <button type="submit" className="btn-sbmit">
                                            Đặt lệnh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {isOpen && (
                    <div className="popup-backdrop">
                        <div className="popup-main">
                            <div className="popup-header">Hướng dẫn cách chơi</div>
                            <div className="popup-content">
                                Chiến thắng khi đặt cược bi (tài/xỉu/lẻ/chẵn) khớp với kết quả xổ số. Tỉ lệ ăn 1.98 (đánh 100k ăn 198k).
                                <br />
                                <br />
                                <b>Ví dụ 1</b>
                                <br />
                                Bạn đặt bi thứ 2 là L (lẻ) và T (tài). Kết quả xổ số là 71294, bi thứ 2 có kết quả là 1. Bạn chiến thắng L nhưng thua T.
                                <br />
                                <br />
                                <b>Ví dụ 2</b>
                                <br />
                                Bạn đặt bi thứ 4 là C (chẵn). Kết quả xổ số là 71294, bi thứ 4 có kết quả là 9. Bạn thua cuộc.
                            </div>
                            <button onClick={closePopup} className="popup-close">
                                Đóng
                            </button>
                        </div>
                    </div>
                )}

                {isShow === true && ls.status_bet !== "Pending" ? (
                    <>
                        <div className="modal" style={{ zIndex: "9999999" }}>
                            <div className="modaloverlay"></div>
                            <div className="modalbody">
                                <div>
                                    <div className="modalinner" style={{ padding: "10px 15px" }}>
                                        <div className="modalheader" style={{ padding: "10px 0 20px" }}>
                                            Chi tiết cược
                                        </div>

                                        {ls?.id_bet?.id_bet ? (
                                            <>
                                                <div className="lsgd-table">
                                                    <div>Trò chơi</div>
                                                    <div>Keno 3p</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Phiên</div>
                                                    <div>{ls?.id_bet?.id_bet}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Thời gian</div>
                                                    <div>{formatDate(new Date(ls.createdAt))}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Đặt cược</div>
                                                    <div>{GetNameChoose(ls.state, ls.type, ls.sanh)}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Tổng Cược</div>
                                                    <div>{Number(ls.money).toLocaleString()} đ</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Tổng thắng</div>
                                                    <div>{Number(ls.moneythang).toLocaleString()} đ</div>
                                                </div>
                                                <h3 style={{ fontSize: "0.4rem", margin: "20px 0 10px" }}>Kết quả phiên {ls?.id_bet?.id_bet}</h3>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}>
                                                    {ls.id_bet.result.split(" ").map((x) => (
                                                        <div className="redball">{x}</div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : null}
                                        <div>
                                            <div className="modalformcontrols">
                                                <button
                                                    onClick={() => setShow(false)}
                                                    className="popup-close"
                                                    style={{
                                                        background: "#0064ff",
                                                        boxShadow: "none",
                                                        textShadow: "none"
                                                    }}>
                                                    ĐÓNG
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
}
export default Keno1;
