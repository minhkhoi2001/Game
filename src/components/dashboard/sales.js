import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export const Sales = (props) => {
	const theme = useTheme();
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
		axios.get("https://d3s.vnvip294.com/statistic/getalladmin").then((res) =>
			setData({
				datasets: [
					{
						backgroundColor: "#3F51B5",
						barPercentage: 0.5,
						barThickness: 12,
						borderRadius: 4,
						categoryPercentage: 0.5,
						data: [
							res.data.data.motphut.tongcuoc,
							res.data.data.baphut.tongcuoc,
							res.data.data.namphut.tongcuoc,
							res.data.data.xoso.tongcuoc,
						],
						label: "Tổng cược",
						maxBarThickness: 10,
					},
					{
						backgroundColor: "#EEEEEE",
						barPercentage: 0.5,
						barThickness: 12,
						borderRadius: 4,
						categoryPercentage: 0.5,
            data: [
							res.data.data.motphut.tongthang,
							res.data.data.baphut.tongthang,
							res.data.data.namphut.tongthang,
							res.data.data.xoso.tongthang,
						],
						label: "Thắng",
						maxBarThickness: 10,
					},
				],
				labels: ["Keno 1p", "Keno 3p", "Keno 5p", "Xổ số"],
			})
		);
	}, []);
	const dataDefault = {
		datasets: [
			{
				backgroundColor: "#3F51B5",
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				data: [0, 0, 0, 0],
				label: "Tổng cược",
				maxBarThickness: 10,
			},
			{
				backgroundColor: "#EEEEEE",
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				data: [0, 0, 0, 0],
				label: "Thắng",
				maxBarThickness: 10,
			},
		],
		labels: ["Keno 1p", "Keno 3p", "Keno 5p", "Xổ số"],
	};
	useEffect(() => {
		if(load==true){
			axios
			.get(
				`https://d3s.vnvip294.com/statistic/getbydayadmin?dateStart=${startDate}&endDate=${endDate}`
			)
			.then((res) =>
			setData({
				datasets: [
					{
						backgroundColor: "#3F51B5",
						barPercentage: 0.5,
						barThickness: 12,
						borderRadius: 4,
						categoryPercentage: 0.5,
						data: [
							res.data.data.motphut.tongcuoc,
							res.data.data.baphut.tongcuoc,
							res.data.data.namphut.tongcuoc,
							res.data.data.xoso.tongcuoc,
						],
						label: "Tổng cược",
						maxBarThickness: 10,
					},
					{
						backgroundColor: "#EEEEEE",
						barPercentage: 0.5,
						barThickness: 12,
						borderRadius: 4,
						categoryPercentage: 0.5,
						data: [
							res.data.data.motphut.tongthang,
							res.data.data.baphut.tongthang,
							res.data.data.namphut.tongthang,
							res.data.data.xoso.tongthang,
						],
						label: "Thắng",
						maxBarThickness: 10,
					},
				],
				labels: ["Keno 1p", "Keno 3p", "Keno 5p", "Xổ số"],
			})
			);
		}
	}, [endDate, startDate, load]);
	const options = {
		animation: false,
		cornerRadius: 20,
		layout: { padding: 0 },
		legend: { display: false },
		maintainAspectRatio: false,
		responsive: true,
		xAxes: [
			{
				ticks: {
					fontColor: theme.palette.text.secondary,
				},
				gridLines: {
					display: false,
					drawBorder: false,
				},
			},
		],
		yAxes: [
			{
				ticks: {
					fontColor: theme.palette.text.secondary,
					beginAtZero: true,
					min: 0,
				},
				gridLines: {
					borderDash: [2],
					borderDashOffset: [2],
					color: theme.palette.divider,
					drawBorder: false,
					zeroLineBorderDash: [2],
					zeroLineBorderDashOffset: [2],
					zeroLineColor: theme.palette.divider,
				},
			},
		],
		tooltips: {
			backgroundColor: theme.palette.background.paper,
			bodyFontColor: theme.palette.text.secondary,
			borderColor: theme.palette.divider,
			borderWidth: 1,
			enabled: true,
			footerFontColor: theme.palette.text.secondary,
			intersect: false,
			mode: "index",
			titleFontColor: theme.palette.text.primary,
		},
	};

	return (
		<Card {...props}>
			<CardHeader
				title="Thống kê đặt cược"
			/>
			<Divider />
			<CardContent>
				<Box
					sx={{
						height: 400,
						position: "relative",
					}}
				>
					{dataTable ? (
						<Bar data={dataTable} options={options} />
					) : (
						<Bar data={dataDefault} options={options} />
					)}
				</Box>
			</CardContent>
			<Divider />
			<Box>
					<div className="col-1-1">
						Từ ngày
						<DatePicker
							maxDate={new Date()}
							selected={startDate}
							onChange={(date) => {
								setStartDate(date);
								setLoad(true);
							}}
						/>
					</div>
					<div className="col-1-1">
						Đến ngày
						<DatePicker
							maxDate={new Date()}
							selected={endDate}
							onChange={(date) => {
								setEndDate(date);
								setLoad(true);
							}}
						/>
					</div>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					p: 2,
				}}
				style={{width:"100%", padding: "15px 0 0"}}
			>
				<Button
					className="button-admin"
					color="primary"
					endIcon={<ArrowRightIcon fontSize="small" />}
					size="small"
					onClick={()=>{
						axios.get("https://d3s.vnvip294.com/statistic/getalladmin").then((res) =>
						setData({
							datasets: [
								{
									backgroundColor: "#3F51B5",
									barPercentage: 0.5,
									barThickness: 12,
									borderRadius: 4,
									categoryPercentage: 0.5,
									data: [
										res.data.data.motphut.tongcuoc,
										res.data.data.baphut.tongcuoc,
										res.data.data.namphut.tongcuoc,
										res.data.data.xoso.tongcuoc,
									],
									label: "Tổng cược",
									maxBarThickness: 10,
								},
								{
									backgroundColor: "#EEEEEE",
									barPercentage: 0.5,
									barThickness: 12,
									borderRadius: 4,
									categoryPercentage: 0.5,
						data: [
										res.data.data.motphut.tongthang,
										res.data.data.baphut.tongthang,
										res.data.data.namphut.tongthang,
										res.data.data.xoso.tongthang,
									],
									label: "Thắng",
									maxBarThickness: 10,
								},
							],
							labels: ["Keno 1p", "Keno 3p", "Keno 5p", "Xổ số"],
						})
					);
					}}
				>
					Xem tất cả thời gian
				</Button>
			</Box>
		</Card>
	);
};
