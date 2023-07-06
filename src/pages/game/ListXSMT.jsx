import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./listxs.css";
function ListXSMT() {
	const date1 = new Date();
	const [date, setDate] = useState(date1.getDay());
	const [data, setData] = useState();
	const handleChange = (e) => {
		setDate(e.target.value);
	};
	useEffect(() => {
		if (date == 0) {
			axios
				.get(
					"https://mu88.live/api/front/open/lottery/recent/list/khho,kotu,thth"
				)
				.then((res) => setData(res.data));
		}
		if (date == 1) {
			axios
				.get("https://mu88.live/api/front/open/lottery/recent/list/phye,thth")
				.then((res) => setData(res.data));
		}
		if (date == 2) {
			axios
				.get("https://mu88.live/api/front/open/lottery/recent/list/dalak,quna")
				.then((res) => setData(res.data));
		}
		if (date == 3) {
			axios
				.get("https://mu88.live/api/front/open/lottery/recent/list/dana,khho")
				.then((res) => setData(res.data));
		}
		if (date == 4) {
			axios
				.get(
					"https://mu88.live/api/front/open/lottery/recent/list/bidi,qubi,qutr"
				)
				.then((res) => setData(res.data));
		}
		if (date == 5) {
			axios
				.get("https://mu88.live/api/front/open/lottery/recent/list/gila,nith")
				.then((res) => setData(res.data));
		}
		if (date == 6) {
			axios
				.get(
					"https://mu88.live/api/front/open/lottery/recent/list/dana,dano,qung"
				)
				.then((res) => setData(res.data));
		}
	}, [date]);
	return (
		<>
			<div className="main">
				<div className="header">
					<div className="header-top">
						<div className="logo">
							<Link to="/">
								<img src={require("../../img/logo-vietlott.png")} alt="Logo" />
							</Link>
						</div>
						<div className="header-right">
							<div style={{ display: "flex", float: "right" }}></div>
						</div>
					</div>
				</div>
				<div className="account">
					<h1 class="title-h1" style={{color:"#fff"}}>Xổ số miền Trung</h1>
					<div className="account__menu">
						<div className="choose_day_xs">
							Chọn ngày xổ{" "}
							<select onChange={handleChange} value={date} id="date">
								<option value="0">Chủ nhật</option>
								<option value="1">Thứ 2</option>
								<option value="2">Thứ 3</option>
								<option value="3">Thứ 4</option>
								<option value="4">Thứ 5</option>
								<option value="5">Thứ 6</option>
								<option value="6">Thứ 7</option>
							</select>
						</div>
					</div>
					<div className="list-xs">
						{data
							? data?.rows?.map((item) => (
									<>
										<Link to={`/xsmt/lo/${item.code}`}>
											<div className="item-xs">
												<div>{item.name}</div>
												{/*<span>Ngày xổ: {item.issueList[0].turnNum}</span>*/}
												<div>Ngày xổ: {item.turnNum}</div>
												<img src={`https://www.666mu88.com/static/img/gameicons/cp/${item.code}.png`}/>
											</div>
										</Link>
									</>
							  ))
							: null}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
export default ListXSMT;
