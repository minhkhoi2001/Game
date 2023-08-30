import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Person2Icon from "@mui/icons-material/Person2";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { Users } from "../icons/users";

const items = [
	{
		href: "/admin",
		icon: <ChartBarIcon fontSize="small" />,
		title: "Thống kê",
	},
	{
		href: "/admin/users",
		icon: <Person2Icon fontSize="small" />,
		title: "Người chơi",
	},
	{
		href: "/admin/allNV",
		icon: <Person2Icon fontSize="small" />,
		title: "Quản lý nhân viên",
	},
	/*{
		href: "/admin/set1",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Keno 1p ",
	},
	{
		href: "/admin/set3",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Keno 3p ",
	},
	
	{
		href: "/admin/set5",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Keno 5p ",
	},
	{
		href: "/admin/xoso3",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Xổ Số 3p ",
	},
	{
		href: "/admin/xoso5",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Xổ Số 5p ",
	},
	{
		href: "/admin/setxs3",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Xúc sắc 3p ",
	},
	{
		href: "/admin/setxs5",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Xúc sắc 5p ",
	},*/
	{
		href: "/admin/settx1",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Tài xỉu 1p ",
	},
	{
		href: "/admin/settx3",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Tài xỉu 3p",
	},
	{
		href: "/admin/settx5",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Tài xỉu 5p",
	},
	{
		href: "/admin/setxd3",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Xóc đĩa 3p",
	},
	{
		href: "/admin/setxd5",
		icon: <SportsEsportsIcon fontSize="small" />,
		title: "Set Kèo Xóc đĩa 5p",
	},
	{
		href: "/admin/request",
		icon: <AutorenewIcon fontSize="small" />,
		title: "Yêu cầu rút tiền",
	},
	{
		href: "/admin/add",
		icon: <AutorenewIcon fontSize="small" />,
		title: "Yêu cầu nạp tiền",
	},
	{
		href: "/admin/history",
		icon: <AutorenewIcon fontSize="small" />,
		title: "Lịch sử trò chơi",
	},
	{
		href: "/admin/setting",
		icon: <TuneIcon fontSize="small" />,
		title: "Cài đặt trả thưởng",
	},
	{
		href: "/admin/setting/profit",
		icon: <TuneIcon fontSize="small" />,
		title: "Cài đặt lãi suất",
	},
	{
		href: "/admin/setting/money",
		icon: <TuneIcon fontSize="small" />,
		title: "Cài đặt hoa hồng",
	},
	{
		href: "/admin/employee",
		icon: <Users fontSize="small" />,
		title: "Thêm mới nhân viên",
	},
	{
	  href: "/admin/bank",
	  icon: <AccountBalanceIcon fontSize="small" />,
	  title: "Tài khoản ngân hàng",
	},
	{
	  href: "/admin/settingnotify",
	  icon: <NotificationsActiveIcon fontSize="small" />,
	  title: "Cài đặt thông báo",
	},
	// {
	//   href: "/404",
	//   icon: <XCircleIcon fontSize="small" />,
	//   title: "Error",
	// },
];

export const DashboardSidebar = (props) => {
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
						width: 250,
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
					width: 250,
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
