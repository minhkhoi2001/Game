import { Link, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../../components/Footer/Footer";
function Trend1() {
	const [bet, setBet] = useState(null);

	const [start, setStart] = useState(false);

	const date = new Date();

	const [state, setState] = useState(null);
	const [total, setTotal] = useState(null);
	const [isShow, setShow] = useState(false);
	const {
		watch,
		register,
		handleSubmit,
		setError,
		getValues,
		formState: { errors },
	} = useForm();
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
	const [profile, setProfile]=useState(null)
	useEffect(() => {
		if (start === false) {
			axios.get(`https://server.vnvip294.com/auth/getUser`, {}).then((res) => {
				setProfile(res.data.data);
			});
			axios
				.get(`https://server.vnvip294.com/bet1/getallbet`, {})
				.then((res) => {
					setTotal(res.data.data);
				})
				.catch(() => setTotal(null));
		}
	}, [start]);


	return (
		<>
			<div className="app1">
				<div className="info_profile">
					<div className="cycle_bet">
						<span className="info_bet">Xu hướng kỷ lục</span>
					</div>
				</div>
				<div className="record_bet">
					<div className="border_wallet"></div>
					<div
						style={{ marginTop: "5px", padding: "0 0 95px" }}
						className="wrap_history"
						onClick={() => setShow(!isShow)}
					>
						<div className="item_history1">
							<div
								style={{
									fontWeight: 600,
									margin: "4px",
									color: "white",
									padding: "4px",
									backgroundColor: "#0a6a56",
									borderRadius: "7px",
									fontSize: "1rem",
								}}
							>
								Level 1
							</div>
							<div
								style={{
									fontWeight: 600,
									margin: "4px",
									color: "white",
									padding: "4px",
									backgroundColor: "#a82b11",
									borderRadius: "7px",
									fontSize: "1rem",
								}}
							>
								Level 2
							</div>
							<div
								style={{
									fontWeight: 600,
									margin: "4px",
									color: "white",
									padding: "4px",
									backgroundColor: "#0a6a56",
									borderRadius: "7px",
									fontSize: "1rem",
								}}
							>
								Level 3
							</div>
						</div>
						<div style={{ marginTop: "15px", background: "linear-gradient(179deg,#0a6a56,#08342b)"}} className="type_item3 title-trend">
							<div className="trend__result-item">Số kỳ</div>
							<div style={{ width: "75%" }} className="trend__result-item2">Kết quả</div>
						</div>
						{total != null &&total.length?(
							<>
								{total.map((item) => (
									<>
										<div className="type_item3">
											<div className="trend__result-item">{item.id_bet}</div>
											<div style={{ width: "75%" }} className="trend__result-item2">
												{/*<span><b>{processNumber(item.id_bet,0)}</b></span>
												<span><b>{processNumber(item.id_bet,1)}</b></span>
												<span><b>{processNumber(item.id_bet,2)}</b></span>
												<span><b>{processNumber(item.id_bet,3)}</b></span>
												<span><b>{processNumber(item.id_bet,4)}</b></span>*/}
												<div style={{margin:"auto"}}>{item.result==="TÀI"?"NHẬP":"XUẤT"}	</div>
											</div>
										</div>
									</>
								))}
							</>
						) : null}
					</div>
				</div>
			</div>
			<Footer profile={profile} />
		</>
	);
}
export default Trend1;
