import React, { useState, useRef } from "react";
import "./ChatButton.css";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const ChatButton = () => {
	const [isPopupVisible, setPopupVisible] = useState(false);
	const [isButtonVisible, setButtonVisible] = useState(true);
	const togglePopup = () => {
		setPopupVisible(!isPopupVisible);
		setButtonVisible(!isButtonVisible);
	};
	const localdata = JSON.parse(localStorage.getItem("currentUser"));
	return (
		<>
			{localdata && (
				<>
					<div className={`floating-chatbox ${isButtonVisible ? "enter" : ""}`}
						onClick={togglePopup}
					>
						<div>
							<ChatIcon />
						</div>
					</div>
					<div className={`chatbox ${isPopupVisible ? "enter" : ""}`}>
						<div className="header-chatbox">
							<span className="title-chatbox">CHAT</span>
							<button onClick={togglePopup}>
								<CloseIcon />
							</button>
						</div>
						<iframe
							src={`https://chat.vnvip294.com?data=${encodeURIComponent(
								JSON.stringify(localdata)
							)}`}
							allowTransparency="true"
							style={{ width: "100%", height: "100%" }}
						></iframe>
					</div>
				</>
			)}
		</>
	);
};

export default ChatButton;
