import Footer from "../../components/Footer/Footer";
import "../user/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MoneySave() {
	const [profile, setProfile] = useState(null);
	const [saving, setSaving] = useState(null);
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
	}, []);
	return (
		<>
			<div className="main">
				<Header profile={profile} />
				<h1 className="title-h1">Két Tiết Kiệm</h1>
				<p className="tongloinhuan">Tổng lợi nhuận: <b>0</b></p>
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
								Tiền trong két <div class="xs_before">0 đ</div>
							</div>
						</div>
						<div className="col-50">
							<div class="info_bet">
								Lãi suất <div class="xs_before">0.1%</div>
							</div>
							<div class="info_bet">
								Thu nhập hàng ngày <div class="xs_before">100.000 đ</div>
							</div>
						</div>
						<div className="col-50">
							<button className="btn-1">Nạp két</button>
						</div>
						<div className="col-50">
							<button className="btn-2">Rút két</button>
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
						<tbody>
							<tr>
								<td>VIP 1</td>
								<td>0.00%</td>
							</tr>
							<tr>
								<td>VIP 2</td>
								<td>0.15%</td>
							</tr>
							<tr>
								<td>VIP 3</td>
								<td>0.20%</td>
							</tr>
							<tr>
								<td>VIP 4</td>
								<td>0.25%</td>
							</tr>
							<tr>
								<td>VIP 5</td>
								<td>0.30%</td>
							</tr>
							<tr>
								<td>VIP 6</td>
								<td>0.35%</td>
							</tr>
							<tr>
								<td>VIP 7</td>
								<td>0.40%</td>
							</tr>
							<tr>
								<td>VIP 8</td>
								<td>0.45%</td>
							</tr>
							<tr>
								<td>VIP 9</td>
								<td>0.50%</td>
							</tr>
							<tr>
								<td>VIP 10</td>
								<td>0.60%</td>
							</tr>
						</tbody>
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
