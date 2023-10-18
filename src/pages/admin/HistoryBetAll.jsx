import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Select, Container, Table, Pagination, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { GetNameChoose } from "../../funcUtils";

function HistoryBetAll() {
    const [data, setData] = useState(null);
    const [searched, setSearched] = useState("");
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
    const requestSearch = (searchedVal) => {
        setSearched(searchedVal);

        if (searchedVal !== "") {
            const filteredRows = JSON.parse(localStorage.getItem("data")).filter((row) => {
                return row.user.username.toString().toLowerCase().includes(searchedVal.toLowerCase());
            });
            setData(filteredRows);
        } else {
            setData(JSON.parse(localStorage.getItem("data")));
        }
    };
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/history/all`, {})
            .then((res) => {
                localStorage.setItem("data", JSON.stringify(res.data.data));
                setData(res.data.data);
            })
            .catch((res) => setData(null));
    }, []);
    const [pages, setPage] = useState(1);

    const handleChange = (e, page) => {
        setPage(page);
    };
    const [table, setTable] = useState("");
    const handleChangeTable = (e) => {
        setTable(e.target.value);
    };

    const XSMN = [
        "Bạc Liêu",
        "Vũng Tàu",
        "Tiền Giang",
        "Kiên Giang",
        "Đà Lạt",
        "Bình Phước",
        "Bình Dương",
        "An Giang",
        "Bình Thuận",
        "Cà Mau",
        "Cần Thơ",
        "Hậu Giang",
        "Đồng Tháp",
        "Tây Ninh",
        "Vĩnh Long",
        "Trà Vinh",
        "Sóc Trăng",
        "Long An",
        "TP. HCM",
        "Đồng Nai"
    ];
    const XSMT = [
        "Đà Nẵng",
        "Thừa T. Huế",
        "Quảng Trị",
        "Phú Yên",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Ninh Thuận",
        "Kon Tum",
        "Khánh Hòa",
        "Gia Lai",
        "Bình Định",
        "Đắk Lắk",
        "Đắk Nông"
    ];

    const [st, setSt] = useState(0);
    const handleChangeStatus = (e) => {
        if (ls.status_bet === "Lose" || ls.status_bet === "Pending") {
            if (e.target.value === "Win") {
                setSt(1);
            }
        } else {
            if (e.target.value === "Lose" || e.target.value === "Pending") {
                setSt(2);
            }
        }
        setLs((prevLs) => ({
            ...prevLs,
            status_bet: e.target.value
        }));
    };

    const handleSubmitLs = (e) => {
        e.preventDefault();
        const formData = {
            id: ls._id,
            userId: ls.user._id,
            status_bet: e.target.status_bet.value,
            state: e.target.state.value,
            money: e.target.money.value,
            moneyuser: st == 1 ? e.target.moneythang.value : st == 2 ? Number(ls.moneythang) * -1 : 0,
            moneythang: e.target.moneythang.value
        };
        axios
            .patch(`${process.env.REACT_APP_API_URL}/history`, formData)
            .then((res) => {
                setShow(false);
                swal("Cập nhật thành công").then((value) => {
                    window.location.reload();
                });
            })
            .catch((err) => {
                setShow(false);
                swal("Có lỗi vui lòng thử lại!");
            });
    };
    return (
        <>
            <ThemeProvider theme={theme}>
                <DashboardLayout>
                    {
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 1
                            }}>
                            <Container maxWidth={false}>
                                <div className="container_set">Lịch sử giao dịch</div>
                                <div className="form_set">
                                    <Box>
                                        {/*<div style={{display:"flex", justifyContent:"space-between"}}>
										<TextField
											value={searched}
											onChange={(searchVal) =>
												requestSearch(searchVal.target.value)
											}
											placeholder="Tìm kiếm"
											sx={{ marginBottom: "5px", paddingRight: "700px" }}
										/>
										<div>
										<span>Chọn trò chơi </span>
										<select
											onChange={handleChangeTable}
											value={table}
											id="table"
										>
											<option value="">Tất cả</option>
											<option value="1 phút">Keno 1p</option>
											<option value="3 phút">Keno 3p</option>
											<option value="5 phút">Keno 5p</option>
											<option value="Xúc sắc 3p">Xúc sắc 3p</option>
											<option value="Xúc sắc 5p">Xúc sắc 5p</option>
											<option value="Xổ số 3p">Xổ số 3p</option>
											<option value="Xổ số 5p">Xổ số 5p</option>
											<option value="XSMB">XSMB</option>
											<option value="XSMN">XSMN</option>
											<option value="XSMT">XSMT</option>
										</select>
										</div>
										</div>*/}
                                        <Table sx={{ width: 1200 }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ padding: "10px" }}>Số kỳ</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>User</TableCell>
                                                    {/*<TableCell sx={{padding:"10px"}}>ID User</TableCell>*/}
                                                    <TableCell sx={{ padding: "10px" }}>Trò chơi</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Người chơi đặt</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Kết quả</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Tài/Xỉu</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Chẵn/Lẻ</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Số tiền cược</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Số tiền thắng</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Trạng thái</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Thời gian</TableCell>
                                                    <TableCell sx={{ padding: "10px" }}>Sửa</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {data != null ? (
                                                <TableBody>
                                                    {data?.slice((pages - 1) * 30, (pages - 1) * 30 + 30).map((item) => (
                                                        <>
                                                            {item?.sanh.indexOf("Tài xỉu") != -1 ? (
                                                                <>
                                                                    <TableRow>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {item?.id_bet?.id_bet ? item?.id_bet?.id_bet : item?.id_bet}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {item?.user.username}
                                                                        </TableCell>
                                                                        {/*<TableCell sx={{ fontWeight: "600", padding: "10px" }}>
																				{item?.user.iduser}
																				</TableCell>*/}
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {item?.sanh === "3 phút"
                                                                                ? "Keno 3p"
                                                                                : item?.sanh === "5 phút"
                                                                                ? "Keno 5p"
                                                                                : item?.sanh === "1 phút"
                                                                                ? "Keno 1p"
                                                                                : item?.sanh}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {GetNameChoose(item?.state, item?.type, item?.sanh)}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {item?.id_bet ? item?.id_bet.result : ""}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {item?.id_bet && (
                                                                                <>
                                                                                    {item?.id_bet.result
                                                                                        .split(" ")
                                                                                        .map(Number)
                                                                                        .reduce((acc, curr) => acc + curr, 0) > 10 ? (
                                                                                        <span className="t-blue">Tài</span>
                                                                                    ) : (
                                                                                        <span className="t-green">Xỉu</span>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {item?.id_bet && (
                                                                                <>
                                                                                    {item?.id_bet.result
                                                                                        .split(" ")
                                                                                        .map(Number)
                                                                                        .reduce((acc, curr) => acc + curr, 0) %
                                                                                        2 ==
                                                                                    0 ? (
                                                                                        <span className="t-blue">Chẵn</span>
                                                                                    ) : (
                                                                                        <span className="t-green">Lẻ</span>
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {" "}
                                                                            {item?.money.toLocaleString()}
                                                                        </TableCell>
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {" "}
                                                                            {item?.moneythang.toLocaleString()}
                                                                        </TableCell>
                                                                        {item?.status_bet === "Win" ? (
                                                                            <TableCell
                                                                                sx={{
                                                                                    fontWeight: "600",
                                                                                    padding: "10px"
                                                                                }}>
                                                                                <Button color="success">{item?.status_bet}</Button>
                                                                            </TableCell>
                                                                        ) : null}
                                                                        {item?.status_bet === "Lose" ? (
                                                                            <TableCell
                                                                                sx={{
                                                                                    fontWeight: "600",
                                                                                    padding: "10px"
                                                                                }}>
                                                                                <Button color="error">{item?.status_bet}</Button>
                                                                            </TableCell>
                                                                        ) : null}
                                                                        {item?.status_bet === "Pending" ? (
                                                                            <TableCell
                                                                                sx={{
                                                                                    fontWeight: "600",
                                                                                    padding: "10px"
                                                                                }}>
                                                                                <Button color="warning">{item?.status_bet}</Button>
                                                                            </TableCell>
                                                                        ) : null}
                                                                        <TableCell
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                                padding: "10px"
                                                                            }}>
                                                                            {formatDate(new Date(item?.createdAt))}
                                                                        </TableCell>
                                                                        <TableCell sx={{ padding: "10px" }}>
                                                                            <Button
                                                                                onClick={() => {
                                                                                    setShow(true);
                                                                                    setLs(item);
                                                                                }}>
                                                                                Sửa
                                                                            </Button>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </>
                                                            ) : null}
                                                        </>
                                                    ))}
                                                </TableBody>
                                            ) : (
                                                <div>Đang cập nhật</div>
                                            )}
                                        </Table>
                                    </Box>
                                </div>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        pt: 3
                                    }}>
                                    {data != null ? <Pagination color="primary" count={Math.floor(data.length / 30) + 1} size="small" onChange={handleChange} /> : null}
                                </Box>
                            </Container>
                        </Box>
                    }
                    <ToastContainer />
                    {isShow === true ? (
                        <>
                            <div className="modal">
                                <div className="modaloverlay">
                                    <i className="ti-close closelogin"></i>
                                </div>
                                <div className="modalbody">
                                    <form onSubmit={handleSubmitLs}>
                                        <div className="modalinner">
                                            <div className="modalheader"> Sửa lịch sử </div>

                                            <div className="modalform">
                                                <div className="modalformgroup d-flex" style={{ padding: "9px" }}>
                                                    <div>Người chơi: </div>
                                                    <div>
                                                        <b>{ls.user.username}</b>
                                                    </div>
                                                </div>
                                                <div className="modalformgroup d-flex" style={{ padding: "9px" }}>
                                                    <div>Trò chơi: </div>
                                                    <div>
                                                        <b>{ls.sanh === "3 phút" ? "Keno 3p" : ls.sanh === "5 phút" ? "Keno 5p" : ls.sanh === "1 phút" ? "Keno 1p" : ls.sanh}</b>
                                                    </div>
                                                </div>
                                                <div style={{ padding: "9px" }} className="modalformgroup d-flex">
                                                    <div>Lựa chọn: </div>
                                                    <TextField name="state" defaultValue={ls.state} sx={{ width: "100%" }} type="text" />
                                                </div>
                                                <div style={{ padding: "9px" }} className="modalformgroup d-flex">
                                                    <div>Số tiền cược: </div>
                                                    <TextField name="money" defaultValue={ls.money} sx={{ width: "100%" }} type="number" />
                                                </div>
                                                <div style={{ padding: "9px" }} className="modalformgroup d-flex">
                                                    <div>Số tiền thắng: </div>
                                                    <TextField name="moneythang" defaultValue={ls.moneythang} sx={{ width: "100%" }} type="number" />
                                                </div>
                                                <div style={{ padding: "9px" }} className="modalformgroup d-flex">
                                                    <div>Trạng thái: </div>
                                                    <div>
                                                        <select name="status_bet" value={ls.status_bet} onChange={handleChangeStatus}>
                                                            <option value="Win" selected={ls.status_bet === "Win"} style={{ color: "#14B8A6" }}>
                                                                Win
                                                            </option>
                                                            <option value="Lose" selected={ls.status_bet === "Lose"} style={{ color: "#D14343" }}>
                                                                Lose
                                                            </option>
                                                            <option value="Pending" selected={ls.status_bet === "Pending"} style={{ color: "#FFB020" }}>
                                                                Pending
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item_btn_form">
                                                <div className="modalformcontrols">
                                                    <Button type="submit">XÁC NHẬN</Button>
                                                </div>
                                                <div className="modalformcontrols">
                                                    <Button onClick={() => setShow(false)}>ĐÓNG</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>
                    ) : null}
                </DashboardLayout>
            </ThemeProvider>
        </>
    );
}
export default HistoryBetAll;
