import React, { useEffect, useState } from "react";
import { GetNameChoose } from "../../../funcUtils";
import axios from "axios";

const History = ({ isOpen, closePopup }) => {
  const [historyGame, setHistoryGame] = useState(null);
  const [isShow, setShow] = useState(false);
  const [ls, setLs] = useState(null);
  useEffect(() => {
    if (isOpen) {
      axios
        .get("https://server.best96tx.com/history/historyus", {})
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
  const XSMT = ["Đà Nẵng", "Thừa T. Huế", "Quảng Trị", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Ninh Thuận", "Kon Tum", "Khánh Hòa", "Gia Lai", "Bình Định", "Đắk Lắk", "Đắk Nông"];
	
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
											{XSMT.includes(item.sanh) ? (
												<div className="item_inner" onClick={() => {
													setLs(item);
													setShow(true);
												}}>
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
															Phiên cược: {item?.id_bet?.id_bet?item?.id_bet?.id_bet:item?.id_bet}
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
			{isShow === true && ls.status_bet !== "Pending" ? (
				<>
					<div className="modal" style={{ zIndex: "9999999" }}>
						<div className="modaloverlay"></div>
						<div className="modalbody">
							<div>
								<div className="modalinner" style={{ padding: "10px 15px" }}>
									<div
										className="modalheader"
										style={{ padding: "10px 0 20px" }}
									>
										Chi tiết cược
									</div>

									{ls.id_bet ? (
										<>
											<div className="lsgd-table">
												<div>Trò chơi</div>
												<div>{ls.sanh}</div>
											</div>
											<div className="lsgd-table">
												<div>Phiên</div>
												<div>{ls.id_bet}</div>
											</div>
											<div className="lsgd-table">
												<div>Thời gian</div>
												<div>{formatDate(new Date(ls.createdAt))}</div>
											</div>
											<div className="lsgd-table">
												<div>Đặt cược</div>
												<div>{GetNameChoose(ls.state, ls.type, ls.sanh)}</div>
											</div>
											<div className="lsgd-table">
												<div>Tổng Cược</div>
												<div>{Number(ls.money).toLocaleString()} đ</div>
											</div>
											<div className="lsgd-table">
												<div>Tổng thắng</div>
												<div>{Number(ls.moneythang).toLocaleString()} đ</div>
											</div>
										</>
									) : null}
									<div>
										<div className="modalformcontrols">
											<button
												onClick={() => setShow(false)}
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
					</div>
				</>
			) : null}
		</>
	);
};

export default History;
