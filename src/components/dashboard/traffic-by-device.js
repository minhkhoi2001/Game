import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Button, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "react-datepicker/dist/react-datepicker.css";
export const TrafficByDevice = (props) => {
    const [dataTable, setData] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [load, setLoad] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
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
        axios.get(`https://server.best96tx.com/statistic/getalladmin`).then((res) =>
            setData({
                datasets: [
                    {
                        data: [res.data.data.tongcuocngay, res.data.data.tongnapngay, res.data.data.tongrutngay],
                        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
                        borderWidth: 8,
                        borderColor: "#FFFFFF",
                        hoverBorderColor: "#FFFFFF"
                    }
                ],
                labels: ["Tổng cược ngày", "Tổng nạp ngày", "Tổng rút ngày"]
            })
        );
    }, []);
    useEffect(() => {
        if (load == true) {
            axios.get(`${process.env.REACT_APP_API_URL}/statistic/getbydayadmin?dateStart=${startDate}&endDate=${endDate}`).then((res) =>
                setData({
                    datasets: [
                        {
                            data: [res.data.data.tongcuocngay, res.data.data.tongnapngay, res.data.data.tongrutngay],
                            backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
                            borderWidth: 8,
                            borderColor: "#FFFFFF",
                            hoverBorderColor: "#FFFFFF"
                        }
                    ],
                    labels: ["Tổng cược ngày", "Tổng nạp ngày", "Tổng rút ngày"]
                })
            );
        }
    }, [endDate, startDate, load]);
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
                borderWidth: 8,
                borderColor: "#FFFFFF",
                hoverBorderColor: "#FFFFFF"
            }
        ],
        labels: ["Tổng cược ngày", "Tổng nạp ngày", "Tổng rút ngày"]
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: "index",
            titleFontColor: theme.palette.text.primary
        }
    };

    const devices = [
        {
            title: "Tổng cược ngày",
            value: 63,
            icon: LaptopMacIcon,
            color: "#3F51B5"
        },
        {
            title: "Tổng nạp ngày",
            value: 15,
            icon: TabletIcon,
            color: "#E53935"
        },
        {
            title: "Tổng rút ngày",
            value: 23,
            icon: PhoneIcon,
            color: "#FB8C00"
        }
    ];

    return (
        <Card {...props}>
            <CardHeader title="Tổng tiền giao dịch" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: "relative"
                    }}>
                    {dataTable ? <Doughnut data={dataTable} options={options} /> : <Doughnut data={data} options={options} />}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 2
                    }}>
                    {/* {devices.map(({ color, icon: Icon, title, value }) => (
						<Box
							key={title}
							sx={{
								p: 1,
								textAlign: "center",
							}}
						>
							<Icon color="action" />
							<Typography color="textPrimary" variant="body1">
								{title}
							</Typography>
							<Typography style={{ color }} variant="h4">
								{value}%
							</Typography>
						</Box>
					))} */}
                    <div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "100px" }}>Từ ngày</div>
                            <DatePicker
                                maxDate={new Date()}
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                    setLoad(true);
                                }}
                            />
                        </div>
                        <br />
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "100px" }}>Đến ngày</div>
                            <DatePicker
                                maxDate={new Date()}
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date);
                                    setLoad(true);
                                }}
                            />
                        </div>
                    </div>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2
                    }}>
                    <Button
                        className="button-admin"
                        color="primary"
                        endIcon={<ArrowRightIcon fontSize="small" />}
                        size="small"
                        onClick={() => {
                            axios.get(`https://server.best96tx.com/statistic/getalladmin`).then((res) =>
                                setData({
                                    datasets: [
                                        {
                                            data: [res.data.data.tongcuocngay, res.data.data.tongnapngay, res.data.data.tongrutngay],
                                            backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
                                            borderWidth: 8,
                                            borderColor: "#FFFFFF",
                                            hoverBorderColor: "#FFFFFF"
                                        }
                                    ],
                                    labels: ["Tổng cược ngày", "Tổng nạp ngày", "Tổng rút ngày"]
                                })
                            );
                        }}>
                        Xem tất cả thời gian
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};
