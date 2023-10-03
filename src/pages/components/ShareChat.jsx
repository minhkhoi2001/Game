import "./ChatButton.css";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { GetNameChoose } from "../../funcUtils";

const ShareChat = ({ show, hide, message, updateShare }) => {
	const [listUsers, setListUser] = useState(null);
	const [listGroups, setListGroup] = useState(null);
	useEffect(() => {
		if (show) {
			setInterval(function(){
			axios
				.get(`https://chat.best96tx.com/getlistUser`, {})
				.then((res) => {
					setListUser(res.data.listUser);
				})
				.catch((err) => console.log(err));
			axios
				.get(`https://chat.best96tx.com/getlistGroup`, {})
				.then((res) => {
					setListGroup(res.data.listGroup);
				})
				.catch((err) => console.log(err));
			}, 2000);
		}
	}, [show]);
	function postMessage(group_id) {
		const localdata = localStorage.getItem("currentUser");
		const sender_id = localdata.substring(0, localdata.indexOf("_"));
		axios
			.post(`https://chat.best96tx.com/postMessage`, {
				message,
				sender_id,
				group_id,
			})
			.then((res) => {
				hide();
				swal("Chia sẻ thành công", "", "success");
			})
			.catch((err) => swal("Đã xảy ra lỗi", "Vui lòng thử lại sau", "error"));
	};
	function sendTextMessage(receiver_id) {
		const localdata = localStorage.getItem("currentUser");
		const sender_id = localdata.substring(0, localdata.indexOf("_"));
		axios
			.post(`https://chat.best96tx.com/sendTextMessage`, {
				message,
				sender_id,
				receiver_id,
			})
			.then((res) => {
				hide();
				swal("Chia sẻ thành công", "", "success");
			})
			.catch((err) => swal("Đã xảy ra lỗi", "Vui lòng thử lại sau", "error"));
	};
	return (
		<>
			{show ? (
				<div className="modal" style={{ zIndex: "9999999" }}>
					<div className="modaloverlay"></div>
					<div className="modalbody">
						<div className="modalinner" style={{ padding: "10px 15px" }}>
							<div className="modalheader" style={{ padding: "10px 0 20px" }}>
								Chia sẻ
							</div>
							<h4 className="title-chat-share">Người chơi</h4>
							<ul className="listuserchat">
								{listUsers?.map((item, key) => (
									<li key={key} onClick={() => sendTextMessage(item._id)} data={item._id}>
										<img alt="" src={item.profile} />
										<span>{item.name}</span>
									</li>
								))}
							</ul>
							<h4 className="title-chat-share">Nhóm</h4>
							<ul className="listgroupchat">
								{listGroups?.map((item, key) => (
									<li key={key} onClick={() => postMessage(item._id)} data={item._id}>
										<span className="icon">#</span>
										<span>{item.name}</span>
									</li>
								))}
							</ul>
							<div>
								<div className="modalformcontrols">
									<button
										onClick={hide}
										className="popup-close"
										style={{
											background: "red",
											boxShadow: "none",
											textShadow: "none",
										}}
									>
										ĐÓNG
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default ShareChat;
