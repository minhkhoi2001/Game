import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Person2Icon from "@mui/icons-material/Person2";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import TuneIcon from '@mui/icons-material/Tune';
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { Users } from "../icons/users";

const items = [
	{
		href: "/customer",
		icon: <ChartBarIcon fontSize="small" />,
		title: "Doanh Thu",
	},
	/*{
	  href: "/admin/notification",
	  icon: <NotificationsActiveIcon fontSize="small" />,
	  title: "Thông báo",
	},*/
	// {
	//   href: "/404",
	//   icon: <XCircleIcon fontSize="small" />,
	//   title: "Error",
	// },
];

export const DashboardSidebarCustomer = (props) => {
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
		defaultMatches: true,
		noSsr: false,
	});
const [open,setOpen]=useState(false)
useEffect(()=>{
  if(props.open==true){
    setOpen(true)
  }else{
    setOpen(false)
  }
},[props.open])
const sendData = () => {
  props.callback(false);

}
	const content = (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
				}}
				className="admin-theme"
			>
				<div>
					<Box sx={{ p: 3 }}>
						<Link
							to="/"
							style={{
								textDecoration: "none",
								alignItems: "center",
								display: "flex",
							}}
						>
							<Logo
								sx={{
									height: 42,
									width: 42,
								}}
							/>
							<div
								style={{
									paddingLeft: "20px",
									fontWeight: 700,
									color: "gray",
									fontSize: "30px",
								}}
							>
								ADMIN
							</div>
						</Link>
					</Box>
					<Box sx={{ px: 2 }}></Box>
				</div>
				<Divider
					sx={{
						borderColor: "#2D3748",
						my: 3,
					}}
				/>
				<Box sx={{ flexGrow: 1 }}>
					{items.map((item) => (
						<NavItem
							key={item.title}
							icon={item.icon}
							to={item.href}
							title={item.title}
						/>
					))}
				</Box>
				<Divider sx={{ borderColor: "#2D3748" }} />
				<Box
					sx={{
						px: 2,
						py: 3,
					}}
				></Box>
			</Box>
		</>
	);

	if (lgUp) {
		return (
			<Drawer
				anchor="left"
				open={open}

				PaperProps={{
					sx: {
						backgroundColor: "neutral.900",
						color: "#FFFFFF",
						width: 280,
					},
				}}
				variant="permanent"
			>
				{content}
			</Drawer>
		);
	}
	return (
		<Drawer
			anchor="left"
      onClose={sendData}
			open={open}
			PaperProps={{
				sx: {
					backgroundColor: "neutral.900",
					color: "#FFFFFF",
					width: 280,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary"
		>
			{content}
		</Drawer>
	);
};

// DashboardSidebar.propTypes = {
// 	onClose: PropTypes.func,
// 	open: PropTypes.bool,
// };
