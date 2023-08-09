import Footer from "../../components/Footer/Footer";
import "../user/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
function getLV(data, save) {
	switch (data) {
		case 0:
			return save.v1;
		case 2:
			return save.v2;
		case 3:
			return save.v3;
		case 4:
			return save.v4;
		case 5:
			return save.v5;
		case 6:
			return save.v6;
		case 7:
			return save.v7;
		case 8:
			return save.v8;
		case 9:
			return save.v9;
		case 10:
			return save.v10;

		default:
			break;
	}
}
function MoneySave() {
	const [profile, setProfile] = useState(null);
	const [saving, setSaving] = useState(null);
	const [profit, setProfit] = useState(null);
	const navigate = useNavigate();
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
			.get(`https://server.vnvip294.com/auth/getUser`, {})
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => localStorage.removeItem("user"));
		axios.get(`https://server.vnvip294.com/money/get/user`, {}).then((res) => {
			setSaving(res.data.data);
		});
		axios.get(`https://server.vnvip294.com/profit/get`, {}).then((res) => {
			setProfit(res.data.data);
		});
	}, []);
	return (
		<>
			<div className="main">
				<Header profile={profile} />
				<h1 className="title-h1">Két Tiết Kiệm</h1>
				<p className="tongloinhuan">
					Tổng lợi nhuận: <b>0</b>
				</p>
				<div className="record_bet">
					<div className="colum-resultxs">
						<div className="col-50">
							<div class="info_bet">
								Tiền trong ví{" "}
								<div class="xs_before">
									{profile ? Math.floor(profile.money).toLocaleString() : "0"} đ
								</div>
							</div>
							<div class="info_bet">
								Tiền trong két{" "}
								<div class="xs_before">
									{saving
										? Math.floor(saving?.vi?.money).toLocaleString()
										: "0"}{" "}
									đ
								</div>
							</div>
						</div>
						<div className="col-50">
							<div class="info_bet">
								Lãi suất{" "}
								<div class="xs_before">
									{profit && getLV(profile?.level, profit[0])}%
								</div>
							</div>
							<div class="info_bet">
								Thu nhập hàng ngày{" "}
								<div class="xs_before">
									{profit && saving
										? (
												Math.floor(saving?.vi?.money) *
												getLV(profile?.level, profit[0])
										  ).toLocaleString()
										: "0"}{" "}
									đ
								</div>
							</div>
						</div>
						<div className="col-50">
							<button className="btn-1" onClick={()=>navigate('/money/send')}>Nạp két</button>
						</div>
						<div className="col-50">
							<button className="btn-2" onClick={()=>navigate('/money/withdraw')}>Rút két</button>
						</div>
					</div>
				</div>
				<div className="content_profile">
					<table class="banglaisuat">
						<thead>
							<tr>
								<td>Cấp VIP</td>
								<td>Lãi suất theo ngày</td>
							</tr>
						</thead>
						{profit && (
							<tbody>
								<tr>
									<td>VIP 1</td>
									<td>{profit[0].v1}%</td>
								</tr>
								<tr>
									<td>VIP 2</td>
									<td>{profit[0].v2}%</td>
								</tr>
								<tr>
									<td>VIP 3</td>
									<td>{profit[0].v3}%</td>
								</tr>
								<tr>
									<td>VIP 4</td>
									<td>{profit[0].v4}%</td>
								</tr>
								<tr>
									<td>VIP 5</td>
									<td>{profit[0].v5}%</td>
								</tr>
								<tr>
									<td>VIP 6</td>
									<td>{profit[0].v6}%</td>
								</tr>
								<tr>
									<td>VIP 7</td>
									<td>{profit[0].v7}%</td>
								</tr>
								<tr>
									<td>VIP 8</td>
									<td>{profit[0].v8}%</td>
								</tr>
								<tr>
									<td>VIP 9</td>
									<td>{profit[0].v9}%</td>
								</tr>
								<tr>
									<td>VIP 10</td>
									<td>{profit[0].v10}%</td>
								</tr>
							</tbody>
						)}
					</table>
					<div className="text_choose_center huongdan">
						<div className="title" style={{ margin: "0.2rem 0 0.4rem" }}>
							Hướng dẫn
						</div>
						<ul>
							<li>
								1. Chỉ có thể gửi tiền vào két tiết kiệm bằng số dư có thể rút
							</li>
							<li>
								2. Lợi nhuận từ két tiết kiệm sẽ được cộng thằng vào số dư của
								bạn
							</li>
							<li>
								3. Công thức thanh toán thu nhập: tỉ lệ lợi nhuận dựa vào cấp
								vip của bạn
							</li>
							<li>
								4. Chu kỳ thanh toán tiền lãi: Thanh toán vào 4 giờ sáng hàng
								ngày
							</li>
							<li>
								5. Nếu số dư của két lợi nhuận được chuyển ra ngoài trước khi
								thanh toán, việc thanh toán tiền thưởng sẽ không được thực hiện
							</li>
							<li>
								6. Chỉ khi số dư của két tiết kiệm lớn hơn hoặc bằng 1.000.000
								thì mới được tính lãi suất
							</li>
							<li>
								7. Phải mất một khoảng thời gian nhất định để kiếm lợi nhuận .
								Nếu thu nhập không được nhận nhanh chóng hãy kiên nhẫn chờ đợi.
								Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận chăm
								sóc khách hàng
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Footer profile={profile} />
		</>
	);
}
export default MoneySave;
