import Footer from "../../components/Footer/Footer";
import "../user/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

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
    const [newMoney, setNewMoney] = useState(null);
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
            .get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {})
            .then((res) => {
                setProfile(res.data.data);
            })
            .catch((err) => localStorage.removeItem("user"));
        axios.get(`${process.env.REACT_APP_API_URL}/money/get/user`, {}).then((res) => {
            setSaving(res.data.data);
        });
        axios.get(`${process.env.REACT_APP_API_URL}/profit/get`, {}).then((res) => {
            setProfit(res.data.data);
        });
    }, []);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const onSubmit1 = (data) => {
        const formData = {
            money: Number(data.money.replaceAll(".", "").replaceAll(",", "").replaceAll(",", ""))
        };
        if (Number(data.money.replaceAll(".", "").replaceAll(",", "")) <= 0 || typeof Number(data.money.replaceAll(".", "").replaceAll(",", "")) !== "number") {
            swal("Thông báo", "Vui lòng nhập số tiền hợp lệ", "error");
            return false;
        }
        axios
            .post(`${process.env.REACT_APP_API_URL}/money/send`, formData)
            .then((res) => {
                swal({
                    title: "Thông báo",
                    text: "Gửi tiết kiệm thành công!",
                    icon: "success",
                    buttons: "OK"
                }).then(() => window.location.reload());
            })
            .catch((err) =>
                setError("money", {
                    type: "minLength",
                    message: "Lỗi giao dịch 404!"
                })
            );
    };
    const onSubmit2 = (data) => {
        if (data.money > profile.money) {
            setError("money", {
                type: "minLength",
                message: "Số tiền rút vui lòng nhỏ hơn số dư hiện tại"
            });
            return;
        }
        const formData = {
            money: Number(data.money.replaceAll(".", "").replaceAll(",", ""))
        };
        if (Number(data.money.replaceAll(".", "").replaceAll(",", "")) <= 0 || typeof Number(data.money.replaceAll(".", "").replaceAll(",", "")) !== "number") {
            swal("Thông báo", "Vui lòng nhập số tiền hợp lệ", "error");
            return false;
        }
        axios
            .post(`${process.env.REACT_APP_API_URL}/money/withdraw`, formData)
            .then((res) => {
                swal({
                    title: "Thông báo",
                    text: "Rút tiền tiết kiệm về ví thành công!",
                    icon: "success",
                    buttons: "OK"
                }).then(() => window.location.reload());
            })
            .catch((err) =>
                setError("money", {
                    type: "minLength",
                    message: "Lỗi giao dịch 404!"
                })
            );
    };
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);

    const toggleVisibility1 = () => {
        setIsVisible1(!isVisible1);
        if (isVisible2) {
            setIsVisible2(false);
        }
    };

    const toggleVisibility2 = () => {
        setIsVisible2(!isVisible2);
        if (isVisible1) {
            setIsVisible1(false);
        }
    };
    return (
        <>
            <div className="main">
                <Header profile={profile} />
                <h1 className="title-h1">Két Tiết Kiệm</h1>
                {/*<p className="tongloinhuan">
					Tổng lợi nhuận:{" "}
					<b>
						{profile && profit && (
							<>
								{Number(
									(
										Math.floor(
											(new Date() - new Date(saving?.vi.createdAt)) /
												(24 * 60000 * 60)
										) *
										(Math.floor(saving?.vi?.money) *
											getLV(profile?.level, profit[0]))
									).toFixed(0)
								).toLocaleString()}{" "}
								đ
							</>
						)}
					</b>
				</p>*/}
                <div className="record_bet">
                    <div className="colum-resultxs">
                        <div className="col-50">
                            {/*<div className="info_bet">
								Tiền trong ví{" "}
								<div className="xs_before">
									{profile ? Math.floor(profile.money).toLocaleString() : "0"} đ
								</div>
							</div>
							<div className="info_bet">
								Tiền trong két{" "}
								<div className="xs_before">
									{saving
										? Math.floor(saving?.vi?.money).toLocaleString()
										: "0"}{" "}
									đ
								</div>
							</div>*/}
                            <div className="info_bet">
                                Lãi suất <div className="xs_before">{profit && getLV(profile?.level, profit[0])}%</div>
                            </div>
                        </div>
                        <div className="col-50">
                            <div className="info_bet">
                                Thu nhập hàng ngày{" "}
                                <div className="xs_before">{profit && saving ? (Math.floor(saving?.vi?.money) * getLV(profile?.level, profit[0])).toLocaleString() : "0"} đ</div>
                            </div>
                        </div>
                        <div className="col-50">
                            <button className="btn-1" onClick={toggleVisibility1}>
                                Nạp két
                            </button>
                        </div>
                        <div className="col-50">
                            <button className="btn-2" onClick={toggleVisibility2}>
                                Rút két
                            </button>
                        </div>
                    </div>
                </div>
                <div className="taikhoandautu">
                    <div>
                        <div>Tài khoản đầu tư</div>
                        <h3>{saving ? Math.floor(saving?.vi?.money).toLocaleString() : "0"} đ</h3>
                    </div>
                </div>
                <div className="taikhoandautu tienlai">
                    <div>
                        <div>Tổng lãi</div>
                        <h3>
                            {profile && profit && (
                                <>
                                    {saving
                                        ? Number(
                                              (
                                                  Math.floor((new Date() - new Date(saving?.vi.createdAt)) / (24 * 60000 * 60)) *
                                                  (Math.floor(saving?.vi?.money) * getLV(profile?.level, profit[0]))
                                              ).toFixed(0)
                                          ).toLocaleString()
                                        : 0}{" "}
                                    đ
                                </>
                            )}
                        </h3>
                    </div>
                </div>
                {isVisible1 && (
                    <div className="box-image" style={{ marginTop: "0.3rem" }}>
                        <h5 style={{ fontSize: "0.5rem", marginTop: "0.3rem" }}>Chuyển tiền vào két</h5>
                        <form className="form-lg" onSubmit={handleSubmit(onSubmit1)}>
                            <div>
                                <div>
                                    <input
                                        className="ipadd"
                                        type="text"
                                        {...register("money", {
                                            required: true
                                        })}
                                        placeholder="Nhập số tiền nạp"
                                        value={newMoney}
                                        onClick={() => setNewMoney(null)}
                                        onChange={(e) => setNewMoney(Number(e.target.value.replaceAll(".", "").replaceAll(",", "").replaceAll(",", "")).toLocaleString())}
                                    />
                                </div>
                                {errors.money ? <p style={{ color: "red" }}>{errors.money.message}</p> : null}
                                <button type="submit" className="btn-submit" style={{ marginTop: "0.1rem" }}>
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {isVisible2 && (
                    <div className="box-image" style={{ marginTop: "0.3rem" }}>
                        <h5 style={{ fontSize: "0.5rem", marginTop: "0.3rem" }}>Rút tiền khỏi két</h5>
                        <form className="form-lg" onSubmit={handleSubmit(onSubmit2)}>
                            <div>
                                <>
                                    <div>
                                        <input
                                            className="ipadd"
                                            type="text"
                                            {...register("money", {
                                                required: true
                                            })}
                                            placeholder="Nhập số tiền rút"
                                            value={newMoney}
                                            onClick={() => setNewMoney(null)}
                                            onChange={(e) => setNewMoney(Number(e.target.value.replaceAll(".", "").replaceAll(",", "")).toLocaleString())}
                                        />
                                    </div>
                                    <button type="submit" className="btn-submit" style={{ marginTop: "0.1rem" }}>
                                        Xác nhận
                                    </button>
                                </>
                                {errors.money ? <p style={{ color: "red" }}>{errors.money.message}</p> : null}
                            </div>
                        </form>
                    </div>
                )}

                <div className="content_profile">
                    {profit && (
                        <table className="banglaisuat">
                            <thead>
                                <tr>
                                    <td>Cấp VIP</td>
                                    <td>Lãi suất theo ngày</td>
                                </tr>
                            </thead>

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
                        </table>
                    )}
                    <div className="text_choose_center huongdan">
                        <div className="title" style={{ margin: "0.2rem 0 0.4rem" }}>
                            Hướng dẫn
                        </div>
                        <ul>
                            <li>1. Chỉ có thể gửi tiền vào két tiết kiệm bằng số dư có thể rút</li>
                            <li>2. Lợi nhuận từ két tiết kiệm sẽ được cộng thằng vào số dư của bạn</li>
                            <li>3. Công thức thanh toán thu nhập: tỉ lệ lợi nhuận dựa vào cấp vip của bạn</li>
                            <li>4. Chu kỳ thanh toán tiền lãi: Thanh toán vào 4 giờ sáng hàng ngày</li>
                            <li>5. Nếu số dư của két lợi nhuận được chuyển ra ngoài trước khi thanh toán, việc thanh toán tiền thưởng sẽ không được thực hiện</li>
                            <li>6. Chỉ khi số dư của két tiết kiệm lớn hơn hoặc bằng 1.000.000 thì mới được tính lãi suất</li>
                            <li>
                                7. Phải mất một khoảng thời gian nhất định để kiếm lợi nhuận . Nếu thu nhập không được nhận nhanh chóng hãy kiên nhẫn chờ đợi. Nếu bạn có bất kỳ câu
                                hỏi nào, vui lòng liên hệ với bộ phận chăm sóc khách hàng
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
