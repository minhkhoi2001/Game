import { Doughnut } from "react-chartjs-2";
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Typography,
	useTheme,
} from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useEffect, useState } from "react";
import axios from "axios";

export const TrafficByDevice = (props) => {
	const [dataTable, setData] = useState();
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
		axios.get("https://server.vnvip294.com/statistic/getalladmin").then((res) =>
			setData({
				datasets: [
					{
						data: [
							res.data.data.tongcuocngay,
							res.data.data.tongnapngay,
							res.data.data.tongrutngay,
						],
						backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
						borderWidth: 8,
						borderColor: "#FFFFFF",
						hoverBorderColor: "#FFFFFF",
					},
				],	labels: ["Tổng cược ngày", "Tổng nạp ngày", "Tổng rút ngày"],
			})
		);
	}, []);
	const theme = useTheme();

	const data = {
		datasets: [
			{
				data: [0, 0, 0],
				backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
				borderWidth: 8,
				borderColor: "#FFFFFF",
				hoverBorderColor: "#FFFFFF",
			},
		],
    labels: ["Tổng cược ngày", "Tổng nạp ngày", "Tổng rút ngày"],
	};

	const options = {
		animation: false,
		cutoutPercentage: 80,
		layout: { padding: 0 },
		legend: {
			display: false,
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
			titleFontColor: theme.palette.text.primary,
		},
	};

	const devices = [
		{
			title: "Tổng cược ngày",
			value: 63,
			icon: LaptopMacIcon,
			color: "#3F51B5",
		},
		{
			title: "Tổng nạp ngày",
			value: 15,
			icon: TabletIcon,
			color: "#E53935",
		},
		{
			title: "Tổng rút ngày",
			value: 23,
			icon: PhoneIcon,
			color: "#FB8C00",
		},
	];

	return (
		<Card {...props}>
			<CardHeader title="Tổng tiền giao dịch" />
			<Divider />
			<CardContent>
				<Box
					sx={{
						height: 300,
						position: "relative",
					}}
				>
				{dataTable?	<Doughnut data={dataTable} options={options} />:<Doughnut data={data} options={options} />}
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						pt: 2,
					}}
				>
					{devices.map(({ color, icon: Icon, title, value }) => (
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
					))}
				</Box>
			</CardContent>
		</Card>
	);
};
