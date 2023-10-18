import Footer from "../../components/Footer/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetNameChoose } from "../../funcUtils";

function HistoryBet() {
    const [isShow, setShow] = useState(false);
    const [ls, setLs] = useState(null);
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
            .get(`${process.env.REACT_APP_API_URL}/history/historyus`, {})
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
                <h1 className="title-h1">Lịch Sử Tham Gia</h1>
                {profile != null ? (
                    <div className="content-history" style={{ margin: "1.5rem 0 0" }}>
                        {profile?.map((item, key) => (
                            <>
                                <div
                                    className="item_inner"
                                    onClick={() => {
                                        setLs(item);
                                        setShow(true);
                                    }}>
                                    <div className="item_history">
                                        <div className="title_item_history">
                                            <span className="sanh">
                                                {item.sanh === "3 phút" ? "Keno 3p" : item.sanh === "5 phút" ? "Keno 5p" : item.sanh === "1 phút" ? "Keno 1p" : item.sanh}
                                            </span>
                                            <span className={`type_state ${item.status_bet === "Pending" ? "pending" : item.status_bet === "Win" ? "win" : "lose"}`}>
                                                {item.status_bet}
                                            </span>
                                        </div>
                                        <div className="id_history_sanh">Phiên cược: {item?.id_bet?.id_bet ? item?.id_bet?.id_bet : item?.id_bet}</div>
                                        <div className="id_history_sanh">
                                            {GetNameChoose(item.state, item.type, item.sanh) ? GetNameChoose(item.state, item.type, item.sanh) : "Chọn " + item.state}
                                        </div>
                                    </div>
                                    <div className="money_history">
                                        <span className="money">{Number(item.money).toLocaleString()}đ</span>
                                        <div className="time_choose">{formatDate(new Date(item.createdAt))}</div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                ) : (
                    <div></div>
                )}

                <Footer profile={profile1} />

                {isShow === true && ls.status_bet !== "Pending" ? (
                    <>
                        <div className="modal" style={{ zIndex: "9999999" }}>
                            <div className="modaloverlay">
                                <i className="ti-close closelogin"></i>
                            </div>
                            <div className="modalbody">
                                <div>
                                    <div className="modalinner" style={{ padding: "10px 15px" }}>
                                        <div className="modalheader" style={{ padding: "10px 0 20px" }}>
                                            Chi tiết cược
                                        </div>

                                        {ls?.id_bet?.id_bet || ls.id_bet ? (
                                            <>
                                                <div className="lsgd-table">
                                                    <div>Trò chơi</div>
                                                    <div>{ls.sanh === "3 phút" ? "Keno 3p" : ls.sanh === "5 phút" ? "Keno 5p" : ls.sanh === "1 phút" ? "Keno 1p" : ls.sanh}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Phiên</div>
                                                    <div>{ls?.id_bet?.id_bet ? ls?.id_bet?.id_bet : ls.id_bet ? ls.id_bet : "Không xác định"}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Thời gian</div>
                                                    <div>{formatDate(new Date(ls.createdAt))}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Đặt cược</div>
                                                    <div>{GetNameChoose(ls.state, ls.type, ls.sanh) ? GetNameChoose(ls.state, ls.type, ls.sanh) : "Chọn " + ls.state}</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Tổng Cược</div>
                                                    <div>{Number(ls.money).toLocaleString()} đ</div>
                                                </div>
                                                <div className="lsgd-table">
                                                    <div>Tổng thắng</div>
                                                    <div>{Number(ls.moneythang).toLocaleString()} đ</div>
                                                </div>

                                                {ls.sanh === "3 phút" || ls.sanh === "5 phút" || ls.sanh === "1 phút" ? (
                                                    <>
                                                        <h3
                                                            style={{
                                                                fontSize: "0.4rem",
                                                                margin: "20px 0 10px"
                                                            }}>
                                                            Kết quả phiên {ls?.id_bet?.id_bet}
                                                        </h3>
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
                                                ) : ls.sanh === "Xúc sắc 3p" ||
                                                  ls.sanh === "Xúc sắc 5p" ||
                                                  ls.sanh === "Tài xỉu 5p" ||
                                                  ls.sanh === "Tài xỉu 1p" ||
                                                  ls.sanh === "Tài xỉu 3p" ? (
                                                    <>
                                                        <h3
                                                            style={{
                                                                fontSize: "0.4rem",
                                                                margin: "20px 0 10px"
                                                            }}>
                                                            Kết quả phiên {ls?.id_bet?.id_bet}
                                                        </h3>
                                                        <div
                                                            className="history_xucxac"
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center"
                                                            }}>
                                                            {ls.id_bet.result.split(" ").map((item) => (
                                                                <div className={`n${item}`}></div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : ls.sanh === "Xóc dĩa 3p" || ls.sanh === "Xóc dĩa 5p" ? (
                                                    <>
                                                        <h3
                                                            style={{
                                                                fontSize: "0.4rem",
                                                                margin: "20px 0 10px"
                                                            }}>
                                                            Kết quả phiên {ls?.id_bet?.id_bet}
                                                        </h3>
                                                        <div
                                                            className="history_xucxac"
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                fontSize: "13px"
                                                            }}>
                                                            {ls.id_bet.result.split(" ").map((item) => (
                                                                <div className={`a${item}`}></div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : ls.sanh === "Xổ số 3p" || ls.sanh === "Xổ số 5p" ? (
                                                    <>
                                                        <h3
                                                            style={{
                                                                fontSize: "0.35rem",
                                                                margin: "20px 0 0",
                                                                textAlign: "left",
                                                                fontWeight: "bold",
                                                                textDecoration: "underline"
                                                            }}>
                                                            Kết quả phiên {ls?.id_bet?.id_bet}
                                                        </h3>
                                                        <table
                                                            id="table-xsmb"
                                                            className="table-result table table-bordered table-striped table-xsmb table-lsgd"
                                                            style={{
                                                                fontSize: "0.35rem"
                                                            }}>
                                                            <tbody>
                                                                <tr>
                                                                    <th
                                                                        style={{
                                                                            width: "10%"
                                                                        }}>
                                                                        ĐB
                                                                    </th>
                                                                    <td>
                                                                        <span id="mb_prize_0" className="special-prize div-horizontal">
                                                                            {ls.id_bet.dacbiet}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>1</th>
                                                                    <td>
                                                                        <span id="mb_prize_1" className="prize1 div-horizontal">
                                                                            {ls.id_bet.nhat}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>2</th>
                                                                    <td>
                                                                        <span id="mb_prize_2" className="prize2 div-horizontal">
                                                                            {ls.id_bet.hai.split(" ")[0]}
                                                                        </span>
                                                                        <span id="mb_prize_3" className="prize2 div-horizontal">
                                                                            {ls.id_bet.hai.split(" ")[1]}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>3</th>
                                                                    <td>
                                                                        <span id="mb_prize_4" className="prize3 div-horizontal">
                                                                            {ls.id_bet.ba.split(" ")[0]}
                                                                        </span>
                                                                        <span id="mb_prize_5" className="prize3 div-horizontal">
                                                                            {ls.id_bet.ba.split(" ")[1]}
                                                                        </span>
                                                                        <span id="mb_prize_6" className="prize3 div-horizontal">
                                                                            {ls.id_bet.ba.split(" ")[2]}
                                                                        </span>
                                                                        <span id="mb_prize_7" className="prize3 div-horizontal">
                                                                            {ls.id_bet.ba.split(" ")[3]}
                                                                        </span>
                                                                        <span id="mb_prize_8" className="prize3 div-horizontal">
                                                                            {ls.id_bet.ba.split(" ")[4]}
                                                                        </span>
                                                                        <span id="mb_prize_9" className="prize3 div-horizontal">
                                                                            {ls.id_bet.ba.split(" ")[5]}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>4</th>
                                                                    <td>
                                                                        <span id="mb_prize_10" className="prize4 div-horizontal">
                                                                            {ls.id_bet.tu.split(" ")[0]}
                                                                        </span>
                                                                        <span id="mb_prize_11" className="prize4 div-horizontal">
                                                                            {ls.id_bet.tu.split(" ")[1]}
                                                                        </span>
                                                                        <span id="mb_prize_12" className="prize4 div-horizontal">
                                                                            {ls.id_bet.tu.split(" ")[2]}
                                                                        </span>
                                                                        <span id="mb_prize_13" className="prize4 div-horizontal">
                                                                            {ls.id_bet.tu.split(" ")[3]}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>5</th>
                                                                    <td>
                                                                        <span id="mb_prize_14" className="prize5 div-horizontal">
                                                                            {ls.id_bet.nam.split(" ")[0]}
                                                                        </span>
                                                                        <span id="mb_prize_15" className="prize5 div-horizontal">
                                                                            {ls.id_bet.nam.split(" ")[1]}
                                                                        </span>
                                                                        <span id="mb_prize_16" className="prize5 div-horizontal">
                                                                            {ls.id_bet.nam.split(" ")[2]}
                                                                        </span>
                                                                        <span id="mb_prize_17" className="prize5 div-horizontal">
                                                                            {ls.id_bet.nam.split(" ")[3]}
                                                                        </span>
                                                                        <span id="mb_prize_18" className="prize5 div-horizontal">
                                                                            {ls.id_bet.nam.split(" ")[4]}
                                                                        </span>
                                                                        <span id="mb_prize_19" className="prize5 div-horizontal">
                                                                            {ls.id_bet.nam.split(" ")[5]}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>6</th>
                                                                    <td>
                                                                        <span id="mb_prize_20" className="prize6 div-horizontal">
                                                                            {ls.id_bet.sau.split(" ")[0]}
                                                                        </span>
                                                                        <span id="mb_prize_21" className="prize6 div-horizontal">
                                                                            {ls.id_bet.sau.split(" ")[1]}
                                                                        </span>
                                                                        <span id="mb_prize_22" className="prize6 div-horizontal">
                                                                            {ls.id_bet.sau.split(" ")[2]}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th>7</th>
                                                                    <td>
                                                                        <span id="mb_prize_23" className="prize7 div-horizontal">
                                                                            {ls.id_bet.bay.split(" ")[0]}
                                                                        </span>
                                                                        <span id="mb_prize_24" className="prize7 div-horizontal">
                                                                            {ls.id_bet.bay.split(" ")[1]}
                                                                        </span>
                                                                        <span id="mb_prize_25" className="prize7 div-horizontal">
                                                                            {ls.id_bet.bay.split(" ")[2]}
                                                                        </span>
                                                                        <span id="mb_prize_26" className="prize7 div-horizontal">
                                                                            {ls.id_bet.bay.split(" ")[3]}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </>
                                                ) : null}
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
export default HistoryBet;
