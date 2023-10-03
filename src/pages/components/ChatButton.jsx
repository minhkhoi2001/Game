import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatButton.css";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const ChatButton = () => {
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [isButtonVisible, setButtonVisible] = useState(true);
	const [unread, setUnread] = useState(null);
	const togglePopup = () => {
		setPopupVisible(!isPopupVisible);
		setButtonVisible(!isButtonVisible);
	};
	const localdata = localStorage.getItem("currentUser");
	const myId = localdata.substring(0, localdata.indexOf("_"));
	useEffect(() => {
		axios
			.post(`https://chat.best96tx.com/getAllConversations`, { myId })
			.then((res) => {
				const filteredObjects = res.data.listMessage.filter(
					(obj) => obj.unread === "0"
				);
				const count = filteredObjects.length;
				setUnread(count);
			});
		if (localdata) {
			const timer = setInterval(() => {
				axios
					.post(`https://chat.best96tx.com/getAllConversations`, { myId })
					.then((res) => {
						const filteredObjects = res.data.listMessage.filter(
							(obj) => obj.unread === "0"
						);
						const count = filteredObjects.length;
						setUnread(count);
					});
			}, 3000);
		}
	}, []);
	return (
		<>
			{localdata && (
				<>
					<div
						className={`floating-chatbox ${isButtonVisible ? "enter" : ""}`}
						onClick={togglePopup}
					>
						<div>
							<ChatIcon />
						</div>
						{unread ? (
							<div className="new-notification-msg">{unread}</div>
						) : null}
					</div>
					<div className={`chatbox ${isPopupVisible ? "enter" : ""}`}>
						<div className="header-chatbox">
							<span className="title-chatbox">CHAT</span>
							<button onClick={togglePopup}>
								<CloseIcon />
							</button>
						</div>
						<iframe
							src={`https://chat.best96tx.com?data=${localdata}/`}
							allowtransparency="true"
							style={{ width: "100%", height: "100%" }}
						></iframe>
					</div>
				</>
			)}
		</>
	);
};

export default ChatButton;
