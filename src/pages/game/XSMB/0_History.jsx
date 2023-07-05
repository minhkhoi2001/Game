import React, { useEffect, useState } from "react";
import { GetNameChoose } from "../../../funcUtils";
import axios from "axios";

const History = ({ isOpen, closePopup }) => {
  const [historyGame, setHistoryGame] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost/history/historyus", {})
        .then((res) => {
          setHistoryGame(res.data.data);
        })
        .catch((err) => {});
    }
  }, [isOpen]);

  function formatDate(m) {
    new Date(m);
    const dateString =
      m.getUTCFullYear() +
      "/" +
      ("0" + (m.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + m.getDate()).slice(-2) +
      "  " +
      ("0" + m.getHours()).slice(-2) +
      ":" +
      ("0" + m.getMinutes()).slice(-2);
    return dateString;
  }
	return (
		<>
			{isOpen && (
				<div className="popup-backdrop">
					<div className="popup-main">
						<div className="popup-header" style={{ background: "#477bff" }}>
							Lịch Sử Tham Gia
						</div>
						<div className="popup-content">
							{historyGame != null ? (
								<div className="content-history award_tb">
									{historyGame?.map((item, key) => (
										<>
											{item.sanh == "XSMB" && item.type ? (
												<div className="item_inner">
													<div className="item_history">
														<div className="title_item_history">
															<span className="sanh"> {item.sanh}</span>
															<span
																className={`type_state ${
																	item.status_bet === "Pending"
																		? "pending"
																		: item.status_bet === "Win"
																		? "win"
																		: "lose"
																}`}
															>
																{item.status_bet}
															</span>
														</div>
														<div className="id_history_sanh">
															Phiên cược: {item.id_bet.id_bet?item.id_bet.id_bet:item.id_bet}
														</div>
														<div className="id_history_sanh">
														{GetNameChoose(item.state,item.type)}
														</div>
													</div>
													<div className="money_history">
														<span className="money">
															{Number(item.money).toLocaleString()}đ
														</span>
														<div className="time_choose">
															{formatDate(new Date(item.createdAt))}
														</div>
													</div>
												</div>
											) : null}
										</>
									))}
								</div>
							) : (
								<div></div>
							)}
						</div>
						<button
							onClick={closePopup}
							className="popup-close"
							style={{
								background: "#477bff",
								boxShadow: "none",
								textShadow: "none",
							}}
						>
							Đóng
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default History;
