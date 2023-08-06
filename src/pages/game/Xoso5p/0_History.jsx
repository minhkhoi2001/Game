import React, { useEffect, useState } from "react";
import { GetNameChoose } from "../../../funcUtils";
import axios from "axios";

const History = ({ isOpen, closePopup, setData }) => {
	const [historyGame, setHistoryGame] = useState(null);
	const [isShow, setShow] = useState(false);
	const [ls, setLs] = useState(null);

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
											{item.sanh == "Xổ số 5p" && item.type ? (
												<div
													className="item_inner"
													onClick={() => {
														setLs(item);
														setShow(true);
													}}
												>
													<div className="item_history">
														<div className="title_item_history">
															<span className="sanh">{item.sanh}</span>
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
															Phiên cược:{" "}
															{item.id_bet.id_bet
																? item.id_bet.id_bet
																: item.id_bet}
														</div>
														<div className="id_history_sanh">
															{GetNameChoose(item.state, item.type, item.sanh)}
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
			{isShow === true && ls.status_bet != "Pending" ? (
				<>
					<div className="modal" style={{ zIndex: "9999999" }}>
						<div className="modaloverlay">
							<i className="ti-close closelogin"></i>
						</div>
						<div className="modalbody">
							<div>
								<div className="modalinner" style={{ padding: "10px 15px" }}>
									<div
										className="modalheader"
										style={{ padding: "10px 0 20px" }}
									>
										Chi tiết cược
									</div>

									{ls.id_bet.id_bet ? (
										<>
											<div className="lsgd-table">
												<div>Trò chơi</div>
												<div>Xổ số 5p</div>
											</div>
											<div className="lsgd-table">
												<div>Phiên</div>
												<div>{ls.id_bet.id_bet}</div>
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
												<div>Tổng đặt</div>
												<div>{Number(ls.money).toLocaleString()} đ</div>
											</div>
											<div className="lsgd-table">
												<div>Tổng thắng</div>
												<div>{Number(ls.moneythang).toLocaleString()} đ</div>
											</div>
											<h3 style={{ fontSize: "0.35rem", margin: "20px 0 0", textAlign: "left", fontWeight: "bold", textDecoration: "underline" }}>
												Kết quả phiên {ls.id_bet.id_bet}
											</h3>
											<table
												id="table-xsmb"
												className="table-result table table-bordered table-striped table-xsmb table-lsgd"
												style={{ fontSize: "0.35rem" }}
											>
												<tbody>
													<tr>
														<th style={{ width: "10%" }}>ĐB</th>
														<td>
															<span
																id="mb_prize_0"
																className="special-prize div-horizontal"
															>
																{ls.id_bet.dacbiet}
															</span>
														</td>
													</tr>
													<tr>
														<th>1</th>
														<td>
															<span
																id="mb_prize_1"
																className="prize1 div-horizontal"
															>
																{ls.id_bet.nhat}
															</span>
														</td>
													</tr>
													<tr>
														<th>2</th>
														<td>
															<span
																id="mb_prize_2"
																className="prize2 div-horizontal"
															>
																{ls.id_bet.hai.split(" ")[0]}
															</span>
															<span
																id="mb_prize_3"
																className="prize2 div-horizontal"
															>
																{ls.id_bet.hai.split(" ")[1]}
															</span>
														</td>
													</tr>
													<tr>
														<th>3</th>
														<td>
															<span
																id="mb_prize_4"
																className="prize3 div-horizontal"
															>
																{ls.id_bet.ba.split(" ")[0]}
															</span>
															<span
																id="mb_prize_5"
																className="prize3 div-horizontal"
															>
																{ls.id_bet.ba.split(" ")[1]}
															</span>
															<span
																id="mb_prize_6"
																className="prize3 div-horizontal"
															>
																{ls.id_bet.ba.split(" ")[2]}
															</span>
															<span
																id="mb_prize_7"
																className="prize3 div-horizontal"
															>
																{ls.id_bet.ba.split(" ")[3]}
															</span>
															<span
																id="mb_prize_8"
																className="prize3 div-horizontal"
															>
																{ls.id_bet.ba.split(" ")[4]}
															</span>
															<span
																id="mb_prize_9"
																className="prize3 div-horizontal"
															>
																{ls.id_bet.ba.split(" ")[5]}
															</span>
														</td>
													</tr>
													<tr>
														<th>4</th>
														<td>
															<span
																id="mb_prize_10"
																className="prize4 div-horizontal"
															>
																{ls.id_bet.tu.split(" ")[0]}
															</span>
															<span
																id="mb_prize_11"
																className="prize4 div-horizontal"
															>
																{ls.id_bet.tu.split(" ")[1]}
															</span>
															<span
																id="mb_prize_12"
																className="prize4 div-horizontal"
															>
																{ls.id_bet.tu.split(" ")[2]}
															</span>
															<span
																id="mb_prize_13"
																className="prize4 div-horizontal"
															>
																{ls.id_bet.tu.split(" ")[3]}
															</span>
														</td>
													</tr>
													<tr>
														<th>5</th>
														<td>
															<span
																id="mb_prize_14"
																className="prize5 div-horizontal"
															>
																{ls.id_bet.nam.split(" ")[0]}
															</span>
															<span
																id="mb_prize_15"
																className="prize5 div-horizontal"
															>
																{ls.id_bet.nam.split(" ")[1]}
															</span>
															<span
																id="mb_prize_16"
																className="prize5 div-horizontal"
															>
																{ls.id_bet.nam.split(" ")[2]}
															</span>
															<span
																id="mb_prize_17"
																className="prize5 div-horizontal"
															>
																{ls.id_bet.nam.split(" ")[3]}
															</span>
															<span
																id="mb_prize_18"
																className="prize5 div-horizontal"
															>
																{ls.id_bet.nam.split(" ")[4]}
															</span>
															<span
																id="mb_prize_19"
																className="prize5 div-horizontal"
															>
																{ls.id_bet.nam.split(" ")[5]}
															</span>
														</td>
													</tr>
													<tr>
														<th>6</th>
														<td>
															<span
																id="mb_prize_20"
																className="prize6 div-horizontal"
															>
																{ls.id_bet.sau.split(" ")[0]}
															</span>
															<span
																id="mb_prize_21"
																className="prize6 div-horizontal"
															>
																{ls.id_bet.sau.split(" ")[1]}
															</span>
															<span
																id="mb_prize_22"
																className="prize6 div-horizontal"
															>
																{ls.id_bet.sau.split(" ")[2]}
															</span>
														</td>
													</tr>
													<tr>
														<th>7</th>
														<td>
															<span
																id="mb_prize_23"
																className="prize7 div-horizontal"
															>
																{ls.id_bet.bay.split(" ")[0]}
															</span>
															<span
																id="mb_prize_24"
																className="prize7 div-horizontal"
															>
																{ls.id_bet.bay.split(" ")[1]}
															</span>
															<span
																id="mb_prize_25"
																className="prize7 div-horizontal"
															>
																{ls.id_bet.bay.split(" ")[2]}
															</span>
															<span
																id="mb_prize_26"
																className="prize7 div-horizontal"
															>
																{ls.id_bet.bay.split(" ")[3]}
															</span>
														</td>
													</tr>
												</tbody>
											</table>
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
