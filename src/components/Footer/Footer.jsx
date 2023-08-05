import "./footer.css";
//import axios from "axios";
//import { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from "react-router-dom";
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import RedeemIcon from '@mui/icons-material/Redeem';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ForumIcon from '@mui/icons-material/Forum';
function Footer(props) {
	var profile = props.profile
	const location = useLocation()
	const data = [
		{
			icon: <RedeemOutlinedIcon />,
			iconactive: <RedeemIcon/>,
			title: "Khuyến mãi",
			to: "/notification",
		},
		/*{
			icon: <AddBusinessOutlinedIcon />,
			iconactive: <AddBusinessIcon/>,
			title: "Nạp tiền",
			to: "/recharge",
		},*/
		{
			icon: <ForumOutlinedIcon />,
			iconactive: <ForumIcon/>,
			title: "Phòng chat",
			to: "/chat",
		},
		{
			icon: <HomeOutlinedIcon />,
			iconactive: <HomeOutlinedIcon />,
			title: "Trang chủ",
			to: "/",
		},
		{
			icon: <AccountCircleOutlinedIcon />,
			iconactive: <AccountCircleIcon/>,
			title: "Cá nhân",
			to: "/profile",
		},
		{
			icon: <HeadsetMicOutlinedIcon />,
			iconactive: <HeadsetMicIcon/>,
			title: "CSKH",
			to: "/cskh",
		},

	];

	return (
		<>
			<div className="footer">
				{data.map((item, index) => (
					<div className="footer-item" key={index}>
						<Link style={{ textDecoration: "none" }} to={item.to}>
							<div  className={location.pathname===item.to?"icon_footer active":"icon_footer"}>{location.pathname===item.to?item.iconactive:item.icon}</div>
							{index === 2 && <div className="footer-center-bg"></div>}
							<div className="title_footer">{item.title}</div>
						</Link>
					</div>
				))}
			</div>
		</>
	);
}
export default Footer;
