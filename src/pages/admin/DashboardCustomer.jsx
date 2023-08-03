import { Box, Container, Grid } from "@mui/material";
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
import { useEffect, useState } from "react";

import { theme } from "../../theme";
import { DashboardLayoutCustomer } from "../../components/dashboard-layout-customer";
import { SalesCustomer } from "../../components/dashboard/sale-customer";
import { TrafficByDeviceCustomer } from "../../components/dashboard/traffic-by-device-customer";
import axios from "axios";

function DashboardCustomer() {
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

	useEffect(() => {
		axios
			.get("https://server.vnvip294.com/statistic/getallcustomer")
			.then((res) => setData(res.data.data));
	}, []);
	return (
		<>
			<ThemeProvider theme={theme}>
				<DashboardLayoutCustomer>
					{
						<Box
							component="main"
							sx={{
								flexGrow: 1,
								py: 8,
							}}
						>
							<Container maxWidth={false}>
								<Grid container spacing={3}>
									<Grid item xl={3} lg={3} sm={6} xs={12}>
										{data && <TotalCustomers user={data.thanhvien} />}
									</Grid>
									<Grid item lg={3} sm={6} xl={3} xs={12}>
										{data && <Budget tongnap={data.tongnapngay} />}
									</Grid>
									<Grid item xl={3} lg={3} sm={6} xs={12}>
										{data && <TasksProgress tongrut={data.tongrutngay} />}
									</Grid>
									<Grid item xl={3} lg={3} sm={6} xs={12}>
										{data && (
											<TotalProfit
												tongcuoc={data.tongcuocngay}
												sx={{ height: "100%" }}
											/>
										)}
									</Grid>
									<Grid item lg={8} md={12} xl={9} xs={12}>
										<SalesCustomer />
									</Grid>
									<Grid item lg={4} md={6} xl={3} xs={12}>
										<TrafficByDeviceCustomer sx={{ height: "100%" }} />
									</Grid>
								</Grid>
							</Container>
						</Box>
					}
				</DashboardLayoutCustomer>
			</ThemeProvider>
		</>
	);
}

export default DashboardCustomer;
