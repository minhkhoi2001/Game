import { Box, Container, Grid, Button } from "@mui/material";
import { Budget } from "../../components/dashboard/budget";
import { LatestOrders } from "../../components/dashboard/latest-orders";
import { LatestProducts } from "../../components/dashboard/latest-products";
import { Sales } from "../../components/dashboard/sales";
import { TasksProgress } from "../../components/dashboard/tasks-progress";
import { TotalCustomers } from "../../components/dashboard/total-customers";
import { TotalProfit } from "../../components/dashboard/total-profit";
import { TrafficByDevice } from "../../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../../components/dashboard-layout";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { theme } from "../../theme";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState();
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
    const [employee, setEmployee] = useState();
    const [users, setUsers] = useState(null);
    useEffect(() => {
        axios.get(`https://server.best96tx.com/statistic/getalladmin`).then((res) => setData(res.data.data));
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getall`, {}).then((res) => {
            localStorage.setItem("data", JSON.stringify(res.data.data));
            setUsers(res.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/auth/getEmployee`, {}).then((res) => {
            localStorage.setItem("data1", JSON.stringify(res.data.data));
            setEmployee(res.data.data);
        });
    }, []);
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
    const [isShow, setShow] = useState(false);
    const [content, setContent] = useState(null);
    const [users2, setUsers2] = useState(false);
    const [nap, setNap] = useState(false);
    const [rut, setRut] = useState(false);
    const [cuoc, setCuoc] = useState(false);
    return (
        <>
            <ThemeProvider theme={theme}>
                <DashboardLayout>
                    {
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 8
                            }}>
                            <Container maxWidth={false}>
                                <Grid container spacing={3}>
                                    <Grid item xl={3} lg={6} sm={6} xs={12}>
                                        {data && users && (
                                            <TotalCustomers
                                                user={users.length}
                                                onClick={() => {
                                                    setUsers2(true);
                                                    setShow(true);
                                                }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item lg={6} sm={6} xl={3} xs={12}>
                                        {data && (
                                            <Budget
                                                tongnap={data.tongnapngay}
                                                onClick={() => {
                                                    setNap(true);
                                                    setShow(true);
                                                }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xl={3} lg={6} sm={6} xs={12}>
                                        {data && (
                                            <TasksProgress
                                                tongrut={data.tongrutngay}
                                                onClick={() => {
                                                    setRut(true);
                                                    setShow(true);
                                                }}
                                            />
                                        )}
                                    </Grid>
                                    <Grid item xl={3} lg={6} sm={6} xs={12}>
                                        {data && (
                                            <TotalProfit
                                                tongcuoc={data.tongcuocngay}
                                                sx={{ height: "100%" }}
                                                onClick={() => {
                                                    setCuoc(true);
                                                    setShow(true);
                                                }}
                                            />
                                        )}
                                    </Grid>
                                    {/*<Grid item lg={8} md={12} xl={9} xs={12}>
										<Sales />
									</Grid>
									<Grid item lg={4} md={6} xl={3} xs={12}>
										<TrafficByDevice sx={{ height: "100%" }} />
										</Grid>*/}
                                </Grid>
                            </Container>
                        </Box>
                    }
                </DashboardLayout>
                {isShow === true ? (
                    <>
                        <div className="modal">
                            <div className="modaloverlay">
                                <i className="ti-close closelogin"></i>
                            </div>
                            <div className="modalbody" style={{ maxWidth: "1000px" }}>
                                {users2 && (
                                    <form>
                                        <div className="modalinner">
                                            <div className="modalheader"> THỐNG KÊ THÀNH VIÊN </div>

                                            <div className="modalform">
                                                <table className="bangthongke">
                                                    <thead>
                                                        <tr>
                                                            <td>ID</td>
                                                            <td>Tên đăng nhập</td>
                                                            <td>Số dư</td>
                                                            <td>Ngày tạo</td>
                                                            <td>Giới thiệu bởi</td>
                                                            <td>Chi tiết</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map((item) => (
                                                            <tr>
                                                                <td>{item.iduser}</td>
                                                                <td>{item.username}</td>
                                                                <td>{item.money.toLocaleString()} đ</td>
                                                                <td>{formatDate(new Date(item.createdAt))}</td>
                                                                <td>{employee && employee.find((x) => x.code === item.aff)?.username}</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <Button onClick={() => navigate(`/admin/user/${item._id}`)}>Xem</Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="item_btn_form">
                                                <div className="modalformcontrols">
                                                    <br />
                                                    <Button
                                                        onClick={() => {
                                                            setShow(false);
                                                            setUsers2(false);
                                                        }}>
                                                        ĐÓNG
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {nap && (
                                    <form>
                                        <div className="modalinner">
                                            <div className="modalheader"> THỐNG KÊ NẠP </div>

                                            <div className="modalform">
                                                <table className="bangthongke">
                                                    <thead>
                                                        <tr>
                                                            <td>ID</td>
                                                            <td>Tên đăng nhập</td>
                                                            <td>Số dư</td>
                                                            <td>Tổng nạp</td>
                                                            <td>Chi tiết</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map((item) => (
                                                            <tr>
                                                                <td>{item.iduser}</td>
                                                                <td>{item.username}</td>
                                                                <td>{item.money.toLocaleString()} đ</td>
                                                                <td>{item.tongnap.toLocaleString()} đ</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <Button onClick={() => navigate(`/admin/user/${item._id}`)}>Xem</Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="item_btn_form">
                                                <div className="modalformcontrols">
                                                    <br />
                                                    <Button
                                                        onClick={() => {
                                                            setShow(false);
                                                            setNap(false);
                                                        }}>
                                                        ĐÓNG
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {rut && (
                                    <form>
                                        <div className="modalinner">
                                            <div className="modalheader"> THỐNG KÊ RÚT </div>

                                            <div className="modalform">
                                                <table className="bangthongke">
                                                    <thead>
                                                        <tr>
                                                            <td>ID</td>
                                                            <td>Tên đăng nhập</td>
                                                            <td>Số dư</td>
                                                            <td>Tổng rút</td>
                                                            <td>Chi tiết</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map((item) => (
                                                            <tr>
                                                                <td>{item.iduser}</td>
                                                                <td>{item.username}</td>
                                                                <td>{item.money.toLocaleString()} đ</td>
                                                                <td>
                                                                    {item.tongnap + item.adminadd + item.adminthuong - item.admintru - item.totalbet + item.totalwin - item.money >
                                                                    0
                                                                        ? (
                                                                              item.tongnap +
                                                                              item.adminadd +
                                                                              item.adminthuong -
                                                                              item.admintru -
                                                                              item.totalbet +
                                                                              item.totalwin -
                                                                              item.money
                                                                          ).toLocaleString()
                                                                        : "0"}{" "}
                                                                    đ
                                                                </td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <Button onClick={() => navigate(`/admin/user/${item._id}`)}>Xem</Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="item_btn_form">
                                                <div className="modalformcontrols">
                                                    <br />
                                                    <Button
                                                        onClick={() => {
                                                            setShow(false);
                                                            setRut(false);
                                                        }}>
                                                        ĐÓNG
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {cuoc && (
                                    <form>
                                        <div className="modalinner">
                                            <div className="modalheader"> THỐNG KÊ CƯỢC </div>

                                            <div className="modalform">
                                                <table className="bangthongke">
                                                    <thead>
                                                        <tr>
                                                            <td>ID</td>
                                                            <td>Tên đăng nhập</td>
                                                            <td>Số dư</td>
                                                            <td>Tổng cược</td>
                                                            <td>Tổng thắng</td>
                                                            <td>Chi tiết</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {users.map((item) => (
                                                            <tr>
                                                                <td>{item.iduser}</td>
                                                                <td>{item.username}</td>
                                                                <td>{item.money.toLocaleString()} đ</td>
                                                                <td>{item.totalbet.toLocaleString()} đ</td>
                                                                <td>{item.totalwin.toLocaleString()} đ</td>
                                                                <td style={{ textAlign: "center" }}>
                                                                    <Button onClick={() => navigate(`/admin/user/${item._id}`)}>Xem</Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="item_btn_form">
                                                <div className="modalformcontrols">
                                                    <br />
                                                    <Button
                                                        onClick={() => {
                                                            setShow(false);
                                                            setCuoc(false);
                                                        }}>
                                                        ĐÓNG
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </>
                ) : null}
            </ThemeProvider>
        </>
    );
}

export default Dashboard;
