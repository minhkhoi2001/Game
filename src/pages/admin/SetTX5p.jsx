import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { GetNameChoose } from "../../funcUtils";

function SetTX5p() {
    const [isVisible, setVisible] = useState(null);
    const [list30, setList30] = useState();
    const [bet, setBet] = useState(null);
    const [profile, setProfile] = useState(null);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(5);
    const [start, setStart] = useState(false);
    const [dulieunhap, setDulieunhap] = useState(new Date());
    const [update, setUpdate] = useState(0);
    const [current, setCurrent] = useState(null);
    const [total, setTotal] = useState(null);
    const [setting, setSetting] = useState(null);
    const date = new Date();
    const currentMinute = date.getMinutes();
    const currentSecond = date.getSeconds();
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
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
            setProfile(res.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/setting/get`, {}).then((res) => {
            setSetting(res.data.data[0]);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/taixiu5/getadmin`).then((res) => {
            setBet(res.data.data[0]);
            setDulieunhap(new Date(res.data.data[0].createdAt));
            setStart(true);
        });
        axios
            .get(`${process.env.REACT_APP_API_URL}/taixiu5/getallbet`, {})
            .then((res) => {
                setTotal(res.data.data);
            })
            .catch(() => setTotal(null));
        axios
            .get(`${process.env.REACT_APP_API_URL}/taixiu5/list30bet`, {})
            .then((res) => {
                setList30(res.data.data);
            })
            .catch(() => setList30(null));
        /*axios.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {}).then((res) => {
			setVisible({
				money: res.data.data[0].money.toLocaleString(),
				id: res.data.data[0]._id,
			});
		});*/
        axios.get(`${process.env.REACT_APP_API_URL}/taixiu5/getcurrent`).then((res) => {
            setCurrent(res.data.data);
        });
    }, []);
    useEffect(() => {
        const timer = setInterval(() => {
            if (Math.floor(300 - (new Date() - dulieunhap) / 1000) < 0) {
                axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {}).then((res) => {
                    setProfile(res.data.data);
                });
                axios.get(`${process.env.REACT_APP_API_URL}/taixiu5/getadmin`).then((res) => {
                    setBet(res.data.data[0]);
                    setDulieunhap(new Date(res.data.data[0].createdAt));
                });
                axios
                    .get(`${process.env.REACT_APP_API_URL}/taixiu5/getallbet`, {})
                    .then((res) => {
                        setTotal(res.data.data);
                    })
                    .catch(() => setTotal(null));
                axios
                    .get(`${process.env.REACT_APP_API_URL}/taixiu5/list30bet`, {})
                    .then((res) => {
                        setList30(res.data.data);
                    })
                    .catch(() => setList30(null));
                axios.get(`${process.env.REACT_APP_API_URL}/notification/getnotifi`, {}).then((res) => {
                    setVisible({
                        money: res.data.data[0].money.toLocaleString(),
                        id: res.data.data[0]._id
                    });
                });
                axios.get(`${process.env.REACT_APP_API_URL}/taixiu5/getcurrent`).then((res) => {
                    setCurrent(res.data.data);
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
            // handle your actions here
            switch (result) {
                case "submit":
                    // clear everything here!!
                    axios.post("https://server.best96tx.com/notification/seen", {
                        id: data.id
                    });
                    break;
                default:
            }
            // always hide
            setVisible(false);
        };
        if (isVisible) {
            showAlert(isVisible);
        }
    }, [isVisible]);
    useEffect(() => {
        let curTime_second = Math.floor(300 - (date - dulieunhap) / 1000);
        let myTimeout;

        if (currentMinute === dulieunhap.getMinutes() && currentSecond === dulieunhap.getSeconds()) {
            setStart(true);
            setSecond(second - 1);
            return () => {
                clearTimeout(myTimeout);
            };
        } else if (curTime_second < 300 && curTime_second >= 0) {
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
        let curTime_second = Math.floor(300 - (date - dulieunhap) / 1000);
        let myTimeout = 0;
        if (start) {
            setSecond(curTime_second % 60);
            setMinute(Math.floor(curTime_second / 60));
            if (curTime_second > 300 || curTime_second <= 0) {
                setStart(false);
                setMinute(5);
                setSecond(0);
                return () => {
                    clearTimeout(myTimeout);
                };
            }
            myTimeout = setTimeout(() => {
                setSecond(second - 1);
                axios
                    .get(`${process.env.REACT_APP_API_URL}/taixiu5/getcurrent`)
                    .then((res) => {
                        setCurrent(res.data.data);
                    })
                    .catch(() => setCurrent(null));
            }, 1000);
        }
        return () => {
            clearTimeout(myTimeout);
        };
    }, [second, start, dulieunhap]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id_bet: bet._id,
            result: String(e.target.bet.value).split("").join(" ")
        };
        if (e.target.bet.value) {
            axios
                .post("https://server.best96tx.com/taixiu5/update", formData)
                .then((res) => {
                    setBet(res.data.data);
                    swal("Thành công", "Update thành công", "success");
                })
                .catch((res) => swal("Lỗi", "Update không thành công", "error"));
        }
    };
    function thongke(num) {
        if (current) {
            const countTable = {};
            for (let i = 1; i <= 9; i++) {
                countTable[i] = { count: 0, totalMoney: 0 };
            }
            current.forEach((item) => {
                const money = item.money;
                const states = item.state.split(" ").map(Number);
                const length = states.length;

                states.forEach((state) => {
                    if (state >= 1 && state <= 9) {
                        countTable[state].count++;
                        countTable[state].totalMoney += money / length;
                    }
                });
            });
            /*for (let i = 1; i <= 9; i++) {
				console.log(`Số ${i}: Số lần xuất hiện - ${countTable[i].count}, Tổng tiền - ${countTable[i].totalMoney}`);
			}*/
            return Number(countTable[num].totalMoney).toLocaleString();
        } else {
            return 0;
        }
    }
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
                                <div className="container_set">Set kèo</div>

                                <div className="cycle_bet">
                                    {bet ? (
                                        <span style={{ color: "black" }} className="info_bet">
                                            Phiên {bet.id_bet}
                                        </span>
                                    ) : (
                                        <span>Đang chờ dữ liệu</span>
                                    )}
                                    <div style={{ color: "black" }} className="count">
                                        0{minute} : {second < 10 ? "0" : ""}
                                        {second}
                                    </div>
                                </div>
                                <div className="form_set"></div>
                                <div class="current_bet">
                                    <div class="current_bet_head">
                                        <div>Tài</div>
                                        <div>Xỉu</div>
                                        <div>Lẻ</div>
                                        <div>Chẵn</div>
                                    </div>
                                    <div class="current_bet_body">
                                        <div>{thongke(1)}</div>
                                        <div>{thongke(2)}</div>
                                        <div>{thongke(3)}</div>
                                        <div>{thongke(4)}</div>
                                    </div>
                                </div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ padding: "10px" }}>ID User</TableCell>
                                            <TableCell sx={{ padding: "10px" }}>Username</TableCell>
                                            <TableCell sx={{ padding: "10px" }}>Chọn</TableCell>
                                            <TableCell sx={{ padding: "10px" }}>Số tiền</TableCell>
                                            <TableCell sx={{ padding: "10px" }}>Thời gian đặt</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {current
                                            ? current.map((item) => (
                                                  <>
                                                      <TableRow>
                                                          <TableCell sx={{ padding: "10px" }}>{item.user.iduser}</TableCell>
                                                          <TableCell sx={{ padding: "10px" }}>{item.user.username}</TableCell>
                                                          <TableCell sx={{ padding: "10px" }}>{GetNameChoose(item.state, null, item.sanh)}</TableCell>
                                                          <TableCell sx={{ padding: "10px" }}>{item.money.toLocaleString()}</TableCell>
                                                          <TableCell sx={{ padding: "10px" }}>{formatDate(new Date(item.createdAt))}</TableCell>
                                                      </TableRow>
                                                  </>
                                              ))
                                            : null}
                                    </TableBody>
                                </Table>
                                <form onSubmit={handleSubmit}>
                                    <div style={{ color: "black" }} className="result_admin_choose">
                                        Kết quả kèo hiện tại là{" "}
                                        {bet ? (
                                            <div style={{ fontWeight: "600", color: "black" }} className="title_result">
                                                {bet.result}
                                            </div>
                                        ) : (
                                            <div>Đang update dữ liệu</div>
                                        )}
                                    </div>
                                    <h2>Sửa kết quả</h2>
                                    <input min="111" max="666" type="number" name="bet" id="bet" />
                                    <button type="submit" className="btn-submit btn-admin-1" style={{ display: "inline-block", margin: "0 0 0 10px" }}>
                                        Xác nhận
                                    </button>
                                    <button
                                        style={{ display: "inline-block", margin: "0 0 0 10px" }}
                                        className="btn-submit btn-admin-2"
                                        onClick={() => {
                                            window.location.reload(true);
                                        }}>
                                        Làm mới
                                    </button>
                                </form>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ padding: "10px" }}>Phiên</TableCell>
                                            <TableCell sx={{ padding: "10px" }}>Kết quả</TableCell>
                                            <TableCell sx={{ padding: "10px" }}>Cập nhật</TableCell>
                                            <TableCell style={{ textAlign: "center" }}>Thời gian diễn ra</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {list30
                                            ? list30.map((item) => (
                                                  <>
                                                      <TableRow>
                                                          <TableCell sx={{ padding: "10px" }}>{item?.id_bet}</TableCell>
                                                          <TableCell sx={{ padding: "10px" }}>{item.result}</TableCell>
                                                          <TableCell sx={{ padding: "10px" }}>
                                                              <form
                                                                  onSubmit={(e) => {
                                                                      e.preventDefault();
                                                                      const formData = {
                                                                          id_bet: item._id,
                                                                          result: String(e.target.result.value).split("").join(" ")
                                                                      };
                                                                      if (e.target.result.value) {
                                                                          axios
                                                                              .post("https://server.best96tx.com/taixiu5/update", formData)
                                                                              .then((res) => {
                                                                                  window.location.reload();
                                                                                  swal("Thành công", "Update thành công", "success");
                                                                              })
                                                                              .catch((res) => swal("Lỗi", "Update không thành công", "error"));
                                                                      }
                                                                  }}>
                                                                  <input name="result" type="number" min={10000} max={99999} />
                                                                  <button className="btn-admin-3">Xác nhận</button>
                                                              </form>
                                                          </TableCell>
                                                          <TableCell style={{ textAlign: "center" }}>{formatDate(new Date(item.createdAt))}</TableCell>
                                                      </TableRow>
                                                  </>
                                              ))
                                            : null}
                                    </TableBody>
                                </Table>
                            </Container>
                        </Box>
                    }

                    <ToastContainer />
                </DashboardLayout>
            </ThemeProvider>
        </>
    );
}
export default SetTX5p;
